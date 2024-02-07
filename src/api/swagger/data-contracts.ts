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

export interface PortOneBodyData {
  imp_uid?: string;
  merchant_uid?: string;
  status?: string;
}

export interface Category {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  categoryId?: number;
  image?: string;
  name?: string;
  parentCategory?: Category;
  categoryList?: Category[];
}

export interface CustomResponseTopBar {
  isSuccess?: boolean;
  code?: string;
  data?: TopBar;
  errorMsg?: string;
}

export interface Grade {
  /** @format int32 */
  id?: number;
  name?: string;
  /** @format float */
  pointRate?: number;
  /** @format int32 */
  minOrderPrice?: number;
  /** @format int32 */
  minOrderCount?: number;
}

export interface OrderDeliverPlace {
  orderId?: string;
  order?: Orders;
  name?: string;
  receiverName?: string;
  tel?: string;
  postalCode?: string;
  address?: string;
  addressDetail?: string;
  bcode?: string;
  deliverMessage?: string;
}

export interface OrderProductInfo {
  /** @format int32 */
  id?: number;
  orderId?: string;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  storeId?: number;
  /** @format int32 */
  optionItemId?: number;
  state?:
    | 'WAIT_DEPOSIT'
    | 'PAYMENT_DONE'
    | 'DELIVERY_READY'
    | 'ON_DELIVERY'
    | 'DELIVERY_DONE'
    | 'EXCHANGE_REQUEST'
    | 'EXCHANGE_ACCEPT'
    | 'FINAL_CONFIRM'
    | 'CANCELED'
    | 'CANCEL_REQUEST'
    | 'REFUND_REQUEST'
    | 'REFUND_ACCEPT'
    | 'REFUND_DONE'
    | 'DELIVERY_DIFFICULT'
    | 'CANCELED_BY_PARTNER'
    | 'CANCELED_BY_ADMIN';
  /** @format int32 */
  settlePrice?: number;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  price?: number;
  /** @format int32 */
  amount?: number;
  /** @format int32 */
  deliveryFee?: number;
  deliveryFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  cancelReason?:
    | 'JUST'
    | 'DELIVER_DELAY'
    | 'ORDER_FAULT'
    | 'BAD_SERVICE'
    | 'CANCELED_BY_PARTNER'
    | 'CANCELED_BY_ADMIN';
  cancelReasonContent?: string;
  deliverCompanyCode?: string;
  invoiceCode?: string;
  isSettled?: boolean;
  /** @format date-time */
  settledAt?: string;
  /** @format date-time */
  deliveryDoneAt?: string;
  /** @format date-time */
  finalConfirmedAt?: string;
  /** @format int32 */
  taxFreeAmount?: number;
  isTaxFree?: boolean;
  order?: Orders;
  product?: Product;
  /** @format int32 */
  totalProductPrice?: number;
  ifOver?: boolean;
  free?: boolean;
  /** @format int32 */
  totalPriceMinusDeliveryFee?: number;
  /** @format int32 */
  totalPriceContainsDeliveryFee?: number;
  cancelableState?: boolean;
}

export interface Orders {
  id?: string;
  /** @format int32 */
  userId?: number;
  state?:
    | 'WAIT_DEPOSIT'
    | 'PAYMENT_DONE'
    | 'DELIVERY_READY'
    | 'ON_DELIVERY'
    | 'DELIVERY_DONE'
    | 'EXCHANGE_REQUEST'
    | 'EXCHANGE_ACCEPT'
    | 'FINAL_CONFIRM'
    | 'CANCELED'
    | 'CANCEL_REQUEST'
    | 'REFUND_REQUEST'
    | 'REFUND_ACCEPT'
    | 'REFUND_DONE'
    | 'DELIVERY_DIFFICULT';
  paymentWay?:
    | 'CARD'
    | 'KEY_IN'
    | 'NAVER'
    | 'KAKAO_PAY'
    | 'PHONE'
    | 'DEPOSIT'
    | 'VIRTUAL_ACCOUNT'
    | 'TOSS_PAY';
  ordererName?: string;
  ordererTel?: string;
  /** @format int32 */
  originTotalPrice?: number;
  /** @format int32 */
  totalPrice?: number;
  /** @format date-time */
  orderedAt?: string;
  impUid?: string;
  /** @format int32 */
  couponId?: number;
  /** @format int32 */
  couponDiscount?: number;
  /** @format int32 */
  usePoint?: number;
  bankHolder?: string;
  bankCode?: string;
  bankAccount?: string;
  bankName?: string;
  productInfos?: OrderProductInfo[];
  deliverPlace?: OrderDeliverPlace;
  vbankRefundInfo?: VBankRefundInfo;
  couponUsed?: boolean;
  /** @format int32 */
  usedPoint?: number;
  /** @format int32 */
  usedCouponId?: number;
  pointUsed?: boolean;
}

export interface Product {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  storeId?: number;
  store?: Store;
  category?: Category;
  state?: 'ACTIVE' | 'INACTIVE' | 'INACTIVE_PARTNER' | 'SOLD_OUT' | 'DELETED';
  images?: string;
  title?: string;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  discountRate?: number;
  deliveryInfo?: string;
  descriptionImages?: string;
  /** @format int32 */
  expectedDeliverDay?: number;
  forwardingTime?: string;
  /** @format float */
  pointRate?: number;
  /** @format int32 */
  representOptionItemId?: number;
  /** @format int32 */
  deliverBoxPerAmount?: number;
  needTaxation?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  promotionStartAt?: string;
  /** @format date-time */
  promotionEndAt?: string;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  deliverFee?: number;
  /** @format int32 */
  minOrderPrice?: number;
  reviews?: Review[];
  itemCode?: string;
  /** @format double */
  difficultyLevelOfTrimming?: number;
  /** @format double */
  theScentOfTheSea?: number;
  recommendedCookingWay?: string;
  /** @format int32 */
  categoryId?: number;
  deliveryTypeFree?: boolean;
  deliveryTypeFix?: boolean;
  deliveryTypeFreeIfOver?: boolean;
  promotionEnd?: boolean;
  sconditional?: boolean;
}

export interface Review {
  /** @format int32 */
  id?: number;
  product?: Product;
  /** @format int32 */
  productId?: number;
  store?: Store;
  /** @format int32 */
  storeId?: number;
  /** @format int32 */
  userId?: number;
  user?: User;
  orderProductInfo?: OrderProductInfo;
  /** @format int32 */
  orderProductInfoId?: number;
  images?: string;
  content?: string;
  /** @format date-time */
  createdAt?: string;
  isDeleted?: boolean;
  evaluations?: ReviewEvaluation[];
  deleted?: boolean;
  imageUrls?: string[];
}

export interface ReviewEvaluation {
  /** @format int32 */
  reviewId?: number;
  evaluation?: 'TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE';
  review?: Review;
}

export interface Store {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
  loginId?: string;
  password?: string;
  /** @format date-time */
  joinAt?: string;
  storeInfo?: StoreInfo;
  reviews?: Review[];
  name?: string;
}

export interface StoreInfo {
  /** @format int32 */
  storeId?: number;
  store?: Store;
  getbackgroundImage?: string;
  profileImage?: string;
  isReliable?: boolean;
  name?: string;
  location?: string;
  keyword?: string;
  visitNote?: string;
  oneLineDescription?: string;
  /** @format int32 */
  refundDeliverFee?: number;
  isConditional?: boolean;
  /** @format int32 */
  minStorePrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  /** @format float */
  settlementRate?: number;
  bankName?: string;
  bankHolder?: string;
  bankAccount?: string;
  representativeName?: string;
  companyId?: string;
  businessType?: string;
  mosRegistrationNumber?: string;
  businessAddress?: string;
  postalCode?: string;
  lotNumberAddress?: string;
  streetNameAddress?: string;
  addressDetail?: string;
  tel?: string;
  email?: string;
  faxNumber?: string;
  mosRegistration?: string;
  businessRegistration?: string;
  bankAccountCopy?: string;
  deliverCompany?: string;
  /** @format int32 */
  id?: number;
  conditional?: boolean;
}

export interface TopBar {
  /** @format int32 */
  id?: number;
  name?: string;
  curationProductMaps?: TopBarProductMap[];
}

export interface TopBarProductMap {
  /** @format int64 */
  id?: number;
  product?: Product;
  topBar?: TopBar;
}

export interface User {
  /** @format int32 */
  id?: number;
  userInfo?: UserInfo;
  userAuth?: UserAuth[];
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
  /** @format date-time */
  joinAt?: string;
  /** @format date-time */
  withdrawAt?: string;
}

export interface UserAuth {
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  loginType?: 'IDPW' | 'GOOGLE' | 'NAVER' | 'KAKAO' | 'APPLE';
  loginId?: string;
  /** @format int32 */
  userId?: number;
  user?: User;
  password?: string;
  id?: UserAuthId;
  new?: boolean;
}

export interface UserAuthId {
  loginType?: 'IDPW' | 'GOOGLE' | 'NAVER' | 'KAKAO' | 'APPLE';
  loginId?: string;
}

export interface UserInfo {
  /** @format int32 */
  userId?: number;
  user?: User;
  profileImage?: string;
  email?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  isAgreeMarketing?: boolean;
  /** @format int32 */
  point?: number;
  grade?: Grade;
}

export interface VBankRefundInfo {
  bankHolder?: string;
  bankCode?: string;
  bankName?: string;
  bankAccount?: string;
}

export interface CustomResponseTopBarProductMap {
  isSuccess?: boolean;
  code?: string;
  data?: TopBarProductMap;
  errorMsg?: string;
}

export interface StoreExcelDownloadReq {
  storeIds?: number[];
}

export interface CustomResponseBoolean {
  isSuccess?: boolean;
  code?: string;
  data?: boolean;
  errorMsg?: string;
}

export interface UpdateReviewReq {
  content?: string;
  evaluations?: ('TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE')[];
}

export interface CustomResponseObject {
  isSuccess?: boolean;
  code?: string;
  data?: object;
  errorMsg?: string;
}

export interface OrderProductReq {
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  optionId?: number;
  /** @format int32 */
  amount?: number;
  needTaxation?: boolean;
  /** @format int32 */
  deliveryFee?: number;
  /** @format int32 */
  taxFreeAmount?: number;
}

export interface OrderReq {
  name?: string;
  tel?: string;
  /** @format int32 */
  couponId?: number;
  paymentWay?:
    | 'CARD'
    | 'KEY_IN'
    | 'NAVER'
    | 'KAKAO_PAY'
    | 'PHONE'
    | 'DEPOSIT'
    | 'VIRTUAL_ACCOUNT'
    | 'TOSS_PAY';
  /** @format int32 */
  point?: number;
  /** @format int32 */
  totalPrice?: number;
  /** @format int32 */
  totalDeliveryFee?: number;
  /** @format int32 */
  couponDiscountPrice?: number;
  products?: OrderProductReq[];
  /** @format int32 */
  taxFreeAmount?: number;
  /** @format int32 */
  deliverPlaceId?: number;
  /** @format int32 */
  paymentMethodId?: number;
  vbankRefundInfo?: VBankRefundInfoReq;
}

export interface VBankRefundInfoReq {
  bankHolder?: string;
  /** @format int32 */
  bankCodeId?: number;
  bankAccount?: string;
}

export interface CustomResponseOrderDto {
  isSuccess?: boolean;
  code?: string;
  data?: OrderDto;
  errorMsg?: string;
}

export interface DeliverPlace {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userId?: number;
  name?: string;
  receiverName?: string;
  tel?: string;
  postalCode?: string;
  address?: string;
  addressDetail?: string;
  bcode?: string;
  deliverMessage?: string;
  isDefault?: boolean;
}

export interface OptionItemDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  optionId?: number;
  name?: string;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  amount?: number;
  /** @format int32 */
  inventoryQuantity?: number;
  /** @format int32 */
  purchasePrice?: number;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  /** @format int32 */
  deliverBoxPerAmount?: number;
  /** @format int32 */
  maxAvailableAmount?: number;
  /** @format float */
  pointRate?: number;
  /** @format int32 */
  minOrderPrice?: number;
}

export interface OrderDeliverPlaceDto {
  orderId?: string;
  name?: string;
  receiverName?: string;
  tel?: string;
  postalCode?: string;
  address?: string;
  addressDetail?: string;
  deliverMessage?: string;
}

