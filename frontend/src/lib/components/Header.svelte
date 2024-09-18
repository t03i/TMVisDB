<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script>
  import { AppBar } from "@skeletonlabs/skeleton";
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import config from "$lib/config";
</script>

<AppBar
  gridColumns="grid-cols-3"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
  class="sticky shadow-lg top-0"
>
  <svelte:fragment slot="lead">(icon)</svelte:fragment>
  <h1 class="h1">
    <span class="gradient-heading"
      ><a href="/" class="undecorated">{config.APP_NAME}</a></span
    >
  </h1>
  <svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
