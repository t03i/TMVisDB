<!-- ThemeSwitcher.svelte -->
<script lang="ts">
  import { modeCurrent } from "@skeletonlabs/skeleton";
  import { onMount, onDestroy, tick } from "svelte";

  export let viewerElement: any;

  let bgColorR = 255;
  let bgColorG = 255;
  let bgColorB = 255;
  let modeUnsubscribe: () => void;
  let viewerReady = false;

  // Function to extract and parse the background color
  function getBackgroundColor() {
    // Get the parent element
    const parentElement = viewerElement?.parentElement;

    if (parentElement) {
      // Get the computed style of the parent element
      const computedStyle = getComputedStyle(parentElement);

      // Get the background color property
      let bgColor = computedStyle.backgroundColor;

      // If the background color is transparent or not set, fallback to body background
      if (
        !bgColor ||
        bgColor === "transparent" ||
        bgColor === "rgba(0, 0, 0, 0)"
      ) {
        bgColor = getComputedStyle(document.body).backgroundColor;
      }

      // Parse the background color to RGB values
      const rgbValues = bgColor.match(/\d+/g)?.map(Number);

      if (rgbValues && rgbValues.length >= 3) {
        [bgColorR, bgColorG, bgColorB] = rgbValues;
      } else {
        // Default to white if parsing fails
        bgColorR = 255;
        bgColorG = 255;
        bgColorB = 255;
      }
    }
  }

  async function updateBackground() {
    if (
      viewerElement &&
      viewerElement.viewerInstance &&
      viewerElement.viewerInstance.canvas
    ) {
      // Wait for DOM updates
      await tick();

      getBackgroundColor();
      viewerElement.viewerInstance.canvas.setBgColor({
        r: bgColorR,
        g: bgColorG,
        b: bgColorB,
      });
    }
  }

  onMount(() => {
    // Subscribe to mode changes
    modeUnsubscribe = modeCurrent.subscribe((value) => {
      if (viewerReady) {
        updateBackground();
      }
    });

    // Check periodically if viewerInstance is available
    const checkViewerInstance = setInterval(() => {
      if (
        viewerElement &&
        viewerElement.viewerInstance &&
        viewerElement.viewerInstance.canvas
      ) {
        clearInterval(checkViewerInstance);
        viewerReady = true;
        // Initial background update
        // Subscribe to loadComplete event
        viewerElement.viewerInstance.events.loadComplete.subscribe(() => {
          updateBackground();
        });
      }
    }, 100);
  });

  onDestroy(() => {
    if (modeUnsubscribe) {
      modeUnsubscribe();
    }
  });
</script>
