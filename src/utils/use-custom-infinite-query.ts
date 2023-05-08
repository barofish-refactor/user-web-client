import type {
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { GraphQLResponse } from 'graphql-request/build/esm/types';
import { useAlertStore } from 'src/store';

type GraphqlError = { response: GraphQLResponse };

export default function useCustomInfiniteQuery<
  TQueryFnData = unknown,
  TError extends GraphqlError = GraphqlError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseInfiniteQueryResult<TData, TError> {
  const { setAlert } = useAlertStore();
  return useInfiniteQuery(queryKey, queryFn, {
    ...options,
    onError: error => {
      options?.onError?.(error);
      const message = error?.response?.errors?.[0].message;
      if (message) setAlert({ message });
    },
  });
}
