<script lang="ts">
  export let height: number = 50;
  export let numTracks: number = 3; // Default number of tracks to show while loading
</script>

<div class="w-full max-w-7xl mx-auto p-5 h-full">
  <div class="col-span-2 lg:col-span-1">
    <div class="grid grid-cols-1 gap-x-2 lg:grid-cols-[1fr,11fr] w-full">
      <div class="text-mono leading-none justify-self-end"></div>
      <div class="leading-none relative">
        <div class="placeholder animate-pulse h-{height}px w-full mb-4"></div>
      </div>

      {#each Array(numTracks) as _, index}
        <div
          class="font-mono text-base justify-self-end leading-none hidden lg:block"
        >
          <div class="placeholder animate-pulse h-4 w-20"></div>
        </div>
        <div class="leading-none relative">
          <div class="placeholder animate-pulse h-{height}px w-full mb-4"></div>
        </div>
      {/each}

      <div class="text-mono leading-none justify-self-end"></div>
      <div class="leading-none relative">
        <div class="placeholder animate-pulse h-{height}px w-full"></div>
      </div>
    </div>
    <div
      class="text-mono text-[8pt] lg:text-base leading-1 mt-5 justify-self-start lg:col-span-2"
    >
      <div class="placeholder animate-pulse h-4 w-2/3"></div>
    </div>
  </div>
</div>
