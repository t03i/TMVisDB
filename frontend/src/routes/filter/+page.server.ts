// src/routes/+page.server.js
import { getRandomProteins } from '$lib/client/tMVis';


export async function load() {
  const numInitialRandom = 20;

  try {
    const response = await getRandomProteins(numInitialRandom);
    console.log('Initial proteins:', response.data);
    return {
      initialProteins: response.data,
      isHydrated: false
    };
  } catch (error) {
    console.error('Error fetching initial proteins:', error);
    return { initialProteins: [], isHydrated: false, error: 'Failed to fetch initial proteins' };
  }
}
