<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { spring } from "svelte/motion";

  import "@nightingale-elements/nightingale-manager";
  import "@nightingale-elements/nightingale-navigation";
  import "@nightingale-elements/nightingale-sequence";
  import "@nightingale-elements/nightingale-track";
  import type { TrackData, SourceDB } from "$lib/annotations";
  import { writable } from "svelte/store";

  export let sequence: string;
  export let trackData: TrackData;
  export let featureEventHandler: (event: CustomEvent) => void = () => {};
  export let displayStart: number = 1;
  export let displayEnd: number = sequence.length;
  export let highlightColor: string = "rgba(var(--color-secondary-500)/0.3)";
  export let marginColor: string = "rgba(0, 0, 0, 0)";
  export let minWidth: number = 10;
  export let height: number = 50;

  const length = sequence.length;

  let trackElements: Record<SourceDB, HTMLElement | null> = {} as Record<
    SourceDB,
    HTMLElement | null
  >;

  function updateTracks() {
    Object.entries(trackData).forEach(([sourceDB, features]) => {
      const track = trackElements[sourceDB as SourceDB];
      if (track) {
        track.data = features;
      }
    });
  }

  afterUpdate(() => {
    updateTracks();
  });

  let tooltipContent = writable("");

  // TODO: this causes highlight to break; need to fix
  function handleFeatureEvent(event: CustomEvent) {
    const { detail } = event;
    switch (detail.eventType) {
      case "mouseover":
        const { feature, target, parentEvent } = detail;
        if (feature) {
          tooltipContent.set(
            `${feature.tooltipContent}, Start: ${feature.locations[0].fragments[0].start}, End: ${feature.locations[0].fragments[0].end}`,
          );
        }
        break;
      case "mouseout":
        tooltipContent.set("");
        break;
    }
    featureEventHandler(event);
  }

  $: componentWidth = Math.ceil(length * 100) / 100;
</script>

{#if sequence && trackData}
  <div class="w-full max-w-7xl mx-auto p-5 h-full">
    <nightingale-manager id="manager" class="col-span-2 lg:col-span-1">
      <div class="grid grid-cols-1 gap-x-2 lg:grid-cols-[1fr,11fr] w-full">
        <div class="text-mono leading-none justify-self-end"></div>
        <div class="leading-none relative">
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
          >
          </nightingale-navigation>
        </div>

        {#each Object.entries(trackData) as [sourceDB, features], index}
          <div
            class="font-mono text-base justify-self-end leading-none hidden lg:block"
          >
            {sourceDB}
          </div>
          <div class="leading-none relative">
            <div
              class="font-mono text-[8pt] absolute variant-glass-surface z-1 lg:hidden"
            >
              {sourceDB}
            </div>
            <nightingale-track
              bind:this={trackElements[sourceDB]}
              id={"track-" + sourceDB}
              {length}
              on:change={handleFeatureEvent}
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
        <div class="text-mono leading-none justify-self-end"></div>
        <div class="leading-none relative">
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
      <div
        class="text-mono text-[8pt] lg:text-base mt-5 justify-self-start lg:col-span-2"
      >
        {$tooltipContent}
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
