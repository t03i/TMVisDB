// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import { wrappedQueries } from "$lib/client/autoWrapper";
import { derived, get, writable, type Readable } from "svelte/store";

const {
  useRandomProteins,
  useProteinsByOrganism,
  useProteinsBySuperKingdom,
  useProteinsByClade,
} = wrappedQueries;

import type {
  Clade,
  GetProteinsByCladeParams,
  GetProteinsByOrganismParams,
  GetProteinsBySuperKingdomParams,
  PageInfoNextCursor,
  ProteinResponsePageInfo,
  SuperKingdom,
  Topology,
} from "$lib/client/model";
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
      ...(this.filterParams.minlength && {
        sequence_length_min: parseInt(this.filterParams.minlength),
      }),
      ...(this.filterParams.maxlength && {
        sequence_length_max: parseInt(this.filterParams.minlength),
      }),
    };

    if (this.filterParams.search_for === "id") {
      const organismId = parseInt(this.filterParams.organismid);
      return useProteinsByOrganism({
        params: [
          organismId,
          {
            ...filter,
            cursor,
            page_size: config.PROTEIN_PAGE_SIZE,
          } as GetProteinsByOrganismParams,
        ],
        queryClient: this.queryClient,
      });
    }
    if (this.filterParams.search_for === "taxa") {
      const superKingdom = this.filterParams.domain as SuperKingdom;
      if (!superKingdom) {
        console.error("Invalid super kingdom:", this.filterParams.domain);
        return null;
      }
      if (this.filterParams.kingdom) {
        const clade = this.filterParams.kingdom as Clade;
        return useProteinsByClade({
          params: [
            superKingdom,
            clade,
            {
              ...filter,
              cursor,
              page_size: config.PROTEIN_PAGE_SIZE,
            } as GetProteinsByCladeParams,
          ],
          queryClient: this.queryClient,
        });
      }
      return useProteinsBySuperKingdom({
        params: [
          superKingdom,
          {
            ...filter,
            cursor,
            page_size: config.PROTEIN_PAGE_SIZE,
          } as GetProteinsBySuperKingdomParams,
        ],
        queryClient: this.queryClient,
      });
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

type DataQueryState = {
  dataQuery: ReturnType<
    | typeof useRandomProteins
    | typeof useProteinsByOrganism
    | typeof useProteinsBySuperKingdom
    | typeof useProteinsByClade
  > | null;
  countQuery: number | null;
  pagination: Pagination | null;
  currentPageIndex: number;
  pageInfoHistory: ProteinResponsePageInfo[];
};

export function createDataQueryStore(params: Record<string, string>) {
  const queryClient = useQueryClient();
  const isRandomProteins = !params.search_for;

  const store = writable<DataQueryState>({
    dataQuery: null,
    countQuery: null,
    pagination: null,
    currentPageIndex: 0,
    pageInfoHistory: [],
  });

  const addPageInfo = (pageInfo: ProteinResponsePageInfo) => {
    store.update((state) => ({
      ...state,
      pageInfoHistory: [
        ...state.pageInfoHistory.slice(0, state.currentPageIndex + 1),
        pageInfo,
      ],
    }));
  };

  if (isRandomProteins) {
    const randomQuery = useRandomProteins({
      params: [config.PROTEIN_PAGE_SIZE],
      queryClient,
    });

    store.set({
      dataQuery: randomQuery,
      countQuery: null,
      pagination: null,
      currentPageIndex: 0,
      pageInfoHistory: [],
    });

    return {
      subscribe: store.subscribe,
      destroy: () => {
        store.set({
          dataQuery: null,
          countQuery: null,
          pagination: null,
          currentPageIndex: 0,
          pageInfoHistory: [],
        });
      },
    };
  } else {
    const queryManager = new QueryManager(params, queryClient);
    let queryUnsubscribe: (() => void) | null = null;

    const subscribeToQuery = (
      query: ReturnType<typeof queryManager.createQuery>,
    ) => {
      queryUnsubscribe?.();
      queryUnsubscribe = query.subscribe(($query) => {
        if ($query?.data) {
          addPageInfo($query.data.page_info);
        }
      });
    };

    const goBack = () => {
      store.update((state) => {
        if (state.currentPageIndex > 0) {
          const newIndex = state.currentPageIndex - 1;
          const cursor =
            newIndex <= 0
              ? undefined
              : state.pageInfoHistory[newIndex - 1]?.next_cursor;

          const newQuery = queryManager.createQuery(cursor);
          subscribeToQuery(newQuery);
          return {
            ...state,
            currentPageIndex: newIndex,
            dataQuery: newQuery,
          };
        }
        return state;
      });
    };

    const goForward = () => {
      store.update((state) => {
        const currentPageInfo = state.pageInfoHistory[state.currentPageIndex];
        const newIndex = state.currentPageIndex + 1;

        if (currentPageInfo?.has_next_page) {
          const newQuery = queryManager.createQuery(
            currentPageInfo.next_cursor,
          );
          subscribeToQuery(newQuery);
          return {
            ...state,
            dataQuery: newQuery,
            currentPageIndex: newIndex,
          };
        }
        return state;
      });
    };

    // Initialize with first query
    const initialQuery = queryManager.createQuery();
    subscribeToQuery(initialQuery);

    store.set({
      dataQuery: initialQuery,
      countQuery: null,
      pagination: {
        goForward,
        goBack,
        canGoForward: derived(
          store,
          (state) =>
            state.currentPageIndex < state.pageInfoHistory.length - 1 ||
            (state.pageInfoHistory[state.currentPageIndex]?.has_next_page ??
              false),
        ),
        canGoBack: derived(store, (state) => state.currentPageIndex > 0),
        hasNextPage: derived(
          store,
          (state) =>
            state.pageInfoHistory[state.currentPageIndex]?.has_next_page ??
            false,
        ),
        currentPage: derived(store, (state) => state.currentPageIndex + 1),
        destroy: () => queryUnsubscribe?.(),
      },
      currentPageIndex: 0,
      pageInfoHistory: [],
    });
  }

  return {
    subscribe: store.subscribe,
    destroy: () => {
      const currentValue = get(store);
      currentValue.pagination?.destroy?.();
      store.set({
        dataQuery: null,
        countQuery: null,
        pagination: null,
        currentPageIndex: 0,
        pageInfoHistory: [],
      });
    },
  };
}
