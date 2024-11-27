import type { GeneratorVerbOptions } from "@orval/core";

export const transformer = (
  verbOptions: GeneratorVerbOptions,
): GeneratorVerbOptions => {
  const { operationName } = verbOptions;
  const createQueryFunction = `
export function create${operationName}<TData = Awaited<ReturnType<typeof ${verbOptions.operationId}>>, TError = ${verbOptions.response.errors?.[0]?.type || "unknown"}>(
${verbOptions.params.type.replace(/^\{|\}$/g, "")},
queryClient?: QueryClient,
options?: { query?:CreateQueryOptions<Awaited<ReturnType<typeof ${verbOptions.operationId}>>, TError, TData>, }
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGet${operationName}QueryOptions(${verbOptions.params.implementation}, options);
  const query = createQuery(queryClient, queryOptions) as CreateQueryResult<TData, TError> & { queryKey: QueryKey };
  query.queryKey = queryOptions.queryKey;
  return query;
}`;

  return {
    ...verbOptions,
    implementation: verbOptions.implementation.replace(
      /export function create.*?return query;\n}/s,
      createQueryFunction,
    ),
  };
};
