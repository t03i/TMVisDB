import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

export const customMutator = <T>(config: AxiosRequestConfig): Promise<T> => {
  return axios(config).then((response) => response.data);
};
