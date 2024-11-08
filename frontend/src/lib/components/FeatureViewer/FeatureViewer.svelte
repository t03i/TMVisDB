<script lang="ts">
  import { afterUpdate, onMount, createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import { modeCurrent } from "@skeletonlabs/skeleton";

  import "@nightingale-elements/nightingale-manager";
  import "@nightingale-elements/nightingale-navigation";
  import "@nightingale-elements/nightingale-sequence";
  import "@nightingale-elements/nightingale-track";
  import {
    KEY_TO_DISPLAY_NAME,
    type TrackData,
    type SourceDB,
  } from "$lib/annotations";

  export let sequence: string;
  export let trackData: TrackData;
  export let displayStart: number = 1;
  export let displayEnd: number = sequence.length;
  export let highlightColor: string = "rgba(var(--color-warning-500)/0.3)";
  export let marginColor: string = "rgba(0, 0, 0, 0)";
  export let minWidth: number = 10;
  export let height: number = 50;

  const length = sequence.length;

  let trackElements: Record<SourceDB, HTMLElement | null> = {} as Record<
    SourceDB,
    HTMLElement | null
  >;

  const dispatch = createEventDispatcher();

  function updateTracks() {
    Object.entries(trackData).forEach(([sourceDB, features]) => {
      const track = trackElements[sourceDB as SourceDB];
      if (track) {
        // @ts-ignore
        track.data = features;
      }
    });
  }

  afterUpdate(() => {
    updateTracks();
  });

  let tooltipContent = writable("");

  // TODO: this causes highlight to break; need to fix
  // Seems to not pass down the event to the track
  function handleFeatureEvent(event: CustomEvent) {
    event.preventDefault();

    const { detail } = event;
    const { feature, target, parentEvent } = detail;

    switch (detail.eventType) {
      case "mouseover":
        if (feature && feature?.type) {
          tooltipContent.set(
            `${KEY_TO_DISPLAY_NAME[feature.sourceDB]}: ${feature.tooltipContent} (${feature.type}), Start: ${feature.locations[0].fragments[0].start}, End: ${feature.locations[0].fragments[0].end}`,
          );
        }
        break;
      case "mouseout":
        tooltipContent.set("");
        break;
      case "click":
        if (feature && feature?.type) {
          dispatch("feature-clicked", detail);
        }
        break;
    }
  }

  $: componentWidth = Math.ceil(length * 100) / 100;
</script>

{#if sequence && trackData}
  <div class="mx-auto min-h-[200px] w-full max-w-7xl p-5">
    <nightingale-manager
      id="manager"
      class="col-span-2 lg:col-span-1"
      on:change|preventDefault={handleFeatureEvent}
    >
      <div class="grid w-full grid-cols-1 gap-x-2 lg:grid-cols-[1fr,11fr]">
        <div class="text-mono justify-self-end leading-none"></div>
        <div class="relative leading-none">
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
            class="hidden justify-self-end font-mono text-base leading-none lg:block"
          >
            {KEY_TO_DISPLAY_NAME[sourceDB]}
          </div>
          <div class="relative leading-none">
            <div
              class="z-1 variant-glass-surface absolute font-mono text-[8pt] lg:hidden"
            >
              {KEY_TO_DISPLAY_NAME[sourceDB]}
            </div>

            <nightingale-track
              bind:this={trackElements[sourceDB]}
              id={"track-" + sourceDB}
              {length}
              manager="manager"
              width={componentWidth}
              display-start={displayStart}
              display-end={displayEnd}
              highlight-color={highlightColor}
              margin-color={marginColor}
              min-width={minWidth}
              {height}
              highlight-event="onclick"
              use-ctrl-to-zoom
            ></nightingale-track>
          </div>
        {/each}
        <div class="text-mono justify-self-end leading-none"></div>
        <div class="relative leading-none">
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
            highlight-event="onclick"
            use-ctrl-to-zoom
          ></nightingale-sequence>
        </div>
      </div>
      <div
        class="text-mono mt-5 min-h-6 justify-self-start text-[8pt] leading-normal lg:col-span-2 lg:text-base"
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
