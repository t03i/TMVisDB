// Copyright 2025 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import * as d3 from "d3";
import cloud, { type Word } from "d3-cloud";

export interface WordCloudOptions<T extends Word> {
  width?: number;
  height?: number;
  word?: (d: T) => string;
  size?: (d: T) => number;
  rotate?: (d: T) => number;
  fill?: (d: T) => string;
  fontScale?: number;
  padding?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  fontFamily?: string;
}

export function WordCloud<T extends Word>(
  words: Array<T>,
  svg: SVGElement,
  options: WordCloudOptions<T> = {},
) {
  const {
    width = 16,
    height = 9,
    fontFamily = "sans-serif",
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    fontScale = 10,
    padding = 0,
    rotate = 0,
  } = options;

  const svgContainer = d3
    .select(svg)
    .attr("viewBox", [0, 0, width, height])
    .attr("font-family", fontFamily)
    .attr("text-anchor", "middle");

  const g = svgContainer
    .append("g")
    .attr("transform", `translate(${marginLeft},${marginTop})`);

  const wordCloud = cloud()
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .words(words)
    .padding(options.padding ?? 0)
    .rotate((d) => options.rotate?.(d as T) ?? 0)
    .font(options.fontFamily ?? "sans-serif")
    .text((d) => options.word?.(d as T) ?? "")
    .fontSize((d) => (options.size?.(d as T) ?? 1) * (options.fontScale ?? 30))
    .on("word", (word: T) => {
      g.append("text")
        .datum(word.text)
        .attr("font-size", `${word.size ?? 1}px`)
        .attr("fill", options.fill?.(word) ?? "black")
        .attr(
          "transform",
          `translate(${word.x},${word.y}) rotate(${word.rotate})`,
        )
        .text(word.text ?? "");
    });

  wordCloud.start();

  return () => {
    wordCloud.stop();
    d3.select(svg).selectAll("*").remove();
  };
}