export interface OrderDto {
  id?: string;
  /** @format int32 */
  taxFreeAmount?: number;
  user?: UserInfoDto;
  state?:
    | 'WAIT_DEPOSIT'
    | 'PAYMENT_DONE'
    | 'DELIVERY_READY'
    | 'ON_DELIVERY'
    | 'DELIVERY_DONE'
    | 'EXCHANGE_REQUEST'
    | 'EXCHANGE_ACCEPT'
    | 'FINAL_CONFIRM'
    | 'CANCELED'
    | 'CANCEL_REQUEST'
    | 'REFUND_REQUEST'
    | 'REFUND_ACCEPT'
    | 'REFUND_DONE'
    | 'DELIVERY_DIFFICULT';
  ordererName?: string;
  ordererTel?: string;
  paymentWay?:
    | 'CARD'
    | 'KEY_IN'
    | 'NAVER'
    | 'KAKAO_PAY'
    | 'PHONE'
    | 'DEPOSIT'
    | 'VIRTUAL_ACCOUNT'
    | 'TOSS_PAY';
  /** @format int32 */
  originTotalPrice?: number;
  /** @format int32 */
  totalAmount?: number;
  /** @format int32 */
  couponDiscount?: number;
  couponName?: string;
  /** @format int32 */
  usePoint?: number;
  /** @format date-time */
  orderedAt?: string;
  bankHolder?: string;
  bankCode?: string;
  bankAccount?: string;
  bankName?: string;
  productInfos?: OrderProductDto[];
  deliverPlace?: OrderDeliverPlaceDto;
}

export interface OrderProductDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  storeId?: number;
  storeProfile?: string;
  storeName?: string;
  /** @format int32 */
  deliverFee?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  /** @format int32 */
  minStorePrice?: number;
  product?: ProductListDto;
  state?:
    | 'WAIT_DEPOSIT'
    | 'PAYMENT_DONE'
    | 'DELIVERY_READY'
    | 'ON_DELIVERY'
    | 'DELIVERY_DONE'
    | 'EXCHANGE_REQUEST'
    | 'EXCHANGE_ACCEPT'
    | 'FINAL_CONFIRM'
    | 'CANCELED'
    | 'CANCEL_REQUEST'
    | 'REFUND_REQUEST'
    | 'REFUND_ACCEPT'
    | 'REFUND_DONE'
    | 'DELIVERY_DIFFICULT'
    | 'CANCELED_BY_PARTNER'
    | 'CANCELED_BY_ADMIN';
  optionName?: string;
  optionItem?: OptionItemDto;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  price?: number;
  /** @format int32 */
  amount?: number;
  deliverCompany?: string;
  invoiceCode?: string;
  deliverCompanyCode?: string;
  /** @format date-time */
  finalConfirmedAt?: string;
  needTaxation?: boolean;
  cancelReason?:
    | 'JUST'
    | 'DELIVER_DELAY'
    | 'ORDER_FAULT'
    | 'BAD_SERVICE'
    | 'CANCELED_BY_PARTNER'
    | 'CANCELED_BY_ADMIN';
  cancelReasonContent?: string;
  isReviewWritten?: boolean;
  needed?: boolean;
}

export interface ProductFilterValueDto {
  /** @format int32 */
  compareFilterId?: number;
  compareFilterName?: string;
  value?: string;
}

export interface ProductListDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  productId?: number;
  state?: 'ACTIVE' | 'INACTIVE' | 'INACTIVE_PARTNER' | 'SOLD_OUT' | 'DELETED';
  image?: string;
  title?: string;
  isNeedTaxation?: boolean;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  reviewCount?: number;
  isLike?: boolean;
  /** @format int32 */
  storeId?: number;
  storeName?: string;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  /** @format int32 */
  productDeliveryFee?: number;
  isConditional?: boolean;
  /** @format int32 */
  minStorePrice?: number;
  /** @format int32 */
  storeDeliverFee?: number;
  storeImage?: string;
  /** @format int32 */
  parentCategoryId?: number;
  filterValues?: ProductFilterValueDto[];
  bcodes?: string[];
  tastingNoteExists?: boolean;
}

export interface UserAuthDto {
  loginType?: 'IDPW' | 'GOOGLE' | 'NAVER' | 'KAKAO' | 'APPLE';
  loginId?: string;
  /** @format int32 */
  userId?: number;
}

export interface UserDto {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
  /** @format date-time */
  joinAt?: string;
}

export interface UserInfoDto {
  user?: UserDto;
  auth?: UserAuthDto;
  /** @format int32 */
  userId?: number;
  profileImage?: string;
  email?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  grade?: Grade;
  /** @format int32 */
  point?: number;
  isAgreeMarketing?: boolean;
  deliverPlaces?: DeliverPlace[];
  /** @format int32 */
  reviewCount?: number;
  /** @format int32 */
  notificationCount?: number;
  /** @format int32 */
  saveProductCount?: number;
}

export interface RequestCancelReq {
  cancelReason?:
    | 'JUST'
    | 'DELIVER_DELAY'
    | 'ORDER_FAULT'
    | 'BAD_SERVICE'
    | 'CANCELED_BY_PARTNER'
    | 'CANCELED_BY_ADMIN';
  content?: string;
}

export interface CouponAddReq {
  userIds?: number[];
  title?: string;
  type?: 'AMOUNT' | 'RATE';
  /** @format int32 */
  amount?: number;
  /** @format date-time */
  startAt?: string;
  /** @format date-time */
  endAt?: string;
  /** @format int32 */
  minPrice?: number;
  /** @format int32 */
  maxPrice?: number;
  exposureState?: 'EXPOSED' | 'UNEXPOSED';
  issuanceState?: 'TOBE_ISSUED' | 'ISSUING' | 'SUSPENDED';
  issuanceType?: 'IMMEDIATE' | 'DOWNLOAD';
  appliedProduct?: 'ALL' | 'INDIVIDUAL' | 'CATEGORY';
  tobeIssued?: 'ALL_USER' | 'NEW_USER' | 'INDIVIDUAL_USER' | 'PER_PURCHASE';
  /** @format date-time */
  usageStart?: string;
  /** @format date-time */
  usageEnd?: string;
  /** @format int32 */
  periodOfUseAfterDownload?: number;
  description?: string;
}

export interface AddBasketOptionReq {
  /** @format int32 */
  optionId?: number;
  /** @format int32 */
  amount?: number;
}

export interface AddBasketReq {
  /** @format int32 */
  productId?: number;
  options?: AddBasketOptionReq[];
}

export interface VerifyCodeReq {
  target?: string;
  verificationNumber?: string;
}

export interface CustomResponseInteger {
  isSuccess?: boolean;
  code?: string;
  /** @format int32 */
  data?: number;
  errorMsg?: string;
}

export interface RequestCodeReq {
  target?: string;
}

export interface ResetPasswordReq {
  phone?: string;
  /** @format int32 */
  verificationId?: number;
}

export interface CustomResponseJwt {
  isSuccess?: boolean;
  code?: string;
  data?: Jwt;
  errorMsg?: string;
}

export interface Jwt {
  accessToken?: string;
  refreshToken?: string;
}

export interface AddPaymentMethodReq {
  name?: string;
  cardNo?: string;
  expiryAt?: string;
  birth?: string;
  passwordTwoDigit?: string;
}

export interface CustomResponsePaymentMethodDto {
  isSuccess?: boolean;
  code?: string;
  data?: PaymentMethodDto;
  errorMsg?: string;
}

export interface PaymentMethodDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userId?: number;
  name?: string;
  cardName?: string;
  cardNo?: string;
  expiryAt?: string;
  birth?: string;
}

export interface UserUpdateReq {
  name?: string;
  nickname?: string;
  oldPassword?: string;
  newPassword?: string;
  phone?: string;
  /** @format int32 */
  verificationId?: number;
  address?: string;
  addressDetail?: string;
  isAgreeMarketing?: boolean;
}

export interface CustomResponseUserInfoDto {
  isSuccess?: boolean;
  code?: string;
  data?: UserInfoDto;
  errorMsg?: string;
}

export interface UpdateUserStateReq {
  userIds?: number[];
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
}

export interface UserLoginReq {
  loginType?: 'IDPW' | 'GOOGLE' | 'NAVER' | 'KAKAO' | 'APPLE';
  loginId?: string;
  password?: string;
}

export interface UserJoinReq {
  email?: string;
  name?: string;
  nickname?: string;
  password?: string;
  phone?: string;
  /** @format int32 */
  verificationId?: number;
  impUid?: string;
  bcode?: string;
  postalCode?: string;
  address?: string;
  addressDetail?: string;
  isAgreeMarketing?: boolean;
}

export interface SnsJoinReq {
  loginType?: 'IDPW' | 'GOOGLE' | 'NAVER' | 'KAKAO' | 'APPLE';
  loginId?: string;
  profileImage?: string;
  email?: string;
  name?: string;
  nickname?: string;
  phone?: string;
}

export interface AppleJoinReq {
  loginId?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  /** @format int32 */
  verificationId?: number;
  bcode?: string;
  postalCode?: string;
  address?: string;
  addressDetail?: string;
  isAgreeMarketing?: boolean;
}

export interface FindEmailReq {
  phone?: string;
  /** @format int32 */
  verificationId?: number;
}

export interface UpdateFcmReq {
  fcmToken?: string;
  set?: boolean;
}

export interface AddTipReq {
  title?: string;
  description?: string;
  type?: 'COMPARE' | 'BUY_TIP' | 'NEW_ONE';
  content?: string;
}

export interface CustomResponseTip {
  isSuccess?: boolean;
  code?: string;
  data?: Tip;
  errorMsg?: string;
}

export interface Tip {
  /** @format int32 */
  id?: number;
  type?: 'COMPARE' | 'BUY_TIP' | 'NEW_ONE';
  state?: 'ACTIVE' | 'INACTIVE';
  title?: string;
  description?: string;
  image?: string;
  imageDetail?: string;
  content?: string;
  /** @format date-time */
  createdAt?: string;
}

export interface UpdateTipStateReq {
  tipIds?: number[];
  state?: 'ACTIVE' | 'INACTIVE';
}

export interface TipInfoUpdateReq {
  name?: string;
  title?: string;
  subTitle?: string;
}

export interface CustomResponseTipInfo {
  isSuccess?: boolean;
  code?: string;
  data?: TipInfo;
  errorMsg?: string;
}

export interface TipInfo {
  thumbnailImage?: string;
  name?: string;
  title?: string;
  subTitle?: string;
}

export interface TastingNoteCreateRequest {
  /** @format int32 */
  orderProductInfoId?: number;
  /** @format double */
  taste1?: number;
  /** @format double */
  taste2?: number;
  /** @format double */
  taste3?: number;
  /** @format double */
  taste4?: number;
  /** @format double */
  taste5?: number;
  /** @format double */
  texture1?: number;
  /** @format double */
  texture2?: number;
  /** @format double */
  texture3?: number;
  /** @format double */
  texture4?: number;
  /** @format double */
  texture5?: number;
  /** @format double */
  texture6?: number;
  /** @format double */
  texture7?: number;
  /** @format double */
  texture8?: number;
}

export interface StoreStateUpdateReq {
  storeIds?: number[];
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
}

export interface UpdateStorePasswordReq {
  /** @format int32 */
  storeId?: number;
  oldPassword?: string;
  newPassword?: string;
}

export interface UpdateStoreIsReliableReq {
  storeIds?: number[];
  isReliable?: boolean;
}

export interface AddStoreAdditionalReq {
  /** @format float */
  settlementRate?: number;
  bankName?: string;
  bankHolder?: string;
  bankAccount?: string;
  representativeName?: string;
  companyId?: string;
  businessType?: string;
  mosRegistrationNumber?: string;
  businessAddress?: string;
  postalCode?: string;
  lotNumberAddress?: string;
  streetNameAddress?: string;
  addressDetail?: string;
  tel?: string;
  email?: string;
  faxNumber?: string;
}

export interface CustomResponseStoreDto {
  isSuccess?: boolean;
  code?: string;
  data?: StoreDto;
  errorMsg?: string;
}

export interface StoreAdditionalDto {
  /** @format float */
  settlementRate?: number;
  bankName?: string;
  bankHolder?: string;
  bankAccount?: string;
  representativeName?: string;
  companyId?: string;
  businessType?: string;
  mosRegistrationNumber?: string;
  businessAddress?: string;
  postalCode?: string;
  lotNumberAddress?: string;
  streetNameAddress?: string;
  addressDetail?: string;
  tel?: string;
  email?: string;
  faxNumber?: string;
  mosRegistration?: string;
  businessRegistration?: string;
  bankAccountCopy?: string;
  isConditional?: boolean;
  /** @format int32 */
  minOrderPrice?: number;
  /** @format int32 */
  deliveryFee?: number;
}

export interface StoreDto {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
  loginId?: string;
  /** @format date-time */
  joinAt?: string;
  backgroundImage?: string;
  profileImage?: string;
  isReliable?: boolean;
  name?: string;
  location?: string;
  keyword?: string[];
  visitNote?: string;
  /** @format int32 */
  refundDeliverFee?: number;
  oneLineDescription?: string;
  deliverCompany?: string;
  additionalData?: StoreAdditionalDto;
  isConditional?: boolean;
  /** @format int32 */
  minOrderPrice?: number;
  /** @format int32 */
  deliveryFee?: number;
}

