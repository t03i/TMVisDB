<script lang="ts">
  import { onMount } from "svelte";
  import { modeCurrent } from "@skeletonlabs/skeleton";
  import "@nightingale-elements/nightingale-manager";
  import "@nightingale-elements/nightingale-navigation";
  import "@nightingale-elements/nightingale-sequence";
  import "@nightingale-elements/nightingale-track";
  import type { TrackData, SourceDB } from "$lib/annotations";

  export let sequence: string;
  export let trackData: TrackData;
  export let displayStart: number = 1;
  export let displayEnd: number = sequence.length;
  export let highlightColor: string = "rgba(var(--color-secondary-500)/0.3)";
  export let marginColor: string = "rgba(0, 0, 0, 0)";
  export let minWidth: number = 10;
  export let height: number = 500;

  const length = sequence.length;

  let trackElements: Record<SourceDB, HTMLElement | null> = {} as Record<
    SourceDB,
    HTMLElement | null
  >;

  let managerElement: any;

  onMount(() => {
    Object.entries(trackData).forEach(([sourceDB, features]) => {
      const track = trackElements[sourceDB as SourceDB];
      if (track) {
        track.data = features;
      }
    });

    managerElement = document.getElementById("manager");
    applyThemeStyles();
  });

  function applyThemeStyles() {
    if (!managerElement) return;

    const brushElements = managerElement.querySelectorAll(".brush .selection");

    brushElements.forEach((brush: SVGRectElement) => {
      brush.style.fill = modeCurrent ? "#555555" : "#777777";
      brush.style.stroke = modeCurrent ? "#888888" : "#ffffff";
    });
  }

  modeCurrent.subscribe((value) => {
    applyThemeStyles();
  });

  $: componentWidth = Math.ceil(length * 100) / 100;
</script>

{#if sequence && trackData}
  <div class="w-full max-w-7xl mx-auto p-5 h-full nightingale-container">
    <nightingale-manager id="manager">
      <div class="flex flex-col w-full">
        <div class="leading-none">
          <nightingale-navigation
            id="navigation"
            {length}
            width={componentWidth}
            display-start={displayStart}
            display-end={displayEnd}
            highlight-color={highlightColor}
            margin-color={marginColor}
            min-width={minWidth}
            {height}
            show-highlight
          ></nightingale-navigation>
        </div>
        {#each Object.entries(trackData) as [sourceDB, features], index}
          <div class="leading-none">
            <nightingale-track
              bind:this={trackElements[sourceDB]}
              id={"track-" + sourceDB}
              {length}
              width={componentWidth}
              display-start={displayStart}
              display-end={displayEnd}
              highlight-color={highlightColor}
              margin-color={marginColor}
              min-width={minWidth}
              {height}
              highlight-event="onmouseover"
              use-ctrl-to-zoom
            ></nightingale-track>
          </div>
        {/each}
        <div class="leading-none">
          <nightingale-sequence
            id="sequence"
            {sequence}
            {length}
            width={componentWidth}
            display-start={displayStart}
            display-end={displayEnd}
            highlight-color={highlightColor}
            margin-color={marginColor}
            min-width={minWidth}
            {height}
            highlight-event="onmouseover"
            use-ctrl-to-zoom
          ></nightingale-sequence>
        </div>
      </div>
    </nightingale-manager>
  </div>
{/if}

<style>
  :global(html.dark .start-label),
  :global(html.dark .end-label) {
    font-weight: bold;
    fill: rgba(var(--theme-font-color-dark));
  }
  :global(html:not(.dark) .start-label),
  :global(html:not(.dark) .end-label) {
    font-weight: bold;
    fill: rgba(var(--theme-font-color-base));
  }

  :global(html:not(.dark) .brush .selection),
  :global(html:not(.dark) .zoom-polygon) {
    fill: rgba(var(--color-primary-600)) !important;
    stroke: rgba(var(--color-primary-600)) !important;
  }

  :global(html.dark .brush .selection),
  :global(html.dark .zoom-polygon) {
    fill: rgba(var(--color-primary-600)) !important;
    stroke: rgba(var(--color-primary-600)) !important;
  }

  :global(html.dark .background .base_bg):nth-child(odd) {
    fill: rgba(var(--color-surface-700));
  }

  :global(html.dark .background .base_bg):nth-child(even) {
    fill: rgba(var(--color-surface-900));
  }

  :global(html:not(.dark) .background .base_bg):nth-child(odd) {
    fill: rgba(var(--color-surface-200));
  }

  :global(html:not(.dark) .background .base_bg):nth-child(even) {
    fill: rgba(var(--color-surface-50));
  }
  :global(html.dark .sequence .base) {
    fill: rgba(var(--theme-font-color-dark));
  }

  :global(html:not(.dark) .sequence .base) {
    fill: rgba(var(--theme-font-color-base));
  }
</style>
