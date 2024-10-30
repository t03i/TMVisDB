<!-- StructureViewer.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy, tick} from "svelte";
  import { modeCurrent } from "@skeletonlabs/skeleton";
  import ResourceLoader from "./ResourceLoader.svelte";
  import type { StructureSelectionQuery } from "./index";
  import type { RGB } from "$lib/utils";

  export let structureUrl: string = "";
  export let format: "cif" | "mmcif" | "pdb" = "pdb";
  export let binary: boolean = false;
  let className = "";
  export { className as class };

  let viewerElement: any;
  let isViewerAvailable = false;
  let bgColorR = 255;
  let bgColorG = 255;
  let bgColorB = 255;
  let modeUnsubscribe: () => void;

  const dispatch = createEventDispatcher();

  // Function to extract and parse the background color
  function getBackgroundColor() {
    const parentElement = viewerElement?.parentElement;

    if (parentElement) {
      const computedStyle = getComputedStyle(parentElement);
      let bgColor = computedStyle.backgroundColor;

      if (!bgColor || bgColor === "transparent" || bgColor === "rgba(0, 0, 0, 0)") {
        bgColor = getComputedStyle(document.body).backgroundColor;
      }

      const rgbValues = bgColor.match(/\d+/g)?.map(Number);
      if (rgbValues && rgbValues.length >= 3) {
        [bgColorR, bgColorG, bgColorB] = rgbValues;
      }
    }
  }

  async function updateBackground() {
    if (viewerElement?.viewerInstance?.canvas) {
      getBackgroundColor();
      viewerElement.viewerInstance.canvas.setBgColor({
        r: bgColorR,
        g: bgColorG,
        b: bgColorB,
      });
    }
  }

  let loadCompleteSubscription: any;
  let observer: MutationObserver;

  onMount(() => {
    // Subscribe to mode changes
    modeUnsubscribe = modeCurrent.subscribe(async () => {
      if (isViewerAvailable) {
        await tick();
        updateBackground();
      }
    });

    // Create mutation observer to watch for viewer instance
    observer = new MutationObserver((mutations) => {
      if (viewerElement?.viewerInstance?.canvas && viewerElement?.viewerInstance?.plugin) {
        observer.disconnect();

        // Component is already loaded if we have canvas and events
        isViewerAvailable = true;
        dispatch('viewerReady');
        updateBackground();
      }
    });

    // Start observing with configuration
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  });

  onDestroy(() => {
    if (modeUnsubscribe) {
      modeUnsubscribe();
    }
    if (observer) {
      observer.disconnect();
    }
  });

  // Export methods for external use
  export async function select(
    residues: StructureSelectionQuery[],
    color: RGB,
    nonSelectedColor?: RGB,
    structureId?: string,
    structureNumber?: number,
    keepColors?: boolean,
    keepRepresentations?: boolean
  ) {
    if (isViewerAvailable) {
      await viewerElement.viewerInstance.visual.select({
        data: residues.map((residue) => ({
          ...residue,
          color,
          focus: true,
        })),
        nonSelectedColor,
        structureId,
        structureNumber,
        keepColors,
        keepRepresentations
      });
    }
  }

  export async function highlight(
    residues: StructureSelectionQuery[],
    color?: RGB,
    focus?: boolean,
    structureId?: string,
    structureNumber?: number
  ) {
    if (isViewerAvailable) {
      return await viewerElement.viewerInstance.visual.highlight({
        data: residues,
        color,
        focus,
        structureId,
        structureNumber
      });
    }
  }

  export async function clearHighlight() {
    if (isViewerAvailable) {
      return await viewerElement.viewerInstance.visual.clearHighlight();
    }
  }

  export async function clearSelection() {
    if (isViewerAvailable) {
      await viewerElement.viewerInstance.visual.clearSelection();
    }
  }
</script>

<ResourceLoader />
<div class="z-2 {className}" {...$$restProps}>
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
  :global(.msp-layout) {
    border: none !important;
  }
  :global(.msp-viewport) {
    @apply card;
  }
</style>
