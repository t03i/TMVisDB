<script lang="ts">
  import {
    KEY_TO_DISPLAY_NAME,
    type StructureSelectionData,
  } from "$lib/annotations";
  import {
    StructureViewerState,
    type AnnotationProvider,
  } from "$lib/stores/StructureMarksStore";

  export let annotationStructureSelection: StructureSelectionData | null;
  export let structureState: StructureViewerState;
  let activeSourceDB: AnnotationProvider | null = null;

  // Get available source databases from track data
  $: availableSourceDBs = annotationStructureSelection
    ? (Object.keys(annotationStructureSelection) as AnnotationProvider[])
    : [];

  // Set default source DB to TMbed if available, otherwise first available
  $: if (availableSourceDBs.length > 0 && !activeSourceDB) {
    const tmbed = availableSourceDBs.find((db) => db.toLowerCase() === "tmbed");
    activeSourceDB = tmbed || availableSourceDBs[0];
    if (structureState) structureState.setSourceDB(activeSourceDB);
  }

  function handleSelectionChange(event: Event) {
    if (!structureState) return;
    const select = event.target as HTMLSelectElement;
    const value = select.value as AnnotationProvider | "";
    const newSourceDB = value === "" ? null : value;
    structureState.setSourceDB(newSourceDB);
    activeSourceDB = newSourceDB;
  }
</script>

{#if availableSourceDBs.length > 0}
  <div class="absolute left-1/2 top-4 z-10 w-1/6 -translate-x-1/2">
    <select
      class="select text-center text-xs"
      value={activeSourceDB ?? ""}
      on:change={handleSelectionChange}
    >
      <option value="alphafold">pLDDT View</option>
      {#each availableSourceDBs as sourceDB}
        <option value={sourceDB}>{KEY_TO_DISPLAY_NAME[sourceDB]}</option>
      {/each}
    </select>
  </div>
{/if}
