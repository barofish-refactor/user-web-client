import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import type { OptionsType } from 'cookies-next/lib/types';
import type { GraphQLResponse } from 'graphql-request/build/esm/types';
import { graphqlClient } from 'src/api/client';
import { RenewTokenDocument } from 'src/api/gql/graphql';
import { VARIABLES } from 'src/variables';

export const cleanToken = () => {
  deleteCookie(VARIABLES.ACCESS_TOKEN);
  deleteCookie(VARIABLES.REFRESH_TOKEN);
  window.location.href = '/login';
};

export async function getRenewToken() {
  const accessToken = getCookie(VARIABLES.ACCESS_TOKEN);
  const refreshToken = getCookie(VARIABLES.REFRESH_TOKEN);

  if (typeof accessToken === 'string' && typeof refreshToken === 'string') {
    await graphqlClient()
      .request(RenewTokenDocument, { accessToken, refreshToken })
      .then(res => {
        const newToken = res.renewToken;
        if (newToken) {
          const { accessToken, refreshToken } = newToken;
          const cookieOptions: OptionsType = {
            maxAge: VARIABLES.TOKEN_MAX_AGE,
          };
          setCookie(VARIABLES.ACCESS_TOKEN, accessToken, cookieOptions);
          setCookie(VARIABLES.REFRESH_TOKEN, refreshToken, cookieOptions);
        }
        window.location.reload();
      })
      .catch(cleanToken);
  } else {
    cleanToken();
  }
}

export const onGraphqlError = ({ response }: { response: GraphQLResponse }) => {
  for (const v of response.errors ?? []) {
    console.log(v);
    if (v.extensions?.code === 'TOKEN_EXPIRED') getRenewToken();
    if (v.extensions?.code === 'UNAUTHENTICATED') cleanToken();
    if (v.extensions?.code === 'FORBIDDEN') cleanToken();
  }
};
