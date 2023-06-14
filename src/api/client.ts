import { getCookie } from 'cookies-next';
import { type OptionsType } from 'cookies-next/lib/types';
import { Api } from 'src/api/swagger/Api';
import { VARIABLES } from 'src/variables';

export function client(args?: OptionsType & { token?: string }) {
  const accessToken = getCookie(VARIABLES.ACCESS_TOKEN, args);
  // console.log('accessToken:', accessToken);
  return new Api(
    accessToken
      ? {
          headers: {
            authorization: `Bearer ${args?.token ?? accessToken}`,
          },
          baseURL: process.env.NEXT_PUBLIC_END_POINT,
        }
      : { baseURL: process.env.NEXT_PUBLIC_END_POINT },
  );
}
