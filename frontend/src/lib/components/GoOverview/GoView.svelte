<!--
 Copyright 2025 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import cloud from "d3-cloud";
  import "iconify-icon";

  import { sortGoTerms, getAmiGOUrl } from "./goTerms";
  import type { GOAnnotation } from "$lib/external/uniprot";

  export let goAnnotations: GOAnnotation[];
  export let uniprotAcc: string;
  export let maxWordCount: number = 40;

  let className = "";
  export { className as class };

  let svg: SVGElement;

  onMount(() => {
    const width = 500;
    const height = 150;
    const words = sortGoTerms(goAnnotations, maxWordCount);

    const layout = cloud()
      .size([width, height])
      .words(words)
      .font("Inter")
      .rotate(() => 0)
      .padding(5)
      .fontSize((d: any) => Math.min(d.count * 20, 40))
      .on("end", draw);

    function draw(words: any[]) {
      d3.select(svg).selectAll("*").remove();

      d3.select(svg)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .selectAll("text")
        .data(words)
        .join("text")
        .style("font-size", (d) => `${d.fontSize}px`)
        .classed("fill-token", true)
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${[d.x, d.y]})`)
        .text((d) => d.text);
    }

    const layoutInstance = layout.start();

    // Cleanup function
    return () => {
      if (layoutInstance && layoutInstance.stop) {
        layoutInstance.stop();
      }
    };
  });
</script>

<div class="display-block {className}" {...$$restProps}>
  <div class="flex flex-col gap-4">
    <a
      href={getAmiGOUrl(uniprotAcc)}
      class="anchor flex justify-end"
      target="_blank"
      rel="noopener"
    >
      View in AmiGO
      <iconify-icon icon="line-md:external-link"></iconify-icon>
    </a>
    <div class="relative w-full">
      <svg bind:this={svg} class="h-full w-full"></svg>
    </div>
  </div>
</div>
