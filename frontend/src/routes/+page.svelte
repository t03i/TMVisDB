<script lang="ts">
  import config from "$lib/config";
  // @ts-ignore
  import overview from "$lib/assets/overview.svg";
  import { DiscussionCategory } from "$lib/github";
  import FAQ from "$lib/components/FAQ.svelte";
</script>

<svelte:head>
  <title>{config.APP_NAME}</title>
</svelte:head>

<div class="container mx-auto flex max-w-screen-xl flex-col px-14">
  <h1 class="h1">About {config.APP_NAME}</h1>

  <p class="mt-3 text-justify">
    <strong>{config.APP_NAME}</strong> provides per-residue topology annotations
    for monomeric proteins predicted as transmembrane proteins from the
    <a href="https://doi.org/10.1093/nar/gkab1061" class="anchor"
      >AlphaFold DB</a
    >. The annotations are predicted with
    <a href="https://doi.org/10.1186/s12859-022-04873-x" class="anchor">TMbed</a
    >, and are visualized by overlaying them with AlphaFold 2 structures.
  </p>

  <!-- TODO improve overview image-->
  <div class="my-8 flex w-full place-content-center">
    <img
      src={overview}
      alt="Overview of {config.APP_NAME}"
      class="w-full md:w-2/3"
    />
  </div>

  <div class="my-4 flex w-full flex-col place-content-center gap-4 md:flex-row">
    <a type="button" class="variant-filled-primary btn" href="filter">
      Start Browsing
    </a>
    <a type="button" class="variant-filled-secondary btn" href="/search">
      Search Protein
    </a>
    <a
      type="button"
      class="variant-filled-tertiary btn"
      href={config.GITHUB_LINKS.getDiscussionsUrl(DiscussionCategory.QA)}
    >
      Ask a Question
    </a>
  </div>

  <hr class="my-4 border-t-4" />

  <div class="card my-4 p-4">
    <h2 class="h3 mb-4 font-bold">Frequently Asked Questions</h2>
    <FAQ />
  </div>
</div>
