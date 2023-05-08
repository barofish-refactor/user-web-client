import { dehydrate, type QueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { type OptionsType } from 'cookies-next/lib/types';
import { GraphQLClient } from 'graphql-request';
import { createClient } from 'graphql-ws';

import { VARIABLES } from 'src/variables';

export function graphqlClient(args?: OptionsType & { token?: string }) {
  const accessToken = getCookie(VARIABLES.ACCESS_TOKEN, args);
  return new GraphQLClient(VARIABLES.END_POINT, {
    errorPolicy: 'ignore',
    headers: {
      authorization: `Bearer ${args?.token ?? accessToken}`,
    },
  });
}

export function subscriptionClient(token: string) {
  return createClient({
    url: VARIABLES.SOCKET_URL,
    lazy: true,
    connectionParams: () => ({
      Authorization: `Bearer ${token}`,
    }),
  });
}

export function getDehydratedState(queryClient: QueryClient) {
  return {
    dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
  };
}
