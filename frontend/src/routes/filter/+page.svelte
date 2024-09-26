<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import DataLoader from "$lib/components/DataLoader.svelte";
  import FilterForm from "$lib/components/FilterForm.svelte";
  import LoadingCard from "$lib/components/LoadingCard.svelte";
  import { DataTable, LoadingTable, TableFooter } from "$lib/components/table";
  import { proteinTableHeaders } from "$lib/tableConfig";
  import type { ProteinInfo } from "$lib/client/model";

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

<DataLoader
  {params}
  initialData={{ data: data.initialProteins }}
  pageSize={itemsPerPage}
  {currentPage}
  let:data={proteinResponse}
  let:isSuccessful
  let:isLoading
  let:error
>
  <div class="flex flex-row gap-4 mx-8 my-8">
    <div class="basis-2/12">
      <LoadingCard {isLoading}>
        <FilterForm />
      </LoadingCard>
    </div>
    <div class="basis-10/12 card">
      {#if isSuccessful}
        <DataTable
          data={proteinResponse.items}
          headers={proteinTableHeaders}
          onRowClick={handleRowClick}
        >
          <TableFooter
            slot="footer"
            {currentPage}
            pageSize={itemsPerPage}
            totalItems={200}
            onSetPage={(page) => (currentPage = page)}
          />
        </DataTable>
      {:else if isLoading}
        <LoadingTable headers={proteinTableHeaders} rows={itemsPerPage} />
      {:else}
        <div class="card p-4">
          <h2 class="text-2xl font-bold">Error</h2>
          <p>{error.message}</p>
        </div>
      {/if}
    </div>
  </div>
</DataLoader>
