<script lang="ts">
  import { onMount } from "svelte";
  import "iconify-icon";

  let showBanner = false;

  onMount(() => {
    const consent = localStorage.getItem("gdpr_consent");
    if (!consent) {
      showBanner = true;
    }
  });

  function handleAccept() {
    localStorage.setItem("gdpr_consent", "true");
    showBanner = false;
  }

  function handleDecline() {
    localStorage.setItem("gdpr_consent", "false");
    showBanner = false;
  }
</script>

{#if showBanner}
  <aside class="fixed bottom-2 flex w-full place-content-center">
    <div class="alert variant-filled-surface">
      <!-- Message -->
      <div class="alert-message">
        <h3 class="h3">Privacy Notice</h3>
        <p>
          We do not collect any personal data beyond the necessities to operate
          this site. All data stored locally is necessary for site-operation.
        </p>
      </div>
      <!-- Actions -->
      <div class="alert-actions">
        <button on:click={handleAccept}
          ><iconify-icon icon="mdi:tick" height="3em"></iconify-icon></button
        >
      </div>
    </div>
  </aside>
{/if}
