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
  AddAdminByMasterData,
  AddAdminByMasterPayload,
  AddBasketData,
  AddBasketPayload,
  AddCategoryCompareFilterData,
  AddCategoryCompareFilterPayload,
  AddCategoryData,
  AddCategoryPayload,
  AddCompareFilter1Data,
  AddCompareFilter1Payload,
  AddCompareFilter2Data,
  AddCompareFilterData,
  AddCompareFilterPayload,
  AddCompareSetData,
  AddCompareSetPayload,
  AddCouponData,
  AddCouponPayload,
  AddDeliverPlaceData,
  AddDeliverPlacePayload,
  AddGradeData,
  AddGradePayload,
  AddInquiryData,
  AddInquiryPayload,
  AddNoticeData,
  AddNoticePayload,
  AddPaymentMethodData,
  AddPaymentMethodPayload,
  AddProductData,
  AddProductPayload,
  AddProductToCurationData,
  AddProductToCurationPayload,
  AddProductToTopBarData,
  AddProductToTopBarPayload,
  AddRecommendCompareSetData,
  AddRecommendCompareSetPayload,
  AddReportData,
  AddReportPayload,
  AddReviewByUserData,
  AddReviewByUserPayload,
  AddSearchFilter1Data,
  AddSearchFilter1Payload,
  AddSearchFilterData,
  AddSearchFilterFieldData,
  AddSearchFilterFieldPayload,
  AddSearchFilterPayload,
  AddStoreData,
  AddStorePayload,
  AddTipData,
  AddTipPayload,
  AddTopBarData,
  AddTopBarPayload,
  AnswerInquiryData,
  AnswerInquiryPayload,
  CancelOrderByPartnerData,
  CancelOrderByUserData,
  CancelOrderByUserPayload,
  CancelOrderData,
  CancelOrdersByPartnerData,
  CancelOrdersByPartnerPayload,
  CancelSettleByAdminData,
  CancelSettleByAdminPayload,
  CheckPaymentDoneData,
  CheckStoreIsActiveData,
  CompareProductListData,
  ConfirmCancelOrderData,
  ConfirmChangeProductData,
  ConfirmDepositData,
  ConfirmOrderProductData,
  ConfirmRefundOrderProductData,
  ConfirmReportsData,
  ConfirmReportsPayload,
  CountBasketData,
  CreateBannerData,
  CreateBannerPayload,
  CreateCurationData,
  CreateCurationPayload,
  CreateData,
  CreatePayload,
  DeleteBannerData,
  DeleteBasketData,
  DeleteBasketPayload,
  DeleteCategoryCompareFilterData,
  DeleteCategoryCompareFilterPayload,
  DeleteCategoryData,
  DeleteCompareSetData,
  DeleteCompareSetPayload,
  DeleteCouponData,
  DeleteCurationData,
  DeleteData,
  DeleteDeliverPlaceData,
  DeleteInquiryByAdminData,
  DeleteInquiryByAdminPayload,
  DeleteInquiryByUserData,
  DeletePaymentMethodData,
  DeleteProductData,
  DeleteProductListData,
  DeleteProductListPayload,
  DeleteRecommendCompareSetData,
  DeleteReportsData,
  DeleteReportsPayload,
  DeleteReviewByUser1Data,
  DeleteReviewByUserData,
  DeleteSaveProductsData,
  DeleteSaveProductsPayload,
  DeleteSearchFilterData,
  DeleteSearchFilterFieldData,
  DeleteTipData,
  DeleteTopBarData,
  DeliverReadyData,
  DoneRefundOrderProductData,
  FindEmailData,
  FindEmailPayload,
  GetData,
  GetFormData,
  GetReviewsData,
  GithubWebhookCallbackData,
  GithubWebhookCallbackPayload,
  JoinAppleSnsData,
  JoinAppleSnsPayload,
  JoinSnsUserData,
  JoinSnsUserPayload,
  JoinUserData,
  JoinUserPayload,
  LikeProductByUserData,
  LikeReviewByUserData,
  LikeStoreByUserData,
  LoginAdminData,
  LoginAdminPayload,
  LoginStoreData,
  LoginStorePayload,
  LoginUserData,
  OrderProductData,
  OrderReq,
  ProcessDeliverStartData,
  ProcessDeliverStartPayload,
  ProcessSettleByAdminData,
  ProcessSettleByAdminPayload,
  RejectCancelOrderData,
  RejectChangeProductData,
  RejectRefundOrderProductData,
  RequestChangeProductData,
  RequestChangeProductPayload,
  RequestCodeReq,
  RequestCodeVerificationData,
  RequestRefundOrderProductData,
  RequestRefundOrderProductPayload,
  ResetPasswordData,
  ResetPasswordPayload,
  SaveProductData,
  SaveProductPayload,
  SearchingProductDirectData,
  SearchProductData,
  SelectAddressListData,
  SelectAdminData,
  SelectAdminListData,
  SelectAdminLogListData,
  SelectAdminMyInfoData,
  SelectAllReviewListByAdminData,
  SelectBankCodeListData,
  SelectBannerData,
  SelectBannerListByAdminData,
  SelectBannerListData,
  SelectBasketData,
  SelectCanceledOrderListData,
  SelectCanDownloadCouponData,
  SelectCanUseCouponData,
  SelectCategoriesData,
  SelectCategoryCompareFilter1Data,
  SelectCategoryCompareFilterData,
  SelectCompareFilterAllListData,
  SelectCompareSetData,
  SelectCompareSetListData,
  SelectCouponData,
  SelectCouponListByAdminData,
  SelectCurationData,
  SelectCurationListByAdminData,
  SelectCurationListData,
  SelectCurationProductsData,
  SelectDashBoardData,
  SelectDeliverCompanyListData,
  SelectDeliverPlaceData,
  SelectDownloadCouponData,
  SelectDownloadedCouponData,
  SelectFilterListData,
  SelectGrade1Data,
  SelectGradeData,
  SelectInquiryData,
  SelectInquiryListByAdminData,
  SelectInquiryListWithProductData,
  SelectInquiryListWithUserIdData,
  SelectMainCurationListData,
  SelectMainData,
  SelectMainItemsData,
  SelectMainStoreData,
  SelectMainStoreListData,
  SelectMyPageBannerData,
  SelectMyReviewListData,
  SelectNoticeData,
  SelectNoticeListByAdminData,
  SelectNoticeListData,
  SelectNotificationData,
  SelectOrderData,
  SelectOrderList1Data,
  SelectOrderListData,
  SelectOrderListManageData,
  SelectOrderListWithUserIdData,
  SelectPaymentMethodData,
  SelectPaymentMethodListData,
  SelectPcWebBannerData,
  SelectPointRuleData,
  SelectProductCountByUserData,
  SelectProductData,
  SelectProductListByUser1Data,
  SelectProductListByUserData,
  SelectProductListData,
  SelectProductListForExcelData,
  SelectProductListWithIdsData,
  SelectProductOptionListData,
  SelectProductOtherCustomerBuyData,
  SelectRecentViewListData,
  SelectRecommendCompareSetData,
  SelectRecommendCompareSetListByAdminData,
  SelectRecommendDeliverCompanyListData,
  SelectRecommendStoreListData,
  SelectReportData,
  SelectReportListData,
  SelectReviewData,
  SelectReviewListWithProductIdData,
  SelectReviewListWithStoreId1Data,
  SelectReviewListWithStoreIdData,
  SelectSaveProductListData,
  SelectScrapedStoreData,
  SelectSearchFilterData,
  SelectSearchFilterFieldListData,
  SelectSearchFilterListData,
  SelectSettlementAmountData,
  SelectSettlementLogsData,
  SelectSettlementOrderListData,
  SelectSettlementOrderListDownloadData,
  SelectSiteInfoData,
  SelectSiteInfoListData,
  SelectSmartDeliverApiKeyData,
  SelectStoreByAdmin1Data,
  SelectStoreByAdminData,
  SelectStoreData,
  SelectStoreListByAdminData,
  SelectStoreListData,
  SelectSystemCouponData,
  SelectTipData,
  SelectTipInfoData,
  SelectTipList1Data,
  SelectTipListData,
  SelectTopBarCountData,
  SelectTopBarData,
  SelectTopBarListData,
  SelectTopSearchKeywordsData,
  SelectTrackingInfoData,
  SelectUserList1Data,
  SelectUserListData,
  SelectUserSelfInfoData,
  SendFcmToUserData,
  SendFcmToUserPayload,
  SetMainPartnerByAdminData,
  SetMainPartnerByAdminPayload,
  SortCuration1Data,
  SortCuration1Payload,
  SortCurationData,
  SortCurationPayload,
  UnlikeReviewByUserData,
  UpdateAdminByMasterData,
  UpdateAdminByMasterPayload,
  UpdateBannerData,
  UpdateBannerPayload,
  UpdateBannerStateData,
  UpdateBannerStatePayload,
  UpdateBasketData,
  UpdateCategoryData,
  UpdateCategoryPayload,
  UpdateCurationData,
  UpdateCurationPayload,
  UpdateData,
  UpdateDeliverPlaceData,
  UpdateDeliverPlacePayload,
  UpdateFcmData,
  UpdateFcmReq,
  UpdateGradeData,
  UpdateGradePayload,
  UpdateInquiryData,
  UpdateInquiryPayload,
  UpdateNotice1Data,
  UpdateNoticeData,
  UpdateNoticePayload,
  UpdatePasswordData,
  UpdatePasswordPayload,
  UpdatePayload,
  UpdateProductData,
  UpdateProductPayload,
  UpdateRecommendCompareSetData,
  UpdateRecommendCompareSetPayload,
  UpdateReviewData,
  UpdateReviewPayload,
  UpdateSearchFilterFieldData,
  UpdateSearchFilterFieldPayload,
  UpdateSiteInfoData,
  UpdateSiteInfoPayload,
  UpdateStateProductsData,
  UpdateStateProductsPayload,
  UpdateStoreInfo1Data,
  UpdateStoreInfo1Payload,
  UpdateStoreInfoData,
  UpdateStoreInfoPayload,
  UpdateStoreIsReliableData,
  UpdateStoreIsReliablePayload,
  UpdateStoreStateData,
  UpdateStoreStatePayload,
  UpdateSystemCouponData,
  UpdateSystemCouponPayload,
  UpdateTipData,
  UpdateTipInfoData,
  UpdateTipInfoPayload,
  UpdateTipPayload,
  UpdateTipStateData,
  UpdateTipStatePayload,
  UpdateTopBarData,
  UpdateTopBarPayload,
  UpdateUserData,
  UpdateUserPayload,
  UpdateUserStateData,
  UpdateUserStatePayload,
  UploadPartnerExcelData,
  UploadPartnerExcelPayload,
  UploadProductExcelData,
  UploadProductExcelPayload,
  UserLoginReq,
  VerifyCodeData,
  VerifyCodeReq,
  VerifyCodeWithImpUidData,
  WhoamiData,
  WithdrawUserData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags review-controller-v-2
   * @name DeleteReviewByUser
   * @request POST:/api/v2/review/{id}
   * @response `200` `DeleteReviewByUserData` OK
   */
  deleteReviewByUser = (id: number, params: RequestParams = {}) =>
    this.request<DeleteReviewByUserData, any>({
      path: `/api/v2/review/${id}`,
      method: 'POST',
      ...params,
    });
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
   * @name ResetPassword
   * @request POST:/api/v1/user/reset-password
   * @response `200` `ResetPasswordData` OK
   */
  resetPassword = (data: ResetPasswordPayload, params: RequestParams = {}) =>
    this.request<ResetPasswordData, any>({
      path: `/api/v1/user/reset-password`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name AddPaymentMethod
   * @request POST:/api/v1/user/payment-method/add
   * @response `200` `AddPaymentMethodData` OK
   */
  addPaymentMethod = (data: AddPaymentMethodPayload, params: RequestParams = {}) =>
    this.request<AddPaymentMethodData, any>({
      path: `/api/v1/user/payment-method/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
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
   * @tags user-controller
   * @name JoinAppleSns
   * @request POST:/api/v1/user/join-apple
   * @response `200` `JoinAppleSnsData` OK
   */
  joinAppleSns = (data: JoinAppleSnsPayload, params: RequestParams = {}) =>
    this.request<JoinAppleSnsData, any>({
      path: `/api/v1/user/join-apple`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name FindEmail
   * @request POST:/api/v1/user/find-email
   * @response `200` `FindEmailData` OK
   */
  findEmail = (data: FindEmailPayload, params: RequestParams = {}) =>
    this.request<FindEmailData, any>({
      path: `/api/v1/user/find-email`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name UpdateFcm
   * @request POST:/api/v1/user/fcm-token
   * @response `200` `UpdateFcmData` OK
   */
  updateFcm = (data: UpdateFcmReq, params: RequestParams = {}) =>
    this.request<UpdateFcmData, any>({
      path: `/api/v1/user/fcm-token`,
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
   * @name UpdateTipState
   * @request POST:/api/v1/tip/update/state
   * @response `200` `UpdateTipStateData` OK
   */
  updateTipState = (data: UpdateTipStatePayload, params: RequestParams = {}) =>
    this.request<UpdateTipStateData, any>({
      path: `/api/v1/tip/update/state`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tip-controller
   * @name UpdateTipInfo
   * @request POST:/api/v1/tip/info/update
   * @response `200` `UpdateTipInfoData` OK
   */
  updateTipInfo = (data: UpdateTipInfoPayload, params: RequestParams = {}) =>
    this.request<UpdateTipInfoData, any>({
      path: `/api/v1/tip/info/update`,
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
   * @name UpdatePassword
   * @request POST:/api/v1/store/update/password
   * @response `200` `UpdatePasswordData` OK
   */
  updatePassword = (data: UpdatePasswordPayload, params: RequestParams = {}) =>
    this.request<UpdatePasswordData, any>({
      path: `/api/v1/store/update/password`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name UpdateStoreIsReliable
   * @request POST:/api/v1/store/update/is-reliable
   * @response `200` `UpdateStoreIsReliableData` OK
   */
  updateStoreIsReliable = (data: UpdateStoreIsReliablePayload, params: RequestParams = {}) =>
    this.request<UpdateStoreIsReliableData, any>({
      path: `/api/v1/store/update/is-reliable`,
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
   * @name SetMainPartnerByAdmin
   * @request POST:/api/v1/store/set-main
   * @response `200` `SetMainPartnerByAdminData` OK
   */
  setMainPartnerByAdmin = (data: SetMainPartnerByAdminPayload, params: RequestParams = {}) =>
    this.request<SetMainPartnerByAdminData, any>({
      path: `/api/v1/store/set-main`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
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
   * @tags settlement-controller
   * @name ProcessSettleByAdmin
   * @request POST:/api/v1/settlement/request
   * @response `200` `ProcessSettleByAdminData` OK
   */
  processSettleByAdmin = (data: ProcessSettleByAdminPayload, params: RequestParams = {}) =>
    this.request<ProcessSettleByAdminData, any>({
      path: `/api/v1/settlement/request`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags settlement-controller
   * @name CancelSettleByAdmin
   * @request POST:/api/v1/settlement/cancel
   * @response `200` `CancelSettleByAdminData` OK
   */
  cancelSettleByAdmin = (data: CancelSettleByAdminPayload, params: RequestParams = {}) =>
    this.request<CancelSettleByAdminData, any>({
      path: `/api/v1/settlement/cancel`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags search-filter-controller
   * @name AddSearchFilter
   * @request POST:/api/v1/search-filter/update/{id}
   * @response `200` `AddSearchFilterData` OK
   */
  addSearchFilter = (id: number, data: AddSearchFilterPayload, params: RequestParams = {}) =>
    this.request<AddSearchFilterData, any>({
      path: `/api/v1/search-filter/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags search-filter-controller
   * @name UpdateSearchFilterField
   * @request POST:/api/v1/search-filter/field/update/{id}
   * @response `200` `UpdateSearchFilterFieldData` OK
   */
  updateSearchFilterField = (
    id: number,
    data: UpdateSearchFilterFieldPayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateSearchFilterFieldData, any>({
      path: `/api/v1/search-filter/field/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags search-filter-controller
   * @name AddSearchFilterField
   * @request POST:/api/v1/search-filter/field/add
   * @response `200` `AddSearchFilterFieldData` OK
   */
  addSearchFilterField = (data: AddSearchFilterFieldPayload, params: RequestParams = {}) =>
    this.request<AddSearchFilterFieldData, any>({
      path: `/api/v1/search-filter/field/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags search-filter-controller
   * @name AddSearchFilter1
   * @request POST:/api/v1/search-filter/add
   * @response `200` `AddSearchFilter1Data` OK
   */
  addSearchFilter1 = (data: AddSearchFilter1Payload, params: RequestParams = {}) =>
    this.request<AddSearchFilter1Data, any>({
      path: `/api/v1/search-filter/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name UpdateReview
   * @request POST:/api/v1/review/update/{id}
   * @response `200` `UpdateReviewData` OK
   */
  updateReview = (id: number, data: UpdateReviewPayload, params: RequestParams = {}) =>
    this.request<UpdateReviewData, any>({
      path: `/api/v1/review/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name UnlikeReviewByUser
   * @request POST:/api/v1/review/unlike/{id}
   * @response `200` `UnlikeReviewByUserData` OK
   */
  unlikeReviewByUser = (id: number, params: RequestParams = {}) =>
    this.request<UnlikeReviewByUserData, any>({
      path: `/api/v1/review/unlike/${id}`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name LikeReviewByUser
   * @request POST:/api/v1/review/like/{id}
   * @response `200` `LikeReviewByUserData` OK
   */
  likeReviewByUser = (id: number, params: RequestParams = {}) =>
    this.request<LikeReviewByUserData, any>({
      path: `/api/v1/review/like/${id}`,
      method: 'POST',
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
   * @tags report-controller
   * @name ConfirmReports
   * @request POST:/api/v1/report/confirm
   * @response `200` `ConfirmReportsData` OK
   */
  confirmReports = (data: ConfirmReportsPayload, params: RequestParams = {}) =>
    this.request<ConfirmReportsData, any>({
      path: `/api/v1/report/confirm`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags report-controller
   * @name AddReport
   * @request POST:/api/v1/report/add
   * @response `200` `AddReportData` OK
   */
  addReport = (data: AddReportPayload, params: RequestParams = {}) =>
    this.request<AddReportData, any>({
      path: `/api/v1/report/add`,
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
   * @name UpdateStateProducts
   * @request POST:/api/v1/product/update/state
   * @response `200` `UpdateStateProductsData` OK
   */
  updateStateProducts = (data: UpdateStateProductsPayload, params: RequestParams = {}) =>
    this.request<UpdateStateProductsData, any>({
      path: `/api/v1/product/update/state`,
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
   * @tags product-info-notice-controller
   * @name Update
   * @request POST:/api/v1/product-info-notice/update
   * @response `200` `UpdateData` OK
   */
  update = (data: UpdatePayload, params: RequestParams = {}) =>
    this.request<UpdateData, any>({
      path: `/api/v1/product-info-notice/update`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-info-notice-controller
   * @name Create
   * @request POST:/api/v1/product-info-notice/add
   * @response `200` `CreateData` OK
   */
  create = (data: CreatePayload, params: RequestParams = {}) =>
    this.request<CreateData, any>({
      path: `/api/v1/product-info-notice/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags payment-controller
   * @name CancelOrder
   * @request POST:/api/v1/payment/cancel/{orderId}
   * @response `200` `CancelOrderData` OK
   */
  cancelOrder = (orderId: string, params: RequestParams = {}) =>
    this.request<CancelOrderData, any>({
      path: `/api/v1/payment/cancel/${orderId}`,
      method: 'POST',
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
   * @tags order-controller
   * @name RequestRefundOrderProduct
   * @request POST:/api/v1/order/refund/{orderProductInfoId}/request
   * @response `200` `RequestRefundOrderProductData` OK
   */
  requestRefundOrderProduct = (
    orderProductInfoId: number,
    data: RequestRefundOrderProductPayload,
    params: RequestParams = {},
  ) =>
    this.request<RequestRefundOrderProductData, any>({
      path: `/api/v1/order/refund/${orderProductInfoId}/request`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name RejectRefundOrderProduct
   * @request POST:/api/v1/order/refund/{orderProductInfoId}/reject
   * @response `200` `RejectRefundOrderProductData` OK
   */
  rejectRefundOrderProduct = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<RejectRefundOrderProductData, any>({
      path: `/api/v1/order/refund/${orderProductInfoId}/reject`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name DoneRefundOrderProduct
   * @request POST:/api/v1/order/refund/{orderProductInfoId}/done
   * @response `200` `DoneRefundOrderProductData` OK
   */
  doneRefundOrderProduct = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<DoneRefundOrderProductData, any>({
      path: `/api/v1/order/refund/${orderProductInfoId}/done`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name ConfirmRefundOrderProduct
   * @request POST:/api/v1/order/refund/{orderProductInfoId}/confirm
   * @response `200` `ConfirmRefundOrderProductData` OK
   */
  confirmRefundOrderProduct = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<ConfirmRefundOrderProductData, any>({
      path: `/api/v1/order/refund/${orderProductInfoId}/confirm`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name ProcessDeliverStart
   * @request POST:/api/v1/order/process-deliver/{orderProductInfoId}
   * @response `200` `ProcessDeliverStartData` OK
   */
  processDeliverStart = (
    orderProductInfoId: number,
    data: ProcessDeliverStartPayload,
    params: RequestParams = {},
  ) =>
    this.request<ProcessDeliverStartData, any>({
      path: `/api/v1/order/process-deliver/${orderProductInfoId}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name DeliverReady
   * @request POST:/api/v1/order/deliver-ready/{orderProductInfoId}
   * @response `200` `DeliverReadyData` OK
   */
  deliverReady = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<DeliverReadyData, any>({
      path: `/api/v1/order/deliver-ready/${orderProductInfoId}`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name ConfirmOrderProduct
   * @request POST:/api/v1/order/confirm/{orderProductInfoId}
   * @response `200` `ConfirmOrderProductData` OK
   */
  confirmOrderProduct = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<ConfirmOrderProductData, any>({
      path: `/api/v1/order/confirm/${orderProductInfoId}`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name ConfirmDeposit
   * @request POST:/api/v1/order/confirm-deposit/{orderId}
   * @response `200` `ConfirmDepositData` OK
   */
  confirmDeposit = (orderId: string, params: RequestParams = {}) =>
    this.request<ConfirmDepositData, any>({
      path: `/api/v1/order/confirm-deposit/${orderId}`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name RequestChangeProduct
   * @request POST:/api/v1/order/change/{orderProductInfoId}
   * @response `200` `RequestChangeProductData` OK
   */
  requestChangeProduct = (
    orderProductInfoId: number,
    data: RequestChangeProductPayload,
    params: RequestParams = {},
  ) =>
    this.request<RequestChangeProductData, any>({
      path: `/api/v1/order/change/${orderProductInfoId}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name RejectChangeProduct
   * @request POST:/api/v1/order/change/{orderProductInfoId}/reject
   * @response `200` `RejectChangeProductData` OK
   */
  rejectChangeProduct = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<RejectChangeProductData, any>({
      path: `/api/v1/order/change/${orderProductInfoId}/reject`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name ConfirmChangeProduct
   * @request POST:/api/v1/order/change/{orderProductInfoId}/confirm
   * @response `200` `ConfirmChangeProductData` OK
   */
  confirmChangeProduct = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<ConfirmChangeProductData, any>({
      path: `/api/v1/order/change/${orderProductInfoId}/confirm`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name CancelOrderByUser
   * @request POST:/api/v1/order/cancel/{orderProductInfoId}
   * @response `200` `CancelOrderByUserData` OK
   */
  cancelOrderByUser = (
    orderProductInfoId: number,
    data: CancelOrderByUserPayload,
    params: RequestParams = {},
  ) =>
    this.request<CancelOrderByUserData, any>({
      path: `/api/v1/order/cancel/${orderProductInfoId}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name RejectCancelOrder
   * @request POST:/api/v1/order/cancel/{orderProductInfoId}/reject
   * @response `200` `RejectCancelOrderData` OK
   */
  rejectCancelOrder = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<RejectCancelOrderData, any>({
      path: `/api/v1/order/cancel/${orderProductInfoId}/reject`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name CancelOrderByPartner
   * @request POST:/api/v1/order/cancel/{orderProductInfoId}/partner
   * @response `200` `CancelOrderByPartnerData` OK
   */
  cancelOrderByPartner = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<CancelOrderByPartnerData, any>({
      path: `/api/v1/order/cancel/${orderProductInfoId}/partner`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name ConfirmCancelOrder
   * @request POST:/api/v1/order/cancel/{orderProductInfoId}/confirm
   * @response `200` `ConfirmCancelOrderData` OK
   */
  confirmCancelOrder = (orderProductInfoId: number, params: RequestParams = {}) =>
    this.request<ConfirmCancelOrderData, any>({
      path: `/api/v1/order/cancel/${orderProductInfoId}/confirm`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name CancelOrdersByPartner
   * @request POST:/api/v1/order/cancel/partner
   * @response `200` `CancelOrdersByPartnerData` OK
   */
  cancelOrdersByPartner = (data: CancelOrdersByPartnerPayload, params: RequestParams = {}) =>
    this.request<CancelOrdersByPartnerData, any>({
      path: `/api/v1/order/cancel/partner`,
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
   * @name UpdateInquiry
   * @request POST:/api/v1/inquiry/update/{id}
   * @response `200` `UpdateInquiryData` OK
   */
  updateInquiry = (id: number, data: UpdateInquiryPayload, params: RequestParams = {}) =>
    this.request<UpdateInquiryData, any>({
      path: `/api/v1/inquiry/update/${id}`,
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
   * @tags grade-controller
   * @name UpdateGrade
   * @request POST:/api/v1/grade/update/{id}
   * @response `200` `UpdateGradeData` OK
   */
  updateGrade = (id: number, data: UpdateGradePayload, params: RequestParams = {}) =>
    this.request<UpdateGradeData, any>({
      path: `/api/v1/grade/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags grade-controller
   * @name AddGrade
   * @request POST:/api/v1/grade/add
   * @response `200` `AddGradeData` OK
   */
  addGrade = (data: AddGradePayload, params: RequestParams = {}) =>
    this.request<AddGradeData, any>({
      path: `/api/v1/grade/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags github-webhook
   * @name GithubWebhookCallback
   * @request POST:/api/v1/github_webhook
   * @response `200` `GithubWebhookCallbackData` OK
   */
  githubWebhookCallback = (data: GithubWebhookCallbackPayload, params: RequestParams = {}) =>
    this.request<GithubWebhookCallbackData, any>({
      path: `/api/v1/github_webhook`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags fcm-controller
   * @name SendFcmToUser
   * @request POST:/api/v1/fcm/send-fcm
   * @response `200` `SendFcmToUserData` OK
   */
  sendFcmToUser = (data: SendFcmToUserPayload, params: RequestParams = {}) =>
    this.request<SendFcmToUserData, any>({
      path: `/api/v1/fcm/send-fcm`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags excel-controller
   * @name UploadProductExcel
   * @request POST:/api/v1/excel/upload-product
   * @response `200` `UploadProductExcelData` OK
   */
  uploadProductExcel = (data: UploadProductExcelPayload, params: RequestParams = {}) =>
    this.request<UploadProductExcelData, any>({
      path: `/api/v1/excel/upload-product`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags excel-controller
   * @name UploadPartnerExcel
   * @request POST:/api/v1/excel/upload-partner
   * @response `200` `UploadPartnerExcelData` OK
   */
  uploadPartnerExcel = (data: UploadPartnerExcelPayload, params: RequestParams = {}) =>
    this.request<UploadPartnerExcelData, any>({
      path: `/api/v1/excel/upload-partner`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
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
   * @name UpdateSystemCoupon
   * @request POST:/api/v1/coupon/system-coupon/update
   * @response `200` `UpdateSystemCouponData` OK
   */
  updateSystemCoupon = (data: UpdateSystemCouponPayload, params: RequestParams = {}) =>
    this.request<UpdateSystemCouponData, any>({
      path: `/api/v1/coupon/system-coupon/update`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
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
   * @name UpdateRecommendCompareSet
   * @request POST:/api/v1/compare/recommend/update/{id}
   * @response `200` `UpdateRecommendCompareSetData` OK
   */
  updateRecommendCompareSet = (
    id: number,
    data: UpdateRecommendCompareSetPayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateRecommendCompareSetData, any>({
      path: `/api/v1/compare/recommend/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name AddRecommendCompareSet
   * @request POST:/api/v1/compare/recommend/add
   * @response `200` `AddRecommendCompareSetData` OK
   */
  addRecommendCompareSet = (data: AddRecommendCompareSetPayload, params: RequestParams = {}) =>
    this.request<AddRecommendCompareSetData, any>({
      path: `/api/v1/compare/recommend/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-filter-controller
   * @name AddCompareFilter
   * @request POST:/api/v1/compare/filter/update/{id}
   * @response `200` `AddCompareFilterData` OK
   */
  addCompareFilter = (id: number, data: AddCompareFilterPayload, params: RequestParams = {}) =>
    this.request<AddCompareFilterData, any>({
      path: `/api/v1/compare/filter/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-filter-controller
   * @name AddCompareFilter1
   * @request POST:/api/v1/compare/filter/add
   * @response `200` `AddCompareFilter1Data` OK
   */
  addCompareFilter1 = (data: AddCompareFilter1Payload, params: RequestParams = {}) =>
    this.request<AddCompareFilter1Data, any>({
      path: `/api/v1/compare/filter/add`,
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
   * @name AddCategoryCompareFilter
   * @request POST:/api/v1/category/compare-filter/add/
   * @response `200` `AddCategoryCompareFilterData` OK
   */
  addCategoryCompareFilter = (data: AddCategoryCompareFilterPayload, params: RequestParams = {}) =>
    this.request<AddCategoryCompareFilterData, any>({
      path: `/api/v1/category/compare-filter/add/`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
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
   * @name UpdateBannerState
   * @request POST:/api/v1/banner/update/state
   * @response `200` `UpdateBannerStateData` OK
   */
  updateBannerState = (data: UpdateBannerStatePayload, params: RequestParams = {}) =>
    this.request<UpdateBannerStateData, any>({
      path: `/api/v1/banner/update/state`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags banner-controller
   * @name SortCuration1
   * @request POST:/api/v1/banner/sort-banner
   * @response `200` `SortCuration1Data` OK
   */
  sortCuration1 = (data: SortCuration1Payload, params: RequestParams = {}) =>
    this.request<SortCuration1Data, any>({
      path: `/api/v1/banner/sort-banner`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
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
   * @name UpdateAdminByMaster
   * @request POST:/api/v1/admin/update/{id}
   * @response `200` `UpdateAdminByMasterData` OK
   */
  updateAdminByMaster = (
    id: number,
    data: UpdateAdminByMasterPayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateAdminByMasterData, any>({
      path: `/api/v1/admin/update/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
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
   * @tags admin-controller
   * @name AddAdminByMaster
   * @request POST:/api/v1/admin/add
   * @response `200` `AddAdminByMasterData` OK
   */
  addAdminByMaster = (data: AddAdminByMasterPayload, params: RequestParams = {}) =>
    this.request<AddAdminByMasterData, any>({
      path: `/api/v1/admin/add`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller-v-2
   * @name GetReviews
   * @request GET:/api/v2/review/product/{id}
   * @response `200` `GetReviewsData` OK
   */
  getReviews = (
    id: number,
    query?: {
      /** @default "RECENT" */
      orderType?: 'BEST' | 'RECENT';
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
    this.request<GetReviewsData, any>({
      path: `/api/v2/review/product/${id}`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller-v-2
   * @name SelectProductListByUser
   * @request GET:/api/v2/product/list
   * @response `200` `SelectProductListByUserData` OK
   */
  selectProductListByUser = (
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
      /** @default "RECOMMEND" */
      sortby?: 'RECOMMEND' | 'NEW' | 'SALES' | 'REVIEW' | 'LIKE' | 'LOW_PRICE' | 'HIGH_PRICE';
      categoryIds?: string;
      filterFieldIds?: string;
      typeIds?: string;
      locationIds?: string;
      processIds?: string;
      usageIds?: string;
      storageIds?: string;
      /** @format int32 */
      curationId?: number;
      /** @default "" */
      keyword?: string;
      /** @format int32 */
      storeId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectProductListByUserData, any>({
      path: `/api/v2/product/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags verification-controller
   * @name VerifyCodeWithImpUid
   * @request GET:/api/v1/verification/verify/{impUid}
   * @response `200` `VerifyCodeWithImpUidData` OK
   */
  verifyCodeWithImpUid = (impUid: string, params: RequestParams = {}) =>
    this.request<VerifyCodeWithImpUidData, any>({
      path: `/api/v1/verification/verify/${impUid}`,
      method: 'GET',
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
   * @name SelectPaymentMethodList
   * @request GET:/api/v1/user/payment-method
   * @response `200` `SelectPaymentMethodListData` OK
   */
  selectPaymentMethodList = (
    query?: {
      /** @format int32 */
      userId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectPaymentMethodListData, any>({
      path: `/api/v1/user/payment-method`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name SelectPaymentMethod
   * @request GET:/api/v1/user/payment-method/{id}
   * @response `200` `SelectPaymentMethodData` OK
   */
  selectPaymentMethod = (id: number, params: RequestParams = {}) =>
    this.request<SelectPaymentMethodData, any>({
      path: `/api/v1/user/payment-method/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name DeletePaymentMethod
   * @request DELETE:/api/v1/user/payment-method/{id}
   * @response `200` `DeletePaymentMethodData` OK
   */
  deletePaymentMethod = (id: number, params: RequestParams = {}) =>
    this.request<DeletePaymentMethodData, any>({
      path: `/api/v1/user/payment-method/${id}`,
      method: 'DELETE',
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
      /** @default "joinAt" */
      orderby?: 'state' | 'grade' | 'name' | 'nickname' | 'email' | 'phone' | 'point' | 'joinAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      name?: string;
      nickname?: string;
      email?: string;
      phone?: string;
      state?: string;
      loginType?: string;
      /** @format date-time */
      joinAtS?: string;
      /** @format date-time */
      joinAtE?: string;
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
      filterFieldIds?: string;
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
   * @name SelectTopBarCount
   * @request GET:/api/v1/topbar/{id}/count
   * @response `200` `SelectTopBarCountData` OK
   */
  selectTopBarCount = (
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
      filterFieldIds?: string;
      typeIds?: string;
      locationIds?: string;
      processIds?: string;
      usageIds?: string;
      storageIds?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectTopBarCountData, any>({
      path: `/api/v1/topbar/${id}/count`,
      method: 'GET',
      query: query,
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
   * @tags tip-controller
   * @name SelectTipList1
   * @request GET:/api/v1/tip/management
   * @response `200` `SelectTipList1Data` OK
   */
  selectTipList1 = (
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
      /** @default "id" */
      orderby?: 'id' | 'type' | 'title' | 'description' | 'createdAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      title?: string;
      content?: string;
      type?: string;
      /** @format date-time */
      createdAtS?: string;
      /** @format date-time */
      createdAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectTipList1Data, any>({
      path: `/api/v1/tip/management`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags tip-controller
   * @name SelectTipInfo
   * @request GET:/api/v1/tip/info
   * @response `200` `SelectTipInfoData` OK
   */
  selectTipInfo = (params: RequestParams = {}) =>
    this.request<SelectTipInfoData, any>({
      path: `/api/v1/tip/info`,
      method: 'GET',
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
  selectStoreList = (
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
      /** @default "joinAt" */
      orderby?: 'id' | 'state' | 'loginId' | 'name' | 'location' | 'joinAt' | 'isReliable';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectStoreListData, any>({
      path: `/api/v1/store`,
      method: 'GET',
      query: query,
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
   * @name SelectStoreListByAdmin
   * @request GET:/api/v1/store/management/list
   * @response `200` `SelectStoreListByAdminData` OK
   */
  selectStoreListByAdmin = (
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
      /** @default "joinAt" */
      orderby?: 'id' | 'state' | 'loginId' | 'name' | 'location' | 'joinAt' | 'isReliable';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      partnerId?: string;
      name?: string;
      location?: string;
      keyword?: string;
      state?: string;
      ids?: string;
      /** @format date-time */
      joinAtS?: string;
      /** @format date-time */
      joinAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectStoreListByAdminData, any>({
      path: `/api/v1/store/management/list`,
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
   * @tags store-controller
   * @name SelectMainStore
   * @request GET:/api/v1/store/main
   * @response `200` `SelectMainStoreData` OK
   */
  selectMainStore = (params: RequestParams = {}) =>
    this.request<SelectMainStoreData, any>({
      path: `/api/v1/store/main`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags store-controller
   * @name CheckStoreIsActive
   * @request GET:/api/v1/store/is-active
   * @response `200` `CheckStoreIsActiveData` OK
   */
  checkStoreIsActive = (params: RequestParams = {}) =>
    this.request<CheckStoreIsActiveData, any>({
      path: `/api/v1/store/is-active`,
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
   * @tags settlement-controller
   * @name SelectSettlementOrderList
   * @request GET:/api/v1/settlement/order/list
   * @response `200` `SelectSettlementOrderListData` OK
   */
  selectSettlementOrderList = (
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
      /** @default "isSettled" */
      orderby?:
        | 'orderId'
        | 'productName'
        | 'settlePrice'
        | 'price'
        | 'amount'
        | 'isSettled'
        | 'settledAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      isSettled?: boolean;
      /** @format int32 */
      storeId?: number;
      /** @format date-time */
      settledAtS?: string;
      /** @format date-time */
      settledAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectSettlementOrderListData, any>({
      path: `/api/v1/settlement/order/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags settlement-controller
   * @name SelectSettlementOrderListDownload
   * @request GET:/api/v1/settlement/order/list/download
   * @response `200` `SelectSettlementOrderListDownloadData` OK
   */
  selectSettlementOrderListDownload = (
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
      /** @default "isSettled" */
      orderby?:
        | 'orderId'
        | 'productName'
        | 'settlePrice'
        | 'price'
        | 'amount'
        | 'isSettled'
        | 'settledAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      isSettled?: boolean;
      /** @format int32 */
      storeId?: number;
      /** @format date-time */
      settledAtS?: string;
      /** @format date-time */
      settledAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectSettlementOrderListDownloadData, any>({
      path: `/api/v1/settlement/order/list/download`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags settlement-controller
   * @name SelectSettlementLogs
   * @request GET:/api/v1/settlement/log
   * @response `200` `SelectSettlementLogsData` OK
   */
  selectSettlementLogs = (
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
      /** @default "settledAt" */
      orderby?: 'storeName' | 'state' | 'settleAmount' | 'settledAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      state?: boolean;
      /** @format int32 */
      storeName?: number;
      /** @format date-time */
      settledAtS?: string;
      /** @format date-time */
      settledAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectSettlementLogsData, any>({
      path: `/api/v1/settlement/log`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags settlement-controller
   * @name SelectSettlementAmount
   * @request GET:/api/v1/settlement/
   * @response `200` `SelectSettlementAmountData` OK
   */
  selectSettlementAmount = (params: RequestParams = {}) =>
    this.request<SelectSettlementAmountData, any>({
      path: `/api/v1/settlement/`,
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
   * @tags search-filter-controller
   * @name SelectSearchFilter
   * @request GET:/api/v1/search-filter/{id}
   * @response `200` `SelectSearchFilterData` OK
   */
  selectSearchFilter = (id: number, params: RequestParams = {}) =>
    this.request<SelectSearchFilterData, any>({
      path: `/api/v1/search-filter/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags search-filter-controller
   * @name DeleteSearchFilter
   * @request DELETE:/api/v1/search-filter/{id}
   * @response `200` `DeleteSearchFilterData` OK
   */
  deleteSearchFilter = (id: number, params: RequestParams = {}) =>
    this.request<DeleteSearchFilterData, any>({
      path: `/api/v1/search-filter/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags search-filter-controller
   * @name SelectSearchFilterFieldList
   * @request GET:/api/v1/search-filter/{filterId}/list
   * @response `200` `SelectSearchFilterFieldListData` OK
   */
  selectSearchFilterFieldList = (filterId: number, params: RequestParams = {}) =>
    this.request<SelectSearchFilterFieldListData, any>({
      path: `/api/v1/search-filter/${filterId}/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags search-filter-controller
   * @name SelectSearchFilterList
   * @request GET:/api/v1/search-filter/list
   * @response `200` `SelectSearchFilterListData` OK
   */
  selectSearchFilterList = (params: RequestParams = {}) =>
    this.request<SelectSearchFilterListData, any>({
      path: `/api/v1/search-filter/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name SelectReview
   * @request GET:/api/v1/review/{id}
   * @response `200` `SelectReviewData` OK
   */
  selectReview = (id: number, params: RequestParams = {}) =>
    this.request<SelectReviewData, any>({
      path: `/api/v1/review/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name DeleteReviewByUser1
   * @request DELETE:/api/v1/review/{id}
   * @response `200` `DeleteReviewByUser1Data` OK
   */
  deleteReviewByUser1 = (id: number, params: RequestParams = {}) =>
    this.request<DeleteReviewByUser1Data, any>({
      path: `/api/v1/review/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name SelectReviewListWithStoreId
   * @request GET:/api/v1/review/store
   * @response `200` `SelectReviewListWithStoreIdData` OK
   */
  selectReviewListWithStoreId = (
    query?: {
      /** @default "RECENT" */
      orderType?: 'BEST' | 'RECENT';
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
    this.request<SelectReviewListWithStoreIdData, any>({
      path: `/api/v1/review/store`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name SelectReviewListWithStoreId1
   * @request GET:/api/v1/review/store/{id}
   * @response `200` `SelectReviewListWithStoreId1Data` OK
   */
  selectReviewListWithStoreId1 = (
    id: number,
    query?: {
      /** @default "RECENT" */
      orderType?: 'BEST' | 'RECENT';
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
    this.request<SelectReviewListWithStoreId1Data, any>({
      path: `/api/v1/review/store/${id}`,
      method: 'GET',
      query: query,
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
  selectReviewListWithProductId = (
    id: number,
    query?: {
      /** @default "RECENT" */
      orderType?: 'BEST' | 'RECENT';
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
    this.request<SelectReviewListWithProductIdData, any>({
      path: `/api/v1/review/product/${id}`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags review-controller
   * @name SelectMyReviewList
   * @request GET:/api/v1/review/my
   * @response `200` `SelectMyReviewListData` OK
   */
  selectMyReviewList = (
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
    this.request<SelectMyReviewListData, any>({
      path: `/api/v1/review/my`,
      method: 'GET',
      query: query,
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
  selectAllReviewListByAdmin = (
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
      /** @default "createdAt" */
      orderby?:
        | 'orderId'
        | 'productName'
        | 'storeName'
        | 'reviewerName'
        | 'reviewerEmail'
        | 'createdAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      orderNo?: string;
      productName?: string;
      partnerName?: string;
      reviewer?: string;
      evaluation?: string;
      /** @format date-time */
      createdAtS?: string;
      /** @format date-time */
      createdAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectAllReviewListByAdminData, any>({
      path: `/api/v1/review/management`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags report-controller
   * @name SelectReport
   * @request GET:/api/v1/report/{id}
   * @response `200` `SelectReportData` OK
   */
  selectReport = (id: number, params: RequestParams = {}) =>
    this.request<SelectReportData, any>({
      path: `/api/v1/report/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags report-controller
   * @name SelectReportList
   * @request GET:/api/v1/report/list
   * @response `200` `SelectReportListData` OK
   */
  selectReportList = (
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
      /** @default "createdAt" */
      orderby?: 'userName' | 'userEmail' | 'targetName' | 'targetEmail' | 'createdAt' | 'confirmAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      reportFrom?: string;
      reportTo?: string;
      /** @format date-time */
      createdAtS?: string;
      /** @format date-time */
      createdAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectReportListData, any>({
      path: `/api/v1/report/list`,
      method: 'GET',
      query: query,
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
   * @name SelectRecentViewList
   * @request GET:/api/v1/product/recent-view
   * @response `200` `SelectRecentViewListData` OK
   */
  selectRecentViewList = (
    query: {
      ids: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectRecentViewListData, any>({
      path: `/api/v1/product/recent-view`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name SelectProductListByUser1
   * @request GET:/api/v1/product/list
   * @response `200` `SelectProductListByUser1Data` OK
   */
  selectProductListByUser1 = (
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
      /** @default "RECOMMEND" */
      sortby?: 'RECOMMEND' | 'NEW' | 'SALES' | 'REVIEW' | 'LIKE' | 'LOW_PRICE' | 'HIGH_PRICE';
      categoryIds?: string;
      filterFieldIds?: string;
      typeIds?: string;
      locationIds?: string;
      processIds?: string;
      usageIds?: string;
      storageIds?: string;
      /** @format int32 */
      curationId?: number;
      /** @default "" */
      keyword?: string;
      /** @format int32 */
      storeId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectProductListByUser1Data, any>({
      path: `/api/v1/product/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name SelectProductListWithIds
   * @request GET:/api/v1/product/list/ids
   * @response `200` `SelectProductListWithIdsData` OK
   */
  selectProductListWithIds = (
    query: {
      ids: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectProductListWithIdsData, any>({
      path: `/api/v1/product/list/ids`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name SelectProductCountByUser
   * @request GET:/api/v1/product/list/count
   * @response `200` `SelectProductCountByUserData` OK
   */
  selectProductCountByUser = (
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
      /** @default "RECOMMEND" */
      sortby?: 'RECOMMEND' | 'NEW' | 'SALES' | 'REVIEW' | 'LIKE' | 'LOW_PRICE' | 'HIGH_PRICE';
      categoryIds?: string;
      filterFieldIds?: string;
      typeIds?: string;
      locationIds?: string;
      processIds?: string;
      usageIds?: string;
      storageIds?: string;
      /** @format int32 */
      curationId?: number;
      /** @default "" */
      keyword?: string;
      /** @format int32 */
      storeId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectProductCountByUserData, any>({
      path: `/api/v1/product/list/count`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-controller
   * @name SelectProductListForExcel
   * @request GET:/api/v1/product/excel-list
   * @response `200` `SelectProductListForExcelData` OK
   */
  selectProductListForExcel = (
    query?: {
      ids?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectProductListForExcelData, any>({
      path: `/api/v1/product/excel-list`,
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
  selectProductList = (
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
      /** @default "createdAt" */
      orderby?:
        | 'id'
        | 'storeName'
        | 'state'
        | 'title'
        | 'categoryName'
        | 'originPrice'
        | 'discountRate'
        | 'createdAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      partnerName?: string;
      title?: string;
      state?: string;
      category?: string;
      partnerId?: string;
      categoryId?: string;
      /** @format date-time */
      createdAtS?: string;
      /** @format date-time */
      createdAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectProductListData, any>({
      path: `/api/v1/product/`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-info-notice-controller
   * @name GetForm
   * @request GET:/api/v1/product-info-notice/getForm
   * @response `200` `GetFormData` OK
   */
  getForm = (
    query: {
      itemCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetFormData, any>({
      path: `/api/v1/product-info-notice/getForm`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-info-notice-controller
   * @name Get
   * @request GET:/api/v1/product-info-notice/get/{productId}
   * @response `200` `GetData` OK
   */
  get = (productId: number, params: RequestParams = {}) =>
    this.request<GetData, any>({
      path: `/api/v1/product-info-notice/get/${productId}`,
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
   * @name SelectProductOtherCustomerBuy
   * @request GET:/api/v1/order/recommend
   * @response `200` `SelectProductOtherCustomerBuyData` OK
   */
  selectProductOtherCustomerBuy = (
    query: {
      ids: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectProductOtherCustomerBuyData, any>({
      path: `/api/v1/order/recommend`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name SelectPointRule
   * @request GET:/api/v1/order/point-rule
   * @response `200` `SelectPointRuleData` OK
   */
  selectPointRule = (params: RequestParams = {}) =>
    this.request<SelectPointRuleData, any>({
      path: `/api/v1/order/point-rule`,
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
   * @name SelectOrderListManage
   * @request GET:/api/v1/order/management
   * @response `200` `SelectOrderListManageData` OK
   */
  selectOrderListManage = (
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
      /** @default "id" */
      orderby?:
        | 'ordererName'
        | 'id'
        | 'email'
        | 'phone'
        | 'receiverName'
        | 'address'
        | 'postalCode'
        | 'couponDiscount'
        | 'totalAmount'
        | 'orderAt'
        | 'paymentWay';
      /** @default "DESC" */
      sortType?: 'ASC' | 'DESC';
      ordererName?: string;
      id?: string;
      state?: string;
      email?: string;
      phone?: string;
      receiverName?: string;
      address?: string;
      postalCode?: string;
      /** @format date-time */
      orderAtS?: string;
      /** @format date-time */
      orderAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectOrderListManageData, any>({
      path: `/api/v1/order/management`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name SelectOrderListWithUserId
   * @request GET:/api/v1/order/management/user/{userId}
   * @response `200` `SelectOrderListWithUserIdData` OK
   */
  selectOrderListWithUserId = (
    userId: number,
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
    this.request<SelectOrderListWithUserIdData, any>({
      path: `/api/v1/order/management/user/${userId}`,
      method: 'GET',
      query: query,
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
  selectOrderList = (
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
    this.request<SelectOrderListData, any>({
      path: `/api/v1/order/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags order-controller
   * @name SelectOrderList1
   * @request GET:/api/v1/order/list/count
   * @response `200` `SelectOrderList1Data` OK
   */
  selectOrderList1 = (
    query?: {
      state?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectOrderList1Data, any>({
      path: `/api/v1/order/list/count`,
      method: 'GET',
      query: query,
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
   * @tags order-controller
   * @name SelectBankCodeList
   * @request GET:/api/v1/order/bank-code/list
   * @response `200` `SelectBankCodeListData` OK
   */
  selectBankCodeList = (params: RequestParams = {}) =>
    this.request<SelectBankCodeListData, any>({
      path: `/api/v1/order/bank-code/list`,
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
  selectNotification = (
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
    this.request<SelectNotificationData, any>({
      path: `/api/v1/notification/`,
      method: 'GET',
      query: query,
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
   * @name SelectNoticeListByAdmin
   * @request GET:/api/v1/notice/management
   * @response `200` `SelectNoticeListByAdminData` OK
   */
  selectNoticeListByAdmin = (
    query: {
      type: 'NOTICE' | 'FAQ';
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
      /** @default "createdAt" */
      orderby?: 'type' | 'title' | 'createdAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      title?: string;
      /** @format date-time */
      createdAtS?: string;
      /** @format date-time */
      createdAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectNoticeListByAdminData, any>({
      path: `/api/v1/notice/management`,
      method: 'GET',
      query: query,
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
   * @tags main-controller
   * @name SelectMainStoreList
   * @request GET:/api/v1/main/store
   * @response `200` `SelectMainStoreListData` OK
   */
  selectMainStoreList = (params: RequestParams = {}) =>
    this.request<SelectMainStoreListData, any>({
      path: `/api/v1/main/store`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags main-controller
   * @name SelectMainCurationList
   * @request GET:/api/v1/main/curation
   * @response `200` `SelectMainCurationListData` OK
   */
  selectMainCurationList = (params: RequestParams = {}) =>
    this.request<SelectMainCurationListData, any>({
      path: `/api/v1/main/curation`,
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
   * @name DeleteInquiryByUser
   * @request DELETE:/api/v1/inquiry/{id}
   * @response `200` `DeleteInquiryByUserData` OK
   */
  deleteInquiryByUser = (id: number, params: RequestParams = {}) =>
    this.request<DeleteInquiryByUserData, any>({
      path: `/api/v1/inquiry/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags inquiry-controller
   * @name SelectInquiryListWithUserId
   * @request GET:/api/v1/inquiry/user
   * @response `200` `SelectInquiryListWithUserIdData` OK
   */
  selectInquiryListWithUserId = (params: RequestParams = {}) =>
    this.request<SelectInquiryListWithUserIdData, any>({
      path: `/api/v1/inquiry/user`,
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
  selectInquiryListByAdmin = (
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
      /** @default "createdAt" */
      orderby?: 'type' | 'isSecret' | 'productName' | 'userName' | 'answeredAt' | 'createdAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      writer?: string;
      productName?: string;
      partnerName?: string;
      type?: string;
      isSecret?: boolean;
      isAnswered?: boolean;
      /** @format date-time */
      createdAtS?: string;
      /** @format date-time */
      createdAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectInquiryListByAdminData, any>({
      path: `/api/v1/inquiry/`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags grade-controller
   * @name SelectGrade
   * @request GET:/api/v1/grade/{id}
   * @response `200` `SelectGradeData` OK
   */
  selectGrade = (id: number, params: RequestParams = {}) =>
    this.request<SelectGradeData, any>({
      path: `/api/v1/grade/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags grade-controller
   * @name SelectGrade1
   * @request GET:/api/v1/grade/list
   * @response `200` `SelectGrade1Data` OK
   */
  selectGrade1 = (params: RequestParams = {}) =>
    this.request<SelectGrade1Data, any>({
      path: `/api/v1/grade/list`,
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
   * @tags deliver-controller
   * @name SelectTrackingInfo
   * @request GET:/api/v1/deliver/tracking
   * @response `200` `SelectTrackingInfoData` OK
   */
  selectTrackingInfo = (
    query: {
      invoice: string;
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectTrackingInfoData, any>({
      path: `/api/v1/deliver/tracking`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags deliver-controller
   * @name SelectRecommendDeliverCompanyList
   * @request GET:/api/v1/deliver/company/recommend
   * @response `200` `SelectRecommendDeliverCompanyListData` OK
   */
  selectRecommendDeliverCompanyList = (
    query: {
      invoice: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectRecommendDeliverCompanyListData, any>({
      path: `/api/v1/deliver/company/recommend`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags deliver-controller
   * @name SelectDeliverCompanyList
   * @request GET:/api/v1/deliver/company/list
   * @response `200` `SelectDeliverCompanyListData` OK
   */
  selectDeliverCompanyList = (params: RequestParams = {}) =>
    this.request<SelectDeliverCompanyListData, any>({
      path: `/api/v1/deliver/company/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags deliver-controller
   * @name SelectSmartDeliverApiKey
   * @request GET:/api/v1/deliver/api-key
   * @response `200` `SelectSmartDeliverApiKeyData` OK
   */
  selectSmartDeliverApiKey = (params: RequestParams = {}) =>
    this.request<SelectSmartDeliverApiKeyData, any>({
      path: `/api/v1/deliver/api-key`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags dash-board-controller
   * @name SelectDashBoard
   * @request GET:/api/v1/dashboard
   * @response `200` `SelectDashBoardData` OK
   */
  selectDashBoard = (params: RequestParams = {}) =>
    this.request<SelectDashBoardData, any>({
      path: `/api/v1/dashboard`,
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
   * @name SelectCurationListByAdmin
   * @request GET:/api/v1/curation/management
   * @response `200` `SelectCurationListByAdminData` OK
   */
  selectCurationListByAdmin = (
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
      /** @default "id" */
      orderby?: 'id' | 'sortNo' | 'shortName' | 'title' | 'description' | 'type';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectCurationListByAdminData, any>({
      path: `/api/v1/curation/management`,
      method: 'GET',
      query: query,
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
   * @name SelectSystemCoupon
   * @request GET:/api/v1/coupon/system-coupon
   * @response `200` `SelectSystemCouponData` OK
   */
  selectSystemCoupon = (params: RequestParams = {}) =>
    this.request<SelectSystemCouponData, any>({
      path: `/api/v1/coupon/system-coupon`,
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
  selectCouponListByAdmin = (
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
      /** @default "id" */
      orderby?: 'id' | 'title' | 'type' | 'amount' | 'minPrice' | 'startAt' | 'endAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      title?: string;
      type?: string;
      /** @format date-time */
      startAtS?: string;
      /** @format date-time */
      startAtE?: string;
      /** @format date-time */
      endAtS?: string;
      /** @format date-time */
      endAtE?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectCouponListByAdminData, any>({
      path: `/api/v1/coupon/management`,
      method: 'GET',
      query: query,
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
   * @name SelectRecommendCompareSet
   * @request GET:/api/v1/compare/recommend/{id}
   * @response `200` `SelectRecommendCompareSetData` OK
   */
  selectRecommendCompareSet = (id: number, params: RequestParams = {}) =>
    this.request<SelectRecommendCompareSetData, any>({
      path: `/api/v1/compare/recommend/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name DeleteRecommendCompareSet
   * @request DELETE:/api/v1/compare/recommend/{id}
   * @response `200` `DeleteRecommendCompareSetData` OK
   */
  deleteRecommendCompareSet = (id: number, params: RequestParams = {}) =>
    this.request<DeleteRecommendCompareSetData, any>({
      path: `/api/v1/compare/recommend/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name SelectRecommendCompareSetListByAdmin
   * @request GET:/api/v1/compare/recommend/list
   * @response `200` `SelectRecommendCompareSetListByAdminData` OK
   */
  selectRecommendCompareSetListByAdmin = (
    query: {
      type: 'RECOMMEND' | 'POPULAR';
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectRecommendCompareSetListByAdminData, any>({
      path: `/api/v1/compare/recommend/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-controller
   * @name CompareProductList
   * @request GET:/api/v1/compare/products
   * @response `200` `CompareProductListData` OK
   */
  compareProductList = (
    query: {
      productIdStr: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CompareProductListData, any>({
      path: `/api/v1/compare/products`,
      method: 'GET',
      query: query,
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
    this.request<SelectMainData, any>({
      path: `/api/v1/compare/main`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags compare-filter-controller
   * @name SelectCompareFilterAllList
   * @request GET:/api/v1/compare/filter/management
   * @response `200` `SelectCompareFilterAllListData` OK
   */
  selectCompareFilterAllList = (params: RequestParams = {}) =>
    this.request<SelectCompareFilterAllListData, any>({
      path: `/api/v1/compare/filter/management`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name SelectCategoryCompareFilter
   * @request GET:/api/v1/category/compare-filter/{categoryId}
   * @response `200` `SelectCategoryCompareFilterData` OK
   */
  selectCategoryCompareFilter = (categoryId: number, params: RequestParams = {}) =>
    this.request<SelectCategoryCompareFilterData, any>({
      path: `/api/v1/category/compare-filter/${categoryId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name SelectCategoryCompareFilter1
   * @request GET:/api/v1/category/compare-filter/list
   * @response `200` `SelectCategoryCompareFilter1Data` OK
   */
  selectCategoryCompareFilter1 = (params: RequestParams = {}) =>
    this.request<SelectCategoryCompareFilter1Data, any>({
      path: `/api/v1/category/compare-filter/list`,
      method: 'GET',
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
   * @tags basket-controller
   * @name CountBasket
   * @request GET:/api/v1/basket/list/count
   * @response `200` `CountBasketData` OK
   */
  countBasket = (params: RequestParams = {}) =>
    this.request<CountBasketData, any>({
      path: `/api/v1/basket/list/count`,
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
   * @name SelectMyPageBanner
   * @request GET:/api/v1/banner/my-page
   * @response `200` `SelectMyPageBannerData` OK
   */
  selectMyPageBanner = (params: RequestParams = {}) =>
    this.request<SelectMyPageBannerData, any>({
      path: `/api/v1/banner/my-page`,
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
  selectBannerListByAdmin = (
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
      types?: string;
      /** @default "id" */
      orderby?: 'id' | 'type' | 'curationId' | 'noticeId' | 'categoryId' | 'sortNo';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectBannerListByAdminData, any>({
      path: `/api/v1/banner/management`,
      method: 'GET',
      query: query,
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
   * @tags admin-controller
   * @name SelectAdmin
   * @request GET:/api/v1/admin/{id}
   * @response `200` `SelectAdminData` OK
   */
  selectAdmin = (id: number, params: RequestParams = {}) =>
    this.request<SelectAdminData, any>({
      path: `/api/v1/admin/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-controller
   * @name SelectAdminMyInfo
   * @request GET:/api/v1/admin/my-info
   * @response `200` `SelectAdminMyInfoData` OK
   */
  selectAdminMyInfo = (params: RequestParams = {}) =>
    this.request<SelectAdminMyInfoData, any>({
      path: `/api/v1/admin/my-info`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-log-controller
   * @name SelectAdminLogList
   * @request GET:/api/v1/admin/log/list
   * @response `200` `SelectAdminLogListData` OK
   */
  selectAdminLogList = (
    query: {
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
      type:
        | 'USER'
        | 'PARTNER'
        | 'PRODUCT'
        | 'ORDER'
        | 'SETTLEMENT'
        | 'REPORT'
        | 'INQUIRY'
        | 'COUPON';
      targetId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectAdminLogListData, any>({
      path: `/api/v1/admin/log/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-controller
   * @name SelectAdminList
   * @request GET:/api/v1/admin/list
   * @response `200` `SelectAdminListData` OK
   */
  selectAdminList = (
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
      /** @default "createdAt" */
      orderby?: 'id' | 'state' | 'name' | 'tel' | 'createdAt';
      /** @default "DESC" */
      orderType?: 'ASC' | 'DESC';
      name?: string;
      tel?: string;
      state?: string;
      /** @format date-time */
      createdAtS?: string;
      /** @format date-time */
      createdAtE?: string;
      accessUser?: boolean;
      accessProduct?: boolean;
      accessOrder?: boolean;
      accessSettlement?: boolean;
      accessBoard?: boolean;
      accessPromotion?: boolean;
      accessSetting?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectAdminListData, any>({
      path: `/api/v1/admin/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags address-controller
   * @name SelectAddressList
   * @request GET:/api/v1/address/list
   * @response `200` `SelectAddressListData` OK
   */
  selectAddressList = (
    query?: {
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SelectAddressListData, any>({
      path: `/api/v1/address/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags search-filter-controller
   * @name DeleteSearchFilterField
   * @request DELETE:/api/v1/search-filter/field/{id}
   * @response `200` `DeleteSearchFilterFieldData` OK
   */
  deleteSearchFilterField = (id: number, params: RequestParams = {}) =>
    this.request<DeleteSearchFilterFieldData, any>({
      path: `/api/v1/search-filter/field/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags report-controller
   * @name DeleteReports
   * @request DELETE:/api/v1/report
   * @response `200` `DeleteReportsData` OK
   */
  deleteReports = (data: DeleteReportsPayload, params: RequestParams = {}) =>
    this.request<DeleteReportsData, any>({
      path: `/api/v1/report`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags product-info-notice-controller
   * @name Delete
   * @request DELETE:/api/v1/product-info-notice/delete/{productId}
   * @response `200` `DeleteData` OK
   */
  delete = (productId: number, params: RequestParams = {}) =>
    this.request<DeleteData, any>({
      path: `/api/v1/product-info-notice/delete/${productId}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags inquiry-controller
   * @name DeleteInquiryByAdmin
   * @request DELETE:/api/v1/inquiry/list
   * @response `200` `DeleteInquiryByAdminData` OK
   */
  deleteInquiryByAdmin = (data: DeleteInquiryByAdminPayload, params: RequestParams = {}) =>
    this.request<DeleteInquiryByAdminData, any>({
      path: `/api/v1/inquiry/list`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
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
   * @tags compare-filter-controller
   * @name AddCompareFilter2
   * @request DELETE:/api/v1/compare/filter/{id}
   * @response `200` `AddCompareFilter2Data` OK
   */
  addCompareFilter2 = (id: number, params: RequestParams = {}) =>
    this.request<AddCompareFilter2Data, any>({
      path: `/api/v1/compare/filter/${id}`,
      method: 'DELETE',
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
   * @tags category-controller
   * @name DeleteCategoryCompareFilter
   * @request DELETE:/api/v1/category/compare-filter/delete/
   * @response `200` `DeleteCategoryCompareFilterData` OK
   */
  deleteCategoryCompareFilter = (
    data: DeleteCategoryCompareFilterPayload,
    params: RequestParams = {},
  ) =>
    this.request<DeleteCategoryCompareFilterData, any>({
      path: `/api/v1/category/compare-filter/delete/`,
      method: 'DELETE',
      body: data,
      type: ContentType.Json,
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
