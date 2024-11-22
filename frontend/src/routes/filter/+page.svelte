<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import * as Sentry from "@sentry/svelte";

  import { createDataQueries } from "$lib/stores/DataQueryStore";
  import { FilterForm, FilterFormLoading } from "$lib/components/FilterForm";
  import { DataTable, LoadingTable } from "$lib/components/Table";
  import { proteinTableHeaders } from "$lib/tableConfig";
  import type { ProteinInfo } from "$lib/client/model";
  import config from "$lib/config";
  import { bugOptions, IssueTemplate } from "$lib/github";

  /** @type {import('./$types').PageData} */
  export let data;
  let isHydrated = data.isHydrated;
  const itemsPerPage = config.PROTEIN_PAGE_SIZE;

  $: params = Object.fromEntries($page.url.searchParams);
  $: currentPage = params.page ? parseInt(params.page) : 1;
  $: query = createDataQueries(params, currentPage , data.proteinResponse);
  $: dataQuery = query.data;
  $: countQuery = query.count;
  // Add breadcrumb when filters change
  $: {
    if (Object.keys(params).length > 0) {
      Sentry.addBreadcrumb({
        category: 'filters',
        message: 'Applied protein filters',
        level: 'info',
        data: {
          filters: params
        }
      });
    }
  }

  function handleRowClick(row: ProteinInfo) {
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Viewed protein detail: ${row.uniprot_accession}`,
      level: 'info',
      data: {
        uniprot_accession: row.uniprot_accession,
        applied_filters: params
      }
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

  <div class="card p-2 m-3">
    {#if $dataQuery?.isSuccess}
      <h3 class="h3 mb-1 text-center">
        {params?.search_for ? "Filtered Proteins" : "Random Proteins"}
      </h3>
      <DataTable
        data={$dataQuery?.data?.items}
        headers={proteinTableHeaders}
        onRowClick={handleRowClick}
        {currentPage}
        pageSize={itemsPerPage}
        totalItems={$countQuery?.data?.count ?? 0}
        onSetPage={(page) => (currentPage = page)}
      />
    {:else if $dataQuery?.isLoading}
      <LoadingTable headers={proteinTableHeaders} rows={itemsPerPage} />
    {:else if $dataQuery === null || $dataQuery?.error}
      <div class="card variant-filled-error p-4">
        <div class="flex items-center gap-4">
          <iconify-icon icon="line-md:alert" class="text-2xl"></iconify-icon>
          <div>
            <h3 class="h3">Error Loading Data</h3>
            <p>
              {$dataQuery?.error?.message ||
                "An unexpected error occurred while loading the data."}
            </p>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
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
  </div>
