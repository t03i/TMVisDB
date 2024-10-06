<script lang="ts">
  import { onMount } from "svelte";
  import "@nightingale-elements/nightingale-manager";
  import "@nightingale-elements/nightingale-navigation";
  import "@nightingale-elements/nightingale-sequence";
  import "@nightingale-elements/nightingale-interpro-track";
  import type { TrackData, SourceDB } from "$lib/annotations";

  export let sequence: string;
  export let trackData: TrackData;

  let trackElements: Record<SourceDB, HTMLElement | null> = {} as Record<
    SourceDB,
    HTMLElement | null
  >;

  onMount(() => {
    // Set data for each track
    Object.entries(trackData).forEach(([sourceDB, features]) => {
      const track = trackElements[sourceDB as SourceDB];
      if (track) {
        track.data = features;
      }
    });
  });

  $: displayEnd = Math.min(sequence.length, 100);
  $: componentWidth = Math.ceil(sequence.length * 100) / 100;
</script>

{#if sequence && trackData}
  <nightingale-manager length={sequence.length} id="manager">
    <div style="display:flex; flex-direction: column; width=90% ">
      <div>
        <nightingale-navigation
          length={sequence.length}
          width={componentWidth}
          margin-color="rgba(0, 0, 0, 0)"
          display-start={1}
          ruler-padding={5}
          ruler-start={1}
          display-end={displayEnd}
          id="navigation"
        ></nightingale-navigation>
      </div>
      <div style="line-height: 0" class="mt-3">
        <nightingale-sequence
          {sequence}
          length={sequence.length}
          width={componentWidth}
          display-start={1}
          display-end={displayEnd}
          margin-color="rgba(0, 0, 0, 0)"
          id="sequence"
        ></nightingale-sequence>
      </div>
      {#each Object.entries(trackData) as [sourceDB, features]}
        <div class="track-container mt-4">
          <!-- Track title on the left -->
          <div class="track-title">{sourceDB}</div>
          <!-- Track component -->
          <div class="track-component" style="line-height: 50px;">
            <nightingale-interpro-track
              bind:this={trackElements[sourceDB]}
              length={sequence.length}
              height={30}
              width={componentWidth}
              id={"track-" + sourceDB}
              shape="roundRectangle"
              displaystart="1"
              displayend={displayEnd}
              highlight=""
              layout="non-overlapping"
              manager="manager"
            >
            </nightingale-interpro-track>
          </div>
        </div>
      {/each}
    </div>
  </nightingale-manager>
{/if}
