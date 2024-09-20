<script lang="ts">
  //Import local datatable components
  import ThSort from "$lib/components/table/ThSort.svelte";
  import ThFilter from "$lib/components/table/ThFilter.svelte";
  import Search from "$lib/components/table/Search.svelte";
  import RowsPerPage from "$lib/components/table/RowsPerPage.svelte";
  import RowCount from "$lib/components/table/RowCount.svelte";
  import Pagination from "$lib/components/table/Pagination.svelte";

  import { DataHandler } from "@vincjo/datatables";

  export let handler: DataHandler;
  const rows = handler.getRows();
</script>

<div class=" overflow-x-auto space-y-4">
  <!-- Header -->
  <header class="flex justify-between gap-4">
    <Search {handler} />
    <RowsPerPage {handler} />
  </header>
  <!-- Table -->
  <table class="table table-hover table-compact w-full table-auto">
    <thead>
      <tr>
        <ThSort {handler} orderBy="first_name">First name</ThSort>
        <ThSort {handler} orderBy="last_name">Last name</ThSort>
        <ThSort {handler} orderBy="email">Email</ThSort>
      </tr>
      <tr>
        <ThFilter {handler} filterBy="first_name" />
        <ThFilter {handler} filterBy="last_name" />
        <ThFilter {handler} filterBy="email" />
      </tr>
    </thead>
    <tbody>
      {#each $rows as row}
        <tr>
          <td>{row.first_name}</td>
          <td>{row.last_name}</td>
          <td>{row.email}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <!-- Footer -->
  <footer class="flex justify-between">
    <RowCount {handler} />
    <Pagination {handler} />
  </footer>
</div>
