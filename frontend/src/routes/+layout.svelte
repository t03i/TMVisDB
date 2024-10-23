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

  import "../app.css";
  import {
    Header,
    Footer,
    Navigation,
    QueryLayout,
  } from "$lib/components/Layout";
</script>

<div class="flex min-h-screen flex-col">
  <Header />
  <div class="flex flex-1 overflow-hidden">
    <!-- Navigation sidebar -->
    <Navigation class="w-16 flex-shrink-0 border-r" />
    <!-- Main content area -->
    <div class="flex flex-1 flex-col overflow-auto">
      <main class="h-full flex-1 p-4">
        <QueryLayout>
          <slot></slot>
        </QueryLayout>
      </main>
      <div class="mt-4">
        <Footer />
      </div>
    </div>
  </div>
</div>
