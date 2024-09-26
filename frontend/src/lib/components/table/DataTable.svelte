<!-- src/lib/components/ProteinDatatable.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { DataHandler } from "@vincjo/datatables";
  import type { Readable } from "svelte/store";
  import { goto } from "$app/navigation";

  import ThSort from "$lib/components/table/ThSort.svelte";
  import ThFilter from "$lib/components/table/ThFilter.svelte";
  import ThBoolFilter from "$lib/components/table/ThBoolFilter.svelte";
  import Search from "$lib/components/table/Search.svelte";

  import type { TableHeader } from "$lib/components/table";

  export let data: any[];
  export let headers: TableHeader<any>[];
  export let rowsPerPage: number = 20;
  export let onRowClick: (row: any) => void = () => {};

  let handler: DataHandler<any>;
  let rows: Readable<any[]>;

  onMount(() => {
    handler = new DataHandler([], {
      rowsPerPage,
    });
    rows = handler.getRows();
  });

  $: if (handler && data) {
    handler.setRows(data);
  }
</script>

{#if handler}
  <div class="overflow-x-auto space-y-4">
    <header class="flex justify-between gap-4">
      <Search {handler} />
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
    <slot name="footer"></slot>
  </div>
{/if}
