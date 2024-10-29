<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    KEY_TO_DISPLAY_NAME,
    type SourceDB,
    type StructureSelectionData,
  } from "$lib/annotations";

  export let annotationStructureSelection: StructureSelectionData[] | null;
  let activeSourceDB: SourceDB | null = null;

  const dispatch = createEventDispatcher<{
    colorSchemeChange: { sourceDB: SourceDB | null };
  }>();

  // Get available source databases from track data
  $: availableSourceDBs = annotationStructureSelection
    ? (Object.keys(annotationStructureSelection) as SourceDB[])
    : [];

  // Set default source DB to TMbed if available, otherwise first available
  $: {
    if (availableSourceDBs.length > 0 && !activeSourceDB) {
      const tmbed = availableSourceDBs.find(
        (db) => db.toLowerCase() === "tmbed",
      );
      activeSourceDB = tmbed || availableSourceDBs[0];
      handleSelectionChange({ target: { value: activeSourceDB } } as any);
    }
  }

  function handleSelectionChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value as SourceDB | "";
    const newSourceDB = value === "" ? null : value;
    dispatch("colorSchemeChange", { sourceDB: newSourceDB });
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
      {#each availableSourceDBs as sourceDB}
        <option value={sourceDB}>{KEY_TO_DISPLAY_NAME[sourceDB]}</option>
      {/each}
    </select>
  </div>
{/if}
