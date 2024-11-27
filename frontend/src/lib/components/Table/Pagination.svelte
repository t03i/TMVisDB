<script lang="ts">
  import { get } from "svelte/store";
  import type { Pagination as PaginationType } from "$lib/stores/DataQueryStore";

  export let pagination: PaginationType | null;
</script>

<section class="flex h-10 items-center justify-center gap-2">
  {#if pagination}
    <button
      type="button"
      class="variant-ghost-surface hover:variant-soft-primary btn"
      disabled={!get(pagination.canGoBack)}
      on:click={() => pagination.goBack()}
    >
      ←
    </button>
    <span class="min-w-[3ch] text-center">
      {get(pagination.currentPage) }
    </span>
    <button
      type="button"
      class="variant-ghost-surface hover:variant-soft-primary btn"
      disabled={!get(pagination.canGoForward)}
      on:click={() => pagination.goForward()}
    >
      →
    </button>
  {:else}
    <div class="invisible">←</div>
    <span class="min-w-[3ch] text-center">-</span>
    <div class="invisible">→</div>
  {/if}
</section>
