// src/routes/+page.server.js
import { getRandomProteins } from '$lib/client/tMVis';

export const config = {
  isr: {
    expiration: 36000 // Revalidate every 10 hours
  }
};

export async function load() {
  const numInitialRandom = 100;

  try {
    const response = await getRandomProteins(numInitialRandom);
    return {
      initialProteins: response.data,
      isHydrated: false // Flag to indicate this is initial SSR data
    };
  } catch (error) {
    console.error('Error fetching initial proteins:', error);
    return { initialProteins: [], isHydrated: false, error: 'Failed to fetch initial proteins' };
  }
}
