<script lang="ts">
  export let height: number = 50;
  export let numTracks: number = 3; // Default number of tracks to show while loading
</script>

<div class="mx-auto h-full w-full max-w-7xl p-5">
  <div class="col-span-2 lg:col-span-1">
    <div class="grid w-full grid-cols-1 gap-x-2 lg:grid-cols-[1fr,11fr]">
      <div class="text-mono justify-self-end leading-none"></div>
      <div class="relative leading-none">
        <div class="placeholder animate-pulse h-{height}px mb-4 w-full"></div>
      </div>

      {#each Array(numTracks) as _, index}
        <div
          class="hidden justify-self-end font-mono text-base leading-none lg:block"
        >
          <div class="placeholder h-4 w-20 animate-pulse"></div>
        </div>
        <div class="relative leading-none">
          <div class="placeholder animate-pulse h-{height}px mb-4 w-full"></div>
        </div>
      {/each}

      <div class="text-mono justify-self-end leading-none"></div>
      <div class="relative leading-none">
        <div class="placeholder animate-pulse h-{height}px w-full"></div>
      </div>
    </div>
    <div
      class="text-mono leading-1 mt-5 justify-self-start text-[8pt] lg:col-span-2 lg:text-base"
    >
      <div class="placeholder h-4 w-2/3 animate-pulse"></div>
    </div>
  </div>
</div>
