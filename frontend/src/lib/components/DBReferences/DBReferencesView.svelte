<script lang="ts">
  import { type DBReferences, getDBReferenceViewItems } from "$lib/annotations";

  export let dbReferences: DBReferences;
  $: viewItems = getDBReferenceViewItems(dbReferences);
</script>

<div {...$$restProps}>
  <div
    class="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4 justify-items-start"
  >
    {#each viewItems as item}
      <div class="flex item mt-1">
        <span class="mr-2">{item.displayName}</span>
        {#if item.isPresent}
          <span class="badge variant-filled-success">
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
          <span class="badge variant-filled-error">No</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
