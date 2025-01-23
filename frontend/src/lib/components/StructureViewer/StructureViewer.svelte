<!-- StructureViewer.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { modeCurrent } from "@skeletonlabs/skeleton";
  import ResourceLoader from "./ResourceLoader.svelte";
  import { MolstarWrapper } from "./MolstarWrapper";
  import type { StructureViewerState } from "$lib/stores/StructureMarksStore";

  export let structureUrl: string = "";
  export let format: "cif" | "mmcif" | "pdb" = "pdb";
  export let binary: boolean = false;
  export let state: StructureViewerState;
  let className = "";
  export { className as class };

  let viewerElement: any;
  let molstarWrapper: MolstarWrapper;

  let modeUnsubscribe: () => void;
  let highlightUnsubscribe: () => void;
  let selectionUnsubscribe: () => void;

  const dispatch = createEventDispatcher();

  onMount(() => {
    molstarWrapper = new MolstarWrapper(viewerElement);

    modeUnsubscribe = modeCurrent.subscribe(async () => {
      await molstarWrapper.updateBackground();
    });

    highlightUnsubscribe = state.highlightStore.subscribe(async (state) => {
      await molstarWrapper.updateHighlightState(state);
    });

    selectionUnsubscribe = state.selectionStore.subscribe(async (state) => {
      await molstarWrapper.updateSelectionState(state);
    });

    molstarWrapper.whenReady().then(() => {
      dispatch("viewerReady");
      molstarWrapper.updateBackground();
    });
  });

  onDestroy(() => {
    highlightUnsubscribe?.();
    selectionUnsubscribe?.();
    modeUnsubscribe?.();
  });
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
      alphafold-view={true}
    ></pdbe-molstar>
  {/if}
</div>
