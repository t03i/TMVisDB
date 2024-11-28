<script lang="ts">
  import type { ProteinCount, HTTPValidationError } from "$lib/client/model";
  import type { CreateQueryResult } from "@tanstack/svelte-query";

  export let currentPage: number;
  export let pageSize: number;
  export let countQuery: CreateQueryResult<
    ProteinCount,
    HTTPValidationError
  > | null;
  export let loadedRows: number;

  $: startRow = (currentPage - 1) * pageSize + 1;
  $: endRow = loadedRows + startRow - 1;
</script>

<aside class="mr-6 text-sm leading-8">
  <b>{startRow}</b>
  - <b>{endRow}</b>
  {#if countQuery}
    \
    {#if $countQuery?.isLoading}
      <span class="animate-pulse italic">Loading ... </span>
    {:else if $countQuery?.isError}
      <span class="italic text-error-500">Error loading count</span>
    {:else}
      <b>{$countQuery?.data?.count}</b>
    {/if}
  {/if}
</aside>
