<script lang="ts">
  import type { DBReferences } from "$lib/annotations";
  import { SOURCE_DATABASES } from "$lib/annotations";

  export let dbReferences: DBReferences;
</script>

<div {...$$restProps}>
  <div
    class="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4 justify-items-start"
  >
    {#each SOURCE_DATABASES as dbName}
      <div class="flex item mt-1">
        <span class="mr-2">{dbName}</span>
        {#if dbReferences && dbReferences[dbName]}
          <span class="badge variant-filled-success">
            {#if dbReferences[dbName].url}
              <a
                href={dbReferences[dbName].url}
                class="ml-1"
                target="_blank"
                rel="noopener"
              >
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
