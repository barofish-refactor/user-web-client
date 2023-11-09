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

import { CustomData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class CustomException<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags exception-test-controller
   * @name Custom
   * @request GET:/customException
   * @response `200` `CustomData` OK
   */
  custom = (params: RequestParams = {}) =>
    this.request<CustomData, any>({
      path: `/customException`,
      method: 'GET',
      ...params,
    });
}
