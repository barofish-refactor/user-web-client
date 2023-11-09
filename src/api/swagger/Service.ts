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

import { ServiceCallData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Service<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags exception-test-controller
   * @name ServiceCall
   * @request GET:/service
   * @response `200` `ServiceCallData` OK
   */
  serviceCall = (params: RequestParams = {}) =>
    this.request<ServiceCallData, any>({
      path: `/service`,
      method: 'GET',
      ...params,
    });
}
