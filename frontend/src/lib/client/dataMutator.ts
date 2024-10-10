import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

export const dataMutator = <T>(config: AxiosRequestConfig): Promise<T> => {
  return axios(config).then((response) => response.data);
};
