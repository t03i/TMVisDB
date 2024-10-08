<script lang="ts">
  import { getEmptyDBReferenceViewItems } from "$lib/annotations";
  import { ProgressRadial } from "@skeletonlabs/skeleton";

  const viewItems = getEmptyDBReferenceViewItems();
</script>

<div {...$$restProps}>
  <div
    class="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4 justify-items-start"
  >
    {#each viewItems as item}
      <div class="flex mt-1 items-center">
        <span class="mr-2">{item.displayName}</span>
        <ProgressRadial
          value={undefined}
          stroke={80}
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
          strokeLinecap="butt"
          class="justify-self-center w-4 h-4"
        />
      </div>
    {/each}
  </div>
</div>
