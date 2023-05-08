import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLResponse } from 'graphql-request/build/esm/types';
import { useAlertStore } from 'src/store';

type GraphqlError = { response: GraphQLResponse };

export default function useCustomQuery<
  TQueryFnData = unknown,
  TError extends GraphqlError = GraphqlError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TData, TError> {
  const { setAlert } = useAlertStore();
  return useQuery(queryKey, queryFn, {
    ...options,
    onError: error => {
      options?.onError?.(error);
      const message = error?.response?.errors?.[0].message;
      if (message) setAlert({ message });
    },
  });
}
