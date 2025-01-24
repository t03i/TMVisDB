// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import type { AnnotationData, PublicAnnotation } from "$lib/client/model";
import type { QueryFunction } from "@tanstack/svelte-query";
import { createQuery, type CreateQueryResult } from "@tanstack/svelte-query";
import axios, { AxiosError } from "axios";

export enum UniprotACCType {
  UNIPROT_ACCESSION = 0,
  UNIPROT_NAME = 1,
  UNKNOWN = -1,
}

export enum UniprotGOCategory {
  UNKNOWN = 0,
  BIOLOGICAL_PROCESS = "P",
  MOLECULAR_FUNCTION = "F",
  CELLULAR_COMPONENT = "C",
}

export const UniprotACCTypeNameMap: Record<UniprotACCType, string | null> = {
  [UniprotACCType.UNIPROT_ACCESSION]: "UniProt Accession",
  [UniprotACCType.UNIPROT_NAME]: "UniProt Name",
  [UniprotACCType.UNKNOWN]: null,
};
export interface UniprotAnnotationData extends AnnotationData {
  accession: string;
  name: string;
  sequence_length: number;
  go_annotations?: Array<{
    id: string;
    term: string;
    category: UniprotGOCategory;
  }>;
}

export const uniprot_get_input_type = (selected_id: string): UniprotACCType => {
  const test_str = selected_id.toUpperCase();
  if (
    /^[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9](?:[A-Z][A-Z0-9]{2}[0-9]){1,2}$/.test(
      test_str,
    )
  ) {
    return UniprotACCType.UNIPROT_ACCESSION;
  } else if (/^[A-Z0-9]{3,20}_[A-Z0-9]{3,20}$/.test(test_str)) {
    return UniprotACCType.UNIPROT_NAME;
  } else {
    return UniprotACCType.UNKNOWN;
  }
};

const uniprot_query_url = (
  selected_id: string,
  input_type: UniprotACCType,
): string => {
  const query_prefix = {
    [UniprotACCType.UNIPROT_ACCESSION]: `accession:${selected_id}`,
    [UniprotACCType.UNIPROT_NAME]: `id:${selected_id}`,
    [UniprotACCType.UNKNOWN]: selected_id,
  };
  return `https://rest.uniprot.org/uniprotkb/search?query=${query_prefix[input_type]} AND active:true&fields=id,accession,length,ft_transmem,go&format=json&size=1`;
};

export const uniprot_entry_url = (selected_id: string): string => {
  return `https://www.uniprot.org/uniprotkb/${selected_id}/entry`;
};

export const uniprot_taxonomy_url = (taxon_id: string): string => {
  return `https://www.uniprot.org/taxonomy/${taxon_id}`;
};

const uniprot_parse_response = (
  body: any,
  selected_id: string,
): UniprotAnnotationData | null => {
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
          source_db: "uniprot",
          source_db_url: uniprot_entry_url(selected_id),
          date_added: new Date().toISOString().split("T")[0],
        });
      }
    }

    // Parse GO annotations
    const go_annotations = (result.uniProtKBCrossReferences || [])
      .filter((go: any) => go.database === "GO")
      .map((go: any) => {
        const go_term =
          go.properties.find((prop: any) => prop.key === "GoTerm")?.value || "";
        const go_split = go_term.split(":");
        const category = go_split[0]?.charAt(0) || "";

        let goCategory: UniprotGOCategory;
        switch (category) {
          case "P":
            goCategory = UniprotGOCategory.BIOLOGICAL_PROCESS;
            break;
          case "F":
            goCategory = UniprotGOCategory.MOLECULAR_FUNCTION;
            break;
          case "C":
            goCategory = UniprotGOCategory.CELLULAR_COMPONENT;
            break;
          default:
            goCategory = UniprotGOCategory.UNKNOWN;
        }

        return {
          id: go.id,
          term: go_split[1] || go.id,
          category: goCategory,
        };
      })
      .filter(Boolean);

    return {
      accession: result.primaryAccession,
      name: result.uniProtkbId,
      sequence_length: result.sequence.length,
      annotations: annotations,
      go_annotations: go_annotations,
    };
  }
  return null;
};

export const createGetUniprotAnnotation = (
  selected_id: string,
): CreateQueryResult<UniprotAnnotationData | null, AxiosError> => {
  const queryFn: QueryFunction<
    UniprotAnnotationData | null,
    [string, string],
    AxiosError
  > = async ({ signal }) => {
    try {
      const input_type = uniprot_get_input_type(selected_id);
      const url = uniprot_query_url(selected_id, input_type);
      const { data } = await axios.get(url, { signal });
      return uniprot_parse_response(data, selected_id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new AxiosError(
          "An unexpected error occurred while fetching UniProt data",
          "UNKNOWN_ERROR",
          undefined,
          undefined,
          undefined,
        );
      }
    }
  };

  return createQuery({
    queryKey: ["uniprotAnnotation", selected_id],
    queryFn,
  });
};
