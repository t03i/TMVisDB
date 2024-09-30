// $lib/external/alphaFoldDB.ts

// ... [Existing imports and interface definitions] ...

import { createQuery } from '@tanstack/svelte-query';
import type { QueryFunction } from '@tanstack/svelte-query';
import axios from 'axios';

interface AlphaFoldStructure {
  sequence: string;
  structureData: string;
  format: 'bcif' | 'mmcif' | 'pdb';
}

export const useAlphaFoldFetchStructure = (selected_id: string) => {
  const queryFn: QueryFunction<AlphaFoldStructure | null> = async () => {
    const afdb_api_path = `https://www.alphafold.ebi.ac.uk/api/prediction/${selected_id}`;

    try {

      // Fetch the prediction data
      const predictionResponse = await axios.get(afdb_api_path);
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
        binary=true;
      } else
      if (afdb_json[0].cifUrl) {
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
      const structureResponse = await axios.get(structureUrl, { responseType });
      const structure = structureResponse.data;

      return {
        sequence: seq,
        structureData: structure,
        format,
        binary,
      };
    } catch (error) {
      console.error(`Error processing AlphaFold structure data for ${selected_id}:`, error);
      throw error; // Re-throw the error to be handled by the caller or Svelte Query
    }
  };

  return createQuery({
    queryKey: ['alphaFoldStructure', selected_id],
    queryFn,
  });
};
