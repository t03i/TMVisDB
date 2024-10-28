<!-- SelectionControls.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  export let plugin: any;

  let isEmpty = true;
  let isBusy = false;
  let canUndo = false;
  let currentAction:
    | "add"
    | "remove"
    | "intersect"
    | "set"
    | "theme"
    | "add-component"
    | "help"
    | undefined;
  let granularity = "residue"; // Default value

  const ActionHeaders = new Map([
    ["add", "Add/Union Selection"],
    ["remove", "Remove/Subtract Selection"],
    ["intersect", "Intersect Selection"],
    ["set", "Set Selection"],
  ]);

  onMount(() => {
    // Subscribe to structure hierarchy changes
    const unsubs = [
      plugin.managers.structure.hierarchy.behaviors.selection.subscribe(
        (c: any) => {
          isEmpty = c.hierarchy.structures.length === 0;
        },
      ),

      plugin.behaviors.state.isBusy.subscribe((v: boolean) => {
        isBusy = v;
        currentAction = undefined;
      }),

      plugin.state.data.events.historyUpdated.subscribe(({ state }: any) => {
        canUndo = state.canUndo;
      }),

      plugin.managers.interactivity.events.propsUpdated.subscribe(() => {
        // Force update if needed
      }),
    ];

    return () => unsubs.forEach((unsub) => unsub());
  });

  function setGranularity(value: string) {
    plugin.managers.interactivity.setProps({ granularity: value });
  }

  function turnOff() {
    plugin.selectionMode = false;
  }

  async function undo() {
    const task = plugin.state.data.undo();
    if (task) await plugin.runTask(task);
  }

  function subtract() {
    const sel =
      plugin.managers.structure.hierarchy.getStructuresWithSelection();
    const components = [];
    for (const s of sel) components.push(...s.components);
    if (components.length === 0) return;
    plugin.managers.structure.component.modifyByCurrentSelection(
      components,
      "subtract",
    );
  }

  function toggleAction(action: typeof currentAction) {
    currentAction = currentAction === action ? undefined : action;
  }

  $: isDisabled = isBusy || isEmpty;
</script>

<div
  class="bg-surface-100-800-token/50 flex items-center gap-2 p-2 backdrop-blur-sm rounded-token"
>
  <!-- Granularity Select -->
  <select
    bind:value={granularity}
    on:change={(e) => setGranularity(e.currentTarget.value)}
    disabled={isDisabled}
    class="select-sm select"
  >
    <option value="residue">Residue</option>
    <option value="element">Element</option>
    <option value="atom">Atom</option>
  </select>

  <!-- Selection Operations -->
  <button
    class="variant-ghost-surface btn-icon"
    class:variant-filled-primary={currentAction === "add"}
    on:click={() => toggleAction("add")}
    disabled={isDisabled}
    title={ActionHeaders.get("add")}
  >
    <iconify-icon icon="mdi:plus" />
  </button>

  <button
    class="variant-ghost-surface btn-icon"
    class:variant-filled-primary={currentAction === "remove"}
    on:click={() => toggleAction("remove")}
    disabled={isDisabled}
    title={ActionHeaders.get("remove")}
  >
    <iconify-icon icon="mdi:minus" />
  </button>

  <button
    class="variant-ghost-surface btn-icon"
    class:variant-filled-primary={currentAction === "intersect"}
    on:click={() => toggleAction("intersect")}
    disabled={isDisabled}
    title={ActionHeaders.get("intersect")}
  >
    <iconify-icon icon="mdi:vector-intersection" />
  </button>

  <button
    class="variant-ghost-surface btn-icon"
    class:variant-filled-primary={currentAction === "set"}
    on:click={() => toggleAction("set")}
    disabled={isDisabled}
    title={ActionHeaders.get("set")}
  >
    <iconify-icon icon="mdi:set-all" />
  </button>

  <div class="h-6 w-px bg-surface-500/30" />

  <!-- Operations -->
  <button
    class="variant-ghost-surface btn-icon"
    class:variant-filled-primary={currentAction === "theme"}
    on:click={() => toggleAction("theme")}
    disabled={isDisabled}
    title="Apply Theme to Selection"
  >
    <iconify-icon icon="mdi:brush" />
  </button>

  <button
    class="variant-ghost-surface btn-icon"
    class:variant-filled-primary={currentAction === "add-component"}
    on:click={() => toggleAction("add-component")}
    disabled={isDisabled}
    title="Create Component of Selection"
  >
    <iconify-icon icon="mdi:cube-outline" />
  </button>

  <button
    class="variant-ghost-surface btn-icon"
    on:click={subtract}
    disabled={isDisabled}
    title="Remove Selection from Components"
  >
    <iconify-icon icon="mdi:minus-box-outline" />
  </button>

  <button
    class="variant-ghost-surface btn-icon"
    on:click={undo}
    disabled={!canUndo || isDisabled}
    title="Undo"
  >
    <iconify-icon icon="mdi:undo" />
  </button>

  <div class="h-6 w-px bg-surface-500/30" />

  <!-- Help & Close -->
  <button
    class="variant-ghost-surface btn-icon"
    class:variant-filled-primary={currentAction === "help"}
    on:click={() => toggleAction("help")}
    title="Show Help"
  >
    <iconify-icon icon="mdi:help" />
  </button>

  <button
    class="variant-ghost-surface btn-icon"
    on:click={turnOff}
    title="Turn Selection Mode Off"
  >
    <iconify-icon icon="mdi:close" />
  </button>
</div>

<!-- Action Menus -->
{#if currentAction && !isDisabled}
  <!-- Add your action menus here -->
{/if}

<style>
  .btn-icon {
    @apply rounded-full p-2;
  }
</style>
