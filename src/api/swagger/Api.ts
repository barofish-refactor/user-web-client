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
  AddBasketData,
  AddBasketPayload,
  AddCategoryData,
  AddCategoryPayload,
  AddCompareSetData,
  AddCompareSetPayload,
  AddCouponData,
  AddCouponPayload,
  AddDeliverPlaceData,
  AddDeliverPlacePayload,
  AddInquiryData,
  AddInquiryPayload,
  AddNoticeData,
  AddNoticePayload,
  AddProductData,
  AddProductPayload,
  AddProductToCurationData,
  AddProductToCurationPayload,
  AddProductToTopBarData,
  AddProductToTopBarPayload,
  AddReviewByUserData,
  AddReviewByUserPayload,
  AddStoreData,
  AddStorePayload,
  AddTipData,
  AddTipPayload,
  AddTopBarData,
  AddTopBarPayload,
  AnswerInquiryData,
  AnswerInquiryPayload,
  CheckPaymentDoneData,
  CreateBannerData,
  CreateBannerPayload,
  CreateCurationData,
  CreateCurationPayload,
  DeleteBannerData,
  DeleteBasketData,
  DeleteBasketPayload,
  DeleteCategoryData,
  DeleteCompareSetData,
  DeleteCompareSetPayload,
  DeleteCouponData,
  DeleteCurationData,
  DeleteDeliverPlaceData,
  DeleteProductData,
  DeleteProductListData,
  DeleteProductListPayload,
  DeleteReviewByUserData,
  DeleteSaveProductsData,
  DeleteSaveProductsPayload,
  DeleteTipData,
  DeleteTopBarData,
  JoinSnsUserData,
  JoinSnsUserPayload,
  JoinUserData,
  JoinUserPayload,
  LikeProductByUserData,
  LikeStoreByUserData,
  LoginAdminData,
  LoginAdminPayload,
  LoginStoreData,
  LoginStorePayload,
  LoginUserData,
  OrderProductData,
  OrderReq,
  RequestCodeReq,
  RequestCodeVerificationData,
  SaveProductData,
  SaveProductPayload,
  SearchingProductDirectData,
  SearchProductData,
  SelectAllReviewListByAdminData,
  SelectBannerData,
  SelectBannerListByAdminData,
  SelectBannerListData,
  SelectBasketData,
  SelectCanceledOrderListData,
  SelectCanDownloadCouponData,
  SelectCanUseCouponData,
  SelectCategoriesData,
  SelectCompareSetData,
  SelectCompareSetListData,
  SelectCouponData,
  SelectCouponListByAdminData,
  SelectCurationData,
  SelectCurationListData,
  SelectCurationProductsData,
  SelectDeliverPlaceData,
  SelectDownloadCouponData,
  SelectDownloadedCouponData,
  SelectFilterListData,
  SelectInquiryData,
  SelectInquiryListByAdminData,
  SelectInquiryListWithProductData,
  SelectLocationListData,
  SelectMainData,
  SelectMainItemsData,
  SelectNoticeData,
  SelectNoticeListData,
  SelectNotificationData,
  SelectOrderData,
  SelectOrderListData,
  SelectPcWebBannerData,
  SelectProcessListData,
  SelectProductData,
  SelectProductListData,
  SelectProductOptionListData,
  SelectRecommendStoreListData,
  SelectReviewListWithProductIdData,
  SelectReviewListWithStoreIdData,
  SelectSaveProductListData,
  SelectScrapedStoreData,
  SelectSiteInfoData,
  SelectSiteInfoListData,
  SelectStorageListData,
  SelectStoreByAdmin1Data,
  SelectStoreByAdminData,
  SelectStoreData,
  SelectStoreListData,
  SelectTipData,
  SelectTipListData,
  SelectTopBarData,
  SelectTopBarListData,
  SelectTopSearchKeywordsData,
  SelectTypeListData,
  SelectUsageListData,
  SelectUserList1Data,
  SelectUserListData,
  SelectUserSelfInfoData,
  SortCurationData,
  SortCurationPayload,
  Test1Data,
  Test2Data,
  Test3Data,
  TestClass,
  TestCouponData,
  TestData,
  UpdateBannerData,
  UpdateBannerPayload,
  UpdateBasketData,
  UpdateCategoryData,
  UpdateCategoryPayload,
  UpdateCurationData,
  UpdateCurationPayload,
  UpdateDeliverPlaceData,
  UpdateDeliverPlacePayload,
  UpdateNotice1Data,
  UpdateNoticeData,
  UpdateNoticePayload,
  UpdateProductData,
  UpdateProductPayload,
  UpdateSiteInfoData,
  UpdateSiteInfoPayload,
  UpdateStoreInfo1Data,
  UpdateStoreInfo1Payload,
  UpdateStoreInfoData,
  UpdateStoreInfoPayload,
  UpdateStoreStateData,
  UpdateStoreStatePayload,
  UpdateTipData,
  UpdateTipPayload,
  UpdateTopBarData,
  UpdateTopBarPayload,
  UpdateUserData,
  UpdateUserPayload,
  UpdateUserStateData,
  UpdateUserStatePayload,
  UserLoginReq,
  VerifyCodeData,
  VerifyCodeReq,
  WhoamiData,
  WithdrawUserData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags verification-controller
   * @name VerifyCode
   * @request POST:/api/v1/verification/verify
   * @response `200` `VerifyCodeData` OK
   */
  verifyCode = (data: VerifyCodeReq, params: RequestParams = {}) =>
    this.request<VerifyCodeData, any>({
      path: `/api/v1/verification/verify`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags verification-controller
   * @name RequestCodeVerification
   * @request POST:/api/v1/verification/code
   * @response `200` `RequestCodeVerificationData` OK
   */
  requestCodeVerification = (data: RequestCodeReq, params: RequestParams = {}) =>
    this.request<RequestCodeVerificationData, any>({
      path: `/api/v1/verification/code`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name WithdrawUser
   * @request POST:/api/v1/user/withdraw
   * @response `200` `WithdrawUserData` OK
   */
  withdrawUser = (params: RequestParams = {}) =>
    this.request<WithdrawUserData, any>({
      path: `/api/v1/user/withdraw`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name UpdateUser
   * @request POST:/api/v1/user/mypage/update
   * @response `200` `UpdateUserData` OK
   */
  updateUser = (data: UpdateUserPayload, params: RequestParams = {}) =>
    this.request<UpdateUserData, any>({
      path: `/api/v1/user/mypage/update`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name UpdateUserState
   * @request POST:/api/v1/user/management/update-state
   * @response `200` `UpdateUserStateData` OK
   */
  updateUserState = (data: UpdateUserStatePayload, params: RequestParams = {}) =>
    this.request<UpdateUserStateData, any>({
      path: `/api/v1/user/management/update-state`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name LoginUser
   * @request POST:/api/v1/user/login
   * @response `200` `LoginUserData` OK
   */
  loginUser = (data: UserLoginReq, params: RequestParams = {}) =>
    this.request<LoginUserData, any>({
      path: `/api/v1/user/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name JoinUser
   * @request POST:/api/v1/user/join
   * @response `200` `JoinUserData` OK
   */
  joinUser = (data: JoinUserPayload, params: RequestParams = {}) =>
    this.request<JoinUserData, any>({
      path: `/api/v1/user/join`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name JoinSnsUser
   * @request POST:/api/v1/user/join-sns
   * @response `200` `JoinSnsUserData` OK
   */
  joinSnsUser = (data: JoinSnsUserPayload, params: RequestParams = {}) =>
    this.request<JoinSnsUserData, any>({
      path: `/api/v1/user/join-sns`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags top-bar-controller
   * @name UpdateTopBar
   * @request POST:/api/v1/topbar/update/{id}
   * @response `200` `UpdateTopBarData` OK
   */
  updateTopBar = (id: number, data: UpdateTopBarPayload, params: RequestParams = {}) =>
    this.request<UpdateTopBarData, any>({
      path: `/api/v1/topbar/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags top-bar-controller
   * @name AddTopBar
   * @request POST:/api/v1/topbar/add
   * @response `200` `AddTopBarData` OK
   */
  addTopBar = (data: AddTopBarPayload, params: RequestParams = {}) =>
    this.request<AddTopBarData, any>({
      path: `/api/v1/topbar/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags top-bar-controller
   * @name AddProductToTopBar
   * @request POST:/api/v1/topbar/add-product
   * @response `200` `AddProductToTopBarData` OK
   */
  addProductToTopBar = (data: AddProductToTopBarPayload, params: RequestParams = {}) =>
    this.request<AddProductToTopBarData, any>({
      path: `/api/v1/topbar/add-product`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tip-controller
   * @name UpdateTip
   * @request POST:/api/v1/tip/update/{id}
   * @response `200` `UpdateTipData` OK
   */
  updateTip = (id: number, data: UpdateTipPayload, params: RequestParams = {}) =>
    this.request<UpdateTipData, any>({
      path: `/api/v1/tip/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags tip-controller
   * @name AddTip
   * @request POST:/api/v1/tip/add
   * @response `200` `AddTipData` OK
   */
  addTip = (data: AddTipPayload, params: RequestParams = {}) =>
    this.request<AddTipData, any>({
      path: `/api/v1/tip/add`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name UpdateStoreState
   * @request POST:/api/v1/store/update/state
   * @response `200` `UpdateStoreStateData` OK
   */
  updateStoreState = (data: UpdateStoreStatePayload, params: RequestParams = {}) =>
    this.request<UpdateStoreStateData, any>({
      path: `/api/v1/store/update/state`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name UpdateStoreInfo
   * @request POST:/api/v1/store/update
   * @response `200` `UpdateStoreInfoData` OK
   */
  updateStoreInfo = (data: UpdateStoreInfoPayload, params: RequestParams = {}) =>
    this.request<UpdateStoreInfoData, any>({
      path: `/api/v1/store/update`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name UpdateStoreInfo1
   * @request POST:/api/v1/store/update/{id}
   * @response `200` `UpdateStoreInfo1Data` OK
   */
  updateStoreInfo1 = (id: number, data: UpdateStoreInfo1Payload, params: RequestParams = {}) =>
    this.request<UpdateStoreInfo1Data, any>({
      path: `/api/v1/store/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name LoginStore
   * @request POST:/api/v1/store/login
   * @response `200` `LoginStoreData` OK
   */
  loginStore = (data: LoginStorePayload, params: RequestParams = {}) =>
    this.request<LoginStoreData, any>({
      path: `/api/v1/store/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name LikeStoreByUser
   * @request POST:/api/v1/store/like
   * @response `200` `LikeStoreByUserData` OK
   */
  likeStoreByUser = (
    query: {
      /** @format int32 */
      storeId: number;
      type: 'LIKE' | 'UNLIKE';
    },
    params: RequestParams = {},
  ) =>
    this.request<LikeStoreByUserData, any>({
      path: `/api/v1/store/like`,
      method: 'POST',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name AddStore
   * @request POST:/api/v1/store/add
   * @response `200` `AddStoreData` OK
   */
  addStore = (data: AddStorePayload, params: RequestParams = {}) =>
    this.request<AddStoreData, any>({
      path: `/api/v1/store/add`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags site-info-controller
   * @name UpdateSiteInfo
   * @request POST:/api/v1/site_info/update/{id}
   * @response `200` `UpdateSiteInfoData` OK
   */
  updateSiteInfo = (id: string, data: UpdateSiteInfoPayload, params: RequestParams = {}) =>
    this.request<UpdateSiteInfoData, any>({
      path: `/api/v1/site_info/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name AddReviewByUser
   * @request POST:/api/v1/review/add
   * @response `200` `AddReviewByUserData` OK
   */
  addReviewByUser = (data: AddReviewByUserPayload, params: RequestParams = {}) =>
    this.request<AddReviewByUserData, any>({
      path: `/api/v1/review/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name UpdateProduct
   * @request POST:/api/v1/product/update/{id}
   * @response `200` `UpdateProductData` OK
   */
  updateProduct = (id: number, data: UpdateProductPayload, params: RequestParams = {}) =>
    this.request<UpdateProductData, any>({
      path: `/api/v1/product/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name LikeProductByUser
   * @request POST:/api/v1/product/like
   * @response `200` `LikeProductByUserData` OK
   */
  likeProductByUser = (
    query: {
      /** @format int32 */
      productId: number;
      type: 'LIKE' | 'UNLIKE';
    },
    params: RequestParams = {},
  ) =>
    this.request<LikeProductByUserData, any>({
      path: `/api/v1/product/like`,
      method: 'POST',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name AddProduct
   * @request POST:/api/v1/product/add
   * @response `200` `AddProductData` OK
   */
  addProduct = (data: AddProductPayload, params: RequestParams = {}) =>
    this.request<AddProductData, any>({
      path: `/api/v1/product/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name OrderProduct
   * @request POST:/api/v1/order
   * @response `200` `OrderProductData` OK
   */
  orderProduct = (data: OrderReq, params: RequestParams = {}) =>
    this.request<OrderProductData, any>({
      path: `/api/v1/order`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags notice-controller
   * @name UpdateNotice
   * @request POST:/api/v1/notice/update/{id}
   * @response `200` `UpdateNoticeData` OK
   */
  updateNotice = (id: number, data: UpdateNoticePayload, params: RequestParams = {}) =>
    this.request<UpdateNoticeData, any>({
      path: `/api/v1/notice/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags notice-controller
   * @name AddNotice
   * @request POST:/api/v1/notice/add
   * @response `200` `AddNoticeData` OK
   */
  addNotice = (data: AddNoticePayload, params: RequestParams = {}) =>
    this.request<AddNoticeData, any>({
      path: `/api/v1/notice/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags inquiry-controller
   * @name AnswerInquiry
   * @request POST:/api/v1/inquiry/answer/{id}
   * @response `200` `AnswerInquiryData` OK
   */
  answerInquiry = (id: number, data: AnswerInquiryPayload, params: RequestParams = {}) =>
    this.request<AnswerInquiryData, any>({
      path: `/api/v1/inquiry/answer/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags inquiry-controller
   * @name AddInquiry
   * @request POST:/api/v1/inquiry/add
   * @response `200` `AddInquiryData` OK
   */
  addInquiry = (data: AddInquiryPayload, params: RequestParams = {}) =>
    this.request<AddInquiryData, any>({
      path: `/api/v1/inquiry/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags deliver-place-controller
   * @name UpdateDeliverPlace
   * @request POST:/api/v1/deliverPlace/update/{id}
   * @response `200` `UpdateDeliverPlaceData` OK
   */
  updateDeliverPlace = (id: number, data: UpdateDeliverPlacePayload, params: RequestParams = {}) =>
    this.request<UpdateDeliverPlaceData, any>({
      path: `/api/v1/deliverPlace/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags deliver-place-controller
   * @name AddDeliverPlace
   * @request POST:/api/v1/deliverPlace/add
   * @response `200` `AddDeliverPlaceData` OK
   */
  addDeliverPlace = (data: AddDeliverPlacePayload, params: RequestParams = {}) =>
    this.request<AddDeliverPlaceData, any>({
      path: `/api/v1/deliverPlace/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags curation-controller
   * @name AddProductToCuration
   * @request POST:/api/v1/curation/{id}/add-product
   * @response `200` `AddProductToCurationData` OK
   */
  addProductToCuration = (
    id: number,
    data: AddProductToCurationPayload,
    params: RequestParams = {},
  ) =>
    this.request<AddProductToCurationData, any>({
      path: `/api/v1/curation/${id}/add-product`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags curation-controller
   * @name UpdateCuration
   * @request POST:/api/v1/curation/update/{id}
   * @response `200` `UpdateCurationData` OK
   */
  updateCuration = (id: number, data: UpdateCurationPayload, params: RequestParams = {}) =>
    this.request<UpdateCurationData, any>({
      path: `/api/v1/curation/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags curation-controller
   * @name SortCuration
   * @request POST:/api/v1/curation/sort-curation
   * @response `200` `SortCurationData` OK
   */
  sortCuration = (data: SortCurationPayload, params: RequestParams = {}) =>
    this.request<SortCurationData, any>({
      path: `/api/v1/curation/sort-curation`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags curation-controller
   * @name CreateCuration
   * @request POST:/api/v1/curation/add
   * @response `200` `CreateCurationData` OK
   */
  createCuration = (data: CreateCurationPayload, params: RequestParams = {}) =>
    this.request<CreateCurationData, any>({
      path: `/api/v1/curation/add`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon-controller
   * @name SelectDownloadCoupon
   * @request POST:/api/v1/coupon/download/{id}
   * @response `200` `SelectDownloadCouponData` OK
   */
  selectDownloadCoupon = (id: number, params: RequestParams = {}) =>
    this.request<SelectDownloadCouponData, any>({
      path: `/api/v1/coupon/download/${id}`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon-controller
   * @name AddCoupon
   * @request POST:/api/v1/coupon/add
   * @response `200` `AddCouponData` OK
   */
  addCoupon = (data: AddCouponPayload, params: RequestParams = {}) =>
    this.request<AddCouponData, any>({
      path: `/api/v1/coupon/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name SaveProduct
   * @request POST:/api/v1/compare/save-product
   * @response `200` `SaveProductData` OK
   */
  saveProduct = (data: SaveProductPayload, params: RequestParams = {}) =>
    this.request<SaveProductData, any>({
      path: `/api/v1/compare/save-product`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name AddCompareSet
   * @request POST:/api/v1/compare/add-set
   * @response `200` `AddCompareSetData` OK
   */
  addCompareSet = (data: AddCompareSetPayload, params: RequestParams = {}) =>
    this.request<AddCompareSetData, any>({
      path: `/api/v1/compare/add-set`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name UpdateCategory
   * @request POST:/api/v1/category/update/{id}
   * @response `200` `UpdateCategoryData` OK
   */
  updateCategory = (id: number, data: UpdateCategoryPayload, params: RequestParams = {}) =>
    this.request<UpdateCategoryData, any>({
      path: `/api/v1/category/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name AddCategory
   * @request POST:/api/v1/category/add
   * @response `200` `AddCategoryData` OK
   */
  addCategory = (data: AddCategoryPayload, params: RequestParams = {}) =>
    this.request<AddCategoryData, any>({
      path: `/api/v1/category/add`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags basket-controller
   * @name UpdateBasket
   * @request POST:/api/v1/basket/update/{id}
   * @response `200` `UpdateBasketData` OK
   */
  updateBasket = (
    id: number,
    query: {
      /** @format int32 */
      amount: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<UpdateBasketData, any>({
      path: `/api/v1/basket/update/${id}`,
      method: 'POST',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags basket-controller
   * @name AddBasket
   * @request POST:/api/v1/basket/add
   * @response `200` `AddBasketData` OK
   */
  addBasket = (data: AddBasketPayload, params: RequestParams = {}) =>
    this.request<AddBasketData, any>({
      path: `/api/v1/basket/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags banner-controller
   * @name UpdateBanner
   * @request POST:/api/v1/banner/update/{id}
   * @response `200` `UpdateBannerData` OK
   */
  updateBanner = (id: number, data: UpdateBannerPayload, params: RequestParams = {}) =>
    this.request<UpdateBannerData, any>({
      path: `/api/v1/banner/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags banner-controller
   * @name CreateBanner
   * @request POST:/api/v1/banner/add
   * @response `200` `CreateBannerData` OK
   */
  createBanner = (data: CreateBannerPayload, params: RequestParams = {}) =>
    this.request<CreateBannerData, any>({
      path: `/api/v1/banner/add`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-controller
   * @name LoginAdmin
   * @request POST:/api/v1/admin/login
   * @response `200` `LoginAdminData` OK
   */
  loginAdmin = (data: LoginAdminPayload, params: RequestParams = {}) =>
    this.request<LoginAdminData, any>({
      path: `/api/v1/admin/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name Whoami
   * @request GET:/api/v1/user/verifyToken
   * @response `200` `WhoamiData` OK
   */
  whoami = (params: RequestParams = {}) =>
    this.request<WhoamiData, any>({
      path: `/api/v1/user/verifyToken`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name Test
   * @request GET:/api/v1/user/test
   * @response `200` `TestData` OK
   */
  test = (
    query: {
      data: TestClass;
    },
    params: RequestParams = {},
  ) =>
    this.request<TestData, any>({
      path: `/api/v1/user/test`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name SelectUserSelfInfo
   * @request GET:/api/v1/user/mypage
   * @response `200` `SelectUserSelfInfoData` OK
   */
  selectUserSelfInfo = (params: RequestParams = {}) =>
    this.request<SelectUserSelfInfoData, any>({
      path: `/api/v1/user/mypage`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name SelectUserList
   * @request GET:/api/v1/user/management
   * @response `200` `SelectUserListData` OK
   */
  selectUserList = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      take?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectUserListData, any>({
      path: `/api/v1/user/management`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name SelectUserList1
   * @request GET:/api/v1/user/management/{id}
   * @response `200` `SelectUserList1Data` OK
   */
  selectUserList1 = (id: number, params: RequestParams = {}) =>
    this.request<SelectUserList1Data, any>({
      path: `/api/v1/user/management/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags top-bar-controller
   * @name SelectTopBarList
   * @request GET:/api/v1/topbar
   * @response `200` `SelectTopBarListData` OK
   */
  selectTopBarList = (params: RequestParams = {}) =>
    this.request<SelectTopBarListData, any>({
      path: `/api/v1/topbar`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags top-bar-controller
   * @name SelectTopBar
   * @request GET:/api/v1/topbar/{id}
   * @response `200` `SelectTopBarData` OK
   */
  selectTopBar = (
    id: number,
    query?: {
      /**
       * @format int32
       * @default 1
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      take?: number;
      categoryIds?: string;
      typeIds?: string;
      locationIds?: string;
      processIds?: string;
      usageIds?: string;
      storageIds?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectTopBarData, any>({
      path: `/api/v1/topbar/${id}`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags top-bar-controller
   * @name DeleteTopBar
   * @request DELETE:/api/v1/topbar/{id}
   * @response `200` `DeleteTopBarData` OK
   */
  deleteTopBar = (id: number, params: RequestParams = {}) =>
    this.request<DeleteTopBarData, any>({
      path: `/api/v1/topbar/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags top-bar-controller
   * @name Test1
   * @request GET:/api/v1/topbar/test
   * @response `200` `Test1Data` OK
   */
  test1 = (params: RequestParams = {}) =>
    this.request<Test1Data, any>({
      path: `/api/v1/topbar/test`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags tip-controller
   * @name SelectTipList
   * @request GET:/api/v1/tip
   * @response `200` `SelectTipListData` OK
   */
  selectTipList = (
    query?: {
      type?: 'COMPARE' | 'BUY_TIP' | 'NEW_ONE';
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectTipListData, any>({
      path: `/api/v1/tip`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags tip-controller
   * @name SelectTip
   * @request GET:/api/v1/tip/{id}
   * @response `200` `SelectTipData` OK
   */
  selectTip = (id: number, params: RequestParams = {}) =>
    this.request<SelectTipData, any>({
      path: `/api/v1/tip/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags tip-controller
   * @name DeleteTip
   * @request DELETE:/api/v1/tip/{id}
   * @response `200` `DeleteTipData` OK
   */
  deleteTip = (id: number, params: RequestParams = {}) =>
    this.request<DeleteTipData, any>({
      path: `/api/v1/tip/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name SelectStoreList
   * @request GET:/api/v1/store
   * @response `200` `SelectStoreListData` OK
   */
  selectStoreList = (params: RequestParams = {}) =>
    this.request<SelectStoreListData, any>({
      path: `/api/v1/store`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name SelectStore
   * @request GET:/api/v1/store/{id}
   * @response `200` `SelectStoreData` OK
   */
  selectStore = (id: number, params: RequestParams = {}) =>
    this.request<SelectStoreData, any>({
      path: `/api/v1/store/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name SelectScrapedStore
   * @request GET:/api/v1/store/star
   * @response `200` `SelectScrapedStoreData` OK
   */
  selectScrapedStore = (params: RequestParams = {}) =>
    this.request<SelectScrapedStoreData, any>({
      path: `/api/v1/store/star`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name SelectRecommendStoreList
   * @request GET:/api/v1/store/recommend
   * @response `200` `SelectRecommendStoreListData` OK
   */
  selectRecommendStoreList = (
    query: {
      type: 'RECENT' | 'BOOKMARK' | 'ORDER' | 'REVIEW';
      /**
       * @format int32
       * @default 1
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      take?: number;
      /** @default "" */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectRecommendStoreListData, any>({
      path: `/api/v1/store/recommend`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name SelectStoreByAdmin
   * @request GET:/api/v1/store/management/{id}
   * @response `200` `SelectStoreByAdminData` OK
   */
  selectStoreByAdmin = (id: number, params: RequestParams = {}) =>
    this.request<SelectStoreByAdminData, any>({
      path: `/api/v1/store/management/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name SelectStoreByAdmin1
   * @request GET:/api/v1/store/management
   * @response `200` `SelectStoreByAdmin1Data` OK
   */
  selectStoreByAdmin1 = (params: RequestParams = {}) =>
    this.request<SelectStoreByAdmin1Data, any>({
      path: `/api/v1/store/management`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags site-info-controller
   * @name SelectSiteInfo
   * @request GET:/api/v1/site_info/{id}
   * @response `200` `SelectSiteInfoData` OK
   */
  selectSiteInfo = (id: string, params: RequestParams = {}) =>
    this.request<SelectSiteInfoData, any>({
      path: `/api/v1/site_info/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags site-info-controller
   * @name SelectSiteInfoList
   * @request GET:/api/v1/site_info/
   * @response `200` `SelectSiteInfoListData` OK
   */
  selectSiteInfoList = (params: RequestParams = {}) =>
    this.request<SelectSiteInfoListData, any>({
      path: `/api/v1/site_info/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags search-keyword-controller
   * @name SearchProduct
   * @request GET:/api/v1/search
   * @response `200` `SearchProductData` OK
   */
  searchProduct = (
    query: {
      keyword: string;
      /**
       * @format int32
       * @default 1
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      take?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchProductData, any>({
      path: `/api/v1/search`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags search-keyword-controller
   * @name SelectTopSearchKeywords
   * @request GET:/api/v1/search/rank
   * @response `200` `SelectTopSearchKeywordsData` OK
   */
  selectTopSearchKeywords = (params: RequestParams = {}) =>
    this.request<SelectTopSearchKeywordsData, any>({
      path: `/api/v1/search/rank`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags search-keyword-controller
   * @name SearchingProductDirect
   * @request GET:/api/v1/search/direct
   * @response `200` `SearchingProductDirectData` OK
   */
  searchingProductDirect = (
    query: {
      keyword: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchingProductDirectData, any>({
      path: `/api/v1/search/direct`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name SelectReviewListWithStoreId
   * @request GET:/api/v1/review/store/{id}
   * @response `200` `SelectReviewListWithStoreIdData` OK
   */
  selectReviewListWithStoreId = (id: number, params: RequestParams = {}) =>
    this.request<SelectReviewListWithStoreIdData, any>({
      path: `/api/v1/review/store/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name SelectReviewListWithProductId
   * @request GET:/api/v1/review/product/{id}
   * @response `200` `SelectReviewListWithProductIdData` OK
   */
  selectReviewListWithProductId = (id: number, params: RequestParams = {}) =>
    this.request<SelectReviewListWithProductIdData, any>({
      path: `/api/v1/review/product/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name SelectAllReviewListByAdmin
   * @request GET:/api/v1/review/management
   * @response `200` `SelectAllReviewListByAdminData` OK
   */
  selectAllReviewListByAdmin = (params: RequestParams = {}) =>
    this.request<SelectAllReviewListByAdminData, any>({
      path: `/api/v1/review/management`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name SelectProduct
   * @request GET:/api/v1/product/{id}
   * @response `200` `SelectProductData` OK
   */
  selectProduct = (id: number, params: RequestParams = {}) =>
    this.request<SelectProductData, any>({
      path: `/api/v1/product/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name DeleteProduct
   * @request DELETE:/api/v1/product/{id}
   * @response `200` `DeleteProductData` OK
   */
  deleteProduct = (id: number, params: RequestParams = {}) =>
    this.request<DeleteProductData, any>({
      path: `/api/v1/product/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name SelectProductOptionList
   * @request GET:/api/v1/product/{id}/option
   * @response `200` `SelectProductOptionListData` OK
   */
  selectProductOptionList = (id: number, params: RequestParams = {}) =>
    this.request<SelectProductOptionListData, any>({
      path: `/api/v1/product/${id}/option`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name Test2
   * @request GET:/api/v1/product/list
   * @response `200` `Test2Data` OK
   */
  test2 = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      take?: number;
      /** @default "RECOMMEND" */
      sortby?: 'RECOMMEND' | 'NEW' | 'SALES' | 'REVIEW' | 'LIKE' | 'LOW_PRICE' | 'HIGH_PRICE';
      categoryIds?: string;
      typeIds?: string;
      locationIds?: string;
      processIds?: string;
      usageIds?: string;
      storageIds?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<Test2Data, any>({
      path: `/api/v1/product/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name SelectProductList
   * @request GET:/api/v1/product/
   * @response `200` `SelectProductListData` OK
   */
  selectProductList = (params: RequestParams = {}) =>
    this.request<SelectProductListData, any>({
      path: `/api/v1/product/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags product-info-controller
   * @name SelectUsageList
   * @request GET:/api/v1/product-info/usage
   * @response `200` `SelectUsageListData` OK
   */
  selectUsageList = (params: RequestParams = {}) =>
    this.request<SelectUsageListData, any>({
      path: `/api/v1/product-info/usage`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags product-info-controller
   * @name SelectTypeList
   * @request GET:/api/v1/product-info/type
   * @response `200` `SelectTypeListData` OK
   */
  selectTypeList = (params: RequestParams = {}) =>
    this.request<SelectTypeListData, any>({
      path: `/api/v1/product-info/type`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags product-info-controller
   * @name SelectStorageList
   * @request GET:/api/v1/product-info/storage
   * @response `200` `SelectStorageListData` OK
   */
  selectStorageList = (params: RequestParams = {}) =>
    this.request<SelectStorageListData, any>({
      path: `/api/v1/product-info/storage`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags product-info-controller
   * @name SelectProcessList
   * @request GET:/api/v1/product-info/process
   * @response `200` `SelectProcessListData` OK
   */
  selectProcessList = (params: RequestParams = {}) =>
    this.request<SelectProcessListData, any>({
      path: `/api/v1/product-info/process`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags product-info-controller
   * @name SelectLocationList
   * @request GET:/api/v1/product-info/location
   * @response `200` `SelectLocationListData` OK
   */
  selectLocationList = (params: RequestParams = {}) =>
    this.request<SelectLocationListData, any>({
      path: `/api/v1/product-info/location`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name SelectOrder
   * @request GET:/api/v1/order/{id}
   * @response `200` `SelectOrderData` OK
   */
  selectOrder = (id: string, params: RequestParams = {}) =>
    this.request<SelectOrderData, any>({
      path: `/api/v1/order/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name CheckPaymentDone
   * @request GET:/api/v1/order/payment-check/{id}
   * @response `200` `CheckPaymentDoneData` OK
   */
  checkPaymentDone = (id: string, params: RequestParams = {}) =>
    this.request<CheckPaymentDoneData, any>({
      path: `/api/v1/order/payment-check/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name SelectOrderList
   * @request GET:/api/v1/order/list
   * @response `200` `SelectOrderListData` OK
   */
  selectOrderList = (params: RequestParams = {}) =>
    this.request<SelectOrderListData, any>({
      path: `/api/v1/order/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name SelectCanceledOrderList
   * @request GET:/api/v1/order/cancel-list
   * @response `200` `SelectCanceledOrderListData` OK
   */
  selectCanceledOrderList = (params: RequestParams = {}) =>
    this.request<SelectCanceledOrderListData, any>({
      path: `/api/v1/order/cancel-list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags notification-controller
   * @name SelectNotification
   * @request GET:/api/v1/notification/
   * @response `200` `SelectNotificationData` OK
   */
  selectNotification = (params: RequestParams = {}) =>
    this.request<SelectNotificationData, any>({
      path: `/api/v1/notification/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags notice-controller
   * @name SelectNotice
   * @request GET:/api/v1/notice/{id}
   * @response `200` `SelectNoticeData` OK
   */
  selectNotice = (id: number, params: RequestParams = {}) =>
    this.request<SelectNoticeData, any>({
      path: `/api/v1/notice/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags notice-controller
   * @name UpdateNotice1
   * @request DELETE:/api/v1/notice/{id}
   * @response `200` `UpdateNotice1Data` OK
   */
  updateNotice1 = (id: number, params: RequestParams = {}) =>
    this.request<UpdateNotice1Data, any>({
      path: `/api/v1/notice/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags notice-controller
   * @name SelectNoticeList
   * @request GET:/api/v1/notice/
   * @response `200` `SelectNoticeListData` OK
   */
  selectNoticeList = (
    query: {
      type: 'NOTICE' | 'FAQ';
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectNoticeListData, any>({
      path: `/api/v1/notice/`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags main-controller
   * @name SelectMainItems
   * @request GET:/api/v1/main
   * @response `200` `SelectMainItemsData` OK
   */
  selectMainItems = (params: RequestParams = {}) =>
    this.request<SelectMainItemsData, any>({
      path: `/api/v1/main`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags inquiry-controller
   * @name SelectInquiry
   * @request GET:/api/v1/inquiry/{id}
   * @response `200` `SelectInquiryData` OK
   */
  selectInquiry = (id: number, params: RequestParams = {}) =>
    this.request<SelectInquiryData, any>({
      path: `/api/v1/inquiry/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags inquiry-controller
   * @name SelectInquiryListWithProduct
   * @request GET:/api/v1/inquiry/product/{productId}
   * @response `200` `SelectInquiryListWithProductData` OK
   */
  selectInquiryListWithProduct = (productId: number, params: RequestParams = {}) =>
    this.request<SelectInquiryListWithProductData, any>({
      path: `/api/v1/inquiry/product/${productId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags inquiry-controller
   * @name SelectInquiryListByAdmin
   * @request GET:/api/v1/inquiry/
   * @response `200` `SelectInquiryListByAdminData` OK
   */
  selectInquiryListByAdmin = (params: RequestParams = {}) =>
    this.request<SelectInquiryListByAdminData, any>({
      path: `/api/v1/inquiry/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags filter-controller
   * @name SelectFilterList
   * @request GET:/api/v1/filter/list
   * @response `200` `SelectFilterListData` OK
   */
  selectFilterList = (params: RequestParams = {}) =>
    this.request<SelectFilterListData, any>({
      path: `/api/v1/filter/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags deliver-place-controller
   * @name SelectDeliverPlace
   * @request GET:/api/v1/deliverPlace/list
   * @response `200` `SelectDeliverPlaceData` OK
   */
  selectDeliverPlace = (params: RequestParams = {}) =>
    this.request<SelectDeliverPlaceData, any>({
      path: `/api/v1/deliverPlace/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags curation-controller
   * @name SelectCuration
   * @request GET:/api/v1/curation/{id}
   * @response `200` `SelectCurationData` OK
   */
  selectCuration = (id: number, params: RequestParams = {}) =>
    this.request<SelectCurationData, any>({
      path: `/api/v1/curation/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags curation-controller
   * @name SelectCurationProducts
   * @request GET:/api/v1/curation/{id}/products
   * @response `200` `SelectCurationProductsData` OK
   */
  selectCurationProducts = (id: number, params: RequestParams = {}) =>
    this.request<SelectCurationProductsData, any>({
      path: `/api/v1/curation/${id}/products`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags curation-controller
   * @name SelectCurationList
   * @request GET:/api/v1/curation/
   * @response `200` `SelectCurationListData` OK
   */
  selectCurationList = (params: RequestParams = {}) =>
    this.request<SelectCurationListData, any>({
      path: `/api/v1/curation/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon-controller
   * @name SelectCoupon
   * @request GET:/api/v1/coupon/{id}
   * @response `200` `SelectCouponData` OK
   */
  selectCoupon = (id: number, params: RequestParams = {}) =>
    this.request<SelectCouponData, any>({
      path: `/api/v1/coupon/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon-controller
   * @name DeleteCoupon
   * @request DELETE:/api/v1/coupon/{id}
   * @response `200` `DeleteCouponData` OK
   */
  deleteCoupon = (id: number, params: RequestParams = {}) =>
    this.request<DeleteCouponData, any>({
      path: `/api/v1/coupon/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon-controller
   * @name TestCoupon
   * @request GET:/api/v1/coupon/test
   * @response `200` `TestCouponData` OK
   */
  testCoupon = (params: RequestParams = {}) =>
    this.request<TestCouponData, any>({
      path: `/api/v1/coupon/test`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon-controller
   * @name SelectCouponListByAdmin
   * @request GET:/api/v1/coupon/management
   * @response `200` `SelectCouponListByAdminData` OK
   */
  selectCouponListByAdmin = (params: RequestParams = {}) =>
    this.request<SelectCouponListByAdminData, any>({
      path: `/api/v1/coupon/management`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon-controller
   * @name SelectDownloadedCoupon
   * @request GET:/api/v1/coupon/downloaded
   * @response `200` `SelectDownloadedCouponData` OK
   */
  selectDownloadedCoupon = (params: RequestParams = {}) =>
    this.request<SelectDownloadedCouponData, any>({
      path: `/api/v1/coupon/downloaded`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon-controller
   * @name SelectCanUseCoupon
   * @request GET:/api/v1/coupon/can-use
   * @response `200` `SelectCanUseCouponData` OK
   */
  selectCanUseCoupon = (params: RequestParams = {}) =>
    this.request<SelectCanUseCouponData, any>({
      path: `/api/v1/coupon/can-use`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon-controller
   * @name SelectCanDownloadCoupon
   * @request GET:/api/v1/coupon/can-download
   * @response `200` `SelectCanDownloadCouponData` OK
   */
  selectCanDownloadCoupon = (params: RequestParams = {}) =>
    this.request<SelectCanDownloadCouponData, any>({
      path: `/api/v1/coupon/can-download`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name Test3
   * @request GET:/api/v1/compare/test
   * @response `200` `Test3Data` OK
   */
  test3 = (params: RequestParams = {}) =>
    this.request<Test3Data, any>({
      path: `/api/v1/compare/test`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name SelectCompareSet
   * @request GET:/api/v1/compare/set/{id}
   * @response `200` `SelectCompareSetData` OK
   */
  selectCompareSet = (id: number, params: RequestParams = {}) =>
    this.request<SelectCompareSetData, any>({
      path: `/api/v1/compare/set/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name SelectCompareSetList
   * @request GET:/api/v1/compare/set/list
   * @response `200` `SelectCompareSetListData` OK
   */
  selectCompareSetList = (params: RequestParams = {}) =>
    this.request<SelectCompareSetListData, any>({
      path: `/api/v1/compare/set/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name SelectSaveProductList
   * @request GET:/api/v1/compare/save
   * @response `200` `SelectSaveProductListData` OK
   */
  selectSaveProductList = (params: RequestParams = {}) =>
    this.request<SelectSaveProductListData, any>({
      path: `/api/v1/compare/save`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name DeleteSaveProducts
   * @request DELETE:/api/v1/compare/save
   * @response `200` `DeleteSaveProductsData` OK
   */
  deleteSaveProducts = (data: DeleteSaveProductsPayload, params: RequestParams = {}) =>
    this.request<DeleteSaveProductsData, any>({
      path: `/api/v1/compare/save`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name SelectMain
   * @request GET:/api/v1/compare/main
   * @response `200` `SelectMainData` OK
   */
  selectMain = (
    query: {
      /** @format int32 */
      page: number;
      /** @format int32 */
      take: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectMainData, any>({
      path: `/api/v1/compare/main`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name SelectCategories
   * @request GET:/api/v1/category/
   * @response `200` `SelectCategoriesData` OK
   */
  selectCategories = (params: RequestParams = {}) =>
    this.request<SelectCategoriesData, any>({
      path: `/api/v1/category/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags basket-controller
   * @name SelectBasket
   * @request GET:/api/v1/basket/list
   * @response `200` `SelectBasketData` OK
   */
  selectBasket = (params: RequestParams = {}) =>
    this.request<SelectBasketData, any>({
      path: `/api/v1/basket/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags banner-controller
   * @name SelectBanner
   * @request GET:/api/v1/banner/{id}
   * @response `200` `SelectBannerData` OK
   */
  selectBanner = (id: number, params: RequestParams = {}) =>
    this.request<SelectBannerData, any>({
      path: `/api/v1/banner/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags banner-controller
   * @name DeleteBanner
   * @request DELETE:/api/v1/banner/{id}
   * @response `200` `DeleteBannerData` OK
   */
  deleteBanner = (id: number, params: RequestParams = {}) =>
    this.request<DeleteBannerData, any>({
      path: `/api/v1/banner/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags banner-controller
   * @name SelectPcWebBanner
   * @request GET:/api/v1/banner/pcweb
   * @response `200` `SelectPcWebBannerData` OK
   */
  selectPcWebBanner = (params: RequestParams = {}) =>
    this.request<SelectPcWebBannerData, any>({
      path: `/api/v1/banner/pcweb`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags banner-controller
   * @name SelectBannerListByAdmin
   * @request GET:/api/v1/banner/management
   * @response `200` `SelectBannerListByAdminData` OK
   */
  selectBannerListByAdmin = (params: RequestParams = {}) =>
    this.request<SelectBannerListByAdminData, any>({
      path: `/api/v1/banner/management`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags banner-controller
   * @name SelectBannerList
   * @request GET:/api/v1/banner/
   * @response `200` `SelectBannerListData` OK
   */
  selectBannerList = (params: RequestParams = {}) =>
    this.request<SelectBannerListData, any>({
      path: `/api/v1/banner/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name DeleteReviewByUser
   * @request DELETE:/api/v1/review/{id}
   * @response `200` `DeleteReviewByUserData` OK
   */
  deleteReviewByUser = (id: number, params: RequestParams = {}) =>
    this.request<DeleteReviewByUserData, any>({
      path: `/api/v1/review/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags deliver-place-controller
   * @name DeleteDeliverPlace
   * @request DELETE:/api/v1/deliverPlace/{id}
   * @response `200` `DeleteDeliverPlaceData` OK
   */
  deleteDeliverPlace = (id: number, params: RequestParams = {}) =>
    this.request<DeleteDeliverPlaceData, any>({
      path: `/api/v1/deliverPlace/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags curation-controller
   * @name DeleteCuration
   * @request DELETE:/api/v1/curation/delete/{id}
   * @response `200` `DeleteCurationData` OK
   */
  deleteCuration = (id: number, params: RequestParams = {}) =>
    this.request<DeleteCurationData, any>({
      path: `/api/v1/curation/delete/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags curation-controller
   * @name DeleteProductList
   * @request DELETE:/api/v1/curation/delete-product
   * @response `200` `DeleteProductListData` OK
   */
  deleteProductList = (data: DeleteProductListPayload, params: RequestParams = {}) =>
    this.request<DeleteProductListData, any>({
      path: `/api/v1/curation/delete-product`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name DeleteCompareSet
   * @request DELETE:/api/v1/compare/set
   * @response `200` `DeleteCompareSetData` OK
   */
  deleteCompareSet = (data: DeleteCompareSetPayload, params: RequestParams = {}) =>
    this.request<DeleteCompareSetData, any>({
      path: `/api/v1/compare/set`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name DeleteCategory
   * @request DELETE:/api/v1/category/{id}
   * @response `200` `DeleteCategoryData` OK
   */
  deleteCategory = (id: number, params: RequestParams = {}) =>
    this.request<DeleteCategoryData, any>({
      path: `/api/v1/category/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags basket-controller
   * @name DeleteBasket
   * @request DELETE:/api/v1/basket/
   * @response `200` `DeleteBasketData` OK
   */
  deleteBasket = (data: DeleteBasketPayload, params: RequestParams = {}) =>
    this.request<DeleteBasketData, any>({
      path: `/api/v1/basket/`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
