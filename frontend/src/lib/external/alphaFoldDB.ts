// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import { createQuery } from '@tanstack/svelte-query';
import type { QueryFunction } from '@tanstack/svelte-query';
import axios from 'axios';

interface AlphaFoldStructure {
  sequence: string;
  pdbFile: string;
}

export const useAlphaFoldFetchStructure = (selected_id: string) => {
  const queryFn: QueryFunction<AlphaFoldStructure | null> = async () => {
    const afdb_api_path = `https://www.alphafold.ebi.ac.uk/api/prediction/${selected_id}`;

    try {
      const { data: afdb_json } = await axios.get(afdb_api_path);

      if (!afdb_json || afdb_json.length === 0) {
        return null;
      }

      const seq = afdb_json[0].uniprotSequence;
      const afdb_pdb_path = afdb_json[0].pdbUrl;
      const { data: afdb_file } = await axios.get(afdb_pdb_path, { responseType: 'text' });

      return {
        sequence: seq,
        pdbFile: afdb_file,
      };
    } catch (error) {
      console.error(`Error processing AlphaFold structure data for ${selected_id}:`, error);
      return null;
    }
  };

  return createQuery({
    queryKey: ['alphaFoldStructure', selected_id],
    queryFn,
  });
};
