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

  let query: CreateQueryResult;
  $: {
    if (!params.search_for) {
      query = createGetRandomProteins(20);
    } else if (params.search_for === "id") {
      const organismId = parseInt(params.organism_id);
      query = createGetProteinsByOrganism(organismId, {
        topology: params.topology as Topology,
        has_signal_peptide: params.peptide === "true",
        sequence_length_min: parseInt(params.min),
        sequence_length_max: parseInt(params.max),
      });
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

          {
            topology: params.topology as Topology,
            has_signal_peptide: params.peptide === "true",
            sequence_length_min: parseInt(params.min),
            sequence_length_max: parseInt(params.max),
          },
        );
      } else {
        query = createGetProteinsBySuperKingdom(
          params.domain as
            | "Archaea"
            | "Eukaryota"
            | "Bacteria"
            | "unclassified sequences",
          {
            topology: params.topology as Topology,
            has_signal_peptide: params.peptide === "true",
            sequence_length_min: parseInt(params.min),
            sequence_length_max: parseInt(params.max),
          },
        );
      }
    }
  }
</script>

<slot
  proteins={$query?.data ?? []}
  isLoading={$query?.isLoading}
  error={$query?.error}
/>
