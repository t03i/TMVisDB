// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import { createQuery } from '@tanstack/svelte-query';
import type { QueryFunction } from '@tanstack/svelte-query';
import axios from 'axios';
import type { PublicAnnotation, AnnotationData } from '$lib/client/model';

const tmalphafold_query_url = (up_name: string): string => {
  return `https://tmalphafold.ttk.hu/api/tmdet/${up_name}.json`;
};

export const tmalphafold_entry_url = (up_name: string): string => {
  return `https://tmalphafold.ttk.hu/entry/${up_name}`;
};

const tmalphafold_parse_response = (body: any, up_name: string): AnnotationData | null => {
  const annotations: PublicAnnotation[] = [];

  if (body && "CHAIN" in body) {
    for (const entry of body.CHAIN[0].REGION) {
      if (entry._attributes.type === "M") {
        annotations.push({
          start: parseInt(entry._attributes.seq_beg),
          end: parseInt(entry._attributes.seq_end),
          label: "AH",
          source_db: "TMAlphaFold",
          source_db_url: tmalphafold_entry_url(up_name),
          date_added: new Date().toISOString().split('T')[0],
        });
      }
    }
  }

  return annotations.length > 0 ? {annotations: annotations} : null;
};

export const CreateGetTMAlphaFoldAnnotation = (up_name: string) => {
  const queryFn: QueryFunction<AnnotationData | null> = async () => {
    const url = tmalphafold_query_url(up_name);
    const { data } = await axios.get(url);
    return tmalphafold_parse_response(data, up_name);
  };

  return createQuery({
    queryKey: ['tmAlphaFoldAnnotation', up_name],
    queryFn,
  });
};
