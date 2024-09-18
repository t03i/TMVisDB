<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    createGetProteinsByLineage,
    createGetRandomProteins,
  } from "$lib/client/tMVis";
  import { DataTable } from "svelte-simple-datatables";
  import FilterForm from "$lib/components/FilterForm.svelte";

  export let data;

  let isHydrated = data.isHydrated;
  let isFiltered = false;

  $: params = Object.fromEntries($page.url.searchParams);
  $: currentPage = parseInt(params.page || "1", 10);
  $: itemsPerPage = 20; // Adjust based on your API's default or desired value

  $: query = isFiltered
    ? createGetProteinsByLineage(
        params.lineage || "All",
        {
          ...params,
          page: currentPage,
          limit: itemsPerPage,
        },
        {
          enabled: isHydrated,
        },
      )
    : createGetRandomProteins(itemsPerPage, {
        enabled: isHydrated,
        initialData: data.initialProteins,
      });

  // DataTable settings
  let tableSettings = {
    sortable: true,
    pagination: {
      nav: true,
      summary: true,
      page: currentPage,
      itemsPerPage: itemsPerPage,
      totalItems: 0, // This will be updated when we get data
    },
    columnFilter: false,
    rowsPerPage: itemsPerPage,
  };

  onMount(() => {
    isHydrated = true;
  });

  function handleFilter(event) {
    isFiltered = true;
    goto(`?${new URLSearchParams({ ...params, page: "1" })}`);
  }

  function handleReset() {
    isFiltered = false;
    goto("?");
  }

  function handlePageChange(event) {
    const newPage = event.detail.page;
    goto(`?${new URLSearchParams({ ...params, page: newPage })}`);
  }

  $: if ($query.data) {
    tableSettings = {
      ...tableSettings,
      pagination: {
        ...tableSettings.pagination,
        totalItems: $query.data.totalCount, // Assuming your API returns the total count
      },
    };
  }
</script>

<FilterForm on:filter={handleFilter} />
<button on:click={handleReset}>Reset & Show Random</button>

{#if !isHydrated}
  <DataTable data={data.initialProteins} settings={tableSettings}>
    <!-- Table structure -->
  </DataTable>
{:else if $query.isLoading && !$query.data}
  <p>Loading...</p>
{:else if $query.error}
  <p>Error: {$query.error.message}</p>
{:else if $query.data}
  <DataTable
    data={$query.data.items}
    settings={tableSettings}
    on:pageChange={handlePageChange}
  >
    <thead>
      <tr>
        <th data-key="name">Name</th>
        <th data-key="uniprot_accession">Accession</th>
        <th data-key="seq_length">Length</th>
        <!-- Add more headers as needed -->
      </tr>
    </thead>
    <tbody>
      {#each $query.data.items as protein}
        <tr>
          <td>{protein.name}</td>
          <td>{protein.uniprot_accession}</td>
          <td>{protein.seq_length}</td>
          <!-- Add more cells as needed -->
        </tr>
      {/each}
    </tbody>
  </DataTable>
{/if}
