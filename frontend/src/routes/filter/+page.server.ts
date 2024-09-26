// src/routes/+page.server.ts
import { getRandomProteins } from '$lib/client/tmvisdb';
import type { AxiosResponse } from 'axios';
import type { ProteinResponse } from '$lib/client/model';

export async function load() {
  const numInitialRandom = 20;

  try {
    const response: AxiosResponse<ProteinResponse> = await getRandomProteins(numInitialRandom);

    return {
      initialProteins: response.data,
      isHydrated: false
    };
  } catch (error) {
    console.error('Error fetching initial proteins:', error);
    return { initialProteins: null,  isHydrated: false, error: 'Failed to fetch initial proteins' };
  }
}
