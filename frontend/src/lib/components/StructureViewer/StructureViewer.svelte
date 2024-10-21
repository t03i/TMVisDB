<!-- StructureViewer.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import ResourceLoader from "./ResourceLoader.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";

  export let structureUrl: string = "";
  export let format: "cif" | "mmcif" | "pdb" = "pdb";
  export let binary: boolean = false;
  let className = "";
  export { className as class };

  let viewerElement: any;
  const dispatch = createEventDispatcher();
  let isViewerReady = false;

  function checkViewerReady() {
    return (
      viewerElement &&
      viewerElement.viewerInstance &&
      viewerElement.viewerInstance.visual &&
      typeof viewerElement.viewerInstance.visual.select === "function" &&
      typeof viewerElement.viewerInstance.visual.clearSelection === "function"
    );
  }

  function pollViewerReady(
    callback: () => void,
    interval = 100,
    timeout = 10000,
  ) {
    const start = Date.now();
    const poll = () => {
      if (checkViewerReady()) {
        callback();
      } else if (Date.now() - start < timeout) {
        setTimeout(poll, interval);
      } else {
        console.error("Viewer failed to initialize within the timeout period");
      }
    };
    poll();
  }

  onMount(() => {
    pollViewerReady(() => {
      dispatch("viewerReady", { highlightResidues, clearHighlight });
    });
  });

  export function highlightResidues(
    residues: { start_residue_number: number; end_residue_number: number }[],
    color: { r: number; g: number; b: number },
  ) {
    if (isViewerReady) {
      viewerElement.viewerInstance.visual.select({
        data: residues.map((residue) => ({
          ...residue,
          color,
          focus: true,
        })),
      });
    }
  }

  export function clearHighlight() {
    if (isViewerReady) {
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
