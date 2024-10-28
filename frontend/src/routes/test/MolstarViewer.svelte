<!-- MolstarViewer.svelte -->
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { browser } from "$app/environment";
  import { modeCurrent } from "@skeletonlabs/skeleton";

  const dispatch = createEventDispatcher();
  export let structureUrl: string;
  export let isBinary = false;
  export let format: "pdb" | "mmcif" | "cif" = "mmcif";

  let container: HTMLDivElement;
  let plugin: any;
  let canvas: HTMLCanvasElement;

  // Track background colors
  let bgColorR = 255;
  let bgColorG = 255;
  let bgColorB = 255;

  function getBackgroundColor() {
    // Get the parent element's background color
    const computedStyle = getComputedStyle(container);
    let bgColor = computedStyle.backgroundColor;

    // Fallback to body background if transparent
    if (
      !bgColor ||
      bgColor === "transparent" ||
      bgColor === "rgba(0, 0, 0, 0)"
    ) {
      bgColor = getComputedStyle(document.body).backgroundColor;
    }

    // Parse the RGB values
    const rgbValues = bgColor.match(/\d+/g)?.map(Number);
    if (rgbValues && rgbValues.length >= 3) {
      [bgColorR, bgColorG, bgColorB] = rgbValues;
    }
  }

  async function updateBackground() {
    if (plugin?.canvas) {
      getBackgroundColor();
      plugin.canvas.setBgColor({ r: bgColorR, g: bgColorG, b: bgColorB });
    }
  }

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
      canvas: {
        clipRect: true, // Enable clipping for rounded corners
      },
    };

    plugin = new PluginContext(spec);
    await plugin.init();

    canvas = document.createElement("canvas");
    canvas.classList.add("rounded-lg"); // Add rounded corners to canvas
    container.appendChild(canvas);

    if (!plugin.initViewer(canvas, container)) {
      throw new Error("Failed to init Mol*");
    }

    // Initial background update
    await updateBackground();

    // Subscribe to theme changes
    const unsubscribe = modeCurrent.subscribe(async () => {
      await updateBackground();
    });

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
    }
  });

  onDestroy(() => {
    if (plugin) {
      plugin.dispose();
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
