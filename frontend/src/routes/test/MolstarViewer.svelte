<!-- MolstarViewer.svelte -->
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { browser } from "$app/environment";
  import SelectionControls from "./SelectionControls.svelte";
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

    viewerReady = true;
    dispatch("ready", { plugin });
  }

  // Control actions
  async function handleReset() {
    if (!plugin) return;
    await plugin.canvas3d?.resetCamera();
  }

  async function handleScreenshot() {
    if (!plugin) return;
    const imageData = plugin.canvas3d?.getImageData();
    if (imageData) {
      const blob = new Blob([imageData], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "screenshot.png";
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  async function toggleSpin() {
    if (!plugin) return;
    const canvas3d = plugin.canvas3d;
    if (canvas3d.props.trackball.animate.name === "spin") {
      canvas3d.setProps({ trackball: { animate: { name: "off" } } });
    } else {
      canvas3d.setProps({
        trackball: { animate: { name: "spin", params: { speed: 1 } } },
      });
    }
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
      return () => {
        if (plugin) {
          plugin.dispose();
        }
      };
    }
  });
</script>

<div class="card relative h-full w-full overflow-hidden" bind:this={container}>
  {#if plugin}
    <div class="absolute left-1/2 top-2 z-10 -translate-x-1/2">
      <SelectionControls {plugin} />
    </div>
  {/if}
</div>

<style>
</style>
