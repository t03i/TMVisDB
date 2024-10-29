// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0
import { useQueryClient, type CreateQueryResult } from "@tanstack/svelte-query";
import { derived, writable, type Readable, type Writable } from "svelte/store";

import type { DBReferences, TrackData } from "$lib/annotations";
import {
  annotationsToReferences,
  annotationsToTracks,
  annotationToStructureQuery,
  type StructureSelectionQuery,
} from "$lib/annotations";
import type {
  AnnotationData,
  ProteinInfo,
  PublicAnnotation,
} from "$lib/client/model";
import { createGetProteinAnnotations } from "$lib/client/tmvisdb";
import { createGetTMAlphaFoldAnnotation } from "$lib/external/tmAlphaFold";
import {
  createGetUniprotAnnotation,
  type UniprotAnnotationData,
} from "$lib/external/uniprot";

export function createAnnotationStore(
  uniprotAcc: string,
  tmvisdbInfo: CreateQueryResult<ProteinInfo>,
) {
  const queryClient = useQueryClient();
  const uniprotQuery = createGetUniprotAnnotation(
    uniprotAcc,
  ) as unknown as CreateQueryResult<UniprotAnnotationData>;
  const tmvisdbQuery = createGetProteinAnnotations(
    uniprotAcc,
  ) as unknown as CreateQueryResult<AnnotationData>;

  const uniprotData = derived(uniprotQuery, ($query) =>
    $query?.isSuccess ? $query.data : null,
  );
  const tmvisdbData = derived(tmvisdbQuery, ($query) =>
    $query?.isSuccess ? $query.data : null,
  );

  const proteinId = derived(
    [uniprotData, tmvisdbInfo],
    ([$uniprot, $tmvisdbInfo]) =>
      $uniprot?.name ? $uniprot.name : $tmvisdbInfo?.data?.uniprot_id,
  );

  const tmAlphaFoldData: Writable<AnnotationData | null> = writable(null);

  const tmAlphaFoldQuery = derived(proteinId, ($proteinId, set) => {
    if ($proteinId) {
      const query = createGetTMAlphaFoldAnnotation($proteinId, queryClient);
      const unsubscribe = query.subscribe((data) => {
        if (data.isSuccess) {
          tmAlphaFoldData.set(data.data);
        }
      });
      set(query);
      return unsubscribe;
    }
    set(null);
  }) as unknown as CreateQueryResult<AnnotationData> | Readable<null>;

  const isFetching = derived(
    [uniprotQuery, tmvisdbQuery, tmAlphaFoldQuery],
    ([$uniprot, $tmvisdb, $tmAlphaFold]) => {
      return (
        $uniprot?.isFetching || $tmvisdb?.isFetching || $tmAlphaFold?.isFetching
      );
    },
  );

  const annotations = derived(
    [uniprotData, tmvisdbData, tmAlphaFoldData],
    ([$uniprot, $tmvisdb, $tmAlphaFold]) => {
      const annotations: PublicAnnotation[] = [
        ...($uniprot?.annotations ?? []),
        ...($tmvisdb?.annotations ?? []),
        ...($tmAlphaFold?.annotations ?? []),
      ];
      return annotations;
    },
  );

  const annotationDBReferences: Readable<DBReferences | null> = derived(
    annotations,
    ($annotations) =>
      $annotations.length > 0 ? annotationsToReferences($annotations) : null,
  );

  const annotationTracks: Readable<TrackData | null> = derived(
    annotations,
    ($annotations) =>
      $annotations.length > 0 ? annotationsToTracks($annotations) : null,
  );

  const annotationStructureQuery: Readable<StructureSelectionQuery[] | null> =
    derived(annotations, ($annotations) =>
      $annotations.length > 0 ? annotationToStructureQuery($annotations) : null,
    );

  return {
    uniprotQuery,
    tmvisdbQuery,
    tmAlphaFoldQuery,
    isFetching,
    annotationDBReferences,
    annotationTracks,
    annotationStructureQuery,
  };
}
