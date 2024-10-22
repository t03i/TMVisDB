<script lang="ts">
  import { type DBReferences, getDBReferenceViewItems } from "$lib/annotations";

  export let dbReferences: DBReferences;
  $: viewItems = getDBReferenceViewItems(dbReferences);
</script>

<div {...$$restProps}>
  <div
    class="flex flex-col justify-items-start gap-2 md:flex-row md:flex-wrap md:gap-4"
  >
    {#each viewItems as item}
      <div class="item mt-1 flex">
        <span class="mr-2">{item.displayName}</span>
        {#if item.isPresent}
          <span class="variant-filled-success badge">
            {#if item.url}
              <a href={item.url} class="ml-1" target="_blank" rel="noopener">
                Yes
                <iconify-icon icon="line-md:external-link"></iconify-icon>
              </a>
            {:else}
              Yes
            {/if}
          </span>
        {:else}
          <span class="variant-filled-error badge">No</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
