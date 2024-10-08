<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  import "iconify-icon";

  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        cacheTime: 5 * 24 * 60 * 60 * 1000, // five days in milliseconds
        refetchOnReconnect: false,
      },
    },
  });
</script>

<div class="flex flex-col h-screen">
  <Header />
  <div class="flex flex-1 overflow-hidden">
    <!-- Navigation sidebar -->
    <nav class="w-16 border-r flex-shrink-0">
      <AppRail>
        <AppRailAnchor href="/" selected={$page.url.pathname === "/"}
          ><iconify-icon icon="mdi:home" height="2em"
          ></iconify-icon></AppRailAnchor
        >
        <AppRailAnchor
          href="/filter"
          selected={$page.url.pathname === "/filter"}
          ><iconify-icon icon="mdi:database" height="2em"
          ></iconify-icon></AppRailAnchor
        >
        <AppRailAnchor
          href="/search"
          selected={$page.url.pathname === "/search"}
          ><iconify-icon icon="mdi:search" height="2em"
          ></iconify-icon></AppRailAnchor
        >
      </AppRail>
    </nav>
    <!-- Main content area -->
    <div class="flex flex-col flex-1 overflow-auto">
      <main class="flex-1 p-4">
        <QueryClientProvider client={queryClient}>
          <slot />
          {#if browser}
            <SvelteQueryDevtools />
          {/if}
        </QueryClientProvider>
      </main>
      <Footer />
    </div>
  </div>
</div>