export interface SetMainPartnerReq {
  /** @format int32 */
  storeId?: number;
}

export interface SiteInfoReq {
  content?: string;
  tcContent?: TitleContentReq[];
}

export interface TitleContentReq {
  title?: string;
  content?: string;
}

export interface CustomResponseSiteInfoDto {
  isSuccess?: boolean;
  code?: string;
  data?: SiteInfoDto;
  errorMsg?: string;
}

export interface SiteInfoDto {
  id?: string;
  description?: string;
  content?: string;
  tcContent?: TitleContentReq[];
}

export interface ProcessSettleReq {
  /** @format int32 */
  storeId?: number;
  orderProductInfoIds?: number[];
}

export interface CancelSettleReq {
  /** @format int32 */
  storeId?: number;
  orderProductInfoIds?: number[];
  cancelReason?: string;
}

export interface AddSearchFilterReq {
  name?: string;
}

export interface CustomResponseSearchFilterDto {
  isSuccess?: boolean;
  code?: string;
  data?: SearchFilterDto;
  errorMsg?: string;
}

export interface SearchFilterDto {
  /** @format int32 */
  id?: number;
  name?: string;
  searchFilterFields?: SearchFilterFieldDto[];
}

export interface SearchFilterFieldDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  searchFilterId?: number;
  field?: string;
}

export interface UpdateSearchFilterFiledReq {
  field?: string;
}

export interface CustomResponseSearchFilterFieldDto {
  isSuccess?: boolean;
  code?: string;
  data?: SearchFilterFieldDto;
  errorMsg?: string;
}

export interface AddSearchFilterFiledReq {
  /** @format int32 */
  searchFilterId?: number;
  field?: string;
}

export interface CustomResponseReviewDto {
  isSuccess?: boolean;
  code?: string;
  data?: ReviewDto;
  errorMsg?: string;
}

export interface ReviewDto {
  /** @format int32 */
  id?: number;
  simpleProduct?: ProductListDto;
  store?: SimpleStore;
  user?: UserInfoDto;
  evaluations?: ('TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE')[];
  images?: string[];
  content?: string;
  isLike?: boolean;
  /** @format int32 */
  likeCount?: number;
  /** @format date-time */
  createdAt?: string;
}

export interface ReviewStatistic {
  key?: string;
  /** @format int32 */
  count?: number;
}

export interface SimpleStore {
  /** @format int32 */
  storeId?: number;
  loginId?: string;
  backgroundImage?: string;
  isReliable?: boolean;
  profileImage?: string;
  name?: string;
  location?: string;
  keyword?: string[];
  visitNote?: string;
  /** @format int32 */
  refundDeliverFee?: number;
  oneLineDescription?: string;
  deliverCompany?: string;
  isLike?: boolean;
  isConditional?: boolean;
  /** @format int32 */
  minStorePrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  reviewStatistic?: ReviewStatistic[];
  products?: ProductListDto[];
  reviews?: ReviewDto[];
  /** @format int32 */
  reviewCount?: number;
  /** @format int32 */
  productCount?: number;
  imageReviews?: ReviewDto[];
}

export interface ReviewAddReq {
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  orderProductInfoId?: number;
  evaluations?: ('TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE')[];
  content?: string;
}

export interface ConfirmReportReq {
  reportIds?: number[];
}

export interface AddReportReq {
  /** @format int32 */
  reviewId?: number;
  content?: string;
}

export interface CustomResponseReportDto {
  isSuccess?: boolean;
  code?: string;
  data?: ReportDto;
  errorMsg?: string;
}

export interface ReportDto {
  /** @format int32 */
  id?: number;
  user?: UserInfoDto;
  review?: ReviewDto;
  content?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  confirmAt?: string;
}

export interface CudInputOptionItemUpdateReqInteger {
  /** @format int32 */
  id?: number;
  data?: OptionItemUpdateReq;
  type?: 'CREATE' | 'UPDATE' | 'DELETE';
}

export interface CudInputOptionUpdateReqInteger {
  /** @format int32 */
  id?: number;
  data?: OptionUpdateReq;
  type?: 'CREATE' | 'UPDATE' | 'DELETE';
}

export interface OptionItemUpdateReq {
  isRepresent?: boolean;
  name?: string;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  amount?: number;
  /** @format int32 */
  purchasePrice?: number;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  /** @format int32 */
  deliverBoxPerAmount?: number;
  /** @format int32 */
  maxAvailableAmount?: number;
}

export interface OptionUpdateReq {
  isNeeded?: boolean;
  items?: CudInputOptionItemUpdateReqInteger[];
}

export interface ProductFilterValueReq {
  /** @format int32 */
  compareFilterId?: number;
  value?: string;
}

export interface ProductUpdateReq {
  /** @format int32 */
  storeId?: number;
  /** @format int32 */
  categoryId?: number;
  title?: string;
  isActive?: boolean;
  /** @format int32 */
  deliveryFee?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  deliveryInfo?: string;
  /** @format int32 */
  expectedDeliverDay?: number;
  forwardingTime?: string;
  /** @format int32 */
  deliverBoxPerAmount?: number;
  descriptionContent?: string;
  needTaxation?: boolean;
  /** @format float */
  pointRate?: number;
  /** @format date-time */
  promotionStartAt?: string;
  /** @format date-time */
  promotionEndAt?: string;
  difficultDeliverAddressIds?: number[];
  searchFilterFieldIds?: number[];
  filterValues?: ProductFilterValueReq[];
  options?: CudInputOptionUpdateReqInteger[];
}

export interface Address {
  /** @format int32 */
  id?: number;
  hcode?: string;
  sido?: string;
  sigungu?: string;
  hname?: string;
  bcode?: string;
  bname?: string;
}

export interface CategoryDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  parentId?: number;
  image?: string;
  name?: string;
  categories?: CategoryDto[];
  filters?: CompareFilterDto[];
  parentCategoryName?: string;
}

export interface CompareFilterDto {
  /** @format int32 */
  id?: number;
  name?: string;
}

export interface CustomResponseSimpleProductDto {
  isSuccess?: boolean;
  code?: string;
  data?: SimpleProductDto;
  errorMsg?: string;
}

export interface InquiryDto {
  /** @format int32 */
  id?: number;
  type?: 'PRODUCT' | 'DELIVERY' | 'CANCEL' | 'ETC';
  isSecret?: boolean;
  /** @format int32 */
  productId?: number;
  user?: UserInfoDto;
  content?: string;
  /** @format date-time */
  createdAt?: string;
  answer?: string;
  /** @format date-time */
  answeredAt?: string;
  product?: ProductListDto;
  store?: SimpleStore;
  isMine?: boolean;
}

export interface ProductTastingNoteInquiryDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  productId?: number;
  images?: string;
  storeName?: string;
  productTitle?: string;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  oily?: string;
  /** @format double */
  oilyScore?: number;
  sweet?: string;
  /** @format double */
  sweetScore?: number;
  lightTaste?: string;
  /** @format double */
  lightTasteScore?: number;
  umami?: string;
  /** @format double */
  umamiScore?: number;
  salty?: string;
  /** @format double */
  saltyScore?: number;
  texture1?: string;
  /** @format double */
  texture1Score?: number;
  texture2?: string;
  /** @format double */
  texture2Score?: number;
  texture3?: string;
  /** @format double */
  texture3Score?: number;
  texture4?: string;
  /** @format double */
  texture4Score?: number;
  texture5?: string;
  /** @format double */
  texture5Score?: number;
  texture6?: string;
  /** @format double */
  texture6Score?: number;
  texture7?: string;
  /** @format double */
  texture7Score?: number;
  texture8?: string;
  /** @format double */
  texture8Score?: number;
  texture9?: string;
  /** @format double */
  texture9Score?: number;
  texture10?: string;
  /** @format double */
  texture10Score?: number;
  /** @format double */
  difficultyLevelOfTrimming?: number;
  /** @format double */
  theScentOfTheSea?: number;
  recommendedCookingWay?: string;
  textures?: TastingNoteTextures;
  tastes?: TastingNoteTastes;
}

export interface ProductTastingNoteResponse {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  productId?: number;
  image?: string;
  productTitle?: string;
  storeName?: string;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  tastes?: TastingNoteTaste[];
  textures?: TastingNoteTexture[];
  /** @format double */
  difficultyLevelOfTrimming?: number;
  /** @format double */
  theScentOfTheSea?: number;
  recommendedCookingWay?: string[];
  productInfo?: ProductTastingNoteInquiryDto;
}

export interface ReviewTotalStatistic {
  /** @format int32 */
  taste?: number;
  /** @format int32 */
  fresh?: number;
  /** @format int32 */
  price?: number;
  /** @format int32 */
  packaging?: number;
  /** @format int32 */
  size?: number;
}

export interface SimpleProductDto {
  /** @format int32 */
  id?: number;
  category?: CategoryDto;
  state?: 'ACTIVE' | 'INACTIVE' | 'INACTIVE_PARTNER' | 'SOLD_OUT' | 'DELETED';
  /** @format int32 */
  expectedDeliverDay?: number;
  forwardingTime?: string;
  images?: string[];
  title?: string;
  /** @format int32 */
  originPrice?: number;
  deliveryInfo?: string;
  /** @format int32 */
  deliveryFee?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  /** @format int32 */
  minStorePrice?: number;
  descriptionImages?: string[];
  /** @format int32 */
  representOptionItemId?: number;
  needTaxation?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  promotionStartAt?: string;
  /** @format date-time */
  promotionEndAt?: string;
  description?: string;
  /** @format int32 */
  deliverBoxPerAmount?: number;
  /** @format float */
  pointRate?: number;
  store?: SimpleStore;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  reviewCount?: number;
  reviewStatistics?: ReviewTotalStatistic;
  compareFilters?: CompareFilterDto[];
  filterValues?: ProductFilterValueDto[];
  searchFilterFields?: SearchFilterFieldDto[];
  difficultDeliverAddresses?: Address[];
  comparedProduct?: ProductListDto[];
  reviews?: ReviewDto[];
  inquiries?: InquiryDto[];
  isLike?: boolean;
  tastingNoteInfo?: ProductTastingNoteResponse[];
  tastingNote?: ProductTastingNoteResponse[];
}

export interface TastingNoteTaste {
  taste?: string;
  /** @format double */
  score?: number;
}

export interface TastingNoteTastes {
  tastes?: TastingNoteTaste[];
}

export interface TastingNoteTexture {
  texture?: string;
  /** @format double */
  score?: number;
}

export interface TastingNoteTextures {
  textures?: TastingNoteTexture[];
}

export interface UpdateStateProductsReq {
  productIds?: number[];
  isActive?: boolean;
}

export interface OptionAddReq {
  isNeeded?: boolean;
  items?: OptionItemAddReq[];
}

export interface OptionItemAddReq {
  isRepresent?: boolean;
  name?: string;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  amount?: number;
  /** @format int32 */
  purchasePrice?: number;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  /** @format int32 */
  deliverBoxPerAmount?: number;
  /** @format int32 */
  maxAvailableAmount?: number;
}

export interface ProductAddReq {
  /** @format int32 */
  storeId?: number;
  /** @format int32 */
  categoryId?: number;
  title?: string;
  isActive?: boolean;
  /** @format int32 */
  deliveryFee?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  deliveryInfo?: string;
  /** @format int32 */
  expectedDeliverDay?: number;
  forwardingTime?: string;
  /** @format int32 */
  deliverBoxPerAmount?: number;
  descriptionContent?: string;
  needTaxation?: boolean;
  /** @format float */
  pointRate?: number;
  /** @format date-time */
  promotionStartAt?: string;
  /** @format date-time */
  promotionEndAt?: string;
  difficultDeliverAddressIds?: number[];
  searchFilterFieldIds?: number[];
  filterValues?: ProductFilterValueReq[];
  options?: OptionAddReq[];
}

export type AgriculturalAndLivestockProductsInfoDto = ProductInformation & {
  nameOfProduct?: string;
  volume?: string;
  producer?: string;
  originCountry?: string;
  qualityMaintenanceDeadline?: string;
  geneticallyModifiedInfo?: string;
  productGrade?: string;
  importInformation?: string;
  contentsOfProduct?: string;
  howToKeep?: string;
  phoneNumber?: string;
  cautionGuidelines?: string;
};

export type ProcessedFoodInfoDto = ProductInformation & {
  nameOfProduct?: string;
  typesOfFood?: string;
  producer?: string;
  qualityMaintenanceDeadline?: string;
  volume?: string;
  rawMaterialInfo?: string;
  nutritionalIngredients?: string;
  geneticallyModifiedInfo?: string;
  importedPhrase?: string;
  phoneNumber?: string;
  cautionGuidelines?: string;
};

