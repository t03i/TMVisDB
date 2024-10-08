<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import DataLoader from "$lib/components/DataLoader.svelte";
  import { FilterForm, FilterFormLoading } from "$lib/components/FilterForm";
  import { DataTable, LoadingTable, TableFooter } from "$lib/components/Table";
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
  initialData={data.initialProteins}
  pageSize={itemsPerPage}
  {currentPage}
  let:data={proteinResponse}
  let:isSuccessful
  let:isLoading
  let:error
>
  <div class="flex flex-col gap-4 mx-8 my-8">
    <div class="card">
      <FilterFormLoading {isLoading}>
        <FilterForm />
      </FilterFormLoading>
    </div>
    <div class="card p-2">
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
