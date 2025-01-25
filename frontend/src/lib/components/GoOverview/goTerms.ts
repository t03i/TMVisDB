// Copyright 2025 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import type { GOAnnotation } from "$lib/external/uniprot";

export function sortGoTerms(
  goAnnotations: Array<GOAnnotation>,
  maxWordCount: number = 40,
) {
  // Flatten the array of words first
  const words = goAnnotations.flatMap((annotation) =>
    annotation.term.split(" "),
  );

  // Count word frequencies
  const wordCounts = words.reduce(
    (acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const sortedWords = Object.entries(wordCounts)
    .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
    .slice(0, maxWordCount)
    .map(([word, count]) => ({
      text: word,
      value: count,
    }));

  return sortedWords;
}

export function getAmiGOUrl(uniprotAcc: string) {
  return `https://www.ebi.ac.uk/QuickGO/annotations?geneProductId=${uniprotAcc}`;
}
