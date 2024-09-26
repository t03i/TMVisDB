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
    HTTPValidationError,
    SuperKingdom,
    Clade,
  } from "$lib/client/model";

  import type { AxiosError, AxiosResponse } from "axios";
  import type { CreateQueryResult } from "@tanstack/svelte-query";

  export let params: Record<string, string>;
  export let initialData: ProteinResponse | null = null;
  export let pageSize: number = 20;
  export let currentPage: number = 1;

  let query: CreateQueryResult<
    AxiosResponse<ProteinResponse>,
    AxiosError<HTTPValidationError>
  > | null = null;

  // Define query parameters
  $: queryParams = {
    topology: params.topology as Topology,
    has_signal_peptide: params.peptide === "true",
    sequence_length_min: parseInt(params.min),
    sequence_length_max: parseInt(params.max),
    page_size: pageSize,
    page: currentPage,
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
  isSuccessful={$query?.isSuccess}
  isLoading={$query?.isLoading}
  error={$query?.error}
  data={$query?.data?.data}
/>
