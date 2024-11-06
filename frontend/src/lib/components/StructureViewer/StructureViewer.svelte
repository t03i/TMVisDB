<!-- StructureViewer.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy, tick} from "svelte";
  import { get } from "svelte/store";

  import { modeCurrent } from "@skeletonlabs/skeleton";
  import ResourceLoader from "./ResourceLoader.svelte";
  import type { StructureSelectionQuery,  HighlightState,  SelectionState, StructureViewerState } from '$lib/stores/StructureMarksStore';
  import type { RGB } from "$lib/utils";

  export let structureUrl: string = "";
  export let format: "cif" | "mmcif" | "pdb" = "pdb";
  export let binary: boolean = false;
  export let state: StructureViewerState;
  let className = "";
  export { className as class };


  let viewerElement: any;
  let isViewerAvailable = false;

  let modeUnsubscribe: () => void;
  let highlightUnsubscribe: () => void;
  let selectionUnsubscribe: () => void;
  let observer: MutationObserver;

  const dispatch = createEventDispatcher();

  onMount(async () => {
    // Subscribe to mode changes
    modeUnsubscribe = modeCurrent.subscribe(async () => {
      if (isViewerAvailable) {
        await tick();
        await updateBackground();
      }
    });

    // Create mutation observer to watch for viewer instance
    observer = new MutationObserver(async (mutations) => {
      if (viewerElement?.viewerInstance) {
        observer.disconnect();
        viewerElement.viewerInstance.events.loadComplete.subscribe((success: boolean) => {
        if (success) {
          isViewerAvailable = true;
          dispatch('viewerReady');
          updateBackground();
          updateSelection(get(state.selectionStore));
        }
      });
      }
    });

    // Start observing with configuration
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    highlightUnsubscribe = state.highlightStore.subscribe(async (state) => {
      await updateHighlight(state);
    });

    selectionUnsubscribe = state.selectionStore.subscribe(async (state) => {
      await updateSelection(state);
    });
  });

  onDestroy(() => {
    highlightUnsubscribe?.();
    selectionUnsubscribe?.();
    modeUnsubscribe?.();
    observer?.disconnect();
  });

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

  async function updateSelection(state: SelectionState | null ){
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
        residues as StructureSelectionQuery[],
        color,
        nonSelectedColor,
        structureId,
        structureNumber,
        keepColors,
        keepRepresentations
      );
  }

  async function updateHighlight(state: HighlightState | null ){
    if (!state) {
        await clearHighlight();
        return;
      }

      const { residues, color, focus, structureId, structureNumber } = state;
      await highlight(residues, color, focus, structureId, structureNumber);
  }

  async function select(
    residues: StructureSelectionQuery[],
    color: RGB | undefined | null,
    nonSelectedColor?: RGB | undefined | null,
    structureId?: string,
    structureNumber?: number,
    keepColors?: boolean,
    keepRepresentations?: boolean
  ) {
    if (isViewerAvailable) {
      await viewerElement.viewerInstance.visual.select({
        data: residues,
        color,
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
    color?: RGB | undefined | null,
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
      await viewerElement.viewerInstance.visual.clearSelection({
        keepColors: false,
        keepRepresentations: true
      });
    }
  }
</script>

<ResourceLoader />
<div class="z-4 {className}" {...$$restProps}>
  {#if structureUrl}
    <pdbe-molstar
      style="height: 100%; width: 100%; z-index: 4;"
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
