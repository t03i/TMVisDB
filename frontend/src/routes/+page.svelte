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

<div class="container mx-auto space-y-6 p-4">
  <h1 class="h1">About {config.APP_NAME}</h1>

  <p>
    <strong>{config.APP_NAME}</strong> provides per-residue transmembrane
    topology annotations for proteins predicted as transmembrane proteins from
    the
    <a href="https://doi.org/10.1093/nar/gkab1061" class="anchor"
      >AlphaFold DB</a
    >. The annotations are predicted with
    <a href="https://doi.org/10.1186/s12859-022-04873-x" class="anchor">TMbed</a
    >, and are visualized by overlaying them with AlphaFold 2 structures.
  </p>

  <!-- TODO improve overview image-->
  <div class="flex place-content-center">
    <img
      src={overview}
      alt="Overview of {config.APP_NAME}"
      class="w-full md:w-2/3"
    />
  </div>

  <div class="mt-4 flex space-x-4">
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

  <div class="card my-4 p-4">
    <h2 class="h3 mb-4">Frequently Asked Questions</h2>
    <FAQ />
  </div>
</div>
