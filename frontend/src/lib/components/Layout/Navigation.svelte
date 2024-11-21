<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
  import "iconify-icon";

  const navItems = [
    { href: "/", icon: "mdi:home", label: "Home" },
    { href: "/filter", icon: "mdi:database", label: "Database" },
    { href: "/search", icon: "mdi:search", label: "Search" },
  ] as const;
</script>

<nav {...$$restProps}>
  <AppRail>
    {#each navItems as { href, icon, label }}
      <AppRailAnchor
        data-sveltekit-preload-data="hover"
        on:click={() => goto(href)}
        selected={$page.url.pathname === href}
        title={label}
      >
        <iconify-icon {icon} height="2em"></iconify-icon>
      </AppRailAnchor>
    {/each}
  </AppRail>
</nav>
