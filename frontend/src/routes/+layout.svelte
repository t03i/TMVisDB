<script lang="ts">
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  import config from "$lib/config";
  import "../app.css";

  import {
    Header,
    Footer,
    Navigation,
    QueryLayout,
  } from "$lib/components/Layout";
  import Maintenance from "$lib/components/Maintenance.svelte";
  import PrivacyBanner from "$lib/components/PrivacyBanner.svelte";
</script>

<div class="flex min-h-screen flex-col">
  <Header />
  <div class="flex flex-1 overflow-hidden">
    <!-- Navigation sidebar -->
    <Navigation class="w-16 flex-shrink-0 border-r" />
    <!-- Main content area -->
    <div class="flex flex-1 flex-col overflow-auto">
      <main class="h-full flex-1 p-4">
        {#if config.MAINTENANCE_MODE}
          <Maintenance />
        {:else}
          <QueryLayout>
            <slot></slot>
          </QueryLayout>
        {/if}
      </main>
      <PrivacyBanner />
      <div class="mt-4">
        <Footer />
      </div>
    </div>
  </div>
</div>
