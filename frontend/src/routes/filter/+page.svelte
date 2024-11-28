<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";

  import * as Sentry from "@sentry/svelte";
  import { useQueryClient } from "@tanstack/svelte-query";

  import {
    createDataQueryStore,
    type Pagination as PaginationType,
  } from "$lib/stores/DataQueryStore";
  import { FilterForm, FilterFormLoading } from "$lib/components/FilterForm";
  import {
    DataTable,
    LoadingTable,
    PaginationFooter,
  } from "$lib/components/Table";
  import { proteinTableHeaders } from "$lib/tableConfig";
  import type { ProteinInfo } from "$lib/client/model";
  import config from "$lib/config";
  import { bugOptions } from "$lib/github";

  /** @type {import('./$types').PageData} */
  export let data;
  let isHydrated = data.isHydrated;
  const pageSize = config.PROTEIN_PAGE_SIZE;

  $: params = Object.fromEntries($page.url.searchParams);
  $: dataQueryStore = createDataQueryStore(params);
  $: ({ dataQuery, countQuery, pagination, currentPageIndex } =
    $dataQueryStore);

  let loadingTimer: ReturnType<typeof setTimeout> | null = null;
  let showLoadingNote = false;

  // Watch dataQuery loading state
  $: {
    if ($dataQuery?.isLoading) {
      loadingTimer = setTimeout(() => {
        showLoadingNote = true;
      }, 15000); // 15 seconds
    } else {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
        loadingTimer = null;
      }
      showLoadingNote = false;
    }
  }

  // Cleanup on component destroy
  onDestroy(() => {
    dataQueryStore.destroy();
    if (loadingTimer) {
      clearTimeout(loadingTimer);
    }
  });

  // Add breadcrumb when filters change
  $: {
    if (Object.keys(params).length > 0) {
      Sentry.addBreadcrumb({
        category: "filters",
        message: "Applied protein filters",
        level: "info",
        data: {
          filters: params,
        },
      });
    }
  }

  function handleRowClick(row: ProteinInfo) {
    Sentry.addBreadcrumb({
      category: "navigation",
      message: `Viewed protein detail: ${row.uniprot_accession}`,
      level: "info",
      data: {
        uniprot_accession: row.uniprot_accession,
        applied_filters: params,
      },
    });
    goto(`/detail/${row.uniprot_accession}`);
  }
</script>

<svelte:head>
  <title>{config.APP_NAME} Database Filter</title>
</svelte:head>

<div class="card m-3 p-2">
  <FilterFormLoading isLoading={$dataQuery?.isLoading ?? false}>
    <FilterForm />
  </FilterFormLoading>
</div>

{#if showLoadingNote}
  <div
    class="alert variant-ghost-primary m-3 grid grid-cols-[auto_1fr] items-center gap-4 p-2"
  >
    <iconify-icon icon="line-md:cog-loop" height="3rem"></iconify-icon>
    <div>
      <h3 class="h3 mb-2">Taking a moment to find exactly what you need</h3>
      <p>
        We're carefully searching through detailed criteria like specific
        organisms and kingdoms. For all of our proteins, this can take a while.
        <br />
        Need a quick overview? Try using fewer filters to see results faster.
      </p>
    </div>
  </div>
{/if}

<div class="card m-3 p-2">
  {#if $dataQuery?.isSuccess}
    <h3 class="h3 mb-1 text-center">
      {params?.search_for ? "Filtered Proteins" : "Random Proteins"}
    </h3>
    <DataTable
      data={$dataQuery?.data?.items}
      headers={proteinTableHeaders}
      onRowClick={handleRowClick}
      currentPage={currentPageIndex + 1}
    >
      <PaginationFooter
        {pageSize}
        {pagination}
        {countQuery}
        loadedRows={$dataQuery?.data?.items.length}
        slot="footer"
      />
    </DataTable>
  {:else if $dataQuery?.isLoading}
    <LoadingTable headers={proteinTableHeaders} rows={pageSize} />
  {:else if $dataQuery === null || $dataQuery?.error}
    {#if $dataQuery?.error?.status === 404 || $dataQuery?.error?.status === 422}
      <div
        class="alert variant-filled-error grid grid-cols-[auto_1fr] items-center gap-4 p-4"
      >
        <iconify-icon icon="line-md:alert" class="text-2xl"></iconify-icon>
        <div>
          <h3 class="h3">No Data Found</h3>
          <p>
            {$dataQuery?.error?.status === 422
              ? "Your search criteria resulted in an invalid query. Please adjust your filters."
              : "No proteins matched your search criteria."}
          </p>
        </div>
      </div>
    {:else}
      <div
        class="alert variant-filled-error grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4"
      >
        <iconify-icon icon="line-md:alert" class="text-2xl"></iconify-icon>
        <div>
          <h3 class="h3">Error Loading Data</h3>
          <p>
            {$dataQuery?.error?.message ||
              "An unexpected error occurred while loading the data."}
          </p>
        </div>
        <div class="flex gap-2">
          <button
            class="variant-filled btn"
            on:click={() => window.location.reload()}
          >
            Try Again
          </button>
          <a
            href={config.GITHUB_LINKS.getNewIssueUrl(bugOptions())}
            target="_blank"
            rel="noopener"
            class="variant-soft btn"
          >
            Report Issue
          </a>
        </div>
      </div>
    {/if}
  {/if}
</div>