export interface ProductInformation {
  /** @format int32 */
  productId?: number;
  itemCode?: string;
}

export interface AccountCheckRequest {
  /** @format int32 */
  bankCodeId?: number;
  bankNum?: string;
  holderName?: string;
}

export interface ProcessDeliverStartReq {
  deliverCompanyCode?: string;
  invoice?: string;
}

export interface RequestChangeProduct {
  cancelReason?:
    | 'JUST'
    | 'DELIVER_DELAY'
    | 'ORDER_FAULT'
    | 'BAD_SERVICE'
    | 'CANCELED_BY_PARTNER'
    | 'CANCELED_BY_ADMIN';
  reasonContent?: string;
}

export interface NoticeAddReq {
  type?: 'NOTICE' | 'FAQ';
  title?: string;
  content?: string;
  isRepresentative?: boolean;
}

export interface CustomResponseNotice {
  isSuccess?: boolean;
  code?: string;
  data?: Notice;
  errorMsg?: string;
}

export interface Notice {
  /** @format int32 */
  id?: number;
  type?: 'NOTICE' | 'FAQ';
  title?: string;
  content?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updateAt?: string;
  representative?: boolean;
}

export interface InquiryUpdateReq {
  type?: 'PRODUCT' | 'DELIVERY' | 'CANCEL' | 'ETC';
  content?: string;
  isSecret?: boolean;
}

export interface CustomResponseInquiryDto {
  isSuccess?: boolean;
  code?: string;
  data?: InquiryDto;
  errorMsg?: string;
}

export interface InquiryAnswerReq {
  content?: string;
}

export interface InquiryAddReq {
  /** @format int32 */
  productId?: number;
  type?: 'PRODUCT' | 'DELIVERY' | 'CANCEL' | 'ETC';
  content?: string;
  isSecret?: boolean;
}

export interface CustomResponseInquiry {
  isSuccess?: boolean;
  code?: string;
  data?: Inquiry;
  errorMsg?: string;
}

export interface Inquiry {
  /** @format int32 */
  id?: number;
  type?: 'PRODUCT' | 'DELIVERY' | 'CANCEL' | 'ETC';
  isSecret?: boolean;
  /** @format int32 */
  productId?: number;
  product?: Product;
  /** @format int32 */
  userId?: number;
  user?: User;
  content?: string;
  /** @format date-time */
  createdAt?: string;
  answer?: string;
  /** @format date-time */
  answeredAt?: string;
}

export interface AddGradeReq {
  name?: string;
  /** @format float */
  pointRate?: number;
  /** @format int32 */
  minOrderPrice?: number;
  /** @format int32 */
  minOrderCount?: number;
}

export interface CustomResponseGrade {
  isSuccess?: boolean;
  code?: string;
  data?: Grade;
  errorMsg?: string;
}

export interface AdminSendFcmReq {
  userIds?: number[];
  title?: string;
  content?: string;
}

export interface AddDeliverPlaceReq {
  name?: string;
  receiverName?: string;
  tel?: string;
  postalCode?: string;
  address?: string;
  addressDetail?: string;
  deliverMessage?: string;
  bcode?: string;
  isDefault?: boolean;
}

export interface CustomResponseDeliverPlace {
  isSuccess?: boolean;
  code?: string;
  data?: DeliverPlace;
  errorMsg?: string;
}

export interface Curation {
  /** @format int32 */
  id?: number;
  image?: string;
  shortName?: string;
  title?: string;
  description?: string;
  type?: 'SQUARE' | 'S_SLIDER' | 'L_SLIDER';
  /** @format int32 */
  sortNo?: number;
  curationProductMaps?: CurationProductMap[];
  state?: 'ACTIVE' | 'INACTIVE';
}

export interface CurationProductMap {
  /** @format int64 */
  id?: number;
  product?: Product;
  curation?: Curation;
}

export interface CustomResponseCuration {
  isSuccess?: boolean;
  code?: string;
  data?: Curation;
  errorMsg?: string;
}

export interface SortCurationReq {
  curationIds?: number[];
}

export interface CurationDto {
  /** @format int32 */
  id?: number;
  image?: string;
  shortName?: string;
  title?: string;
  description?: string;
  type?: 'SQUARE' | 'S_SLIDER' | 'L_SLIDER';
  /** @format int32 */
  sortNo?: number;
  state?: 'ACTIVE' | 'INACTIVE';
  products?: ProductListDto[];
}

export interface CustomResponseListCurationDto {
  isSuccess?: boolean;
  code?: string;
  data?: CurationDto[];
  errorMsg?: string;
}

export interface CouponDeleteRequest {
  /** @format int32 */
  userId?: number;
  couponIds?: number[];
}

export interface UpdateSystemCoupon {
  /** @format int32 */
  order_1stAmount?: number;
  /** @format int32 */
  order_3rdAmount?: number;
  /** @format int32 */
  order_5thAmount?: number;
}

export interface Coupon {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'DELETED';
  publicType?: 'PUBLIC' | 'PRIVATE' | 'SYSTEM';
  title?: string;
  type?: 'AMOUNT' | 'RATE';
  /** @format int32 */
  amount?: number;
  /** @format date-time */
  startAt?: string;
  /** @format date-time */
  endAt?: string;
  /** @format int32 */
  minPrice?: number;
  /** @format int32 */
  maxPrice?: number;
  exposureState?: 'EXPOSED' | 'UNEXPOSED';
  issuanceState?: 'TOBE_ISSUED' | 'ISSUING' | 'SUSPENDED';
  issuanceType?: 'IMMEDIATE' | 'DOWNLOAD';
  appliedProduct?: 'ALL' | 'INDIVIDUAL' | 'CATEGORY';
  tobeIssued?: 'ALL_USER' | 'NEW_USER' | 'INDIVIDUAL_USER' | 'PER_PURCHASE';
  /** @format date-time */
  usageStart?: string;
  /** @format date-time */
  usageEnd?: string;
  description?: string;
}

export interface CustomResponseListCoupon {
  isSuccess?: boolean;
  code?: string;
  data?: Coupon[];
  errorMsg?: string;
}

export interface CustomResponseCoupon {
  isSuccess?: boolean;
  code?: string;
  data?: Coupon;
  errorMsg?: string;
}

export interface SaveProductReq {
  /** @format int32 */
  productId?: number;
}

export interface AddRecommendCompareSet {
  type?: 'RECOMMEND' | 'POPULAR';
  productIds?: number[];
}

export interface CustomResponseRecommendCompareSetDto {
  isSuccess?: boolean;
  code?: string;
  data?: RecommendCompareSetDto;
  errorMsg?: string;
}

export interface RecommendCompareSetDto {
  /** @format int32 */
  id?: number;
  type?: 'RECOMMEND' | 'POPULAR';
  products?: ProductListDto[];
}

export interface AddCompareFilterReq {
  name?: string;
}

export interface CustomResponseCompareFilterDto {
  isSuccess?: boolean;
  code?: string;
  data?: CompareFilterDto;
  errorMsg?: string;
}

export interface CompareSet {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userId?: number;
  /** @format date-time */
  createdAt?: string;
}

export interface CustomResponseCompareSet {
  isSuccess?: boolean;
  code?: string;
  data?: CompareSet;
  errorMsg?: string;
}

export interface CustomResponseCategory {
  isSuccess?: boolean;
  code?: string;
  data?: Category;
  errorMsg?: string;
}

export interface AddCategoryCompareFilterReq {
  /** @format int32 */
  categoryId?: number;
  /** @format int32 */
  compareFilterId?: number;
}

export interface BasketProductDto {
  /** @format int32 */
  id?: number;
  store?: SimpleStore;
  product?: ProductListDto;
  /** @format int32 */
  amount?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  isConditional?: boolean;
  /** @format int32 */
  minStorePrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  option?: OptionItemDto;
}

export interface CustomResponseBasketProductDto {
  isSuccess?: boolean;
  code?: string;
  data?: BasketProductDto;
  errorMsg?: string;
}

export interface BasketTastingNoteDeleteReq {
  productId?: number[];
}

export interface BasketTastingNoteAddReq {
  /** @format int32 */
  productId?: number;
}

export interface BannerDto {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'INACTIVE';
  type?: 'NONE' | 'CURATION' | 'NOTICE' | 'CATEGORY' | 'MAIN' | 'PC_WEB' | 'MY_PAGE';
  image?: string;
  /** @format int32 */
  sortNo?: number;
  link?: string;
  /** @format int32 */
  curationId?: number;
  curationName?: string;
  /** @format int32 */
  noticeId?: number;
  noticeTitle?: string;
  /** @format int32 */
  categoryId?: number;
  categoryName?: string;
}

export interface CustomResponseBannerDto {
  isSuccess?: boolean;
  code?: string;
  data?: BannerDto;
  errorMsg?: string;
}

export interface UpdateBannerStateReq {
  ids?: number[];
  state?: 'ACTIVE' | 'INACTIVE';
}

export interface SortBannerReq {
  bannerIds?: number[];
}

export interface CustomResponseListBannerDto {
  isSuccess?: boolean;
  code?: string;
  data?: BannerDto[];
  errorMsg?: string;
}

export interface UpdateAdminReq {
  password?: string;
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
  name?: string;
  tel?: string;
  accessUser?: boolean;
  accessProduct?: boolean;
  accessOrder?: boolean;
  accessSettlement?: boolean;
  accessBoard?: boolean;
  accessPromotion?: boolean;
  accessSetting?: boolean;
}

export interface Admin {
  /** @format int32 */
  id?: number;
  loginId?: string;
  password?: string;
  authority?: 'MASTER' | 'MANAGER';
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
  name?: string;
  tel?: string;
  /** @format date-time */
  createdAt?: string;
  adminAuth?: AdminAuth;
}

export interface AdminAuth {
  /** @format int32 */
  adminId?: number;
  accessUser?: boolean;
  accessProduct?: boolean;
  accessOrder?: boolean;
  accessSettlement?: boolean;
  accessBoard?: boolean;
  accessPromotion?: boolean;
  accessSetting?: boolean;
}

export interface CustomResponseAdmin {
  isSuccess?: boolean;
  code?: string;
  data?: Admin;
  errorMsg?: string;
}

export interface AddAdminReq {
  loginId?: string;
  password?: string;
  name?: string;
  tel?: string;
  accessUser?: boolean;
  accessProduct?: boolean;
  accessOrder?: boolean;
  accessSettlement?: boolean;
  accessBoard?: boolean;
  accessPromotion?: boolean;
  accessSetting?: boolean;
}

export interface CustomResponseListTopBar {
  isSuccess?: boolean;
  code?: string;
  data?: TopBar[];
  errorMsg?: string;
}

export interface CustomResponsePageProductListDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageProductListDto;
  errorMsg?: string;
}

export interface PageProductListDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: ProductListDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface PageableObject {
  /** @format int64 */
  offset?: number;
  sort?: SortObject;
  paged?: boolean;
  unpaged?: boolean;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
}

export interface SortObject {
  empty?: boolean;
  unsorted?: boolean;
  sorted?: boolean;
}

export interface CustomResponseLong {
  isSuccess?: boolean;
  code?: string;
  /** @format int64 */
  data?: number;
  errorMsg?: string;
}

export interface CustomResponseListSimpleStore {
  isSuccess?: boolean;
  code?: string;
  data?: SimpleStore[];
  errorMsg?: string;
}

export interface CustomResponseSearchDirectResponse {
  isSuccess?: boolean;
  code?: string;
  data?: SearchDirectResponse;
  errorMsg?: string;
}

export interface SearchDirectResponse {
  productIds?: number[];
  searchProductDtos?: SearchProductDto[];
}

export interface SearchProductDto {
  /** @format int32 */
  id?: number;
  title?: string;
}

export interface CustomResponseListProductPhotoReviewDto {
  isSuccess?: boolean;
  code?: string;
  data?: ProductPhotoReviewDto[];
  errorMsg?: string;
}

export interface ProductPhotoReviewDto {
  /** @format int32 */
  reviewId?: number;
  /** @format int32 */
  imageCount?: number;
  imageUrls?: string[];
}

export interface CustomResponseStoreReviewDto {
  isSuccess?: boolean;
  code?: string;
  data?: StoreReviewDto;
  errorMsg?: string;
}

