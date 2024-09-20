<script lang="ts">
  import { browser } from "$app/environment";
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
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

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

<Header />
<QueryClientProvider client={queryClient}>
  <slot />
  <SvelteQueryDevtools />
</QueryClientProvider>
<Footer />
