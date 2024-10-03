// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import { createQuery } from '@tanstack/svelte-query';
import type { QueryFunction } from '@tanstack/svelte-query';
import axios from 'axios';
import type { AnnotationData, PublicAnnotation } from '$lib/client/model';

export enum UniprotACCType {
  UNIPROT_ID = 0,
  UNIPROT_NAME = 1,
  UNKNOWN = -1,
}

export interface UniprotAnnotationData extends AnnotationData {
  accession: string;
  name: string;
  sequence_length: number;
}

const uniprot_get_input_type = (selected_id: string): UniprotACCType => {
  const test_str = selected_id.toUpperCase();
  if (/^[A-Z0-9]{3,20}_[A-Z0-9]{3,20}$/.test(test_str)) {
    return UniprotACCType.UNIPROT_ID;
  } else if (/^[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9](?:[A-Z][A-Z0-9]{2}[0-9]){1,2}$/.test(test_str)) {
    return UniprotACCType.UNIPROT_NAME;
  } else {
    return UniprotACCType.UNKNOWN;
  }
};

const uniprot_query_url = (selected_id: string, input_type: UniprotACCType): string => {
  const query_prefix = {
    [UniprotACCType.UNIPROT_NAME]: `accession:${selected_id}`,
    [UniprotACCType.UNIPROT_ID]: `id:${selected_id}`,
    [UniprotACCType.UNKNOWN]: selected_id,
  };

  return `https://rest.uniprot.org/uniprotkb/search?query=${query_prefix[input_type]} AND active:true&fields=id,accession,length,ft_transmem&format=json&size=1`;
};

export const uniprot_entry_url = (selected_id: string): string => {
  return `https://www.uniprot.org/uniprotkb/${selected_id}/entry`;
};

export const uniprot_taxonomy_url = (taxon_id: string): string => {
  return `https://www.uniprot.org/taxonomy/${taxon_id}`;
};

const uniprot_parse_response = (body: any, selected_id: string): UniprotAnnotationData | null => {
  if (body && body.results && body.results.length > 0) {
    const result = body.results[0];
    const annotations: PublicAnnotation[] = [];

    for (const entry of result.features || []) {
      if (entry.type === "Transmembrane") {
        const label = entry.description.includes("Beta") ? "BS" : "AH";
        const pos_start = parseInt(entry.location.start.value);
        const pos_end = parseInt(entry.location.end.value);
        annotations.push({
          start: pos_start,
          end: pos_end,
          label,
          source_db: "UniProtKB",
          source_db_url: uniprot_entry_url(selected_id),
          date_added: new Date().toISOString().split('T')[0],
        });
      }
    }

    return {
      accession: result.primaryAccession,
      name: result.uniProtkbId,
      sequence_length: result.sequence.length,
      annotations: annotations,
    };
  }
  return null;
};

export const createGetUniprotAnnotation = (selected_id: string) => {
  const queryFn: QueryFunction<UniprotAnnotationData | null> = async () => {
    const input_type = uniprot_get_input_type(selected_id);
    const url = uniprot_query_url(selected_id, input_type);
    const { data } = await axios.get(url);
    return uniprot_parse_response(data, selected_id);
  };

  return createQuery({
    queryKey: ['uniprotAnnotation', selected_id],
    queryFn,
  });
};
