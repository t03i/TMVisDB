<script lang="ts">
  import { derived, writable } from "svelte/store";

  export let currentPage: number;
  export let pageSize: number;
  export let totalItems: number;
  export let onSetPage: (page: number) => void;
  export let loading = false;

  type PageItem = number | "...";
  let totalPages = 0;

  $: if (totalItems && pageSize) {
    totalPages = totalItems % pageSize === 0 ? totalItems / pageSize : Math.floor(totalItems / pageSize) + 1;
  }

  $: pages = getPages(totalPages, currentPage);

  function getPages(total: number, current: number): PageItem[] {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const result: PageItem[] = [];

    // Always add first page
    result.push(1);

    // Add dots if there's a gap before current
    if (current > 3) {
      result.push("...");
    }

    // Add previous, current, and next pages (if they exist)
    if (current > 2) result.push(current - 1);
    if (current !== 1 && current !== total) result.push(current);
    if (current < total - 1) result.push(current + 1);

    // Add dots if there's a gap after current
    if (current < total - 2) {
      result.push("...");
    }

    // Always add last page
    if (total > 1) {
      result.push(total);
    }

    return result;
  }
</script>

<!-- Desktop buttons -->
<section
  class="variant-ghost-surface btn-group hidden h-10 lg:flex [&>*+*]:border-surface-500"
>
  <button
    type="button"
    class="button hover:variant-soft-primary"
    disabled={currentPage === 1 || loading}
    on:click={() => onSetPage(currentPage - 1)}
  >
    {#if loading}
      <span class="animate-pulse">←</span>
    {:else}
      ←
    {/if}
  </button>
  {#each pages as page}
    {#if page === "..."}
      <button type="button" class="hover:variant-soft-primary" disabled>...</button>
    {:else}
      <button
        type="button"
        class:hover:variant-soft-primary={currentPage !== page}
        class:hover:variant-filled-primary={currentPage === page}
        class:variant-filled-primary={currentPage === page}
        disabled={loading}
        on:click={() => onSetPage(page)}
      >
        {page}
      </button>
    {/if}
  {/each}
  <button
    type="button"
    class="hover:variant-soft-primary"
    disabled={currentPage === totalPages || loading}
    on:click={() => onSetPage(currentPage + 1)}
  >
    {#if loading}
      <span class="animate-pulse">→</span>
    {:else}
      →
    {/if}
  </button>
</section>

<!-- Mobile buttons -->
<section class="flex lg:hidden">
  <button
    type="button"
    class="variant-ghost-surface btn mb-2 mr-2 hover:variant-soft-primary"
    disabled={currentPage === 1 || loading}
    on:click={() => onSetPage(currentPage - 1)}
  >
    {#if loading}
      <span class="animate-pulse">←</span>
    {:else}
      ←
    {/if}
  </button>
  <span class="my-auto flex-grow text-center">
    {#if loading}
      <span class="animate-pulse">Loading...</span>
    {:else}
      Page {currentPage} of {totalPages}
    {/if}
  </span>
  <button
    type="button"
    class="variant-ghost-surface btn mb-2 hover:variant-soft-primary"
    disabled={currentPage === totalPages || loading}
    on:click={() => onSetPage(currentPage + 1)}
  >
    {#if loading}
      <span class="animate-pulse">→</span>
    {:else}
      →
    {/if}
  </button>
</section>
