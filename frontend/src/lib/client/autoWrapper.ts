import type { CreateQueryOptions, QueryClient } from "@tanstack/svelte-query";
import { createQuery } from "@tanstack/svelte-query";
import * as tmvisdb from "./tmvisdb";

type QueryFunctions = {
  [K in keyof typeof tmvisdb]: K extends `getGet${string}QueryOptions`
    ? K
    : never;
}[keyof typeof tmvisdb];

type QueryConfig<TParams extends any[], TData, TError> = {
  params: TParams;
  options?: {
    query?: CreateQueryOptions<any, TError, TData>;
  };
  queryClient?: QueryClient;
};

function wrapQueryFunction<TParams extends any[], TData, TError>(
  getQueryOptionsFn: (
    ...params: [
      ...TParams,
      options?: { query?: CreateQueryOptions<any, TError, TData> },
    ]
  ) => any,
) {
  return ({
    params,
    options,
    queryClient,
  }: {
    params: TParams;
    options?: { query?: CreateQueryOptions<any, TError, TData> };
    queryClient?: QueryClient;
  }) => {
    console.log("params", params);
    const queryOptions = getQueryOptionsFn(...params, options);
    const query = createQuery(queryOptions, queryClient);
    query.queryKey = queryOptions.queryKey;
    return query;
  };
}

// Create and export all wrapped queries in one go
export const wrappedQueries = Object.keys(tmvisdb)
  .filter((key) => key.startsWith("getGet") && key.endsWith("QueryOptions"))
  .reduce<Record<string, ReturnType<typeof wrapQueryFunction>>>((acc, key) => {
    const baseName = key.replace("getGet", "").replace("QueryOptions", "");
    acc[`use${baseName}`] = wrapQueryFunction(tmvisdb[key as QueryFunctions]);
    return acc;
  }, {});
