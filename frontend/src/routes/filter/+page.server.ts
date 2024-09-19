// src/routes/+page.server.js
import { getRandomProteins, getTaxonomies } from '$lib/client/tMVis';


export async function load() {
  const numInitialRandom = 20;

  try {
    const response = await getRandomProteins(numInitialRandom);
    const taxonomies = await getTaxonomies();

    return {
      initialProteins: response.data,
      taxonomies: taxonomies.data,
      isHydrated: false
    };
  } catch (error) {
    console.error('Error fetching initial proteins:', error);
    return { initialProteins: [], taxonomies: {}, isHydrated: false, error: 'Failed to fetch initial proteins' };
  }
}
