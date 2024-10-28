<!-- TrajectoryViewportControls.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  export let plugin: any;

  let show = false;
  let label = "";
  let isAnimating = false;

  const { StateTransforms } = import("molstar/lib/mol-plugin-state/transforms");

  function update() {
    const state = plugin.state.data;
    const models = state.selectQ((q) =>
      q.ofTransformer(StateTransforms.Model.ModelFromTrajectory),
    );

    if (models.length === 0) {
      show = false;
      return;
    }

    let currentLabel = "";
    let count = 0;
    const parents = new Set<string>();

    for (const m of models) {
      if (!m.sourceRef) continue;
      const parent = state.cells.get(m.sourceRef)?.obj;

      if (!parent) continue;
      if (parent.data.frameCount > 1) {
        if (parents.has(m.sourceRef)) {
          show = false;
          return;
        }

        parents.add(m.sourceRef);
        count++;
        if (!currentLabel) {
          const idx = m.transform.params.modelIndex;
          currentLabel = `Model ${idx + 1} / ${parent.data.frameCount}`;
        }
      }
    }

    if (count > 1) currentLabel = "";
    show = count > 0;
    label = currentLabel;
  }

  function reset() {
    plugin.state.data.applyAction({
      action: "reset",
    });
  }

  function prev() {
    plugin.state.data.applyAction({
      action: "advance",
      by: -1,
    });
  }

  function next() {
    plugin.state.data.applyAction({
      action: "advance",
      by: 1,
    });
  }

  onMount(() => {
    // Subscribe to state changes
    const unsubscribeState = plugin.state.data.events.changed.subscribe(update);
    const unsubscribeAnim = plugin.behaviors.state.isAnimating.subscribe(
      (value) => {
        isAnimating = value;
        update();
      },
    );

    return () => {
      unsubscribeState();
      unsubscribeAnim();
    };
  });
</script>

{#if show && (!isAnimating || label) && plugin.config.get("Viewport.ShowTrajectoryControls")}
  <div class="msp-traj-controls">
    {#if !isAnimating}
      <button
        class="variant-ghost-surface btn-icon"
        title="First Model"
        on:click={reset}
        disabled={isAnimating}
      >
        <iconify-icon icon="mdi:skip-previous" />
      </button>

      <button
        class="variant-ghost-surface btn-icon"
        title="Previous Model"
        on:click={prev}
        disabled={isAnimating}
      >
        <iconify-icon icon="mdi:chevron-left" />
      </button>

      <button
        class="variant-ghost-surface btn-icon"
        title="Next Model"
        on:click={next}
        disabled={isAnimating}
      >
        <iconify-icon icon="mdi:chevron-right" />
      </button>
    {/if}

    {#if label}
      <span class="label">{label}</span>
    {/if}
  </div>
{/if}

<style>
  .msp-traj-controls {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    gap: 4px;
    align-items: center;
    z-index: 10;
  }

  .btn-icon {
    @apply rounded-full p-2 backdrop-blur-sm;
  }
</style>
