<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script>
  import { AppBar } from "@skeletonlabs/skeleton";
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import config from "$lib/config";
  import Logo from "$lib/components/Logo.svelte";
</script>

<AppBar
  gridColumns="grid-cols-3"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
  class="sticky top-0 z-50 shadow-lg"
>
  <svelte:fragment slot="lead">
    <a href="/" class="inline-block">
      <Logo class="h-12" />
    </a></svelte:fragment
  >
  <h1 class="h1">
    <span class="gradient-heading"
      ><a href="/" class="undecorated">{config.APP_NAME}</a></span
    >
  </h1>
  <svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>

<style>
  .gradient-heading {
    @apply box-decoration-clone bg-clip-text text-transparent;
    /* Direction */
    @apply bg-gradient-to-br;
    /* Color Stops */
    @apply from-primary-500 via-tertiary-500 to-secondary-500;
  }
</style>
