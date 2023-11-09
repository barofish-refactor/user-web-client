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

import { MyDataData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class ExceptionEntity<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags exception-test-controller
   * @name MyData
   * @request GET:/exceptionEntity
   * @response `200` `MyDataData` OK
   */
  myData = (params: RequestParams = {}) =>
    this.request<MyDataData, any>({
      path: `/exceptionEntity`,
      method: 'GET',
      ...params,
    });
}
