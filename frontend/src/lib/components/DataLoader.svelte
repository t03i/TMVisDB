<script lang="ts">
  import {
    createGetRandomProteins,
    createGetProteinsByOrganism,
    createGetProteinsByClade,
    createGetProteinsBySuperKingdom,
  } from "$lib/client/tmvisdb";

  import type {
    Topology,
    ProteinResponse,
    SuperKingdom,
    Clade,
  } from "$lib/client/model";

  import type { AxiosError } from "axios";
  import type { CreateQueryResult } from "@tanstack/svelte-query";

  export let params: Record<string, string>;
  export let initialData: ProteinResponse | undefined = undefined;
  export let pageSize: number = 20;
  export let currentPage: number = 1;

  let query: CreateQueryResult<ProteinResponse, AxiosError> | null = null;

  // Define query parameters
  $: queryParams = {
    page_size: pageSize,
    page: currentPage,
    ...(params.topology && { topology: params.topology as Topology }),
    ...(params.peptide && {
      has_signal_peptide: params.peptide === "true",
    }),
    ...(params.min && { sequence_length_min: parseInt(params.min) }),
    ...(params.max && { sequence_length_max: parseInt(params.max) }),
  };

  $: {
    const shouldRefetchOnMount =
      !initialData || params.search_for !== undefined;

    if (!params.search_for) {
      query = createGetRandomProteins(20, {
        query: {
          initialData: initialData,
          refetchOnMount: shouldRefetchOnMount,
        },
      });
    } else if (params.search_for === "id") {
      // Proteins by organism ID
      const organismId = parseInt(params.organism_id);
      query = createGetProteinsByOrganism(organismId, queryParams);
    } else if (params.search_for === "taxa") {
      // Proteins by super kingdom or clade
      const superKingdomValue = params.domain as SuperKingdom;

      if (superKingdomValue) {
        if (params.kingdom) {
          const cladeValue = params.kingdom as Clade;
          if (cladeValue) {
            query = createGetProteinsByClade(
              superKingdomValue,
              cladeValue,
              queryParams,
            );
          } else {
            console.error("Invalid clade:", params.kingdom);
            query = null;
          }
        } else {
          query = createGetProteinsBySuperKingdom(
            superKingdomValue,
            queryParams,
          );
        }
      } else {
        console.error("Invalid super kingdom:", params.domain);
        query = null;
      }
    }
  }
</script>

<!-- Slot Props -->
<slot
  isSuccessful={$query ? $query?.isSuccess : false}
  isLoading={$query ? $query?.isLoading : false}
  error={$query ? $query?.error : null}
  data={$query ? $query?.data : undefined}
/>
