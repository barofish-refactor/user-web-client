/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HelloData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Hello<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags exception-test-controller
   * @name Hello
   * @request GET:/hello
   * @response `200` `HelloData` OK
   */
  hello = (params: RequestParams = {}) =>
    this.request<HelloData, any>({
      path: `/hello`,
      method: 'GET',
      ...params,
    });
}