export interface PageReviewDtoV2 {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: ReviewDtoV2[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface ReviewDtoV2 {
  /** @format int32 */
  userId?: number;
  userName?: string;
  userNickname?: string;
  userGrade?: string;
  storeName?: string;
  /** @format int32 */
  productId?: number;
  productState?: 'ACTIVE' | 'INACTIVE' | 'INACTIVE_PARTNER' | 'SOLD_OUT' | 'DELETED';
  productName?: string;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  discountPrice?: number;
  productImage?: string;
  /** @format int32 */
  reviewId?: number;
  reviewContent?: string;
  /** @format date-time */
  createdAt?: string;
  images?: string;
  imageUrls?: string[];
  sameUserLike?: boolean;
  /** @format int64 */
  likeSum?: number;
}

export interface ReviewEvaluationSummaryDto {
  evaluationType?: 'TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE';
  /** @format int64 */
  evaluationSum?: number;
}

export interface StoreReviewDto {
  /** @format int32 */
  storeId?: number;
  /** @format int64 */
  reviewCount?: number;
  evaluationSummaryDtos?: ReviewEvaluationSummaryDto[];
  pagedReviews?: PageReviewDtoV2;
}

export interface CustomResponseProductReviewDto {
  isSuccess?: boolean;
  code?: string;
  data?: ProductReviewDto;
  errorMsg?: string;
}

export interface ProductReviewDto {
  /** @format int32 */
  productId?: number;
  /** @format int64 */
  reviewCount?: number;
  evaluationSummaryDtos?: ReviewEvaluationSummaryDto[];
  pagedReviews?: PageReviewDtoV2;
}

export interface CustomResponseUserReviewDto {
  isSuccess?: boolean;
  code?: string;
  data?: UserReviewDto;
  errorMsg?: string;
}

export interface UserReviewDto {
  /** @format int32 */
  userId?: number;
  /** @format int64 */
  reviewCount?: number;
  pagedReviews?: PageReviewDtoV2;
}

export interface AdminReviewDto {
  /** @format int32 */
  reviewId?: number;
  storeName?: string;
  productTitle?: string;
  userNickname?: string;
  userEmail?: string;
  evaluations?: ('TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE')[];
  content?: string;
  images?: string;
  imageUrls?: string[];
  /** @format date-time */
  createdAt?: string;
  /** @format int64 */
  likeSum?: number;
}

export interface CustomResponsePageAdminReviewDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageAdminReviewDto;
  errorMsg?: string;
}

export interface PageAdminReviewDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: AdminReviewDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface BasketProductDtoV2 {
  /** @format int32 */
  id?: number;
  store?: BasketStoreDto;
  product?: BasketProductInfoDto;
  /** @format int32 */
  amount?: number;
  /** @format int32 */
  inventoryQuantity?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  isConditional?: boolean;
  /** @format int32 */
  minStorePrice?: number;
  option?: OptionItemDto;
}

export interface BasketProductInfoDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  productId?: number;
  state?: 'ACTIVE' | 'INACTIVE' | 'INACTIVE_PARTNER' | 'SOLD_OUT' | 'DELETED';
  image?: string;
  title?: string;
  isNeedTaxation?: boolean;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  storeId?: number;
  /** @format int32 */
  minOrderPrice?: number;
  /** @format int32 */
  minStorePrice?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
}

export interface BasketStoreDto {
  /** @format int32 */
  storeId?: number;
  name?: string;
  backgroundImage?: string;
  profileImage?: string;
  isConditional?: boolean;
  /** @format int32 */
  minStorePrice?: number;
  /** @format int32 */
  deliveryFee?: number;
}

export interface CustomResponseListBasketProductDtoV2 {
  isSuccess?: boolean;
  code?: string;
  data?: BasketProductDtoV2[];
  errorMsg?: string;
}

export interface CustomResponseString {
  isSuccess?: boolean;
  code?: string;
  data?: string;
  errorMsg?: string;
}

export interface CustomResponseListPaymentMethodDto {
  isSuccess?: boolean;
  code?: string;
  data?: PaymentMethodDto[];
  errorMsg?: string;
}

export interface CustomResponsePageUserInfoDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageUserInfoDto;
  errorMsg?: string;
}

export interface PageUserInfoDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: UserInfoDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponseListTip {
  isSuccess?: boolean;
  code?: string;
  data?: Tip[];
  errorMsg?: string;
}

export interface CustomResponsePageTip {
  isSuccess?: boolean;
  code?: string;
  data?: PageTip;
  errorMsg?: string;
}

export interface PageTip {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: Tip[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponseListProductTastingNoteResponse {
  isSuccess?: boolean;
  code?: string;
  data?: ProductTastingNoteResponse[];
  errorMsg?: string;
}

export interface CustomResponseListStoreDto {
  isSuccess?: boolean;
  code?: string;
  data?: StoreDto[];
  errorMsg?: string;
}

export interface CustomResponseSimpleStore {
  isSuccess?: boolean;
  code?: string;
  data?: SimpleStore;
  errorMsg?: string;
}

export interface CustomResponsePageStoreDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageStoreDto;
  errorMsg?: string;
}

export interface PageStoreDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: StoreDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponseListSiteInfoDto {
  isSuccess?: boolean;
  code?: string;
  data?: SiteInfoDto[];
  errorMsg?: string;
}

export interface CustomResponsePageOrderProductInfoDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageOrderProductInfoDto;
  errorMsg?: string;
}

export interface OrderProductInfoDto {
  /** @format int32 */
  id?: number;
  orderId?: string;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  optionItemId?: number;
  optionItem?: OptionItemDto;
  state?:
    | 'WAIT_DEPOSIT'
    | 'PAYMENT_DONE'
    | 'DELIVERY_READY'
    | 'ON_DELIVERY'
    | 'DELIVERY_DONE'
    | 'EXCHANGE_REQUEST'
    | 'EXCHANGE_ACCEPT'
    | 'FINAL_CONFIRM'
    | 'CANCELED'
    | 'CANCEL_REQUEST'
    | 'REFUND_REQUEST'
    | 'REFUND_ACCEPT'
    | 'REFUND_DONE'
    | 'DELIVERY_DIFFICULT'
    | 'CANCELED_BY_PARTNER'
    | 'CANCELED_BY_ADMIN';
  /** @format int32 */
  settlePrice?: number;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  price?: number;
  /** @format int32 */
  amount?: number;
  /** @format int32 */
  deliveryFee?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  cancelReason?:
    | 'JUST'
    | 'DELIVER_DELAY'
    | 'ORDER_FAULT'
    | 'BAD_SERVICE'
    | 'CANCELED_BY_PARTNER'
    | 'CANCELED_BY_ADMIN';
  cancelReasonContent?: string;
  deliverCompany?: string;
  deliverCompanyCode?: string;
  invoiceCode?: string;
  isSettled?: boolean;
  /** @format date-time */
  settledAt?: string;
  needTaxation?: boolean;
  /** @format date-time */
  finalConfirmedAt?: string;
  product?: ProductListDto;
  order?: OrderDto;
  /** @format float */
  settlementRate?: number;
}

export interface PageOrderProductInfoDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: OrderProductInfoDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponsePageSettlementDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageSettlementDto;
  errorMsg?: string;
}

export interface PageSettlementDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: SettlementDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface SettlementDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  storeId?: number;
  storeName?: string;
  state?: 'DONE' | 'CANCELED';
  /** @format int32 */
  settlementAmount?: number;
  /** @format date-time */
  settledAt?: string;
  cancelReason?: string;
}

export interface CustomResponseSettlementAmountRes {
  isSuccess?: boolean;
  code?: string;
  data?: SettlementAmountRes;
  errorMsg?: string;
}

export interface SettlementAmountRes {
  /** @format int32 */
  settledAmount?: number;
  /** @format int32 */
  needSettleAmount?: number;
}

export interface CustomResponseListProductListDto {
  isSuccess?: boolean;
  code?: string;
  data?: ProductListDto[];
  errorMsg?: string;
}

export interface CustomResponseListSearchKeyword {
  isSuccess?: boolean;
  code?: string;
  data?: SearchKeyword[];
  errorMsg?: string;
}

export interface SearchKeyword {
  keyword?: string;
  /** @format int32 */
  amount?: number;
  /** @format int32 */
  prevRank?: number;
}

export interface CustomResponseListSearchProductDto {
  isSuccess?: boolean;
  code?: string;
  data?: SearchProductDto[];
  errorMsg?: string;
}

export interface CustomResponseListSearchFilterFieldDto {
  isSuccess?: boolean;
  code?: string;
  data?: SearchFilterFieldDto[];
  errorMsg?: string;
}

export interface CustomResponseListSearchFilterDto {
  isSuccess?: boolean;
  code?: string;
  data?: SearchFilterDto[];
  errorMsg?: string;
}

export interface CustomResponsePageReviewDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageReviewDto;
  errorMsg?: string;
}

export interface PageReviewDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: ReviewDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponsePageReportDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageReportDto;
  errorMsg?: string;
}

export interface PageReportDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: ReportDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponseListOptionDto {
  isSuccess?: boolean;
  code?: string;
  data?: OptionDto[];
  errorMsg?: string;
}

export interface OptionDto {
  /** @format int32 */
  id?: number;
  isNeeded?: boolean;
  optionItems?: OptionItemDto[];
}

export interface CustomResponseListListExcelProductDto2 {
  isSuccess?: boolean;
  code?: string;
  data?: ExcelProductDto2[][];
  errorMsg?: string;
}

export interface ExcelProductDto2 {
  storeLoginId?: string;
  storeName?: string;
  firstCategoryName?: string;
  secondCategoryName?: string;
  productName?: string;
  /** @format int32 */
  expectedDeliverDay?: number;
  deliveryInfo?: string;
  /** @format int32 */
  deliveryFee?: number;
  /** @format int32 */
  deliverBoxPerAmount?: number;
  isActive?: string;
  needTaxation?: string;
  hasOption?: string;
  /** @format int32 */
  purchasePrices?: number;
  /** @format int32 */
  representativeOptionNo?: number;
  optionName?: string;
  /** @format int32 */
  optionOriginPrice?: number;
  /** @format int32 */
  optionDiscountPrice?: number;
  /** @format int32 */
  optionMaxOrderAmount?: number;
  /** @format int32 */
  optionAmount?: number;
  /** @format float */
  pointRate?: number;
}

export interface CustomResponsePageSimpleProductDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageSimpleProductDto;
  errorMsg?: string;
}

export interface PageSimpleProductDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: SimpleProductDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponsePointRuleRes {
  isSuccess?: boolean;
  code?: string;
  data?: PointRuleRes;
  errorMsg?: string;
}

export interface PointRuleRes {
  /** @format float */
  pointRate?: number;
  /** @format int32 */
  maxReviewPoint?: number;
  /** @format int32 */
  imageReviewPoint?: number;
}

export interface CustomResponsePageOrderDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageOrderDto;
  errorMsg?: string;
}

export interface PageOrderDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: OrderDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponseListOrderDto {
  isSuccess?: boolean;
  code?: string;
  data?: OrderDto[];
  errorMsg?: string;
}

export interface BankCode {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
}

export interface CustomResponseListBankCode {
  isSuccess?: boolean;
  code?: string;
  data?: BankCode[];
  errorMsg?: string;
}

export interface CustomResponsePageNotification {
  isSuccess?: boolean;
  code?: string;
  data?: PageNotification;
  errorMsg?: string;
}

export interface Notification {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userId?: number;
  type?: 'DELIVERY' | 'ADMIN' | 'REVIEW' | 'COUPON' | 'ORDER';
  title?: string;
  content?: string;
  /** @format date-time */
  createdAt?: string;
}

