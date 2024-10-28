<!-- MolstarViewer.svelte -->
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { browser } from "$app/environment";
  import { modeCurrent } from "@skeletonlabs/skeleton";
  import { tick } from "svelte";

  const dispatch = createEventDispatcher();
  export let structureUrl: string;
  export let isBinary = false;
  export let format: "pdb" | "mmcif" | "cif" = "mmcif";

  let container: HTMLDivElement;
  let plugin: any;
  let canvas: HTMLCanvasElement;
  let viewerReady = false;

  async function initViewer() {
    if (!browser) return;

    const [{ PluginContext }, { DefaultPluginSpec }] = await Promise.all([
      import("molstar/lib/mol-plugin/context"),
      import("molstar/lib/mol-plugin/spec"),
    ]);

    const spec = {
      ...DefaultPluginSpec(),
      layout: {
        initial: {
          isExpanded: false,
          showControls: false,
          controlsDisplay: "reactive",
        },
      },
      canvas3d: {
        transparentBackground: true,
      },
    };

    plugin = new PluginContext(spec);
    await plugin.init();

    canvas = document.createElement("canvas");
    container.appendChild(canvas);

    if (!plugin.initViewer(canvas, container)) {
      throw new Error("Failed to init Mol*");
    }

    // Set viewer as ready
    viewerReady = true;

    dispatch("ready", { plugin });
  }

  async function loadStructure(url: string) {
    if (!plugin) return;
    try {
      await plugin.clear();

      const data = await plugin.builders.data.download({
        url,
        isBinary: true,
      });

      const trajectory = await plugin.builders.structure.parseTrajectory(
        data,
        format,
        {
          geometryHelper: {
            ignoreOperations: false,
            includeParent: false,
          },
        },
      );

      const model = await plugin.builders.structure.createModel(trajectory);
      const structure = await plugin.builders.structure.createStructure(model);

      await plugin.builders.structure.representation.addRepresentation(
        structure,
        {
          type: "cartoon",
          color: "chain-id",
        },
      );

      dispatch("structureLoaded", { structure });
    } catch (error) {
      console.error("Failed to load structure:", error);
      dispatch("error", { error });
    }
  }

  export function handleResize() {
    plugin?.layout.events.updated.next(null);
  }

  onMount(async () => {
    if (browser) {
      await initViewer();
      if (structureUrl) {
        await loadStructure(structureUrl);
      }

      // Cleanup subscription on component destroy
      return () => {
        if (plugin) {
          plugin.dispose();
        }
      };
    }
  });
</script>

<div class="molstar-container card overflow-hidden" bind:this={container}>
  <!-- Molstar will render here -->
</div>

<style>
  .molstar-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  :global(canvas) {
    border-radius: 0.5rem; /* Match rounded-lg */
  }
</style>
