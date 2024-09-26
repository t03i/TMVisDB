<script lang="ts">
  export let currentPage: number;
  export let pageSize: number;
  export let totalItems: number;

  $: startRow = (currentPage - 1) * pageSize + 1;
  $: endRow = Math.min(currentPage * pageSize, totalItems);
</script>

<aside class="text-sm leading-8 mr-6">
  {#if totalItems > 0}
    <b>{startRow}</b>
    - <b>{endRow}</b>
    / <b>{totalItems}</b>
  {:else}
    No entries found
  {/if}
</aside>