export interface PageNotification {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: Notification[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponsePageNotice {
  isSuccess?: boolean;
  code?: string;
  data?: PageNotice;
  errorMsg?: string;
}

export interface PageNotice {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: Notice[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponseListNotice {
  isSuccess?: boolean;
  code?: string;
  data?: Notice[];
  errorMsg?: string;
}

export interface Banner {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'INACTIVE';
  type?: 'NONE' | 'CURATION' | 'NOTICE' | 'CATEGORY' | 'MAIN' | 'PC_WEB' | 'MY_PAGE';
  image?: string;
  /** @format int32 */
  sortNo?: number;
  link?: string;
  /** @format int32 */
  curationId?: number;
  curation?: Curation;
  /** @format int32 */
  noticeId?: number;
  notice?: Notice;
  /** @format int32 */
  categoryId?: number;
  category?: Category;
}

export interface CustomResponseMain {
  isSuccess?: boolean;
  code?: string;
  data?: Main;
  errorMsg?: string;
}

export interface Main {
  topBars?: TopBar[];
  banners?: Banner[];
  subBanner?: Banner[];
}

export interface CustomResponseListInquiryDto {
  isSuccess?: boolean;
  code?: string;
  data?: InquiryDto[];
  errorMsg?: string;
}

export interface CustomResponsePageInquiryDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageInquiryDto;
  errorMsg?: string;
}

export interface PageInquiryDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: InquiryDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponseListGrade {
  isSuccess?: boolean;
  code?: string;
  data?: Grade[];
  errorMsg?: string;
}

export interface CustomResponseFilter {
  isSuccess?: boolean;
  code?: string;
  data?: Filter;
  errorMsg?: string;
}

export interface Filter {
  categories?: Category[];
}

export interface CustomResponseListDeliverPlace {
  isSuccess?: boolean;
  code?: string;
  data?: DeliverPlace[];
  errorMsg?: string;
}

export interface CustomResponseTrackingInfo {
  isSuccess?: boolean;
  code?: string;
  data?: TrackingInfo;
  errorMsg?: string;
}

export interface TrackingDetails {
  kind?: string;
  code?: string;
  /** @format int32 */
  level?: number;
  manName?: string;
  manPic?: string;
  timeString?: string;
  where?: string;
}

export interface TrackingInfo {
  adUrl?: string;
  trackingDetails?: TrackingDetails[];
  invoiceNo?: string;
  itemImage?: string;
  itemName?: string;
  /** @format int32 */
  level?: number;
  result?: string;
  senderName?: string;
}

export interface Company {
  name?: string;
  international?: boolean;
  code?: string;
}

export interface CustomResponseListCompany {
  isSuccess?: boolean;
  code?: string;
  data?: Company[];
  errorMsg?: string;
}

export interface CustomResponseDashBoard {
  isSuccess?: boolean;
  code?: string;
  data?: DashBoard;
  errorMsg?: string;
}

export interface DashBoard {
  /** @format int32 */
  dailyJoinCount?: number;
  inquiries?: InquiryDto[];
  /** @format int32 */
  dailyOrderCount?: number;
  /** @format int32 */
  dailyOrderAmount?: number;
  orderSituation?: OrderProductInfo[];
  /** @format int32 */
  monthlyJoinCount?: number;
  /** @format int32 */
  monthlyOrderCount?: number;
  /** @format int32 */
  monthlyOrderAmount?: number;
  dailyMostSoldProduct?: ProductRankDto[];
  monthlyMostSoldProduct?: ProductRankDto[];
}

export interface ProductRankDto {
  /** @format int32 */
  productId?: number;
  productName?: string;
  storeName?: string;
  /** @format int32 */
  count?: number;
  /** @format int32 */
  rank?: number;
}

export interface CustomResponseCurationDto {
  isSuccess?: boolean;
  code?: string;
  data?: CurationDto;
  errorMsg?: string;
}

export interface CustomResponsePageCurationDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageCurationDto;
  errorMsg?: string;
}

export interface PageCurationDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: CurationDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CouponDto {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'DELETED';
  publicType?: 'PUBLIC' | 'PRIVATE' | 'SYSTEM';
  title?: string;
  type?: 'AMOUNT' | 'RATE';
  /** @format int32 */
  amount?: number;
  /** @format date-time */
  startAt?: string;
  /** @format date-time */
  endAt?: string;
  /** @format int32 */
  minPrice?: number;
  users?: UserInfoDto[];
}

export interface CustomResponseCouponDto {
  isSuccess?: boolean;
  code?: string;
  data?: CouponDto;
  errorMsg?: string;
}

export interface CustomResponsePageCouponDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageCouponDto;
  errorMsg?: string;
}

export interface PageCouponDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: CouponDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CompareProductDto {
  /** @format int32 */
  id?: number;
  image?: string;
  storeName?: string;
  title?: string;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  deliveryFee?: number;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  minOrderPrice?: number;
  compareFilters?: CompareFilterDto[];
  filterValues?: ProductFilterValueDto[];
  type?: string;
  location?: string;
  process?: string;
  usage?: string;
  storage?: string;
  tastes?: TastingNoteTaste[];
  textures?: TastingNoteTexture[];
  difficultyLevelOfTrimming?: string;
  theScentOfTheSea?: string;
  recommendedCookingWay?: string[];
}

export interface CustomResponseListCompareProductDto {
  isSuccess?: boolean;
  code?: string;
  data?: CompareProductDto[];
  errorMsg?: string;
}

export interface CompareSetDto {
  /** @format int32 */
  compareSetId?: number;
  products?: ProductListDto[];
}

export interface CustomResponseListCompareSetDto {
  isSuccess?: boolean;
  code?: string;
  data?: CompareSetDto[];
  errorMsg?: string;
}

export interface CustomResponseListRecommendCompareSetDto {
  isSuccess?: boolean;
  code?: string;
  data?: RecommendCompareSetDto[];
  errorMsg?: string;
}

export interface CompareMain {
  popularCompareSets?: CompareSetDto[];
  recommendCompareProducts?: RecommendCompareProduct[];
  newCompareProduct?: NewCompareProduct;
}

export interface CustomResponseCompareMain {
  isSuccess?: boolean;
  code?: string;
  data?: CompareMain;
  errorMsg?: string;
}

export interface NewCompareProduct {
  products?: ProductListDto[];
}

export interface RecommendCompareProduct {
  mainProduct?: ProductListDto;
  recommendProducts?: ProductListDto[];
}

export interface CompareFilter {
  /** @format int32 */
  id?: number;
  name?: string;
}

export interface CustomResponseListCompareFilter {
  isSuccess?: boolean;
  code?: string;
  data?: CompareFilter[];
  errorMsg?: string;
}

export interface CustomResponseCategoryDto {
  isSuccess?: boolean;
  code?: string;
  data?: CategoryDto;
  errorMsg?: string;
}

export interface CustomResponseListCategoryDto {
  isSuccess?: boolean;
  code?: string;
  data?: CategoryDto[];
  errorMsg?: string;
}

export interface CustomResponseListCategory {
  isSuccess?: boolean;
  code?: string;
  data?: Category[];
  errorMsg?: string;
}

export interface CustomResponseListBasketProductDto {
  isSuccess?: boolean;
  code?: string;
  data?: BasketProductDto[];
  errorMsg?: string;
}

export interface CustomResponseListTastingNoteCompareBasketProductDto {
  isSuccess?: boolean;
  code?: string;
  data?: TastingNoteCompareBasketProductDto[];
  errorMsg?: string;
}

export interface TastingNoteCompareBasketProductDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  productId?: number;
  state?: 'ACTIVE' | 'INACTIVE' | 'INACTIVE_PARTNER' | 'SOLD_OUT' | 'DELETED';
  image?: string;
  title?: string;
  isNeedTaxation?: boolean;
  /** @format int32 */
  discountPrice?: number;
  /** @format int32 */
  originPrice?: number;
  /** @format int64 */
  reviewCount?: number;
  isLike?: boolean;
  /** @format int32 */
  storeId?: number;
  storeName?: string;
  /** @format int32 */
  minOrderPrice?: number;
  storeImage?: string;
  deliverFeeType?: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  /** @format int32 */
  parentCategoryId?: number;
  tastingNoteExists?: boolean;
}

export interface AdminLogDto {
  id?: string;
  type?: 'USER' | 'PARTNER' | 'PRODUCT' | 'ORDER' | 'SETTLEMENT' | 'REPORT' | 'INQUIRY' | 'COUPON';
  targetId?: string;
  content?: string;
  /** @format date-time */
  createdAt?: string;
}

export interface CustomResponsePageAdminLogDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageAdminLogDto;
  errorMsg?: string;
}

export interface PageAdminLogDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: AdminLogDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponsePageAdmin {
  isSuccess?: boolean;
  code?: string;
  data?: PageAdmin;
  errorMsg?: string;
}

