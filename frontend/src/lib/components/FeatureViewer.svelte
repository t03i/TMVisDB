<script lang="ts">
  import { onMount } from "svelte";
  import "@nightingale-elements/nightingale-manager";
  import "@nightingale-elements/nightingale-navigation";
  import "@nightingale-elements/nightingale-sequence";
  import "@nightingale-elements/nightingale-interpro-track";

  let mounted = false;

  export let sequence: string;

  // Sample annotations data (transmembrane regions)
  const annotations = [
    {
      start: 5,
      end: 25,
      type: "Transmembrane",
      tooltipContent: "Transmembrane region 1",
      database: "UniProt",
    },
    {
      start: 40,
      end: 60,
      type: "Transmembrane",
      tooltipContent: "Transmembrane region 2",
      database: "PDB",
    },
  ];

  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted && sequence}
  <nightingale-manager length={sequence.length} id="manager">
    <div style="display:flex; flex-direction: column; width=90% ">
      <div style="line-height: 0">
        <nightingale-navigation
          length={sequence.length}
          highlight-event="onmouseover"
          highlight-color="rgba(0, 0, 0, 0.1)"
          margin-color="rgba(0, 0, 0, 0)"
          margin-left={30}
          margin-right={30}
          id="navigation"
        ></nightingale-navigation>
      </div>
      <div style="line-height: 0">
        <nightingale-sequence
          {sequence}
          length={sequence.length}
          margin-left={30}
          margin-right={30}
          margin-color="rgba(0, 0, 0, 0)"
          id="sequence"
        ></nightingale-sequence>
      </div>
    </div>
  </nightingale-manager>
{/if}

<style>
  .start-label {
    color: aqua;
  }
</style>
