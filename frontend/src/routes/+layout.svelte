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
  import GdprBanner from "@beyonk/gdpr-cookie-consent-banner";

  import {
    Header,
    Footer,
    Navigation,
    QueryLayout,
  } from "$lib/components/Layout";
  import config from "$lib/config";
  import Maintenance from "$lib/components/Maintenance.svelte";
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
          <Maintenance message={config.MAINTENANCE_MESSAGE} />
        {:else}
          <QueryLayout>
            <slot></slot>
          </QueryLayout>
        {/if}
      </main>
      <div class="mt-4">
        <Footer />
      </div>
    </div>
  </div>
  <GdprBanner
    cookieName="gdpr_consent"
    heading="Privacy Notice"
    description="We do not collect any personal data beyond the necessities to operate this site. The only cookie is used to acknowledge this banner."
    choices={{
      necessary: {
        label: "Necessary cookies",
        description: "Used for cookie control. Can't be turned off.",
        value: true,
      },
      tracking: {
        label: "Tracking cookies",
        description: "Used for advertising purposes.",
        value: false,
      },
      analytics: {
        label: "Analytics cookies",
        description:
          "Used to control Google Analytics, a 3rd party tool offered by Google to track user behavior.",
        value: false,
      },
      marketing: {
        label: "Marketing cookies",
        description: "Used for marketing data.",
        value: false,
      },
    }}
    showEditIcon={false}
  />
</div>
