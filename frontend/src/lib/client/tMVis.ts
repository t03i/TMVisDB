/**
 * Generated by orval v7.1.0 🍺
 * Do not edit manually.
 * TMVis
 * OpenAPI spec version: 0.1.0
 */
import {
  createQuery
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  CreateQueryResult,
  QueryFunction,
  QueryKey
} from '@tanstack/svelte-query'
import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  AnnotationLegend,
  DatabaseType,
  GetDbAnnotationsLegends200,
  GetProteinsByLineageParams,
  GetProteinsByOrganismParams,
  GetTaxonomies200,
  HTTPValidationError,
  ProteinInfo,
  PublicAnnotation,
  Taxonomy
} from './model'

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;



/**
 * @summary Get Random Proteins
 */
export const getRandomProteins = (
    numSequences: number, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<ProteinInfo[]>> => {

    return axios.get(
      `/api/v1/proteins/random/${numSequences}/`,options
    );
  }


export const getGetRandomProteinsQueryKey = (numSequences: number,) => {
    return [`/api/v1/proteins/random/${numSequences}/`] as const;
    }


export const getGetRandomProteinsQueryOptions = <TData = Awaited<ReturnType<typeof getRandomProteins>>, TError = AxiosError<HTTPValidationError>>(numSequences: number, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getRandomProteins>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRandomProteinsQueryKey(numSequences);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRandomProteins>>> = ({ signal }) => getRandomProteins(numSequences, { signal, ...axiosOptions });





   return  { queryKey, queryFn, enabled: !!(numSequences), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getRandomProteins>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRandomProteinsQueryResult = NonNullable<Awaited<ReturnType<typeof getRandomProteins>>>
export type GetRandomProteinsQueryError = AxiosError<HTTPValidationError>


/**
 * @summary Get Random Proteins
 */

export function createGetRandomProteins<TData = Awaited<ReturnType<typeof getRandomProteins>>, TError = AxiosError<HTTPValidationError>>(
 numSequences: number, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getRandomProteins>>, TError, TData>, axios?: AxiosRequestConfig}

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetRandomProteinsQueryOptions(numSequences,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Protein By Id
 */
export const getProteinById = (
    uniprotAccession: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<ProteinInfo>> => {

    return axios.get(
      `/api/v1/proteins/${uniprotAccession}`,options
    );
  }


export const getGetProteinByIdQueryKey = (uniprotAccession: string,) => {
    return [`/api/v1/proteins/${uniprotAccession}`] as const;
    }


export const getGetProteinByIdQueryOptions = <TData = Awaited<ReturnType<typeof getProteinById>>, TError = AxiosError<HTTPValidationError>>(uniprotAccession: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinById>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProteinByIdQueryKey(uniprotAccession);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProteinById>>> = ({ signal }) => getProteinById(uniprotAccession, { signal, ...axiosOptions });





   return  { queryKey, queryFn, enabled: !!(uniprotAccession), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getProteinById>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProteinByIdQueryResult = NonNullable<Awaited<ReturnType<typeof getProteinById>>>
export type GetProteinByIdQueryError = AxiosError<HTTPValidationError>


/**
 * @summary Get Protein By Id
 */

export function createGetProteinById<TData = Awaited<ReturnType<typeof getProteinById>>, TError = AxiosError<HTTPValidationError>>(
 uniprotAccession: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinById>>, TError, TData>, axios?: AxiosRequestConfig}

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProteinByIdQueryOptions(uniprotAccession,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Proteins By Organism
 */
export const getProteinsByOrganism = (
    organismId: number,
    params?: GetProteinsByOrganismParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<ProteinInfo[]>> => {

    return axios.get(
      `/api/v1/proteins/by-organism/${organismId}/`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetProteinsByOrganismQueryKey = (organismId: number,
    params?: GetProteinsByOrganismParams,) => {
    return [`/api/v1/proteins/by-organism/${organismId}/`, ...(params ? [params]: [])] as const;
    }


export const getGetProteinsByOrganismQueryOptions = <TData = Awaited<ReturnType<typeof getProteinsByOrganism>>, TError = AxiosError<HTTPValidationError>>(organismId: number,
    params?: GetProteinsByOrganismParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByOrganism>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProteinsByOrganismQueryKey(organismId,params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProteinsByOrganism>>> = ({ signal }) => getProteinsByOrganism(organismId,params, { signal, ...axiosOptions });





   return  { queryKey, queryFn, enabled: !!(organismId), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByOrganism>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProteinsByOrganismQueryResult = NonNullable<Awaited<ReturnType<typeof getProteinsByOrganism>>>
export type GetProteinsByOrganismQueryError = AxiosError<HTTPValidationError>


/**
 * @summary Get Proteins By Organism
 */

export function createGetProteinsByOrganism<TData = Awaited<ReturnType<typeof getProteinsByOrganism>>, TError = AxiosError<HTTPValidationError>>(
 organismId: number,
    params?: GetProteinsByOrganismParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByOrganism>>, TError, TData>, axios?: AxiosRequestConfig}

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProteinsByOrganismQueryOptions(organismId,params,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Proteins By Lineage
 */
export const getProteinsByLineage = (
    lineage: Taxonomy,
    params?: GetProteinsByLineageParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<ProteinInfo[]>> => {

    return axios.get(
      `/api/v1/proteins/by-lineage/${lineage}/`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetProteinsByLineageQueryKey = (lineage: Taxonomy,
    params?: GetProteinsByLineageParams,) => {
    return [`/api/v1/proteins/by-lineage/${lineage}/`, ...(params ? [params]: [])] as const;
    }


export const getGetProteinsByLineageQueryOptions = <TData = Awaited<ReturnType<typeof getProteinsByLineage>>, TError = AxiosError<HTTPValidationError>>(lineage: Taxonomy,
    params?: GetProteinsByLineageParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByLineage>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProteinsByLineageQueryKey(lineage,params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProteinsByLineage>>> = ({ signal }) => getProteinsByLineage(lineage,params, { signal, ...axiosOptions });





   return  { queryKey, queryFn, enabled: !!(lineage), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByLineage>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProteinsByLineageQueryResult = NonNullable<Awaited<ReturnType<typeof getProteinsByLineage>>>
export type GetProteinsByLineageQueryError = AxiosError<HTTPValidationError>


/**
 * @summary Get Proteins By Lineage
 */

export function createGetProteinsByLineage<TData = Awaited<ReturnType<typeof getProteinsByLineage>>, TError = AxiosError<HTTPValidationError>>(
 lineage: Taxonomy,
    params?: GetProteinsByLineageParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByLineage>>, TError, TData>, axios?: AxiosRequestConfig}

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProteinsByLineageQueryOptions(lineage,params,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Protein Annotations
 */
export const getProteinAnnotations = (
    uniprotId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PublicAnnotation[]>> => {

    return axios.get(
      `/api/v1/annotations/${uniprotId}`,options
    );
  }


export const getGetProteinAnnotationsQueryKey = (uniprotId: string,) => {
    return [`/api/v1/annotations/${uniprotId}`] as const;
    }


export const getGetProteinAnnotationsQueryOptions = <TData = Awaited<ReturnType<typeof getProteinAnnotations>>, TError = AxiosError<HTTPValidationError>>(uniprotId: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinAnnotations>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProteinAnnotationsQueryKey(uniprotId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProteinAnnotations>>> = ({ signal }) => getProteinAnnotations(uniprotId, { signal, ...axiosOptions });





   return  { queryKey, queryFn, enabled: !!(uniprotId), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getProteinAnnotations>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProteinAnnotationsQueryResult = NonNullable<Awaited<ReturnType<typeof getProteinAnnotations>>>
export type GetProteinAnnotationsQueryError = AxiosError<HTTPValidationError>


/**
 * @summary Get Protein Annotations
 */

export function createGetProteinAnnotations<TData = Awaited<ReturnType<typeof getProteinAnnotations>>, TError = AxiosError<HTTPValidationError>>(
 uniprotId: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinAnnotations>>, TError, TData>, axios?: AxiosRequestConfig}

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProteinAnnotationsQueryOptions(uniprotId,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Db Annotations Legends
 */
export const getDbAnnotationsLegends = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetDbAnnotationsLegends200>> => {

    return axios.get(
      `/api/v1/info/legends/`,options
    );
  }


export const getGetDbAnnotationsLegendsQueryKey = () => {
    return [`/api/v1/info/legends/`] as const;
    }


export const getGetDbAnnotationsLegendsQueryOptions = <TData = Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError = AxiosError<unknown>>( options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetDbAnnotationsLegendsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getDbAnnotationsLegends>>> = ({ signal }) => getDbAnnotationsLegends({ signal, ...axiosOptions });





   return  { queryKey, queryFn, ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError, TData> & { queryKey: QueryKey }
}

export type GetDbAnnotationsLegendsQueryResult = NonNullable<Awaited<ReturnType<typeof getDbAnnotationsLegends>>>
export type GetDbAnnotationsLegendsQueryError = AxiosError<unknown>


/**
 * @summary Get Db Annotations Legends
 */

export function createGetDbAnnotationsLegends<TData = Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError = AxiosError<unknown>>(
  options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError, TData>, axios?: AxiosRequestConfig}

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetDbAnnotationsLegendsQueryOptions(options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Annotation Legend For Db
 */
export const getAnnotationLegendForDb = (
    dbName: DatabaseType, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<AnnotationLegend>> => {

    return axios.get(
      `/api/v1/info/legend/${dbName}`,options
    );
  }


export const getGetAnnotationLegendForDbQueryKey = (dbName: DatabaseType,) => {
    return [`/api/v1/info/legend/${dbName}`] as const;
    }


export const getGetAnnotationLegendForDbQueryOptions = <TData = Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError = AxiosError<HTTPValidationError>>(dbName: DatabaseType, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAnnotationLegendForDbQueryKey(dbName);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAnnotationLegendForDb>>> = ({ signal }) => getAnnotationLegendForDb(dbName, { signal, ...axiosOptions });





   return  { queryKey, queryFn, enabled: !!(dbName), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError, TData> & { queryKey: QueryKey }
}

export type GetAnnotationLegendForDbQueryResult = NonNullable<Awaited<ReturnType<typeof getAnnotationLegendForDb>>>
export type GetAnnotationLegendForDbQueryError = AxiosError<HTTPValidationError>


/**
 * @summary Get Annotation Legend For Db
 */

export function createGetAnnotationLegendForDb<TData = Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError = AxiosError<HTTPValidationError>>(
 dbName: DatabaseType, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError, TData>, axios?: AxiosRequestConfig}

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetAnnotationLegendForDbQueryOptions(dbName,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Taxonomies
 */
export const getTaxonomies = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetTaxonomies200>> => {

    return axios.get(
      `/api/v1/info/taxonomies/`,options
    );
  }


export const getGetTaxonomiesQueryKey = () => {
    return [`/api/v1/info/taxonomies/`] as const;
    }


export const getGetTaxonomiesQueryOptions = <TData = Awaited<ReturnType<typeof getTaxonomies>>, TError = AxiosError<unknown>>( options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getTaxonomies>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTaxonomiesQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTaxonomies>>> = ({ signal }) => getTaxonomies({ signal, ...axiosOptions });





   return  { queryKey, queryFn, ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getTaxonomies>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTaxonomiesQueryResult = NonNullable<Awaited<ReturnType<typeof getTaxonomies>>>
export type GetTaxonomiesQueryError = AxiosError<unknown>


/**
 * @summary Get Taxonomies
 */

export function createGetTaxonomies<TData = Awaited<ReturnType<typeof getTaxonomies>>, TError = AxiosError<unknown>>(
  options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getTaxonomies>>, TError, TData>, axios?: AxiosRequestConfig}

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetTaxonomiesQueryOptions(options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}