export interface PageAdmin {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: Admin[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface CustomResponseListAddress {
  isSuccess?: boolean;
  code?: string;
  data?: Address[];
  errorMsg?: string;
}

export interface DeleteBasketReq {
  ids?: number[];
}

export interface DeleteReportReq {
  reportIds?: number[];
}

export interface InquiryDeleteReq {
  inquiryIds?: number[];
}

export interface CurationDeleteProductReq {
  /** @format int32 */
  curationId?: number;
  productIds?: number[];
}

export interface DeleteCompareSetReq {
  compareSetIds?: number[];
}

export interface DeleteSaveProductReq {
  productId?: number[];
}

export type PortOneCallbackData = object;

export type PortOneCallback1Data = object;

export interface UpdateTopBarV2Payload {
  name: string;
}

export type UpdateTopBarV2Data = CustomResponseTopBar;

export interface AddTopBarV2Payload {
  name: string;
}

export type AddTopBarV2Data = CustomResponseTopBar;

export interface AddProductToTopBarV2Payload {
  /** @format int32 */
  topBarId: number;
  /** @format int32 */
  productId: number;
}

export type AddProductToTopBarV2Data = CustomResponseTopBarProductMap;

export interface DownloadStoresWithExcelPayload {
  storeIds?: StoreExcelDownloadReq;
}

export type DownloadStoresWithExcelData = any;

export type DeleteReviewData = CustomResponseBoolean;

export interface UpdateReviewV2Payload {
  data: UpdateReviewReq;
  images?: File[];
}

export type UpdateReviewV2Data = CustomResponseObject;

export type OrderProductV2Data = CustomResponseOrderDto;

export interface CancelOrderByUserV2Payload {
  data: RequestCancelReq;
}

export type CancelOrderByUserV2Data = CustomResponseBoolean;

export interface CancelOrdersByPartnerV2Payload {
  orderProductInfoIds: number[];
}

export type CancelOrdersByPartnerV2Data = CustomResponseBoolean;

export interface AddCouponV2Payload {
  data: CouponAddReq;
}

export type AddCouponV2Data = CustomResponseBoolean;

export type UpdateBasketV2Data = CustomResponseBoolean;

export interface AddBasketV2Payload {
  data: AddBasketReq;
}

export type AddBasketV2Data = CustomResponseBoolean;

export type VerifyCodeData = CustomResponseInteger;

export type RequestCodeVerificationData = CustomResponseBoolean;

export type WithdrawUserData = CustomResponseBoolean;

export interface ResetPasswordPayload {
  data: ResetPasswordReq;
}

export type ResetPasswordData = CustomResponseBoolean;

export interface RenewTokenPayload {
  accessToken: string;
  refreshToken: string;
}

export type RenewTokenData = CustomResponseJwt;

export interface AddPaymentMethodPayload {
  data: AddPaymentMethodReq;
}

export type AddPaymentMethodData = CustomResponsePaymentMethodDto;

export interface UpdateUserPayload {
  data: UserUpdateReq;
  /** @format binary */
  profileImage?: File;
}

export type UpdateUserData = CustomResponseUserInfoDto;

export interface UpdateUserStatePayload {
  data: UpdateUserStateReq;
}

export type UpdateUserStateData = CustomResponseBoolean;

export type LoginUserData = CustomResponseJwt;

export interface JoinUserPayload {
  data: UserJoinReq;
  /** @format binary */
  profileImage?: File;
}

export type JoinUserData = CustomResponseBoolean;

export interface JoinSnsUserPayload {
  data: SnsJoinReq;
}

export type JoinSnsUserData = CustomResponseObject;

export interface JoinAppleSnsPayload {
  data: AppleJoinReq;
  /** @format binary */
  profileImage?: File;
}

export type JoinAppleSnsData = CustomResponseObject;

export interface FindEmailPayload {
  data: FindEmailReq;
}

export type FindEmailData = CustomResponseBoolean;

export type UpdateFcmData = CustomResponseBoolean;

export interface UpdateTopBarPayload {
  name: string;
}

export type UpdateTopBarData = CustomResponseTopBar;

export interface AddTopBarPayload {
  name: string;
}

export type AddTopBarData = CustomResponseTopBar;

export interface AddProductToTopBarPayload {
  /** @format int32 */
  topBarId: number;
  /** @format int32 */
  productId: number;
}

export type AddProductToTopBarData = CustomResponseTopBarProductMap;

export interface UpdateTipPayload {
  data: AddTipReq;
  /** @format binary */
  image?: File;
  /** @format binary */
  imageDetail?: File;
}

export type UpdateTipData = CustomResponseTip;

export interface UpdateTipStatePayload {
  data: UpdateTipStateReq;
}

export type UpdateTipStateData = CustomResponseBoolean;

export interface UpdateTipInfoPayload {
  data: TipInfoUpdateReq;
  /** @format binary */
  thumbnailImage?: File;
}

export type UpdateTipInfoData = CustomResponseTipInfo;

export interface AddTipPayload {
  data: AddTipReq;
  /** @format binary */
  image: File;
  /** @format binary */
  imageDetail: File;
}

export type AddTipData = CustomResponseTip;

export type CreateTastingNoteData = CustomResponseBoolean;

export interface UpdateStoreStatePayload {
  data: StoreStateUpdateReq;
}

export type UpdateStoreStateData = CustomResponseBoolean;

export interface UpdatePasswordPayload {
  data: UpdateStorePasswordReq;
}

export type UpdatePasswordData = CustomResponseBoolean;

export interface UpdateStoreIsReliablePayload {
  data: UpdateStoreIsReliableReq;
}

export type UpdateStoreIsReliableData = CustomResponseBoolean;

export interface UpdateStoreInfoPayload {
  /** @format binary */
  backgroundImage?: File;
  /** @format binary */
  profileImage?: File;
  name?: string;
  isReliable?: boolean;
  location?: string;
  keyword?: string;
  visitNote?: string;
  deliverCompany?: string;
  /** @format int32 */
  refundDeliverFee?: number;
  isConditional: boolean;
  /** @format int32 */
  minStorePrice: number;
  /** @format int32 */
  deliveryFee: number;
  oneLineDescription?: string;
  additionalData?: AddStoreAdditionalReq;
  /** @format binary */
  mosRegistration?: File;
  /** @format binary */
  businessRegistration?: File;
  /** @format binary */
  bankAccountCopy?: File;
}

export type UpdateStoreInfoData = CustomResponseStoreDto;

export interface UpdateStoreInfo1Payload {
  /** @format binary */
  backgroundImage?: File;
  /** @format binary */
  profileImage?: File;
  name?: string;
  isReliable?: boolean;
  location?: string;
  keyword?: string;
  visitNote?: string;
  deliverCompany?: string;
  /** @format int32 */
  refundDeliverFee?: number;
  isConditional: boolean;
  /** @format int32 */
  minStorePrice: number;
  /** @format int32 */
  deliveryFee: number;
  oneLineDescription?: string;
  additionalData?: AddStoreAdditionalReq;
  /** @format binary */
  mosRegistration?: File;
  /** @format binary */
  businessRegistration?: File;
  /** @format binary */
  bankAccountCopy?: File;
}

export type UpdateStoreInfo1Data = CustomResponseStoreDto;

export interface SetMainPartnerByAdminPayload {
  data: SetMainPartnerReq;
}

export type SetMainPartnerByAdminData = CustomResponseStoreDto;

export interface LoginStorePayload {
  loginId: string;
  password: string;
}

export type LoginStoreData = CustomResponseJwt;

export type LikeStoreByUserData = CustomResponseBoolean;

export interface AddStorePayload {
  loginId: string;
  password: string;
  /** @format binary */
  backgroundImage: File;
  /** @format binary */
  profileImage: File;
  name: string;
  location: string;
  keyword: string;
  visitNote?: string;
  /** @format int32 */
  refundDeliverFee?: number;
  isConditional: boolean;
  /** @format int32 */
  minStorePrice: number;
  /** @format int32 */
  deliveryFee: number;
  oneLineDescription?: string;
  deliverCompany?: string;
  additionalData: AddStoreAdditionalReq;
  /** @format binary */
  mosRegistration: File;
  /** @format binary */
  businessRegistration: File;
  /** @format binary */
  bankAccountCopy: File;
}

export type AddStoreData = CustomResponseStoreDto;

export interface UpdateSiteInfoPayload {
  data: SiteInfoReq;
}

export type UpdateSiteInfoData = CustomResponseSiteInfoDto;

export interface ProcessSettleByAdminPayload {
  data: ProcessSettleReq;
}

export type ProcessSettleByAdminData = CustomResponseBoolean;

export interface CancelSettleByAdminPayload {
  data: CancelSettleReq;
}

export type CancelSettleByAdminData = CustomResponseBoolean;

export interface AddSearchFilterPayload {
  data: AddSearchFilterReq;
}

export type AddSearchFilterData = CustomResponseSearchFilterDto;

export interface UpdateSearchFilterFieldPayload {
  data: UpdateSearchFilterFiledReq;
}

export type UpdateSearchFilterFieldData = CustomResponseSearchFilterFieldDto;

export interface AddSearchFilterFieldPayload {
  data: AddSearchFilterFiledReq;
}

export type AddSearchFilterFieldData = CustomResponseSearchFilterFieldDto;

export interface AddSearchFilter1Payload {
  data: AddSearchFilterReq;
}

export type AddSearchFilter1Data = CustomResponseSearchFilterDto;

export interface UpdateReviewPayload {
  data: UpdateReviewReq;
  imageUrlsToRemain?: string[];
  newImages?: File[];
}

export type UpdateReviewData = CustomResponseReviewDto;

export type UnlikeReviewByUserData = CustomResponseBoolean;

export type LikeReviewByUserData = CustomResponseBoolean;

export type DeleteReviewByUserData = CustomResponseBoolean;

export interface AddReviewByUserPayload {
  data: ReviewAddReq;
  images?: File[];
}

export type AddReviewByUserData = CustomResponseReviewDto;

export interface ConfirmReportsPayload {
  data: ConfirmReportReq;
}

export type ConfirmReportsData = CustomResponseBoolean;

export interface AddReportPayload {
  data: AddReportReq;
}

export type AddReportData = CustomResponseReportDto;

export interface UpdateProductPayload {
  data: ProductUpdateReq;
  existingImages?: string[];
  newImages?: File[];
}

export type UpdateProductData = CustomResponseSimpleProductDto;

export interface UpdateStateProductsPayload {
  data: UpdateStateProductsReq;
}

export type UpdateStateProductsData = CustomResponseBoolean;

export type LikeProductByUserData = CustomResponseBoolean;

export interface AddProductPayload {
  data: ProductAddReq;
  images: File[];
}

export type AddProductData = CustomResponseSimpleProductDto;

export type UpdatePayload = AgriculturalAndLivestockProductsInfoDto | ProcessedFoodInfoDto;

export type UpdateData = CustomResponseObject;

export type CreatePayload = AgriculturalAndLivestockProductsInfoDto | ProcessedFoodInfoDto;

export type CreateData = CustomResponseObject;

export type CheckAccountData = CustomResponseBoolean;

export type CancelOrderData = CustomResponseBoolean;

export type OrderProductData = CustomResponseOrderDto;

export interface RequestRefundOrderProductPayload {
  data: RequestCancelReq;
}

export type RequestRefundOrderProductData = CustomResponseBoolean;

export type RejectRefundOrderProductData = CustomResponseBoolean;

export type DoneRefundOrderProductData = CustomResponseBoolean;

export type ConfirmRefundOrderProductData = CustomResponseBoolean;

export interface ProcessDeliverStartPayload {
  data: ProcessDeliverStartReq;
}

export type ProcessDeliverStartData = CustomResponseBoolean;

export type DeliverReadyData = CustomResponseBoolean;

export type ConfirmOrderProductData = CustomResponseBoolean;

export type ConfirmDepositData = CustomResponseBoolean;

export interface RequestChangeProductPayload {
  data: RequestChangeProduct;
}

export type RequestChangeProductData = CustomResponseBoolean;

export type RejectChangeProductData = CustomResponseBoolean;

export type ConfirmChangeProductData = CustomResponseBoolean;

export interface CancelOrderByUserPayload {
  data: RequestCancelReq;
}

export type CancelOrderByUserData = CustomResponseBoolean;

export type RejectCancelOrderData = CustomResponseBoolean;

export type CancelOrderByPartnerData = CustomResponseBoolean;

export type ConfirmCancelOrderData = CustomResponseBoolean;

export interface CancelOrdersByPartnerPayload {
  orderProductInfoIds: number[];
}

export type CancelOrdersByPartnerData = CustomResponseBoolean;

export interface UpdateNoticePayload {
  data: NoticeAddReq;
}

export type UpdateNoticeData = CustomResponseNotice;

export interface AddNoticePayload {
  data: NoticeAddReq;
}

export type AddNoticeData = CustomResponseNotice;

export interface UpdateInquiryPayload {
  data: InquiryUpdateReq;
}

export type UpdateInquiryData = CustomResponseInquiryDto;

export interface AnswerInquiryPayload {
  data: InquiryAnswerReq;
}

export type AnswerInquiryData = CustomResponseInquiryDto;

export interface AddInquiryPayload {
  data: InquiryAddReq;
}

export type AddInquiryData = CustomResponseInquiry;

export interface UpdateGradePayload {
  data: AddGradeReq;
}

export type UpdateGradeData = CustomResponseGrade;

export interface AddGradePayload {
  data: AddGradeReq;
}

export type AddGradeData = CustomResponseGrade;

export type GithubWebhookCallbackPayload = string;

export type GithubWebhookCallbackData = boolean;

export interface SendFcmToUserPayload {
  data: AdminSendFcmReq;
}

export type SendFcmToUserData = CustomResponseBoolean;

export interface UploadProductExcelPayload {
  /** @format binary */
  file: File;
}

export type UploadProductExcelData = CustomResponseBoolean;

export interface UploadPartnerExcelPayload {
  /** @format binary */
  file: File;
}

export type UploadPartnerExcelData = CustomResponseBoolean;

export interface UpdateDeliverPlacePayload {
  data: AddDeliverPlaceReq;
}

export type UpdateDeliverPlaceData = CustomResponseDeliverPlace;

export interface AddDeliverPlacePayload {
  data: AddDeliverPlaceReq;
}

export type AddDeliverPlaceData = CustomResponseDeliverPlace;

export interface AddProductToCurationPayload {
  data: number[];
}

export type AddProductToCurationData = CustomResponseBoolean;

export interface UpdateCurationPayload {
  /** @format binary */
  image?: File;
  shortName?: string;
  title?: string;
  description?: string;
  type?: 'SQUARE' | 'S_SLIDER' | 'L_SLIDER';
  state?: 'ACTIVE' | 'INACTIVE';
}

export type UpdateCurationData = CustomResponseCuration;

export interface SortCurationPayload {
  data: SortCurationReq;
}

export type SortCurationData = CustomResponseListCurationDto;

export interface CreateCurationPayload {
  /** @format binary */
  image?: File;
  shortName?: string;
  title?: string;
  description?: string;
  type?: 'SQUARE' | 'S_SLIDER' | 'L_SLIDER';
  state?: 'ACTIVE' | 'INACTIVE';
}

export type CreateCurationData = CustomResponseCuration;

export type DeleteUserCouponData = CustomResponseBoolean;

export interface UpdateSystemCouponPayload {
  data: UpdateSystemCoupon;
}

export type UpdateSystemCouponData = CustomResponseListCoupon;

export type SelectDownloadCouponData = CustomResponseBoolean;

export interface AddCouponPayload {
  data: CouponAddReq;
}

export type AddCouponData = CustomResponseCoupon;

export interface SaveProductPayload {
  data: SaveProductReq;
}

export type SaveProductData = CustomResponseBoolean;

export interface UpdateRecommendCompareSetPayload {
  data: AddRecommendCompareSet;
}

export type UpdateRecommendCompareSetData = CustomResponseRecommendCompareSetDto;

export interface AddRecommendCompareSetPayload {
  data: AddRecommendCompareSet;
}

export type AddRecommendCompareSetData = CustomResponseRecommendCompareSetDto;

export interface AddCompareFilterPayload {
  data: AddCompareFilterReq;
}

export type AddCompareFilterData = CustomResponseCompareFilterDto;

export interface AddCompareFilter1Payload {
  data: AddCompareFilterReq;
}

export type AddCompareFilter1Data = CustomResponseCompareFilterDto;

export type AddCompareSetPayload = number[];

export type AddCompareSetData = CustomResponseCompareSet;

export interface UpdateCategoryPayload {
  name?: string;
  /** @format binary */
  image?: File;
}

export type UpdateCategoryData = CustomResponseCategory;

export interface AddCategoryCompareFilterPayload {
  data: AddCategoryCompareFilterReq;
}

export type AddCategoryCompareFilterData = CustomResponseCompareFilterDto;

export interface AddCategoryPayload {
  /** @format int32 */
  categoryId?: number;
  name: string;
  /** @format binary */
  image?: File;
}

export type AddCategoryData = CustomResponseCategory;

export type UpdateBasketData = CustomResponseBasketProductDto;

export interface AddBasketPayload {
  data: AddBasketReq;
}

export type AddBasketData = CustomResponseBoolean;

export interface DeleteTastingNoteToBasketPayload {
  data: BasketTastingNoteDeleteReq;
}

export type DeleteTastingNoteToBasketData = CustomResponseBoolean;

export interface AddTastingNoteToBasketPayload {
  data: BasketTastingNoteAddReq;
}

export type AddTastingNoteToBasketData = CustomResponseBoolean;

export interface UpdateBannerPayload {
  type?: 'NONE' | 'CURATION' | 'NOTICE' | 'CATEGORY' | 'MAIN' | 'PC_WEB' | 'MY_PAGE';
  /** @format binary */
  image?: File;
  link?: string;
  /** @format int32 */
  curationId?: number;
  /** @format int32 */
  noticeId?: number;
  /** @format int32 */
  categoryId?: number;
}

export type UpdateBannerData = CustomResponseBannerDto;

export interface UpdateBannerStatePayload {
  data: UpdateBannerStateReq;
}

export type UpdateBannerStateData = CustomResponseBoolean;

export interface SortCuration1Payload {
  data: SortBannerReq;
}

export type SortCuration1Data = CustomResponseListBannerDto;

export interface CreateBannerPayload {
  type: 'NONE' | 'CURATION' | 'NOTICE' | 'CATEGORY' | 'MAIN' | 'PC_WEB' | 'MY_PAGE';
  /** @format binary */
  image: File;
  link?: string;
  /** @format int32 */
  curationId?: number;
  /** @format int32 */
  noticeId?: number;
  /** @format int32 */
  categoryId?: number;
}

export type CreateBannerData = CustomResponseBannerDto;

export interface UpdateAdminByMasterPayload {
  data: UpdateAdminReq;
}

export type UpdateAdminByMasterData = CustomResponseAdmin;

export interface LoginAdminPayload {
  loginId: string;
  password: string;
}

export type LoginAdminData = CustomResponseJwt;

export interface AddAdminByMasterPayload {
  data: AddAdminReq;
}

export type AddAdminByMasterData = CustomResponseAdmin;

export type SelectTopBarListV2Data = CustomResponseListTopBar;

export type SelectTopBarV2Data = CustomResponsePageProductListDto;

export type DeleteTopBarV2Data = CustomResponseBoolean;

export type SelectTopBarCountV2Data = CustomResponseLong;

export type SelectRecommendStoreListV2Data = CustomResponseListSimpleStore;

export type SearchingProductDirectV2Data = CustomResponseSearchDirectResponse;

export type GetProductReviewPhotosData = CustomResponseListProductPhotoReviewDto;

export type SelectReviewListWithStoreIdV2Data = CustomResponseStoreReviewDto;

export type SelectReviewListWithStoreIdV21Data = CustomResponseStoreReviewDto;

export type GetReviewsData = CustomResponseProductReviewDto;

export type SelectMyReviewListV2Data = CustomResponseUserReviewDto;

export type SelectAllReviewListByAdminV2Data = CustomResponsePageAdminReviewDto;

export type GetProductReviewPhotos1Data = CustomResponseListProductPhotoReviewDto;

export type SelectProductListByUserV2Data = CustomResponsePageProductListDto;

export type SelectProductCountByUserV2Data = CustomResponseInteger;

export type GetExpectedArrivalDateData = CustomResponseObject;

export type SelectBasketV2Data = CustomResponseListBasketProductDtoV2;

export type VerifyCodeWithImpUidData = CustomResponseString;

export type WhoamiData = CustomResponseString;

export type SelectPaymentMethodListData = CustomResponseListPaymentMethodDto;

export type SelectPaymentMethodData = CustomResponsePaymentMethodDto;

export type DeletePaymentMethodData = CustomResponseBoolean;

export type SelectUserSelfInfoData = CustomResponseUserInfoDto;

export type SelectUserListData = CustomResponsePageUserInfoDto;

export type SelectUserList1Data = CustomResponseUserInfoDto;

export type SelectTopBarListData = CustomResponseListTopBar;

export type SelectTopBarData = CustomResponsePageProductListDto;

export type DeleteTopBarData = CustomResponseBoolean;

export type SelectTopBarCountData = CustomResponseLong;

export type SelectTipListData = CustomResponseListTip;

export type SelectTipData = CustomResponseTip;

export type DeleteTipData = CustomResponseBoolean;

export type SelectTipList1Data = CustomResponsePageTip;

export type SelectTipInfoData = CustomResponseTipInfo;

export type GetMyProductTastingNotesData = CustomResponseObject;

export type GetMyProductTastingNotes1Data = CustomResponseListProductTastingNoteResponse;

export type SelectStoreListData = CustomResponseListStoreDto;

export type SelectStoreData = CustomResponseSimpleStore;

export type SelectScrapedStoreData = CustomResponseListSimpleStore;

export type SelectRecommendStoreListData = CustomResponseListSimpleStore;

export type SelectStoreListByAdminData = CustomResponsePageStoreDto;

export type SelectStoreByAdminData = CustomResponseStoreDto;

export type SelectStoreByAdmin1Data = CustomResponseStoreDto;

export type SelectMainStoreData = CustomResponseStoreDto;

export type CheckStoreIsActiveData = CustomResponseBoolean;

export type SelectSiteInfoData = CustomResponseSiteInfoDto;

export type SelectSiteInfoListData = CustomResponseListSiteInfoDto;

export type SelectSettlementOrderListData = CustomResponsePageOrderProductInfoDto;

export type SelectSettlementOrderListDownloadData = any;

export type SelectSettlementLogsData = CustomResponsePageSettlementDto;

export type SelectSettlementAmountData = CustomResponseSettlementAmountRes;

export type SearchProductData = CustomResponseListProductListDto;

export type SelectTopSearchKeywordsData = CustomResponseListSearchKeyword;

export type SearchingProductDirectData = CustomResponseListSearchProductDto;

export type SelectSearchFilterData = CustomResponseSearchFilterDto;

export type DeleteSearchFilterData = CustomResponseBoolean;

export type SelectSearchFilterFieldListData = CustomResponseListSearchFilterFieldDto;

export type SelectSearchFilterListData = CustomResponseListSearchFilterDto;

export type SelectReviewData = CustomResponseReviewDto;

export type SelectReviewListWithStoreIdData = CustomResponsePageReviewDto;

export type SelectReviewListWithStoreId1Data = CustomResponsePageReviewDto;

export type SelectReviewListWithProductIdData = CustomResponsePageReviewDto;

export type SelectMyReviewListData = CustomResponsePageReviewDto;

export type SelectAllReviewListByAdminData = CustomResponsePageReviewDto;

export type SelectReportData = CustomResponseReportDto;

export type SelectReportListData = CustomResponsePageReportDto;

export type SelectProductData = CustomResponseSimpleProductDto;

export type DeleteProductData = CustomResponseBoolean;

export type SelectProductOptionListData = CustomResponseListOptionDto;

export type SelectRecentViewListData = CustomResponseListProductListDto;

export type SelectProductListByUserData = CustomResponsePageProductListDto;

export type SelectProductListWithIdsData = CustomResponseListProductListDto;

export type SelectProductCountByUserData = CustomResponseLong;

export type SelectProductListForExcelData = CustomResponseListListExcelProductDto2;

export type SelectProductListData = CustomResponsePageSimpleProductDto;

export type GetFormData = CustomResponseObject;

export type GetData = CustomResponseObject;

export type SelectOrderData = CustomResponseOrderDto;

export type SelectProductOtherCustomerBuyData = CustomResponseListProductListDto;

export type SelectPointRuleData = CustomResponsePointRuleRes;

export type CheckPaymentDoneData = CustomResponseBoolean;

export type SelectOrderListManageData = CustomResponsePageOrderDto;

export type SelectOrderListWithUserIdData = CustomResponseListOrderDto;

export type SelectOrderListData = CustomResponseListOrderDto;

export type SelectOrderList1Data = CustomResponseInteger;

export type SelectCanceledOrderListData = CustomResponseListOrderDto;

export type SelectBankCodeListData = CustomResponseListBankCode;

export type SelectNotificationData = CustomResponsePageNotification;

export type SelectNoticeData = CustomResponseNotice;

export type UpdateNotice1Data = CustomResponseBoolean;

export type SelectNoticeListByAdminData = CustomResponsePageNotice;

export type SelectNoticeListData = CustomResponseListNotice;

export type SelectMainItemsData = CustomResponseMain;

export type SelectMainStoreListData = CustomResponseListSimpleStore;

export type SelectMainCurationListData = CustomResponseListCurationDto;

export type SelectInquiryData = CustomResponseInquiryDto;

export type DeleteInquiryByUserData = CustomResponseBoolean;

export type SelectInquiryListWithUserIdData = CustomResponseListInquiryDto;

export type SelectInquiryListWithProductData = CustomResponseListInquiryDto;

export type SelectInquiryListByAdminData = CustomResponsePageInquiryDto;

export type SelectGradeData = CustomResponseGrade;

export type SelectGrade1Data = CustomResponseListGrade;

export type SelectFilterListData = CustomResponseFilter;

export type SelectDeliverPlaceData = CustomResponseListDeliverPlace;

export type SelectTrackingInfoData = CustomResponseTrackingInfo;

export type SelectRecommendDeliverCompanyListData = CustomResponseListCompany;

export type SelectDeliverCompanyListData = CustomResponseListCompany;

export type SelectSmartDeliverApiKeyData = CustomResponseString;

export type SelectDashBoardData = CustomResponseDashBoard;

export type SelectCurationData = CustomResponseCurationDto;

export type SelectCurationProductsData = CustomResponseListProductListDto;

export type SelectCurationListByAdminData = CustomResponsePageCurationDto;

export type SelectCurationListData = CustomResponseListCurationDto;

export type SelectCouponData = CustomResponseCouponDto;

export type DeleteCouponData = CustomResponseBoolean;

export type SelectUserCouponsData = CustomResponseListCoupon;

export type SelectSystemCouponData = CustomResponseListCoupon;

export type SelectCouponListByAdminData = CustomResponsePageCouponDto;

export type SelectDownloadedCouponData = CustomResponseListCoupon;

export type SelectCanUseCouponData = CustomResponseListCoupon;

export type SelectCanDownloadCouponData = CustomResponseListCoupon;

export type SelectCompareSetData = CustomResponseListCompareProductDto;

export type SelectCompareSetListData = CustomResponseListCompareSetDto;

export type SelectSaveProductListData = CustomResponseListProductListDto;

export interface DeleteSaveProductsPayload {
  data: DeleteSaveProductReq;
}

export type DeleteSaveProductsData = CustomResponseBoolean;

export type SelectRecommendCompareSetData = CustomResponseRecommendCompareSetDto;

export type DeleteRecommendCompareSetData = CustomResponseBoolean;

export type SelectRecommendCompareSetListByAdminData = CustomResponseListRecommendCompareSetDto;

export type CompareProductListData = CustomResponseListCompareProductDto;

export type SelectMainData = CustomResponseCompareMain;

export type SelectCompareFilterAllListData = CustomResponseListCompareFilter;

export type SelectCategoryCompareFilterData = CustomResponseCategoryDto;

export type SelectCategoryCompareFilter1Data = CustomResponseListCategoryDto;

export type SelectCategoriesData = CustomResponseListCategory;

export type SelectBasketData = CustomResponseListBasketProductDto;

export type CountBasketData = CustomResponseInteger;

export type GetTastingNoteBasketData = CustomResponseListTastingNoteCompareBasketProductDto;

export type SelectBannerData = CustomResponseBannerDto;

export type DeleteBannerData = CustomResponseBoolean;

export type SelectPcWebBannerData = CustomResponseBannerDto;

export type SelectMyPageBannerData = CustomResponseListBannerDto;

export type SelectBannerListByAdminData = CustomResponseListBannerDto;

export type SelectBannerListData = CustomResponseListBannerDto;

export type SelectAdminData = CustomResponseAdmin;

export type SelectAdminMyInfoData = CustomResponseAdmin;

export type SelectAdminLogListData = CustomResponsePageAdminLogDto;

export type SelectAdminListData = CustomResponsePageAdmin;

export type SelectAddressListData = CustomResponseListAddress;

export interface DeleteBasketV2Payload {
  data: DeleteBasketReq;
}

export type DeleteBasketV2Data = CustomResponseBoolean;

export type DeleteSearchFilterFieldData = CustomResponseBoolean;

export interface DeleteReportsPayload {
  data: DeleteReportReq;
}

export type DeleteReportsData = CustomResponseBoolean;

export type DeleteData = CustomResponseObject;

export interface DeleteInquiryByAdminPayload {
  data: InquiryDeleteReq;
}

export type DeleteInquiryByAdminData = CustomResponseBoolean;

export type DeleteDeliverPlaceData = CustomResponseBoolean;

export type DeleteCurationData = CustomResponseCuration;

export interface DeleteProductListPayload {
  data: CurationDeleteProductReq;
}

export type DeleteProductListData = CustomResponseBoolean;

export interface DeleteCompareSetPayload {
  data: DeleteCompareSetReq;
}

export type DeleteCompareSetData = CustomResponseBoolean;

export type AddCompareFilter2Data = CustomResponseBoolean;

export type DeleteCategoryData = CustomResponseCategory;

export interface DeleteCategoryCompareFilterPayload {
  data: AddCategoryCompareFilterReq;
}

export type DeleteCategoryCompareFilterData = CustomResponseCompareFilterDto;

export interface DeleteBasketPayload {
  data: DeleteBasketReq;
}

export type DeleteBasketData = CustomResponseBoolean;
