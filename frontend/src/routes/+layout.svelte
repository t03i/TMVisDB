<script lang="ts">
  import { browser } from "$app/environment";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 60 * 1000,
      },
    },
  });
</script>

<Header />
<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
<Footer />
