<!-- StructureViewer.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy, tick} from "svelte";
  import { modeCurrent } from "@skeletonlabs/skeleton";
  import ResourceLoader from "./ResourceLoader.svelte";
  import type { StructureSelectionQuery } from "./index";
  import { structureHighlight, structureSelection } from '$lib/stores/StructureMarksStore';
  import type { RGB } from "$lib/utils";

  export let structureUrl: string = "";
  export let format: "cif" | "mmcif" | "pdb" = "pdb";
  export let binary: boolean = false;
  let className = "";
  export { className as class };

  let viewerElement: any;
  let isViewerAvailable = false;

  let modeUnsubscribe: () => void;
  let highlightUnsubscribe: () => void;
  let selectionUnsubscribe: () => void;

  const dispatch = createEventDispatcher();

  function getBackgroundColor(): RGB {
    const parentElement = viewerElement?.parentElement;
    let bgColor = 'rgb(255, 255, 255)';

    if (parentElement) {
      const computedStyle = getComputedStyle(parentElement);
      bgColor = computedStyle.backgroundColor;

      if (!bgColor || bgColor === "transparent" || bgColor === "rgba(0, 0, 0, 0)") {
        bgColor = getComputedStyle(document.body).backgroundColor;
      }
    }

    const rgbValues = bgColor.match(/\d+/g)?.map(Number) ?? [255, 255, 255];
    return {
      r: rgbValues[0],
      g: rgbValues[1],
      b: rgbValues[2]
    };
  }

  async function updateBackground() {
    if (viewerElement?.viewerInstance?.canvas) {
      viewerElement.viewerInstance.canvas.setBgColor(getBackgroundColor());
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

    highlightUnsubscribe = structureHighlight.subscribe(async (state) => {
      if (!state) {
        await clearHighlight();
        return;
      }

      const { residues, color, focus, structureId, structureNumber } = state;
      await highlight(residues, color, focus, structureId, structureNumber);
    });

    // Handle selection
    selectionUnsubscribe = structureSelection.subscribe(async (state) => {
      if (!state) {
        await clearSelection();
        return;
      }

      const {
        residues,
        color,
        nonSelectedColor,
        structureId,
        structureNumber,
        keepColors,
        keepRepresentations
      } = state;

      await select(
        residues,
        color,
        nonSelectedColor,
        structureId,
        structureNumber,
        keepColors,
        keepRepresentations
      );
    });

  });

  onDestroy(() => {
    highlightUnsubscribe?.();
    selectionUnsubscribe?.();
    modeUnsubscribe?.();
    observer?.disconnect();

  });

  async function select(
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

  async function highlight(
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

  async function clearHighlight() {
    if (isViewerAvailable) {
      return await viewerElement.viewerInstance.visual.clearHighlight();
    }
  }

  async function clearSelection() {
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
