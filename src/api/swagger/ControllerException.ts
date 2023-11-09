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

import { ControllerExceptionData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class ControllerException<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags exception-test-controller
   * @name ControllerException
   * @request GET:/controllerException
   * @response `200` `ControllerExceptionData` OK
   */
  controllerException = (params: RequestParams = {}) =>
    this.request<ControllerExceptionData, any>({
      path: `/controllerException`,
      method: 'GET',
      ...params,
    });
}
