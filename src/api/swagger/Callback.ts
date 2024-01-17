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

import { PortOneBodyData, PortOneCallback1Data } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Callback<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags port-one-callback-handler-v-2
   * @name PortOneCallback1
   * @request POST:/callback/iamport_pay_result
   * @response `200` `PortOneCallback1Data` OK
   */
  portOneCallback1 = (data: PortOneBodyData, params: RequestParams = {}) =>
    this.request<PortOneCallback1Data, any>({
      path: `/callback/iamport_pay_result`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
