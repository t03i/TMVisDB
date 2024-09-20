<script lang="ts">
  //Import local datatable components

  import { onMount } from "svelte";
  import type { Readable } from "svelte/store";
  import { DataHandler } from "@vincjo/datatables";

  import ThSort from "$lib/components/table/ThSort.svelte";
  import ThFilter from "$lib/components/table/ThFilter.svelte";
  import Search from "$lib/components/table/Search.svelte";
  import RowCount from "$lib/components/table/RowCount.svelte";
  import Pagination from "$lib/components/table/Pagination.svelte";

  import type { ProteinInfo, ProteinResponse } from "$lib/client/model";

  export let data: ProteinResponse;

  $: handler = new DataHandler<ProteinInfo>(data.items, {
    rowsPerPage: 20,
  });

  $: rows = handler.getRows();
</script>

<div class=" overflow-x-auto space-y-4">
  <!-- Header -->
  <header class="flex justify-between gap-4">
    <Search {handler} />
  </header>
  <!-- Table -->
  <table class="table table-hover table-compact w-full table-auto">
    <thead>
      <tr>
        <ThSort {handler} orderBy="uniprot_id">UniprotKB ID</ThSort>
        <ThSort {handler} orderBy="seq_length">Sequence Length</ThSort>
        <ThSort {handler} orderBy="super_kingdom">Domain</ThSort>
        <ThSort {handler} orderBy="clade">Kingdom</ThSort>
        <ThSort {handler} orderBy="name">Organism</ThSort>
        <ThSort {handler} orderBy="has_alpha_helix">Alpha</ThSort>
        <ThSort {handler} orderBy="has_beta_strand">Beta</ThSort>
        <ThSort {handler} orderBy="has_signal">Signal</ThSort>
        <ThSort {handler} orderBy="tm_helix_count">#Alpha</ThSort>
        <ThSort {handler} orderBy="tm_strand_count">#Beta</ThSort>
        <ThSort {handler} orderBy="signal_count">#Signal</ThSort>
      </tr>
      <tr>
        <ThFilter {handler} filterBy="uniprot_id" />
        <ThFilter {handler} filterBy="seq_length" />
        <ThFilter {handler} filterBy="super_kingdom" />
        <ThFilter {handler} filterBy="clade" />
        <ThFilter {handler} filterBy="name" />
        <ThFilter {handler} filterBy="has_alpha_helix" />
        <ThFilter {handler} filterBy="has_beta_strand" />
        <ThFilter {handler} filterBy="has_signal" />
        <ThFilter {handler} filterBy="tm_helix_count" />
        <ThFilter {handler} filterBy="tm_strand_count" />
        <ThFilter {handler} filterBy="signal_count" />
      </tr>
    </thead>
    <tbody>
      {#each $rows as row}
        <tr>
          <td>{row.uniprot_id}</td>
          <td>{row.seq_length}</td>
          <td>{row.super_kingdom}</td>
          <td>{row.clade}</td>
          <td>{row.name}</td>
          <td>{row.has_alpha_helix ? "Yes" : "No"}</td>
          <td>{row.has_beta_strand ? "Yes" : "No"}</td>
          <td>{row.has_signal ? "Yes" : "No"}</td>
          <td>{row.tm_helix_count}</td>
          <td>{row.tm_strand_count}</td>
          <td>{row.signal_count}</td>
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
