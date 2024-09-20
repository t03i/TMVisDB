<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  export let columns: number = 3;
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
    .map(() => generateRowLayout(columns));
</script>

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
