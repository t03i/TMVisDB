<!-- src/lib/comps/LoadingTable.svelte -->
<script lang="ts">
  import type { TableHeader } from "$lib/comps/Table";

  export let headers: TableHeader<any>[];
  export let rows: number = 5;

  function generateRowLayout(cols: number) {
    const layout = [];
    let remainingCols = cols;
    while (remainingCols > 0) {
      const span = Math.min(
        Math.floor(Math.random() * remainingCols) + 1,
        remainingCols,
      );
      layout.push(span);
      remainingCols -= span;
    }
    return layout;
  }

  $: tableLayout = Array(rows)
    .fill(null)
    .map(() => generateRowLayout(headers.length));
</script>

<table class="table table-hover table-compact w-full table-auto">
  <thead>
    <tr>
      {#each headers as header}
        <th>
          <div class="flex h-full items-center justify-start gap-x-2">
            {header.title}
          </div>
        </th>
      {/each}
    </tr>
    <tr>
      {#each headers as header}
        <th>
          <div class="placeholder mx-auto h-4 w-3/4 animate-pulse" />
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each tableLayout as row}
      <tr>
        {#each row as col}
          <td colspan={col}>
            <div class="placeholder animate-pulse" />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .placeholder {
    @apply h-4 w-full rounded bg-gray-300;
  }
</style>
