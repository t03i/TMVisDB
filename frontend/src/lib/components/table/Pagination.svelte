<script lang="ts">
  import { derived, writable } from "svelte/store";

  export let currentPage: number;
  export let pageSize: number;
  export let totalItems: number;
  export let onSetPage: (page: number) => void;

  type PageItem = number | "...";
  let totalPages = 0;

  $: if (totalItems && pageSize) {
    totalPages = Math.ceil(totalItems / pageSize);
  }

  const maxPagesToShow = 5;

  $: pages = getPages(totalPages, currentPage, maxPagesToShow);

  function getPages(total: number, current: number, max: number): PageItem[] {
    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const halfMax = Math.floor(max / 2);
    const leftOffset = Math.min(
      Math.max(current - halfMax, 1),
      Math.max(total - max + 1, 1),
    );
    const rightOffset = Math.min(leftOffset + max - 1, total);

    const result: PageItem[] = [];
    for (let i = leftOffset; i <= rightOffset; i++) {
      if ((i === leftOffset && i !== 1) || (i === rightOffset && i !== total)) {
        result.push("...");
      }
      result.push(i);
    }

    if (leftOffset > 2) {
      result.unshift("...", 1);
    } else if (leftOffset === 2) {
      result.unshift(1);
    }

    if (rightOffset < total - 1) {
      result.push("...", total);
    } else if (rightOffset === total - 1) {
      result.push(total);
    }

    return result;
  }
</script>

<!-- Desktop buttons -->
<section
  class="btn-group variant-ghost-surface [&>*+*]:border-surface-500 h-10 hidden lg:flex"
>
  <button
    type="button"
    class="button hover:variant-soft-primary"
    disabled={currentPage === 1}
    on:click={() => onSetPage(currentPage - 1)}
  >
    ←
  </button>
  {#each pages as page}
    {#if page === "..."}
      <button type="button" class="hover:variant-soft-primary" disabled
        >...</button
      >
    {:else}
      <button
        type="button"
        class:hover:variant-soft-primary={currentPage !== page}
        class:hover:variant-filled-primary={currentPage === page}
        class:variant-filled-primary={currentPage === page}
        on:click={() => onSetPage(page)}
      >
        {page}
      </button>
    {/if}
  {/each}
  <button
    type="button"
    class="hover:variant-soft-primary"
    disabled={currentPage === totalPages}
    on:click={() => onSetPage(currentPage + 1)}
  >
    →
  </button>
</section>

<!-- Mobile buttons -->
<section class="flex lg:hidden">
  <button
    type="button"
    class="btn variant-ghost-surface mr-2 mb-2 hover:variant-soft-primary"
    disabled={currentPage === 1}
    on:click={() => onSetPage(currentPage - 1)}
  >
    ←
  </button>
  <span class="flex-grow text-center my-auto">
    Page {currentPage} of {totalPages}
  </span>
  <button
    type="button"
    class="btn variant-ghost-surface mb-2 hover:variant-soft-primary"
    disabled={currentPage === totalPages}
    on:click={() => onSetPage(currentPage + 1)}
  >
    →
  </button>
</section>
