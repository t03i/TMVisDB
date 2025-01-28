// Copyright 2025 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import type { GOAnnotation } from "$lib/external/uniprot";

const stopwords = new Set(
  "i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(
    ",",
  ),
);

export function sortGoTerms(
  goAnnotations: Array<GOAnnotation>,
  maxWordCount: number = 40,
) {
  // Flatten the array of words first
  const source = goAnnotations.flatMap((annotation) =>
    annotation.term.split(/[\s.]+/g),
  );

  const words = source
    .map((w) => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
    .map((w) => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
    .map((w) => w.replace(/['’]s$/g, ""))
    .map((w) => w.substring(0, 30))
    .map((w) => w.toLowerCase())
    .filter((w) => w && !stopwords.has(w));

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

export function getQuickGOUrl(uniprotAcc: string) {
  return `https://www.ebi.ac.uk/QuickGO/annotations?geneProductId=${uniprotAcc}`;
}
