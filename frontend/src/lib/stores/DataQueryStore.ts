// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import {  readable, type Readable } from "svelte/store";
import type { CreateQueryResult } from "@tanstack/svelte-query";

import type { ProteinResponse, ProteinCount, GetProteinsByOrganismParams, GetProteinsByOrganismCountParams, SuperKingdom, Clade, GetProteinsByCladeParams, GetProteinsByCladeCountParams, GetProteinsBySuperKingdomCountParams, GetProteinsBySuperKingdomParams } from "$lib/client/model";
import {
  createGetRandomProteins,
  createGetProteinsByOrganism,
  createGetProteinsByClade,
  createGetProteinsBySuperKingdom,
  createGetProteinsByOrganismCount,
  createGetProteinsByCladeCount,
  createGetProteinsBySuperKingdomCount,
  getGetRandomProteinsQueryKey,
} from "$lib/client/tmvisdb";

import config from "$lib/config";

const PAGE_SIZE = config.PROTEIN_PAGE_SIZE;

type Filter = {
  topology?: string;
  has_signal_peptide?: boolean;
  sequence_length_min?: number;
  sequence_length_max?: number;
};

type Request = Filter & {
  page: number;
  page_size: number;
};

export function createDataQueries(filterParams: Record<string, string>, pageNumber: number = 1, initialData?: ProteinResponse) {
  // Define query parameters
  const filter: Filter = {
    ...(filterParams.topology && { topology: filterParams.topology }),
    ...(filterParams.peptide && { has_signal_peptide: filterParams.peptide === "true" }),
    ...(filterParams.min && { sequence_length_min: parseInt(filterParams.min) }),
    ...(filterParams.max && { sequence_length_max: parseInt(filterParams.max) }),
  };
  const request: Request = {
    ...filter,
    page: pageNumber - 1, // API expects 0-based page index
    page_size: PAGE_SIZE,
  };

  // Create the appropriate query based on search parameters
  const createQueries = (): { data: CreateQueryResult<ProteinResponse, Error> | Readable<null>, count: CreateQueryResult<ProteinCount, Error> | Readable<null> } => {
    if (!filterParams.search_for) {
      return {
        data: createGetRandomProteins(request.page_size, {
          query: {
            queryKey: getGetRandomProteinsQueryKey(request.page_size),
            initialData,
            refetchOnMount: !initialData || params.search_for !== undefined,
          },
        }) as unknown as CreateQueryResult<ProteinResponse, Error>,
        count: readable(null),
      };
    }

    if (filterParams.search_for === "id") {
      const organismId = parseInt(filterParams.organism_id);
      return {
        data: createGetProteinsByOrganism(organismId, request as GetProteinsByOrganismParams) as unknown as CreateQueryResult<ProteinResponse, Error>,
        count: createGetProteinsByOrganismCount(organismId, filter as GetProteinsByOrganismCountParams) as unknown as CreateQueryResult<ProteinCount, Error>,
      };
    }

    if (filterParams.search_for === "taxa") {
      const superKingdom = filterParams.domain as SuperKingdom;
      if (!superKingdom) {
        console.error("Invalid super kingdom:", filterParams.domain);
        return { data: readable(null), count: readable(null) };
      }

      if (filterParams.kingdom) {
        const clade = filterParams.kingdom as Clade;
        return {
          data: createGetProteinsByClade(superKingdom, clade, request as GetProteinsByCladeParams) as unknown as CreateQueryResult<ProteinResponse, Error>,
          count: createGetProteinsByCladeCount(superKingdom, clade, filter as GetProteinsByCladeCountParams) as unknown as CreateQueryResult<ProteinCount, Error>,
        };
      }

      return {
        data: createGetProteinsBySuperKingdom(superKingdom, request as GetProteinsBySuperKingdomParams) as unknown as CreateQueryResult<ProteinResponse, Error>,
        count: createGetProteinsBySuperKingdomCount(superKingdom, filter as GetProteinsBySuperKingdomCountParams) as unknown as CreateQueryResult<ProteinCount, Error>,
      };
    }

    return { data: readable(null), count: readable(null) };
  };

  const { data ,  count } = createQueries();

  return {
    data,
     count,
  };
}
