import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

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
}

/** 각 page component의 getLayout함수를 수용 */
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
