// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import { createQuery } from '@tanstack/svelte-query';
import type { QueryFunction } from '@tanstack/svelte-query';
import axios from 'axios';

interface ResidueAnnotation {
  start: number;
  end: number;
  label: string;
}

const tmalphafold_query_url = (up_name: string): string => {
  return `https://tmalphafold.ttk.hu/api/tmdet/${up_name}.json`;
};

export const tmalphafold_entry_url = (up_name: string): string => {
  return `https://tmalphafold.ttk.hu/entry/${up_name}`;
};

const tmalphafold_parse_response = (body: any): ResidueAnnotation[] | null => {
  const annotations: ResidueAnnotation[] = [];

  if (body && "CHAIN" in body) {
    for (const entry of body.CHAIN[0].REGION) {
      if (entry._attributes.type === "M") {
        annotations.push({
          start: parseInt(entry._attributes.seq_beg),
          end: parseInt(entry._attributes.seq_end),
          label: "AH",
        });
      }
    }
  }

  return annotations.length > 0 ? annotations : null;
};

export const useTmAlphaFoldFetchAnnotation = (up_name: string) => {
  const queryFn: QueryFunction<ResidueAnnotation[] | null> = async () => {
    const url = tmalphafold_query_url(up_name);
    const { data } = await axios.get(url);
    return tmalphafold_parse_response(data);
  };

  return createQuery({
    queryKey: ['tmAlphaFoldAnnotation', up_name],
    queryFn,
  });
};
