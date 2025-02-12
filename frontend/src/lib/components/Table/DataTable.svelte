<!-- src/lib/components/ProteinDatatable.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { DataHandler } from "@vincjo/datatables";
  import type { Readable } from "svelte/store";

  import ThSort from "./ThSort.svelte";
  import ThFilter from "./ThFilter.svelte";
  import ThBoolFilter from "./ThBoolFilter.svelte";
  import Search from "./Search.svelte";
  import TableFooter from "./PaginationFooter.svelte";
  import type { TableHeader } from "$lib/components/Table";
  import DownloadCsv from "./DownloadCSV.svelte";

  export let data: any[];
  export let headers: TableHeader<any>[];
  export let currentPage: number;

  export let onRowClick: (row: any) => void = () => {};

  let handler: DataHandler<any>;
  let rows: Readable<any[]>;
  onMount(() => {
    handler = new DataHandler<any>([], {});
    rows = handler.getRows();
  });

  $: if (handler && data) {
    handler.setRows(data);
  }
</script>

{#if handler}
  <div class="space-y-4 overflow-x-auto">
    <header class="flex justify-between gap-4">
      <Search {handler} />
      <DownloadCsv {data} {headers} {currentPage} />
    </header>
    <table class="table table-hover table-compact w-full table-auto">
      <thead>
        <tr>
          {#each headers as header}
            <ThSort {handler} orderBy={header.key}>{header.title}</ThSort>
          {/each}
        </tr>
        <tr>
          {#each headers as header}
            {#if header.filterType === "boolean"}
              <ThBoolFilter {handler} filterBy={header.key} />
            {:else}
              <ThFilter {handler} filterBy={header.key} />
            {/if}
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $rows as row}
          <tr on:click={() => onRowClick(row)} class="cursor-pointer">
            {#each headers as header}
              <td>
                {@html header.format(row)}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
{/if}
