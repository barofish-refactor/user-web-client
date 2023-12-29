import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

type Naver = {
  LoginWithNaverId: new (args: any) => {
    init: () => void;
    getLoginStatus: (callback: (status: boolean) => void) => void;
    user: {
      id: string;
      age?: string;
      // birthday
      // birthyear
      // email
      // gender
      // mobile
      // name
      // nickname
      // profile_image
    };
  };
};

type Daum = {
  Postcode: {
    new (postcodeOptions: PostcodeOptions): Postcode;
  };
};

type IMP = {
  init: (key: string) => void;
  request_pay: (props: any, callback: (response: any) => void) => void;
  certification(props: any, callback: (response: any) => void): void;
};

type ReactNativeWebView = any;

declare global {
  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  /**
   * @example
   *  type Common = { a: number };
   *  type Example = XOR<{ b: string } & Common, { c: boolean } & Common>;
   *  const example1: Example = { a: 1, b: '' };
   *  const example2: Example = { a: 1, c: false };
   *  const example3: Example = { a: 1, b: '', c: false }; // error
   */
  type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
  type ONEOF<T extends unknown[]> = T extends [infer A, ...infer B]
    ? B extends []
      ? A
      : XOR<A, ONEOF<B>>
    : never;
  /**
   * @author Insik-Han
   * @example type Example = Nullish<number> // expect number | null | undefined
   */
  type Nullish<T> = T | null | undefined;

  interface Window {
    naver: Naver;
    daum: Daum;
    IMP: IMP;
    ReactNativeWebView: ReactNativeWebView;
  }
}

/** 각 page component의 getLayout함수를 수용 */
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type FileType = {
  id?: string;
  file: File | null;
  previewUrl: string;
};
export type deliverFeeTypeEnum = 'FREE' | 'C_FIX' | 'C_FREE_IF_OVER' | 'FIX' | 'FREE_IF_OVER';
