<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script>
  import { AppBar } from "@skeletonlabs/skeleton";
  import { LightSwitch } from "@skeletonlabs/skeleton";
</script>

<AppBar
  gridColumns="grid-cols-3"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
>
  <svelte:fragment slot="lead">(icon)</svelte:fragment>
  TMvisDB
  <svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
