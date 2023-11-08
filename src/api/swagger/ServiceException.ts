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

import {
  ExceptionRequest,
  ServiceExceptionGetData,
  ServiceExceptionPostData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class ServiceException<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags exception-test-controller
   * @name ServiceExceptionGet
   * @request GET:/serviceException
   * @response `200` `ServiceExceptionGetData` OK
   */
  serviceExceptionGet = (
    query: {
      errorParam: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ServiceExceptionGetData, any>({
      path: `/serviceException`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags exception-test-controller
   * @name ServiceExceptionPost
   * @request POST:/serviceException
   * @response `200` `ServiceExceptionPostData` OK
   */
  serviceExceptionPost = (data: ExceptionRequest, params: RequestParams = {}) =>
    this.request<ServiceExceptionPostData, any>({
      path: `/serviceException`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
