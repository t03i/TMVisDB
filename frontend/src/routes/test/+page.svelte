<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import MolstarViewer from "./MolstarViewer.svelte";

  let viewer: any;

  function handleReady(event) {
    const { plugin } = event.detail;
    console.log("Plugin ready", plugin);
  }
</script>

<div style="height: 400px">
  <MolstarViewer
    bind:this={viewer}
    structureUrl="https://alphafold.ebi.ac.uk/files/AF-O15552-F1-model_v4.bcif"
    isBinary={true}
    on:ready={handleReady}
  />
</div>
