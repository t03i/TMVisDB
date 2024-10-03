// $lib/external/alphaFoldDB.ts
import { createQuery, type CreateQueryResult, type QueryFunction } from '@tanstack/svelte-query';
import axios, { AxiosError } from 'axios';

export interface AlphaFoldStructure {
  sequence: string;
  structureData: ArrayBuffer | string;
  format: 'cif' | 'mmcif' | 'pdb';
  binary: boolean;
}

export const createGetAlphaFoldStructure = (selected_id: string): CreateQueryResult<AlphaFoldStructure | null, AxiosError> => {
  const queryFn: QueryFunction<AlphaFoldStructure | null, [string, string], AxiosError> = async ({ signal }) => {
    const afdb_api_path = `https://www.alphafold.ebi.ac.uk/api/prediction/${selected_id}`;

    try {
      // Fetch the prediction data
      const predictionResponse = await axios.get(afdb_api_path, { signal });
      const afdb_json = predictionResponse.data;

      if (!afdb_json || afdb_json.length === 0) {
        console.warn(`No data found for UniProt ID: ${selected_id}`);
        return null;
      }

      const seq = afdb_json[0].uniprotSequence;

      // Determine the best available format
      let structureUrl = '';
      let format: 'cif' | 'mmcif' | 'pdb' = 'pdb';
      let binary = false;

      if (afdb_json[0].bcifUrl) {
        structureUrl = afdb_json[0].bcifUrl;
        format = 'cif';
        binary = true;
      } else if (afdb_json[0].cifUrl) {
        structureUrl = afdb_json[0].cifUrl;
        format = 'mmcif';
      } else if (afdb_json[0].pdbUrl) {
        structureUrl = afdb_json[0].pdbUrl;
        format = 'pdb';
      } else {
        console.warn(`No structure URL found for UniProt ID: ${selected_id}`);
        return null;
      }

      // Fetch the structure file
      const responseType = binary ? 'arraybuffer' : 'text';
      const structureResponse = await axios.get(structureUrl, { responseType, signal });
      const structure = structureResponse.data;

      return {
        sequence: seq,
        structureData: structure,
        format,
        binary,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new AxiosError(
          'An unexpected error occurred while fetching AlphaFold data',
          'UNKNOWN_ERROR',
          undefined,
          undefined,
          undefined
        );
      }
    }
  };

  return createQuery({
    queryKey: ['alphaFoldStructure', selected_id],
    queryFn,
  });
};
