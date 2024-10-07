// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import { createQuery } from '@tanstack/svelte-query';
import { type Readable } from 'svelte/store';
import axios from 'axios';
import type { PublicAnnotation, AnnotationData } from '$lib/client/model';

const tmalphafold_query_url = (up_name: string): string => {
  return `https://tmalphafold.ttk.hu/api/tmdet/${up_name}.json`;
};

export const tmalphafold_entry_url = (up_name: string): string => {
  return `https://tmalphafold.ttk.hu/entry/${up_name}`;
};

const tmalphafold_parse_response = (body: any, up_name: string): AnnotationData  => {
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

  return {annotations: annotations};
};

export const getTMAlphaFoldAnnotation = async (up_name: string, signal: AbortSignal) => {
    const url = tmalphafold_query_url(up_name);
    const { data } = await axios.get(url);
    return tmalphafold_parse_response(data, up_name);
  };


  // TODO better solution for queryClient
export const createGetTMAlphaFoldAnnotation = (up_name: string, queryClient) => {

  return createQuery({
    queryKey: ['tmAlphaFoldAnnotation', up_name],
    queryFn: ({signal}) => getTMAlphaFoldAnnotation(up_name, signal),
    enabled: !!up_name
  }, queryClient);
};
