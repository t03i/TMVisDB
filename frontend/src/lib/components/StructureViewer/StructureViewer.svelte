<!-- StructureViewer.svelte -->
<script lang="ts">
  import ResourceLoader from "./ResourceLoader.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";

  export let structureUrl: string = "";
  export let format: "cif" | "mmcif" | "pdb" = "pdb";
  export let binary: boolean = false;
  export let isLoading: boolean = false;
  export let error: string | null = null;
  let className = "";
  export { className as class };

  let viewerElement: any;

  // Function to update the viewer with new data
  function updateViewer() {
    if (viewerElement && structureUrl) {
      viewerElement.viewerInstance.visual.update({
        customData: {
          url: structureUrl,
          format: format,
          binary: binary,
        },
      });
    }
  }

  //Update viewer when structureUrl changes
  $: if (structureUrl && !isLoading && !error) {
    updateViewer();
  }
</script>

<ResourceLoader />
<ThemeSwitcher {viewerElement} />
<div class="molstarContainer {className}" {...$$restProps}>
  {#if isLoading}
    <!-- Loading state with an icon -->
    <div class="status">
      <!-- Loading icon -->
      <svg viewBox="0 0 50 50" class="icon">
        <!-- SVG content -->
      </svg>
      <p>Loading structure...</p>
    </div>
  {:else if error}
    <!-- Error state with an icon -->
    <div class="status error">
      <!-- Error icon -->
      <svg viewBox="0 0 24 24" class="icon">
        <!-- SVG content -->
      </svg>
      <p>Error: {error}</p>
    </div>
  {:else if structureUrl}
    <!-- Structure viewer -->
    <pdbe-molstar
      bind:this={viewerElement}
      custom-data-url={structureUrl}
      custom-data-format={format}
      custom-data-binary={binary}
      expanded={false}
      pdbe-logo={false}
      domain-annotation={true}
      hide-controls={true}
      sequence-panel={false}
    ></pdbe-molstar>
  {:else}
    <!-- No data available -->
    <div class="status">
      <p>No structure data available.</p>
    </div>
  {/if}
</div>

<style>
  .msp-layout {
    border: none !important;
  }
  .molstarContainer {
    position: relative;
    z-index: 2;
  }
</style>
