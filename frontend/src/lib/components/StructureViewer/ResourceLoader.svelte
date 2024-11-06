<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { modeCurrent } from "@skeletonlabs/skeleton";
  import { browser } from "$app/environment";

  const dispatch = createEventDispatcher();
  let currentStylesheet: HTMLLinkElement | null = null;
  let scriptLoaded: boolean = false;

  function updateStylesheet(isLight: boolean) {
    if (!browser) return;

    if (currentStylesheet) {
      document.head.removeChild(currentStylesheet);
    }

    currentStylesheet = document.createElement("link");
    currentStylesheet.rel = "stylesheet";
    currentStylesheet.href = isLight
      ? "https://cdn.jsdelivr.net/npm/pdbe-molstar@latest/build/pdbe-molstar-light.css"
      : "https://cdn.jsdelivr.net/npm/pdbe-molstar@latest/build/pdbe-molstar.css";
    document.head.appendChild(currentStylesheet);
  }

  export function loadWebComponentScript(): Promise<void> {
    return new Promise((resolve) => {
      if (!browser) {
        resolve();
        return;
      }

      if (
        !scriptLoaded &&
        !document.querySelector('script[src*="pdbe-molstar-component.js"]')
      ) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/pdbe-molstar@latest/build/pdbe-molstar-component.js";
        script.async = true;
        script.onload = () => {
          scriptLoaded = true;
          dispatch("viewerLoaded");
          resolve();
        };
        script.onerror = () => {
          dispatch("viewerError");
          resolve();
        };
        document.body.appendChild(script);
      } else {
        dispatch("viewerLoaded");
        resolve();
      }
    });
  }

  let unsubscribe: (() => void) | null = null;

  onMount(() => {
    if (browser) {
      loadWebComponentScript();
      updateStylesheet($modeCurrent);
      unsubscribe = modeCurrent.subscribe((value) => {
        updateStylesheet(value);
      });
    }
  });

  onDestroy(() => {
    if (browser) {
      if (currentStylesheet) {
        document.head.removeChild(currentStylesheet);
      }
      if (unsubscribe) {
        unsubscribe();
      }
    }
  });
</script>
