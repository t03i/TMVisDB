<script lang="ts">
  import { browser } from "$app/environment";
  import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
        cacheTime: 5 * 24 * 60 * 60 * 1000, // 5 days
        refetchOnReconnect: false,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
  <slot></slot>
  {#if browser && import.meta.env.DEV}
    <SvelteQueryDevtools />
  {/if}
</QueryClientProvider>
