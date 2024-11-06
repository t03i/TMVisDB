/**
 * Generated by orval v7.2.0 🍺
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
import type {
  AnnotationData,
  AnnotationLegend,
  Clade,
  DatabaseType,
  GetDbAnnotationsLegends200,
  GetProteinsByCladeParams,
  GetProteinsByOrganismParams,
  GetProteinsBySuperKingdomParams,
  GetTaxonomies200,
  HTTPValidationError,
  ProteinExistence,
  ProteinInfo,
  ProteinResponse,
  SuperKingdom
} from './model'
import { dataMutator } from './dataMutator';

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;



/**
 * @summary Get Random Proteins
 */
export const getRandomProteins = (
    numSequences: number,
 signal?: AbortSignal
) => {
      
      
      return dataMutator<ProteinResponse>(
      {url: `/api/v1/proteins/random/${numSequences}/`, method: 'GET', signal
    },
      );
    }
  

export const getGetRandomProteinsQueryKey = (numSequences: number,) => {
    return [`/api/v1/proteins/random/${numSequences}/`] as const;
    }

    
export const getGetRandomProteinsQueryOptions = <TData = Awaited<ReturnType<typeof getRandomProteins>>, TError = HTTPValidationError>(numSequences: number, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getRandomProteins>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRandomProteinsQueryKey(numSequences);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRandomProteins>>> = ({ signal }) => getRandomProteins(numSequences, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(numSequences), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getRandomProteins>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRandomProteinsQueryResult = NonNullable<Awaited<ReturnType<typeof getRandomProteins>>>
export type GetRandomProteinsQueryError = HTTPValidationError


/**
 * @summary Get Random Proteins
 */

export function createGetRandomProteins<TData = Awaited<ReturnType<typeof getRandomProteins>>, TError = HTTPValidationError>(
 numSequences: number, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getRandomProteins>>, TError, TData>, }

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
    uniprotAccession: string,
 signal?: AbortSignal
) => {
      
      
      return dataMutator<ProteinInfo>(
      {url: `/api/v1/proteins/${uniprotAccession}`, method: 'GET', signal
    },
      );
    }
  

export const getGetProteinByIdQueryKey = (uniprotAccession: string,) => {
    return [`/api/v1/proteins/${uniprotAccession}`] as const;
    }

    
export const getGetProteinByIdQueryOptions = <TData = Awaited<ReturnType<typeof getProteinById>>, TError = HTTPValidationError>(uniprotAccession: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinById>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProteinByIdQueryKey(uniprotAccession);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProteinById>>> = ({ signal }) => getProteinById(uniprotAccession, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(uniprotAccession), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getProteinById>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProteinByIdQueryResult = NonNullable<Awaited<ReturnType<typeof getProteinById>>>
export type GetProteinByIdQueryError = HTTPValidationError


/**
 * @summary Get Protein By Id
 */

export function createGetProteinById<TData = Awaited<ReturnType<typeof getProteinById>>, TError = HTTPValidationError>(
 uniprotAccession: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinById>>, TError, TData>, }

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
    params?: GetProteinsByOrganismParams,
 signal?: AbortSignal
) => {
      
      
      return dataMutator<ProteinResponse>(
      {url: `/api/v1/proteins/by-organism/${organismId}/`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetProteinsByOrganismQueryKey = (organismId: number,
    params?: GetProteinsByOrganismParams,) => {
    return [`/api/v1/proteins/by-organism/${organismId}/`, ...(params ? [params]: [])] as const;
    }

    
export const getGetProteinsByOrganismQueryOptions = <TData = Awaited<ReturnType<typeof getProteinsByOrganism>>, TError = HTTPValidationError>(organismId: number,
    params?: GetProteinsByOrganismParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByOrganism>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProteinsByOrganismQueryKey(organismId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProteinsByOrganism>>> = ({ signal }) => getProteinsByOrganism(organismId,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(organismId), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByOrganism>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProteinsByOrganismQueryResult = NonNullable<Awaited<ReturnType<typeof getProteinsByOrganism>>>
export type GetProteinsByOrganismQueryError = HTTPValidationError


/**
 * @summary Get Proteins By Organism
 */

export function createGetProteinsByOrganism<TData = Awaited<ReturnType<typeof getProteinsByOrganism>>, TError = HTTPValidationError>(
 organismId: number,
    params?: GetProteinsByOrganismParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByOrganism>>, TError, TData>, }

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProteinsByOrganismQueryOptions(organismId,params,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Proteins By Super Kingdom
 */
export const getProteinsBySuperKingdom = (
    superKingdom: SuperKingdom,
    params?: GetProteinsBySuperKingdomParams,
 signal?: AbortSignal
) => {
      
      
      return dataMutator<ProteinResponse>(
      {url: `/api/v1/proteins/by-lineage/${superKingdom}/`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetProteinsBySuperKingdomQueryKey = (superKingdom: SuperKingdom,
    params?: GetProteinsBySuperKingdomParams,) => {
    return [`/api/v1/proteins/by-lineage/${superKingdom}/`, ...(params ? [params]: [])] as const;
    }

    
export const getGetProteinsBySuperKingdomQueryOptions = <TData = Awaited<ReturnType<typeof getProteinsBySuperKingdom>>, TError = HTTPValidationError>(superKingdom: SuperKingdom,
    params?: GetProteinsBySuperKingdomParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsBySuperKingdom>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProteinsBySuperKingdomQueryKey(superKingdom,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProteinsBySuperKingdom>>> = ({ signal }) => getProteinsBySuperKingdom(superKingdom,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(superKingdom), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getProteinsBySuperKingdom>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProteinsBySuperKingdomQueryResult = NonNullable<Awaited<ReturnType<typeof getProteinsBySuperKingdom>>>
export type GetProteinsBySuperKingdomQueryError = HTTPValidationError


/**
 * @summary Get Proteins By Super Kingdom
 */

export function createGetProteinsBySuperKingdom<TData = Awaited<ReturnType<typeof getProteinsBySuperKingdom>>, TError = HTTPValidationError>(
 superKingdom: SuperKingdom,
    params?: GetProteinsBySuperKingdomParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsBySuperKingdom>>, TError, TData>, }

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProteinsBySuperKingdomQueryOptions(superKingdom,params,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Proteins By Clade
 */
export const getProteinsByClade = (
    superKingdom: SuperKingdom,
    clade: Clade,
    params?: GetProteinsByCladeParams,
 signal?: AbortSignal
) => {
      
      
      return dataMutator<ProteinResponse>(
      {url: `/api/v1/proteins/by-lineage/${superKingdom}/${clade}/`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetProteinsByCladeQueryKey = (superKingdom: SuperKingdom,
    clade: Clade,
    params?: GetProteinsByCladeParams,) => {
    return [`/api/v1/proteins/by-lineage/${superKingdom}/${clade}/`, ...(params ? [params]: [])] as const;
    }

    
export const getGetProteinsByCladeQueryOptions = <TData = Awaited<ReturnType<typeof getProteinsByClade>>, TError = HTTPValidationError>(superKingdom: SuperKingdom,
    clade: Clade,
    params?: GetProteinsByCladeParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByClade>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProteinsByCladeQueryKey(superKingdom,clade,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProteinsByClade>>> = ({ signal }) => getProteinsByClade(superKingdom,clade,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(superKingdom && clade), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByClade>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProteinsByCladeQueryResult = NonNullable<Awaited<ReturnType<typeof getProteinsByClade>>>
export type GetProteinsByCladeQueryError = HTTPValidationError


/**
 * @summary Get Proteins By Clade
 */

export function createGetProteinsByClade<TData = Awaited<ReturnType<typeof getProteinsByClade>>, TError = HTTPValidationError>(
 superKingdom: SuperKingdom,
    clade: Clade,
    params?: GetProteinsByCladeParams, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinsByClade>>, TError, TData>, }

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProteinsByCladeQueryOptions(superKingdom,clade,params,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Check Protein Exists
 */
export const checkProteinExists = (
    uniprotAccession: string,
 signal?: AbortSignal
) => {
      
      
      return dataMutator<ProteinExistence>(
      {url: `/api/v1/proteins/exists/${uniprotAccession}`, method: 'GET', signal
    },
      );
    }
  

export const getCheckProteinExistsQueryKey = (uniprotAccession: string,) => {
    return [`/api/v1/proteins/exists/${uniprotAccession}`] as const;
    }

    
export const getCheckProteinExistsQueryOptions = <TData = Awaited<ReturnType<typeof checkProteinExists>>, TError = HTTPValidationError>(uniprotAccession: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof checkProteinExists>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getCheckProteinExistsQueryKey(uniprotAccession);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof checkProteinExists>>> = ({ signal }) => checkProteinExists(uniprotAccession, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(uniprotAccession), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof checkProteinExists>>, TError, TData> & { queryKey: QueryKey }
}

export type CheckProteinExistsQueryResult = NonNullable<Awaited<ReturnType<typeof checkProteinExists>>>
export type CheckProteinExistsQueryError = HTTPValidationError


/**
 * @summary Check Protein Exists
 */

export function createCheckProteinExists<TData = Awaited<ReturnType<typeof checkProteinExists>>, TError = HTTPValidationError>(
 uniprotAccession: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof checkProteinExists>>, TError, TData>, }

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getCheckProteinExistsQueryOptions(uniprotAccession,options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get Protein Annotations
 */
export const getProteinAnnotations = (
    uniprotId: string,
 signal?: AbortSignal
) => {
      
      
      return dataMutator<AnnotationData>(
      {url: `/api/v1/annotations/${uniprotId}`, method: 'GET', signal
    },
      );
    }
  

export const getGetProteinAnnotationsQueryKey = (uniprotId: string,) => {
    return [`/api/v1/annotations/${uniprotId}`] as const;
    }

    
export const getGetProteinAnnotationsQueryOptions = <TData = Awaited<ReturnType<typeof getProteinAnnotations>>, TError = HTTPValidationError>(uniprotId: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinAnnotations>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProteinAnnotationsQueryKey(uniprotId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProteinAnnotations>>> = ({ signal }) => getProteinAnnotations(uniprotId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(uniprotId), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getProteinAnnotations>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProteinAnnotationsQueryResult = NonNullable<Awaited<ReturnType<typeof getProteinAnnotations>>>
export type GetProteinAnnotationsQueryError = HTTPValidationError


/**
 * @summary Get Protein Annotations
 */

export function createGetProteinAnnotations<TData = Awaited<ReturnType<typeof getProteinAnnotations>>, TError = HTTPValidationError>(
 uniprotId: string, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getProteinAnnotations>>, TError, TData>, }

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
    
 signal?: AbortSignal
) => {
      
      
      return dataMutator<GetDbAnnotationsLegends200>(
      {url: `/api/v1/info/legends/`, method: 'GET', signal
    },
      );
    }
  

export const getGetDbAnnotationsLegendsQueryKey = () => {
    return [`/api/v1/info/legends/`] as const;
    }

    
export const getGetDbAnnotationsLegendsQueryOptions = <TData = Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError = unknown>( options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetDbAnnotationsLegendsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getDbAnnotationsLegends>>> = ({ signal }) => getDbAnnotationsLegends(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError, TData> & { queryKey: QueryKey }
}

export type GetDbAnnotationsLegendsQueryResult = NonNullable<Awaited<ReturnType<typeof getDbAnnotationsLegends>>>
export type GetDbAnnotationsLegendsQueryError = unknown


/**
 * @summary Get Db Annotations Legends
 */

export function createGetDbAnnotationsLegends<TData = Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError = unknown>(
  options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getDbAnnotationsLegends>>, TError, TData>, }

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
    dbName: DatabaseType,
 signal?: AbortSignal
) => {
      
      
      return dataMutator<AnnotationLegend>(
      {url: `/api/v1/info/legend/${dbName}`, method: 'GET', signal
    },
      );
    }
  

export const getGetAnnotationLegendForDbQueryKey = (dbName: DatabaseType,) => {
    return [`/api/v1/info/legend/${dbName}`] as const;
    }

    
export const getGetAnnotationLegendForDbQueryOptions = <TData = Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError = HTTPValidationError>(dbName: DatabaseType, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAnnotationLegendForDbQueryKey(dbName);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAnnotationLegendForDb>>> = ({ signal }) => getAnnotationLegendForDb(dbName, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(dbName), ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError, TData> & { queryKey: QueryKey }
}

export type GetAnnotationLegendForDbQueryResult = NonNullable<Awaited<ReturnType<typeof getAnnotationLegendForDb>>>
export type GetAnnotationLegendForDbQueryError = HTTPValidationError


/**
 * @summary Get Annotation Legend For Db
 */

export function createGetAnnotationLegendForDb<TData = Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError = HTTPValidationError>(
 dbName: DatabaseType, options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getAnnotationLegendForDb>>, TError, TData>, }

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
    
 signal?: AbortSignal
) => {
      
      
      return dataMutator<GetTaxonomies200>(
      {url: `/api/v1/info/taxonomies/`, method: 'GET', signal
    },
      );
    }
  

export const getGetTaxonomiesQueryKey = () => {
    return [`/api/v1/info/taxonomies/`] as const;
    }

    
export const getGetTaxonomiesQueryOptions = <TData = Awaited<ReturnType<typeof getTaxonomies>>, TError = unknown>( options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getTaxonomies>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTaxonomiesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTaxonomies>>> = ({ signal }) => getTaxonomies(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as CreateQueryOptions<Awaited<ReturnType<typeof getTaxonomies>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTaxonomiesQueryResult = NonNullable<Awaited<ReturnType<typeof getTaxonomies>>>
export type GetTaxonomiesQueryError = unknown


/**
 * @summary Get Taxonomies
 */

export function createGetTaxonomies<TData = Awaited<ReturnType<typeof getTaxonomies>>, TError = unknown>(
  options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof getTaxonomies>>, TError, TData>, }

  ): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetTaxonomiesQueryOptions(options)

  const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




