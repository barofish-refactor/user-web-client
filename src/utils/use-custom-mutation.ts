import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { GraphQLResponse } from 'graphql-request/build/esm/types';
import { useAlertStore } from 'src/store';

type GraphqlError = { response: GraphQLResponse };

export default function useCustomMutation<
  TData = unknown,
  TError extends GraphqlError = GraphqlError,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { setAlert } = useAlertStore();
  return useMutation(mutationFn, {
    ...options,
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      const message = error?.response?.errors?.[0].message;
      if (message) setAlert({ message });
    },
  });
}
