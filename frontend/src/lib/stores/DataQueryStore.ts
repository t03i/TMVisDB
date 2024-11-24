// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import { readable, writable, derived } from "svelte/store";
import type { CreateQueryResult, QueryKey } from "@tanstack/svelte-query";

import type { ProteinResponse, PageInfo, GetProteinsByOrganismParams, SuperKingdom, Clade, GetProteinsBySuperKingdomParams, GetProteinsByCladeParams, PageInfoNextCursor,  HTTPValidationError } from "$lib/client/model";
import {
  createGetProteinsByOrganism,
  createGetProteinsByClade,
  createGetProteinsBySuperKingdom,
  createGetRandomProteins,
} from "$lib/client/tmvisdb";
import config from "$lib/config";

type Filter = {
  topology?: string;
  has_signal_peptide?: boolean;
  sequence_length_min?: number;
  sequence_length_max?: number;
};


interface PaginationState {
  currentPageIndex: number;
  pageInfoHistory: PageInfo[];
}

export function createPaginatedQuery(filterParams: Record<string, string>) {
  const paginationStore = writable<PaginationState>({
    currentPageIndex: 0,
    pageInfoHistory: []
  });

  const filter: Filter = {
    ...(filterParams.topology && { topology: filterParams.topology }),
    ...(filterParams.peptide && { has_signal_peptide: filterParams.peptide === "true" }),
    ...(filterParams.min && { sequence_length_min: parseInt(filterParams.min) }),
    ...(filterParams.max && { sequence_length_max: parseInt(filterParams.max) }),
  };

  // Create a new query based on current cursor
  const createQuery = (cursor?: PageInfoNextCursor) => {
    if (filterParams.search_for === "id") {
      const organismId = parseInt(filterParams.organism_id);
      return createGetProteinsByOrganism(organismId, {...filter, cursor, page_size: config.PROTEIN_PAGE_SIZE} as GetProteinsByOrganismParams);
    }
    if (filterParams.search_for === "taxa") {
      const superKingdom = filterParams.domain as SuperKingdom;
      if (!superKingdom) {
        console.error("Invalid super kingdom:", filterParams.domain);
        return null;
      }
      if (filterParams.kingdom) {
        const clade = filterParams.kingdom as Clade;
        return createGetProteinsByClade(superKingdom, clade, {...filter, cursor, page_size: config.PROTEIN_PAGE_SIZE} as GetProteinsByCladeParams);
      }

      return createGetProteinsBySuperKingdom(superKingdom, {...filter, cursor, page_size: config.PROTEIN_PAGE_SIZE} as GetProteinsBySuperKingdomParams);
    }
    return null;
  };

  // Store for the current query
  const currentQuery = writable<CreateQueryResult<ProteinResponse, HTTPValidationError> & { queryKey: QueryKey; } | null>(createQuery());

  // Create a single subscription that we can control
  let queryUnsubscribe = currentQuery.subscribe(($query) => {
    if ($query?.data) {
      addPageInfo($query.data.page_info);
    }
  });

  const goBack = () => {
    paginationStore.update(state => {
      if (state.currentPageIndex > 0) {
        const newIndex = state.currentPageIndex - 1;
        const cursor = state.pageInfoHistory[newIndex]?.next_cursor;
        currentQuery.set(createQuery(cursor));
        return {
          ...state,
          currentPageIndex: newIndex
        };
      }
      return state;
    });
  };

  const goForward = () => {
    paginationStore.update(state => {
      const currentPageInfo = state.pageInfoHistory[state.currentPageIndex];
      if (state.currentPageIndex < state.pageInfoHistory.length - 1) {
        // Navigate through existing history
        const newIndex = state.currentPageIndex + 1;
        const cursor = state.pageInfoHistory[newIndex]?.next_cursor;
        currentQuery.set(createQuery(cursor));
        return {
          ...state,
          currentPageIndex: newIndex
        };
      } else if (currentPageInfo?.has_next_page) {
        // Fetch new page
        queryUnsubscribe(); // Unsubscribe from old query
        const newQuery = createQuery(currentPageInfo.next_cursor);
        currentQuery.set(newQuery);
        queryUnsubscribe = currentQuery.subscribe(($query) => {
          if ($query?.data) {
            addPageInfo($query.data.page_info);
          }
        });
        return state; // State will be updated by the subscription
      }
      return state;
    });
  };

  const addPageInfo = (pageInfo: PageInfo) => {
    paginationStore.update(state => {
      const newHistory = [...state.pageInfoHistory.slice(0, state.currentPageIndex + 1), pageInfo];
      return {
        pageInfoHistory: newHistory,
        currentPageIndex: state.currentPageIndex + 1
      };
    });
  };

  // Make sure to expose a cleanup method
  const destroy = () => {
    queryUnsubscribe();
  };

  return {
    query: currentQuery,
    goBack,
    goForward,
    addPageInfo,
    canGoBack: derived(paginationStore, state => state.currentPageIndex > 0),
    canGoForward: derived(paginationStore, state =>
      state.currentPageIndex < state.pageInfoHistory.length - 1 ||
      (state.pageInfoHistory[state.currentPageIndex]?.has_next_page ?? false)
    ),
    hasNextPage: derived(paginationStore, state =>
      (state.pageInfoHistory[state.currentPageIndex]?.has_next_page ?? false)
    ),
    destroy, // Add destroy method to cleanup
  };
}

export function createDataQueries(params: Record<string, string>, currentPage: number, initialData?: ProteinResponse) {
  // If no search parameters are set, we're displaying random proteins
  const isRandomProteins = !params.search_for;

  if (isRandomProteins) {
    // For random proteins, create a simple query without pagination
    const query = writable<CreateQueryResult<ProteinResponse, HTTPValidationError> & { queryKey: QueryKey; } | null>(
      createGetRandomProteins(config.PROTEIN_PAGE_SIZE)
    );

    return {
      data: query,
      count: null, // No count needed for random proteins
      pagination: null // No pagination needed for random proteins
    };
  }

  // For filtered proteins, create paginated query
  const paginatedQuery = createPaginatedQuery(params);


  return {
    data: paginatedQuery.query,
    count: null,
    pagination: {
      goForward: paginatedQuery.goForward,
      goBack: paginatedQuery.goBack,
      canGoForward: paginatedQuery.canGoForward,
      canGoBack: paginatedQuery.canGoBack,
      hasNextPage: paginatedQuery.hasNextPage,
      destroy: paginatedQuery.destroy
    }
  };
}
