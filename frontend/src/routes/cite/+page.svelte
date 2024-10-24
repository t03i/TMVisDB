<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import config from "$lib/config";
  import SciReference from "$lib/components/SciReference.svelte";
</script>

<svelte:head>
  <title>{config.APP_NAME} cite</title>
</svelte:head>

<div class="container mx-auto max-w-4xl p-8">
  <div class="space-y-12">
    <div class="flex flex-col items-start gap-8 md:flex-row">
      <div class="flex items-center md:w-1/2">
        <p class="text-lg">If you are using TMvisDB, please cite:</p>
      </div>
      <div class="md:w-1/2">
        <SciReference
          doi="https://doi.org/10.1101/2022.11.30.518551"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex flex-col items-start gap-8 md:flex-row">
      <div class="flex items-center md:w-1/2">
        <p class="text-lg">
          For referencing predicted annotations in the database, please cite:
        </p>
      </div>
      <div class="md:w-1/2">
        <SciReference
          doi="https://doi.org/10.1186/s12859-022-04873-x"
          class="w-full"
        />
      </div>
    </div>
    <div class="flex flex-col items-start gap-8 md:flex-row">
      <div class="flex items-center md:w-1/2">
        <p class="text-lg">For referencing structures, please cite:</p>
      </div>
      <div class="md:w-1/2">
        <SciReference
          doi="https://doi.org/10.1093/nar/gkab1061"
          class="w-full"
        />
        <SciReference
          doi="https://doi.org/10.1038/s41586-021-03819-2"
          class="w-full"
        />
      </div>
    </div>
    <p>
      If you are referring to individual annotation sources, please check the
      respective guidelines.
    </p>
  </div>
</div>
