<!-- StructureViewer.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import ResourceLoader from "./ResourceLoader.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
  import exp from "constants";

  export let structureUrl: string = "";
  export let format: "cif" | "mmcif" | "pdb" = "pdb";
  export let binary: boolean = false;
  let className = "";
  export { className as class };

  let viewerElement: any;
  const dispatch = createEventDispatcher();

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
  $: if (structureUrl) {
    updateViewer();
  }

  $: if (viewerElement && viewerElement.viewerInstance) {
    dispatch("viewerReady", { highlightResidues, clearHighlight });
  }

  export function highlightResidues(
    residues: { start_residue_number: number; end_residue_number: number }[],
    color: { r: number; g: number; b: number },
  ) {
    console.log(viewerElement);
    if (viewerElement && viewerElement.viewerInstance) {
      console.log(
        residues.map((residue) => {
          return {
            ...residue,
            color,
            focus,
          };
        }),
      );
      viewerElement.viewerInstance.visual.select({
        data: residues.map((residue) => {
          return {
            ...residue,
            color,
            focus,
          };
        }),
      });
    }
  }

  export function clearHighlight() {
    if (viewerElement && viewerElement.viewerInstance) {
      viewerElement.viewerInstance.visual.clearSelection();
    }
  }
</script>

<ResourceLoader />
<ThemeSwitcher {viewerElement} />
<div class="molstarContainer {className}" {...$$restProps}>
  {#if structureUrl}
    <pdbe-molstar
      style="height: 100%; width: 100%;"
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
