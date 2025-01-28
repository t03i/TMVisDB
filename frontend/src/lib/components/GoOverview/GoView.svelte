<!--
 Copyright 2025 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { onMount } from "svelte";
  import "iconify-icon";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

  import { sortGoTerms, getQuickGOUrl } from "./goTerms";
  import type { GOAnnotation } from "$lib/external/uniprot";
  import { WordCloud } from "./WordCloud";

  export let goAnnotations: GOAnnotation[];
  export let uniprotAcc: string;
  export let maxWordCount: number = 40;

  let className = "";
  export { className as class };

  let svg: SVGElement;

  onMount(() => {
    const words = sortGoTerms(goAnnotations, maxWordCount);
    const wordCloudCleanup = WordCloud<{ text: string; value: number }>(
      words,
      svg,
      {
        size: (d) => d.value ?? 1,
        word: (d) => d.text ?? "",
        width: 250,
        height: 100,
        fontScale: 8,
        padding: 3,
      },
    );

    return () => {
      wordCloudCleanup();
    };
  });
</script>

<div class="display-block {className}" {...$$restProps}>
  <a
    href={getQuickGOUrl(uniprotAcc)}
    class="anchor flex justify-end"
    target="_blank"
    rel="noopener"
  >
    View all terms in QuickGO
    <iconify-icon icon="line-md:external-link"></iconify-icon>
  </a>
  <div class="flex flex-col gap-4">
    <Accordion>
      <AccordionItem>
        <svelte:fragment slot="lead">
          <iconify-icon icon="ph:question-bold" class="text-base-content/60"
          ></iconify-icon>
        </svelte:fragment>
        <svelte:fragment slot="summary">
          Showing {goAnnotations.length} GO terms
        </svelte:fragment>
        <svelte:fragment slot="content">
          This word cloud visualizes the top {maxWordCount} distinct words found
          in all Gene Ontology (GO) terms associated with this protein. Larger words
          indicate words that appear more frequently in the annotations. Go Annotations
          are retrieved from UniProt.
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
    <div class="relative w-full">
      <svg bind:this={svg} class="h-64 w-full"></svg>
    </div>
  </div>
</div>
