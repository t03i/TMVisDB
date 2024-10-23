// src/routes/+page.server.ts
import { getRandomProteins } from '$lib/client/tmvisdb';
import type { ProteinResponse } from '$lib/client/model';
import type { AxiosError } from 'axios';

export async function load() {
  const numInitialRandom = 20;

  try {
    const response: ProteinResponse | null = await getRandomProteins(numInitialRandom);

    if (!response) {
      throw new Error('No data received from the database');
    }

    return {
      initialProteins: response,
      isHydrated: false,
      error: null
    };
  } catch (error) {
    console.error('Error fetching initial proteins:', error);

    // Handle Axios errors specifically
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // Handle different HTTP status codes
      if (axiosError.response?.status === 404) {
        return {
          initialProteins: null,
          isHydrated: false,
          error: 'Database endpoint not found. Please try again later.'
        };
      } else if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ECONNREFUSED') {
        return {
          initialProteins: null,
          isHydrated: false,
          error: 'Unable to connect to the database. Please check your connection and try again.'
        };
      } else if (axiosError.response?.status === 500) {
        return {
          initialProteins: null,
          isHydrated: false,
          error: 'Database server error. Our team has been notified.'
        };
      }
    }

    // Generic error handler
    return {
      initialProteins: null,
      isHydrated: false,
      error: 'An unexpected error occurred while fetching data. Please try again later.'
    };
  }
}

// Type guard for Axios errors
function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}
