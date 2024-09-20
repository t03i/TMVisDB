<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<!-- DataLoader.svelte -->
<script lang="ts">
  import {
    createGetRandomProteins,
    createGetProteinsByOrganism,
    createGetProteinsByClade,
    createGetProteinsBySuperKingdom,
  } from "$lib/client/tMVis";

  import type { Topology } from "$lib/client/model";
  import {
    useQueryClient,
    type CreateQueryResult,
  } from "@tanstack/svelte-query";

  export let params: Record<string, string>;
  export let initialData: any = [];
  export let page_size: number = 20;

  let query: CreateQueryResult;
  $: {
    const queryParams = {
      topology: params.topology as Topology,
      has_signal_peptide: params.peptide === "true",
      sequence_length_min: parseInt(params.min),
      sequence_length_max: parseInt(params.max),
      page_size: page_size,
      page: parseInt(params.page) || 1,
    };

    const queryOptions = {
      initialData: { data: initialData },
      refetchOnMount: initialData.length === 0,
    };

    if (!params.search_for) {
      query = createGetRandomProteins(20, { query: queryOptions });
    } else if (params.search_for === "id") {
      const organismId = parseInt(params.organism_id);
      query = createGetProteinsByOrganism(organismId, queryParams);
    } else if (params.search_for === "taxa") {
      if (params.domain) {
        query = createGetProteinsByClade(
          params.domain as
            | "Archaea"
            | "Eukaryota"
            | "Bacteria"
            | "unclassified sequences",
          // @ts-ignore
          params.kingdom,
          queryParams,
        );
      } else {
        query = createGetProteinsBySuperKingdom(
          params.domain as
            | "Archaea"
            | "Eukaryota"
            | "Bacteria"
            | "unclassified sequences",
          queryParams,
        );
      }
    }
  }
</script>

<slot
  isSuccessful={$query?.isSuccess}
  isLoading={$query?.isLoading}
  error={$query?.error}
  data={$query?.data?.data}
/>
