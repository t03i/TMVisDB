<!-- ScreenshotControls.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let plugin: any;
  export let show = false;
  export let onClose = () => {};

  let isDisabled = false;
  let showPreview = true;
  let imageData: string | undefined = undefined;
  let helper: any;
  let cropParams: any;
  let screenshotValues: any;
  let isFullFrame = true;

  // Initialize screenshot helper
  onMount(() => {
    helper = plugin.helpers.viewportScreenshot;

    // Subscribe to state updates
    const unsubscribeState = plugin.state.data.behaviors.isUpdating.subscribe(
      (v: boolean) => (isDisabled = v),
    );

    // Subscribe to crop parameters
    const unsubscribeCrop = helper.behaviors.cropParams.subscribe(
      (params: any) => (cropParams = params),
    );

    // Subscribe to values
    const unsubscribeValues = helper.behaviors.values.subscribe(
      (values: any) => (screenshotValues = values),
    );

    return () => {
      unsubscribeState();
      unsubscribeCrop();
      unsubscribeValues();
      imageData = undefined;
    };
  });

  async function handleDownload() {
    await helper?.download();
    onClose();
  }

  async function handleCopy() {
    try {
      await helper?.copyToClipboard();
      // You can integrate this with your toast system
      console.log("Copied to clipboard");
    } catch {
      handleCopyImg();
    }
  }

  async function handleCopyImg() {
    const src = await helper?.getImageDataUri();
    imageData = src;
  }

  function updateValues(newValues: any) {
    helper.behaviors.values.next(newValues);
  }

  function toggleAutocrop() {
    helper.toggleAutocrop();
  }

  function autoCrop() {
    helper.autocrop();
  }

  function resetCrop() {
    helper.resetCrop();
  }
</script>

{#if show}
  <div
    class="screenshot-controls card variant-glass-surface absolute left-1/2 top-1/2 z-20 w-96 -translate-x-1/2 -translate-y-1/2 p-4"
  >
    <header class="mb-4 flex justify-between">
      <h3 class="h3">Screenshot</h3>
      <button class="variant-soft btn-icon" on:click={onClose}>
        <iconify-icon icon="mdi:close" />
      </button>
    </header>

    {#if showPreview}
      <div class="preview-container">
        <!-- Screenshot Preview -->
        <div
          class="bg-surface-100-800-token mb-4 aspect-video overflow-hidden rounded-token"
        >
          <!-- Preview is handled by MolStar directly -->
        </div>

        <!-- Crop Controls -->
        <div class="mt-2 flex h-8 items-center justify-between">
          <button
            class="variant-soft btn"
            class:variant-filled-primary={cropParams?.auto}
            on:click={toggleAutocrop}
          >
            <iconify-icon icon="mdi:crop" class="mr-2" />
            Auto-crop {cropParams?.auto ? "On" : "Off"}
          </button>

          {#if !cropParams?.auto}
            <div class="flex gap-2">
              <button
                class="variant-soft btn-icon"
                on:click={autoCrop}
                title="Crop"
              >
                <iconify-icon icon="mdi:crop" />
              </button>

              {#if !isFullFrame}
                <button
                  class="variant-soft btn-icon"
                  on:click={resetCrop}
                  title="Reset Crop"
                >
                  <iconify-icon icon="mdi:crop-free" />
                </button>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Action Buttons -->
    <div class="mt-4 flex gap-2">
      {#if !imageData}
        <button
          class="variant-filled-primary btn"
          on:click={handleCopy}
          disabled={isDisabled}
        >
          <iconify-icon icon="mdi:content-copy" class="mr-2" />
          Copy
        </button>
      {:else}
        <button
          class="variant-soft btn"
          on:click={() => (imageData = undefined)}
          disabled={isDisabled}
        >
          Clear
        </button>
      {/if}

      <button
        class="variant-filled-surface btn"
        on:click={handleDownload}
        disabled={isDisabled}
      >
        <iconify-icon icon="mdi:download" class="mr-2" />
        Download
      </button>
    </div>

    <!-- Copy Image Fallback -->
    {#if imageData}
      <div class="mt-4 text-center">
        <div class="mb-2">Right click below + Copy Image</div>
        <img src={imageData} alt="Screenshot" class="block h-8 w-full" />
      </div>
    {/if}

    <!-- Screenshot Parameters -->
    {#if helper && screenshotValues}
      <div class="mt-4 grid gap-2">
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            class="checkbox"
            bind:checked={screenshotValues.transparent}
            on:change={() => updateValues(screenshotValues)}
          />
          Transparent Background
        </label>

        <div class="grid grid-cols-2 gap-2">
          <div class="input-group input-group-divider grid-cols-[auto_1fr]">
            <span>Width</span>
            <input
              type="number"
              class="input"
              bind:value={screenshotValues.width}
              on:change={() => updateValues(screenshotValues)}
            />
          </div>

          <div class="input-group input-group-divider grid-cols-[auto_1fr]">
            <span>Height</span>
            <input
              type="number"
              class="input"
              bind:value={screenshotValues.height}
              on:change={() => updateValues(screenshotValues)}
            />
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .screenshot-controls {
    backdrop-filter: blur(8px);
  }

  .btn-icon {
    @apply rounded-full p-2;
  }
</style>
