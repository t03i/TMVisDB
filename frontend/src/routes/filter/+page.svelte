<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import DataLoader from "$lib/components/DataLoader.svelte";
  import { FilterForm, FilterFormLoading } from "$lib/components/FilterForm";
  import { DataTable, LoadingTable } from "$lib/components/Table";
  import { proteinTableHeaders } from "$lib/tableConfig";
  import type { ProteinInfo } from "$lib/client/model";
  import config from "$lib/config";
  import { IssueTemplate } from "$lib/github";

  /** @type {import('./$types').PageData} */
  export let data;
  let isHydrated = data.isHydrated;
  const itemsPerPage = 20;

  $: params = Object.fromEntries($page.url.searchParams);
  $: currentPage = params.page ? parseInt(params.page) : 1;

  function handleRowClick(row: ProteinInfo) {
    goto(`/detail/${row.uniprot_accession}`);
  }
</script>

<svelte:head>
  <title>{config.APP_NAME} Filter</title>
</svelte:head>

<DataLoader
  {params}
  initialData={data.initialProteins}
  pageSize={itemsPerPage}
  {currentPage}
  let:data={proteinResponse}
  let:isSuccessful
  let:isLoading
  let:error
>
  <div class="card">
    <FilterFormLoading {isLoading}>
      <FilterForm />
    </FilterFormLoading>
  </div>

  <div class="card p-2">
    {#if isSuccessful}
      <h3 class="h3 mb-1 text-center">
        {params?.search_for ? "Filtered Proteins" : "Random Proteins"}
      </h3>
      <DataTable
        data={proteinResponse.items}
        headers={proteinTableHeaders}
        onRowClick={handleRowClick}
        {currentPage}
        pageSize={itemsPerPage}
        totalItems={200}
        onSetPage={(page) => (currentPage = page)}
      />
    {:else if isLoading}
      <LoadingTable headers={proteinTableHeaders} rows={itemsPerPage} />
    {:else if error}
      <div class="card variant-filled-error p-4">
        <div class="flex items-center gap-4">
          <iconify-icon icon="line-md:alert" class="text-2xl"></iconify-icon>
          <div>
            <h3 class="h3">Error Loading Data</h3>
            <p>
              {error.message ||
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
            href={config.GITHUB_LINKS.getNewIssueUrl({
              template: IssueTemplate.BUG,
            })}
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
</DataLoader>
