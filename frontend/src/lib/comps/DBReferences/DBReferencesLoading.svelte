<script lang="ts">
  import { getEmptyDBReferenceViewItems } from "$lib/annotations";
  import { ProgressRadial } from "@skeletonlabs/skeleton";

  const viewItems = getEmptyDBReferenceViewItems();
</script>

<div {...$$restProps}>
  <div
    class="flex flex-col justify-items-start gap-2 md:flex-row md:flex-wrap md:gap-4"
  >
    {#each viewItems as item}
      <div class="mt-1 flex items-center">
        <span class="mr-2">{item.displayName}</span>
        <ProgressRadial
          value={undefined}
          stroke={80}
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
          strokeLinecap="butt"
          class="h-4 w-4 justify-self-center"
        />
      </div>
    {/each}
  </div>
</div>
