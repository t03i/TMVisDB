// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import { derived, get, readable, writable, type Readable } from "svelte/store";

import type {
  Clade,
  GetProteinsByCladeParams,
  GetProteinsByOrganismParams,
  GetProteinsBySuperKingdomParams,
  PageInfoNextCursor,
  ProteinResponse,
  ProteinResponsePageInfo,
  SuperKingdom,
  Topology,
} from "$lib/client/model";
import {
  createGetProteinsByClade,
  createGetProteinsByOrganism,
  createGetProteinsBySuperKingdom,
  createGetRandomProteins,
} from "$lib/client/tmvisdb";
import config from "$lib/config";
import { useQueryClient, type QueryClient } from "@tanstack/svelte-query";

type Filter = {
  topology?: Topology;
  has_signal_peptide?: boolean;
  sequence_length_min?: number;
  sequence_length_max?: number;
  cursor?: PageInfoNextCursor;
};

class QueryManager {
  constructor(
    private filterParams: Record<string, string>,
    private queryClient: QueryClient,
  ) {}

  createQuery(cursor?: PageInfoNextCursor) {
    const filter: Filter = {
      ...(this.filterParams.topology && {
        topology: this.filterParams.topology as Topology,
      }),
      ...(this.filterParams.peptide && {
        has_signal_peptide: this.filterParams.peptide === "true",
      }),
      ...(this.filterParams.min && {
        sequence_length_min: parseInt(this.filterParams.min),
      }),
      ...(this.filterParams.max && {
        sequence_length_max: parseInt(this.filterParams.max),
      }),
    };

    const baseOptions = {
      query: {
        queryClient: this.queryClient,
      },
    };

    if (this.filterParams.search_for === "id") {
      const organismId = parseInt(this.filterParams.organism_id);
      return createGetProteinsByOrganism(
        organismId,
        {
          ...filter,
          cursor,
          page_size: config.PROTEIN_PAGE_SIZE,
        } as GetProteinsByOrganismParams,
        baseOptions,
      );
    }
    if (this.filterParams.search_for === "taxa") {
      const superKingdom = this.filterParams.domain as SuperKingdom;
      if (!superKingdom) {
        console.error("Invalid super kingdom:", this.filterParams.domain);
        return null;
      }
      if (this.filterParams.kingdom) {
        const clade = this.filterParams.kingdom as Clade;
        return createGetProteinsByClade(
          superKingdom,
          clade,
          {
            ...filter,
            cursor,
            page_size: config.PROTEIN_PAGE_SIZE,
          } as GetProteinsByCladeParams,
          baseOptions,
        );
      }
      return createGetProteinsBySuperKingdom(
        superKingdom,
        {
          ...filter,
          cursor,
          page_size: config.PROTEIN_PAGE_SIZE,
        } as GetProteinsBySuperKingdomParams,
        baseOptions,
      );
    }
    return null;
  }
}

export type Pagination = {
  goForward: () => void;
  goBack: () => void;
  canGoForward: Readable<boolean>;
  canGoBack: Readable<boolean>;
  hasNextPage: Readable<boolean>;
  currentPage: Readable<number>;
  destroy: () => void;
};

interface PaginationState {
  currentPageIndex: number;
  pageInfoHistory: ProteinResponsePageInfo[];
}

export function createPaginatedQuery(
  filterParams: Record<string, string>,
  queryClient: QueryClient,
) {
  const paginationStore = writable<PaginationState>({
    currentPageIndex: 0,
    pageInfoHistory: [],
  });

  const queryManager = new QueryManager(filterParams, queryClient);
  console.log("queryManager", queryManager);

  // Define addPageInfo before using it
  const addPageInfo = (pageInfo: ProteinResponsePageInfo) => {
    console.log("addPageInfo", pageInfo);
    paginationStore.update((state) => {
      const newHistory = [
        ...state.pageInfoHistory.slice(0, state.currentPageIndex + 1),
        pageInfo,
      ];
      console.log("newHistory", newHistory);
      return {
        pageInfoHistory: newHistory,
        currentPageIndex: state.currentPageIndex,
      };
    });
  };

  // Store for the current query

  const currentQuery = writable(queryManager.createQuery());

  // Now we can use addPageInfo in the subscription
  let queryUnsubscribe = get(currentQuery).subscribe(($query) => {
    if ($query?.data) {
      addPageInfo($query?.data.page_info);
    }
  });

  const goBack = () => {
    paginationStore.update((state) => {
      if (state.currentPageIndex > 0) {
        const newIndex = state.currentPageIndex - 1;
        const cursor = state.pageInfoHistory[newIndex]?.next_cursor;
        currentQuery.set(queryManager.createQuery(cursor));
        return {
          ...state,
          currentPageIndex: newIndex,
        };
      }
      return state;
    });
  };

  const goForward = () => {
    console.log("goForward");
    paginationStore.update((state) => {
      const currentPageInfo = state.pageInfoHistory[state.currentPageIndex];
      if (state.currentPageIndex < state.pageInfoHistory.length - 1) {
        // Navigate through existing history
        const newIndex = state.currentPageIndex + 1;
        const cursor = state.pageInfoHistory[newIndex]?.next_cursor;
        currentQuery.set(queryManager.createQuery(cursor));
        return {
          ...state,
          currentPageIndex: newIndex,
        };
      } else if (currentPageInfo?.has_next_page) {
        // Fetch new page
        queryUnsubscribe(); // Unsubscribe from old query
        const newQuery = queryManager.createQuery(currentPageInfo.next_cursor);
        currentQuery.set(newQuery);
        queryUnsubscribe = newQuery.subscribe(($query) => {
          if ($query?.data) {
            addPageInfo($query.data.page_info);
          }
        });
        return state; // State will be updated by the subscription
      }
      return state;
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
    canGoBack: derived(
      paginationStore,
      (state) => state.pageInfoHistory.length > 1,
    ),
    canGoForward: derived(
      paginationStore,
      (state) =>
        state.currentPageIndex < state.pageInfoHistory.length - 1 ||
        (state.pageInfoHistory[state.currentPageIndex]?.has_next_page ?? false),
    ),
    hasNextPage: derived(
      paginationStore,
      (state) =>
        state.pageInfoHistory[state.currentPageIndex]?.has_next_page ?? false,
    ),
    currentPage: derived(
      paginationStore,
      (state) => state.currentPageIndex + 1,
    ),
    destroy, // Add destroy method to cleanup
  };
}

export function createDataQueries(
  params: Record<string, string>,
  initialData?: ProteinResponse,
) {
  const queryClient = useQueryClient();
  console.log("createDataQueries", params, queryClient, initialData);
  // If no search parameters are set, we're displaying random proteins
  const isRandomProteins = !params.search_for;

  if (isRandomProteins) {
    // For random proteins, create a simple query without pagination
    const query = readable(createGetRandomProteins(config.PROTEIN_PAGE_SIZE));

    return {
      data: query,
      count: null,
      pagination: null,
    };
  }

  const paginatedQuery = createPaginatedQuery(params, queryClient);

  return {
    data: paginatedQuery.query,
    count: null,
    pagination: {
      goForward: paginatedQuery.goForward,
      goBack: paginatedQuery.goBack,
      canGoForward: paginatedQuery.canGoForward,
      canGoBack: paginatedQuery.canGoBack,
      hasNextPage: paginatedQuery.hasNextPage,
      currentPage: paginatedQuery.currentPage,
      destroy: paginatedQuery.destroy,
    },
  };
}
