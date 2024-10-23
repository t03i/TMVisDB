// src/routes/+page.server.ts
import { getRandomProteins } from '$lib/client/tmvisdb';
import type { ProteinResponse } from '$lib/client/model';
import type { AxiosError } from 'axios';
import { error } from '@sveltejs/kit';

export async function load() {
  const numInitialRandom = 20;

  try {
    const response: ProteinResponse | null = await getRandomProteins(numInitialRandom);

    if (!response) {
      throw new Error('No data received from the database');
    }

    return {
      initialProteins: response,
      isHydrated: false
    };
  } catch (err) {
    console.error('Error fetching initial proteins:', err);

    // Handle Axios errors
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === 404) {
        throw error(404, {
          message: 'Database endpoint not found. Please try again later.'
        });
      } else if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ECONNREFUSED') {
        throw error(503, {
          message: 'Unable to connect to the database. Please check your connection and try again.'
        });
      } else if (axiosError.response?.status === 500) {
        throw error(500, {
          message: 'Database server error. Our team has been notified.'
        });
      }
    }

    // Generic error
    throw error(500, {
      message: 'An unexpected error occurred while fetching data. Please try again later.'
    });
  }
}

function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}
