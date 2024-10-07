import { derived, writable } from 'svelte/store';
import { createGetAlphaFoldStructure, type AlphaFoldStructure} from '$lib/external/alphaFoldDB';
import type { CreateQueryResult } from '@tanstack/svelte-query';

export function createStructureStore(uniprotAcc: string ) {
  const query = createGetAlphaFoldStructure(uniprotAcc) as unknown as CreateQueryResult<AlphaFoldStructure, Error>;

  const data = derived(query, ($query) => $query?.isSuccess ? $query.data : null);

  const structureUrl = writable<string | null>(null);

  const unsubscribe = data.subscribe(($data) => {
    if ($data) {
      const blob = new Blob([$data.structureData], {
        type: $data.binary ? 'application/octet-stream' : 'text/plain',
      });
      const blobUrl = URL.createObjectURL(blob);
      structureUrl.set(blobUrl);
    }
  });

  function cleanup() {
    unsubscribe();
    structureUrl.subscribe((url) => {
      if (url) URL.revokeObjectURL(url);
    })();
  }

  return {
    query,
    data,
    structureUrl: { subscribe: structureUrl.subscribe },
    cleanup
  };
}
