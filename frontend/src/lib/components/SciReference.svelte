<script lang="ts">
  import { browser } from "$app/environment";
  import {
    clipboard,
    ProgressRadial,
    type PopupSettings,
    popup,
  } from "@skeletonlabs/skeleton";

  import "iconify-icon";
  import { Cite } from "@citation-js/core";
  import "@citation-js/plugin-doi";
  import "@citation-js/plugin-csl";
  import "@citation-js/plugin-ris";
  import "@citation-js/plugin-bibtex";

  export let doi: string;
  let citeData: any = null;
  let error: string | null = null;
  let isLoading: boolean = false;

  // References to icon elements
  let apaIcon: HTMLElement;
  let bibtexIcon: HTMLElement;
  let risIcon: HTMLElement;

  async function generateCitation() {
    if (!browser || !doi) {
      return;
    }

    isLoading = true;
    error = null;

    try {
      citeData = await Cite.async(doi);
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to generate citation";
      citeData = null;
    } finally {
      isLoading = false;
    }
  }

  function handleClick(iconElement: HTMLElement) {
    iconElement.setAttribute("icon", "mdi:clipboard-check");
    setTimeout(() => {
      iconElement.setAttribute("icon", "mdi:clipboard");
    }, 1000);
  }

  $: if (browser && doi) {
    generateCitation();
  }
</script>

<div {...$$restProps}>
  {#if isLoading}
    <div class="flex place-content-center place-items-center gap-4">
      <ProgressRadial
        value={undefined}
        width="w-10"
        meter="stroke-primary-500"
        track="stroke-primary-500/30"
        strokeLinecap="butt"
        class="leading-none"
      /><span>Loading citation...</span>
    </div>
  {:else if error}
    <div class="flex place-content-center place-items-center gap-4">
      <iconify-icon
        icon="line-md:close-circle"
        class="text-4xl text-error-500"
      />
      {error}
    </div>
  {:else if citeData}
    <div class="flex flex-col gap-2">
      <blockquote class="blockquote">
        {@html citeData.format("bibliography", {
          format: "html",
          template: "apa",
          lang: "en-US",
        })}
      </blockquote>
      <div class="flex flex-row place-content-end gap-4">
        <button
          class="anchor"
          on:click={() => handleClick(apaIcon)}
          use:clipboard={citeData.format("bibliography", {
            format: "text",
            template: "apa",
            lang: "en-US",
          })}
        >
          APA <iconify-icon bind:this={apaIcon} icon="mdi:clipboard"
          ></iconify-icon>
        </button>
        <button
          class="anchor"
          on:click={() => handleClick(bibtexIcon)}
          use:clipboard={citeData.format("bibtex")}
        >
          BibTeX <iconify-icon bind:this={bibtexIcon} icon="mdi:clipboard"
          ></iconify-icon>
        </button>
        <button
          class="anchor"
          on:click={() => handleClick(risIcon)}
          use:clipboard={citeData.format("ris")}
        >
          RIS <iconify-icon bind:this={risIcon} icon="mdi:clipboard"
          ></iconify-icon>
        </button>
        <a
          class="anchor"
          target="_blank"
          rel="noreferrer"
          href={citeData.data[0]["URL"]}
        >
          open <iconify-icon icon="mdi:external-link"></iconify-icon>
        </a>
      </div>
    </div>
  {/if}
</div>
