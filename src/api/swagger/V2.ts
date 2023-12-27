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

import { PortOneBodyData, PortOneCallbackData } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class V2<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags port-one-callback-handler-v-2
   * @name PortOneCallback
   * @request POST:/v2/callback/iamport_pay_result
   * @response `200` `PortOneCallbackData` OK
   */
  portOneCallback = (data: PortOneBodyData, params: RequestParams = {}) =>
    this.request<PortOneCallbackData, any>({
      path: `/v2/callback/iamport_pay_result`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
