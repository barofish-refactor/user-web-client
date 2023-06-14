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

export interface CustomResponseBoolean {
  isSuccess?: boolean;
  code?: string;
  data?: boolean;
  errorMsg?: string;
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
}

export interface CustomResponseUserDto {
  isSuccess?: boolean;
  code?: string;
  data?: UserDto;
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
  address?: string;
  addressDetail?: string;
  deliverMessage?: string;
  isDefault?: boolean;
}

export interface Grade {
  /** @format int32 */
  id?: number;
  name?: string;
  /** @format int32 */
  pointRate?: number;
}

export interface User {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
  /** @format date-time */
  joinAt?: string;
}

export interface UserAuth {
  loginType?: 'IDPW' | 'GOOGLE' | 'NAVER' | 'KAKAO' | 'APPLE';
  loginId?: string;
  /** @format int32 */
  userId?: number;
  password?: string;
}

export interface UserDto {
  user?: User;
  auth?: UserAuth;
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

export interface UserJoinReq {
  email?: string;
  name?: string;
  nickname?: string;
  password?: string;
  phone?: string;
  /** @format int32 */
  verificationId?: number;
  address?: string;
  addressDetail?: string;
  isAgreeMarketing?: boolean;
}

export interface SnsJoinReq {
  loginType?: 'IDPW' | 'GOOGLE' | 'NAVER' | 'KAKAO' | 'APPLE';
  loginId?: string;
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

export interface Product {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  storeId?: number;
  store?: Store;
  category?: Category;
  state?: 'ACTIVE' | 'SOLD_OUT' | 'DELETED';
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
  /** @format date-time */
  createdAt?: string;
  reviews?: Review[];
  productType?: ProductType;
  /** @format int32 */
  deliveryFee?: number;
  productLocation?: ProductLocation;
  productProcess?: ProductProcess;
  productUsage?: ProductUsage;
  productStorage?: ProductStorage;
  /** @format int32 */
  categoryId?: number;
}

export interface ProductLocation {
  /** @format int32 */
  id?: number;
  field?: string;
}

export interface ProductProcess {
  /** @format int32 */
  id?: number;
  field?: string;
}

export interface ProductStorage {
  /** @format int32 */
  id?: number;
  field?: string;
}

export interface ProductType {
  /** @format int32 */
  id?: number;
  field?: string;
}

export interface ProductUsage {
  /** @format int32 */
  id?: number;
  field?: string;
}

export interface Review {
  /** @format int32 */
  id?: number;
  product?: Product;
  store?: Store;
  /** @format int32 */
  userId?: number;
  evaluation?: 'TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE';
  images?: string;
  content?: string;
  /** @format date-time */
  createdAt?: string;
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
  store?: Store;
  backgroudImage?: string;
  profileImage?: string;
  name?: string;
  location?: string;
  keyword?: string;
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

export interface CustomResponseTopBarProductMap {
  isSuccess?: boolean;
  code?: string;
  data?: TopBarProductMap;
  errorMsg?: string;
}

export interface AddTipReq {
  title?: string;
  description?: string;
  type?: 'COMPARE' | 'BUY_TIP' | 'NEW_ONE';
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
  title?: string;
  description?: string;
  image?: string;
  /** @format date-time */
  createdAt?: string;
}

export interface StoreStateUpdateReq {
  storeIds?: number[];
  state?: 'ACTIVE' | 'BANNED' | 'DELETED';
}

export interface CustomResponseStoreInfo {
  isSuccess?: boolean;
  code?: string;
  data?: StoreInfo;
  errorMsg?: string;
}

export interface CustomResponseStore {
  isSuccess?: boolean;
  code?: string;
  data?: Store;
  errorMsg?: string;
}

export interface SiteInfoReq {
  content?: string;
}

export interface CustomResponseSiteInformation {
  isSuccess?: boolean;
  code?: string;
  data?: SiteInformation;
  errorMsg?: string;
}

export interface SiteInformation {
  id?: string;
  description?: string;
  content?: string;
}

export interface ReviewAddReq {
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  storeId?: number;
  /** @format int32 */
  userId?: number;
  evaluation?: 'TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE';
  content?: string;
}

export interface CategoryDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  parentId?: number;
  image?: string;
  name?: string;
  categories?: CategoryDto[];
  parentCategoryName?: string;
}

export interface CustomResponseReviewDto {
  isSuccess?: boolean;
  code?: string;
  data?: ReviewDto;
  errorMsg?: string;
}

export interface Inquiry {
  /** @format int32 */
  id?: number;
  type?: 'PRODUCT' | 'DELIVERY' | 'CANCEL' | 'ETC';
  isSecret?: boolean;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  userId?: number;
  content?: string;
  /** @format date-time */
  createdAt?: string;
  answer?: string;
  /** @format date-time */
  answeredAt?: string;
  product?: Product;
  /** @format date-time */
  answetedAt?: string;
}

export interface ReviewDto {
  /** @format int32 */
  id?: number;
  product?: SimpleProductDto;
  store?: SimpleStore;
  user?: UserInfo;
  evaluation?: 'TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE';
  images?: string[];
  content?: string;
  /** @format date-time */
  createdAt?: string;
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
  state?: 'ACTIVE' | 'SOLD_OUT' | 'DELETED';
  store?: SimpleStore;
  category?: CategoryDto;
  images?: string[];
  title?: string;
  isLike?: boolean;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  discountRate?: number;
  deliveryInfo?: string;
  /** @format int32 */
  deliveryFee?: number;
  description?: string;
  descriptionImages?: string[];
  /** @format int32 */
  expectedDeliverDay?: number;
  type?: ProductType;
  location?: ProductLocation;
  process?: ProductProcess;
  usage?: ProductUsage;
  storage?: ProductStorage;
  /** @format date-time */
  createdAt?: string;
  comparedProduct?: Product[];
  reviewStatistics?: ReviewTotalStatistic;
  reviews?: Review[];
  /** @format int32 */
  reviewCount?: number;
  inquiries?: Inquiry[];
}

export interface SimpleStore {
  /** @format int32 */
  storeId?: number;
  backgroundImage?: string;
  profileImage?: string;
  name?: string;
  location?: string;
  keyword?: string[];
  isLike?: boolean;
  products?: Product[];
  reviews?: Review[];
  /** @format int32 */
  reviewCount?: number;
  /** @format int32 */
  productCount?: number;
  imageReviews?: Review[];
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

export interface OptionAddReq {
  isNeeded?: boolean;
  items?: OptionItemAddReq[];
}

export interface OptionItemAddReq {
  name?: string;
  /** @format int32 */
  discountRate?: number;
  /** @format int32 */
  price?: number;
  /** @format int32 */
  amount?: number;
}

export interface ProductUpdateReq {
  /** @format int32 */
  storeId?: number;
  /** @format int32 */
  categoryId?: number;
  title?: string;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  discountRate?: number;
  deliveryInfo?: string;
  /** @format int32 */
  deliveryFee?: number;
  /** @format int32 */
  expectedDeliverDay?: number;
  /** @format int32 */
  typeId?: number;
  /** @format int32 */
  locationId?: number;
  /** @format int32 */
  usageId?: number;
  /** @format int32 */
  storageId?: number;
  /** @format int32 */
  processId?: number;
  descriptionContent?: string;
  options?: OptionAddReq[];
}

export interface CustomResponseProduct {
  isSuccess?: boolean;
  code?: string;
  data?: Product;
  errorMsg?: string;
}

export interface ProductAddReq {
  /** @format int32 */
  storeId?: number;
  /** @format int32 */
  categoryId?: number;
  title?: string;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  discountRate?: number;
  deliveryInfo?: string;
  /** @format int32 */
  deliveryFee?: number;
  /** @format int32 */
  expectedDeliverDay?: number;
  /** @format int32 */
  typeId?: number;
  /** @format int32 */
  locationId?: number;
  /** @format int32 */
  usageId?: number;
  /** @format int32 */
  storageId?: number;
  /** @format int32 */
  processId?: number;
  descriptionContent?: string;
  options?: OptionAddReq[];
}

export interface OrderProductReq {
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  optionId?: number;
  /** @format int32 */
  amount?: number;
}

export interface OrderReq {
  name?: string;
  tel?: string;
  /** @format int32 */
  couponId?: number;
  /** @format int32 */
  point?: number;
  /** @format int32 */
  totalPrice?: number;
  products?: OrderProductReq[];
  /** @format int32 */
  deliverPlaceId?: number;
}

export interface CustomResponseOrders {
  isSuccess?: boolean;
  code?: string;
  data?: Orders;
  errorMsg?: string;
}

export interface OrderProductInfo {
  /** @format int32 */
  id?: number;
  orderId?: string;
  /** @format int32 */
  productId?: number;
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
    | 'REFUND_DONE';
  /** @format int32 */
  price?: number;
  /** @format int32 */
  amount?: number;
  /** @format int32 */
  deliveryFee?: number;
  order?: Orders;
  product?: Product;
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
    | 'REFUND_DONE';
  ordererName?: string;
  ordererTel?: string;
  /** @format int32 */
  totalPrice?: number;
  /** @format date-time */
  orderedAt?: string;
  productInfos?: OrderProductInfo[];
}

export interface NoticeAddReq {
  type?: 'NOTICE' | 'FAQ';
  title?: string;
  content?: string;
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
}

export interface InquiryAnswerReq {
  content?: string;
}

export interface CustomResponseInquiry {
  isSuccess?: boolean;
  code?: string;
  data?: Inquiry;
  errorMsg?: string;
}

export interface InquiryAddReq {
  /** @format int32 */
  productId?: number;
  type?: 'PRODUCT' | 'DELIVERY' | 'CANCEL' | 'ETC';
  content?: string;
  isSecret?: boolean;
}

export interface AddDeliverPlaceReq {
  name?: string;
  receiverName?: string;
  tel?: string;
  address?: string;
  addressDetail?: string;
  deliverMessage?: string;
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
}

export interface CurationProductMap {
  /** @format int64 */
  id?: number;
  product?: Product;
  curation?: Curation;
}

export interface CustomResponseListCurationProductMap {
  isSuccess?: boolean;
  code?: string;
  data?: CurationProductMap[];
  errorMsg?: string;
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
  products?: Product[];
}

export interface CustomResponseListCurationDto {
  isSuccess?: boolean;
  code?: string;
  data?: CurationDto[];
  errorMsg?: string;
}

export interface CouponAddReq {
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
}

export interface Coupon {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'DELETED';
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

export interface BasketProductDto {
  /** @format int32 */
  id?: number;
  store?: SimpleStore;
  product?: ProductListDto;
  /** @format int32 */
  amount?: number;
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

export interface OptionItemDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  optionId?: number;
  name?: string;
  /** @format int32 */
  discountRate?: number;
  /** @format int32 */
  price?: number;
  /** @format int32 */
  amount?: number;
}

export interface ProductListDto {
  /** @format int32 */
  id?: number;
  image?: string;
  title?: string;
  /** @format int32 */
  discountRate?: number;
  /** @format int32 */
  originPrice?: number;
  /** @format int32 */
  reviewCount?: number;
  isLike?: boolean;
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

export interface Banner {
  /** @format int32 */
  id?: number;
  state?: 'ACTIVE' | 'INACTIVE';
  type?: 'NONE' | 'CURATION' | 'NOTICE' | 'CATEGORY' | 'MAIN' | 'PC_WEB';
  image?: string;
  /** @format int32 */
  curationId?: number;
  /** @format int32 */
  noticeId?: number;
  /** @format int32 */
  categoryId?: number;
}

export interface CustomResponseBanner {
  isSuccess?: boolean;
  code?: string;
  data?: Banner;
  errorMsg?: string;
}

export interface CustomResponseString {
  isSuccess?: boolean;
  code?: string;
  data?: string;
  errorMsg?: string;
}

export interface TestClass {
  data?: string;
}

export interface CustomResponsePageUserDto {
  isSuccess?: boolean;
  code?: string;
  data?: PageUserDto;
  errorMsg?: string;
}

export interface PageUserDto {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: UserDto[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  /** @format int32 */
  numberOfElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
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

export interface CustomResponseListTopBar {
  isSuccess?: boolean;
  code?: string;
  data?: TopBar[];
  errorMsg?: string;
}

export interface CustomResponseListProductListDto {
  isSuccess?: boolean;
  code?: string;
  data?: ProductListDto[];
  errorMsg?: string;
}

export interface CustomResponseListInteger {
  isSuccess?: boolean;
  code?: string;
  data?: number[];
  errorMsg?: string;
}

export interface CustomResponseListTip {
  isSuccess?: boolean;
  code?: string;
  data?: Tip[];
  errorMsg?: string;
}

export interface CustomResponseListStore {
  isSuccess?: boolean;
  code?: string;
  data?: Store[];
  errorMsg?: string;
}

export interface CustomResponseSimpleStore {
  isSuccess?: boolean;
  code?: string;
  data?: SimpleStore;
  errorMsg?: string;
}

export interface CustomResponseListSimpleStore {
  isSuccess?: boolean;
  code?: string;
  data?: SimpleStore[];
  errorMsg?: string;
}

export interface CustomResponseListSiteInformation {
  isSuccess?: boolean;
  code?: string;
  data?: SiteInformation[];
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

export interface SearchProductDto {
  /** @format int32 */
  id?: number;
  title?: string;
}

export interface CustomResponseListReview {
  isSuccess?: boolean;
  code?: string;
  data?: Review[];
  errorMsg?: string;
}

export interface CustomResponseSimpleProductDto {
  isSuccess?: boolean;
  code?: string;
  data?: SimpleProductDto;
  errorMsg?: string;
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

export interface CustomResponseListSimpleProductDto {
  isSuccess?: boolean;
  code?: string;
  data?: SimpleProductDto[];
  errorMsg?: string;
}

export interface CustomResponseListProductUsage {
  isSuccess?: boolean;
  code?: string;
  data?: ProductUsage[];
  errorMsg?: string;
}

export interface CustomResponseListProductType {
  isSuccess?: boolean;
  code?: string;
  data?: ProductType[];
  errorMsg?: string;
}

export interface CustomResponseListProductStorage {
  isSuccess?: boolean;
  code?: string;
  data?: ProductStorage[];
  errorMsg?: string;
}

export interface CustomResponseListProductProcess {
  isSuccess?: boolean;
  code?: string;
  data?: ProductProcess[];
  errorMsg?: string;
}

export interface CustomResponseListProductLocation {
  isSuccess?: boolean;
  code?: string;
  data?: ProductLocation[];
  errorMsg?: string;
}

export interface CustomResponseListOrders {
  isSuccess?: boolean;
  code?: string;
  data?: Orders[];
  errorMsg?: string;
}

export interface CustomResponseListNotification {
  isSuccess?: boolean;
  code?: string;
  data?: Notification[];
  errorMsg?: string;
}

export interface Notification {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userId?: number;
  type?: object;
  title?: string;
  content?: string;
  /** @format date-time */
  createdAt?: string;
}

export interface CustomResponseListNotice {
  isSuccess?: boolean;
  code?: string;
  data?: Notice[];
  errorMsg?: string;
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
  curations?: CurationDto[];
  subBanner?: Banner;
  store?: SimpleStore;
  tips?: Tip[];
}

export interface CustomResponseInquiryDto {
  isSuccess?: boolean;
  code?: string;
  data?: InquiryDto;
  errorMsg?: string;
}

export interface InquiryDto {
  /** @format int32 */
  id?: number;
  type?: 'PRODUCT' | 'DELIVERY' | 'CANCEL' | 'ETC';
  isSecret?: boolean;
  /** @format int32 */
  productId?: number;
  user?: UserDto;
  content?: string;
  /** @format date-time */
  createdAt?: string;
  answer?: string;
  /** @format date-time */
  answeredAt?: string;
  product?: ProductListDto;
  store?: SimpleStore;
}

export interface CustomResponseListInquiryDto {
  isSuccess?: boolean;
  code?: string;
  data?: InquiryDto[];
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
  types?: ProductType[];
  locations?: ProductLocation[];
  processes?: ProductProcess[];
  storages?: ProductStorage[];
  usages?: ProductUsage[];
}

export interface CustomResponseListDeliverPlace {
  isSuccess?: boolean;
  code?: string;
  data?: DeliverPlace[];
  errorMsg?: string;
}

export interface CustomResponseCurationDto {
  isSuccess?: boolean;
  code?: string;
  data?: CurationDto;
  errorMsg?: string;
}

export interface CustomResponseListProduct {
  isSuccess?: boolean;
  code?: string;
  data?: Product[];
  errorMsg?: string;
}

export interface CustomResponseListCoupon {
  isSuccess?: boolean;
  code?: string;
  data?: Coupon[];
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

export interface CustomResponseCompareSetDto {
  isSuccess?: boolean;
  code?: string;
  data?: CompareSetDto;
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

export interface CustomResponseListBanner {
  isSuccess?: boolean;
  code?: string;
  data?: Banner[];
  errorMsg?: string;
}

export interface CustomResponseObject {
  isSuccess?: boolean;
  code?: string;
  data?: object;
  errorMsg?: string;
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
  productIds?: number[];
}

export interface DeleteBasketReq {
  ids?: number[];
}

export type PortOneCallbackData = object;

export type VerifyCodeData = CustomResponseInteger;

export type RequestCodeVerificationData = CustomResponseBoolean;

export type WithdrawUserData = CustomResponseBoolean;

export interface UpdateUserPayload {
  data: UserUpdateReq;
  /** @format binary */
  profileImage?: File;
}

export type UpdateUserData = CustomResponseUserDto;

export interface UpdateUserStatePayload {
  data: UpdateUserStateReq;
}

export type UpdateUserStateData = CustomResponseBoolean;

export type LoginUserData = CustomResponseJwt;

export interface JoinUserPayload {
  data: UserJoinReq;
  /** @format binary */
  profileImage: File;
}

export type JoinUserData = CustomResponseBoolean;

export interface JoinSnsUserPayload {
  data: SnsJoinReq;
}

export type JoinSnsUserData = CustomResponseJwt;

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
}

export type UpdateTipData = CustomResponseTip;

export interface AddTipPayload {
  data: AddTipReq;
  /** @format binary */
  image: File;
}

export type AddTipData = CustomResponseTip;

export interface UpdateStoreStatePayload {
  data: StoreStateUpdateReq;
}

export type UpdateStoreStateData = CustomResponseBoolean;

export interface UpdateStoreInfoPayload {
  /** @format binary */
  backgroundImage?: File;
  /** @format binary */
  profileImage?: File;
  name?: string;
  location?: string;
  keyword?: string;
}

export type UpdateStoreInfoData = CustomResponseStoreInfo;

export interface UpdateStoreInfo1Payload {
  /** @format binary */
  backgroundImage?: File;
  /** @format binary */
  profileImage?: File;
  name?: string;
  location?: string;
  keyword?: string;
}

export type UpdateStoreInfo1Data = CustomResponseStoreInfo;

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
}

export type AddStoreData = CustomResponseStore;

export interface UpdateSiteInfoPayload {
  data: SiteInfoReq;
}

export type UpdateSiteInfoData = CustomResponseSiteInformation;

export interface AddReviewByUserPayload {
  data: ReviewAddReq;
  images: File[];
}

export type AddReviewByUserData = CustomResponseReviewDto;

export interface UpdateProductPayload {
  data: ProductUpdateReq;
  existingImages?: string[];
  newImages?: File[];
}

export type UpdateProductData = CustomResponseProduct;

export type LikeProductByUserData = CustomResponseBoolean;

export interface AddProductPayload {
  data: ProductAddReq;
  images: File[];
}

export type AddProductData = CustomResponseProduct;

export type OrderProductData = CustomResponseOrders;

export interface UpdateNoticePayload {
  data: NoticeAddReq;
}

export type UpdateNoticeData = CustomResponseNotice;

export interface AddNoticePayload {
  data: NoticeAddReq;
}

export type AddNoticeData = CustomResponseNotice;

export interface AnswerInquiryPayload {
  data: InquiryAnswerReq;
}

export type AnswerInquiryData = CustomResponseInquiry;

export interface AddInquiryPayload {
  data: InquiryAddReq;
}

export type AddInquiryData = CustomResponseInquiry;

export interface UpdateDeliverPlacePayload {
  data: AddDeliverPlaceReq;
}

export type UpdateDeliverPlaceData = CustomResponseDeliverPlace;

export interface AddDeliverPlacePayload {
  data: AddDeliverPlaceReq;
}

export type AddDeliverPlaceData = CustomResponseDeliverPlace;

export type AddProductToCurationPayload = number[];

export type AddProductToCurationData = CustomResponseListCurationProductMap;

export interface UpdateCurationPayload {
  /** @format binary */
  image?: File;
  shortName?: string;
  title?: string;
  description?: string;
  type?: 'SQUARE' | 'S_SLIDER' | 'L_SLIDER';
}

export type UpdateCurationData = CustomResponseCuration;

export interface SortCurationPayload {
  data: SortCurationReq;
}

export type SortCurationData = CustomResponseListCurationDto;

export interface CreateCurationPayload {
  /** @format binary */
  image: File;
  shortName: string;
  title: string;
  description: string;
  type: 'SQUARE' | 'S_SLIDER' | 'L_SLIDER';
}

export type CreateCurationData = CustomResponseCuration;

export type SelectDownloadCouponData = CustomResponseBoolean;

export interface AddCouponPayload {
  data: CouponAddReq;
}

export type AddCouponData = CustomResponseCoupon;

export interface SaveProductPayload {
  data: SaveProductReq;
}

export type SaveProductData = CustomResponseBoolean;

export type AddCompareSetPayload = number[];

export type AddCompareSetData = CustomResponseCompareSet;

export interface UpdateCategoryPayload {
  name?: string;
  /** @format binary */
  image?: File;
}

export type UpdateCategoryData = CustomResponseCategory;

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

export interface UpdateBannerPayload {
  type?: 'NONE' | 'CURATION' | 'NOTICE' | 'CATEGORY' | 'MAIN' | 'PC_WEB';
  /** @format binary */
  image?: File;
  /** @format int32 */
  curationId?: number;
  /** @format int32 */
  noticeId?: number;
  /** @format int32 */
  categoryId?: number;
}

export type UpdateBannerData = CustomResponseBanner;

export interface CreateBannerPayload {
  type: 'NONE' | 'CURATION' | 'NOTICE' | 'CATEGORY' | 'MAIN' | 'PC_WEB';
  /** @format binary */
  image: File;
  /** @format int32 */
  curationId?: number;
  /** @format int32 */
  noticeId?: number;
  /** @format int32 */
  categoryId?: number;
}

export type CreateBannerData = CustomResponseBanner;

export interface LoginAdminPayload {
  loginId: string;
  password: string;
}

export type LoginAdminData = CustomResponseJwt;

export type WhoamiData = CustomResponseString;

export type TestData = CustomResponseBoolean;

export type SelectUserSelfInfoData = CustomResponseUserDto;

export type SelectUserListData = CustomResponsePageUserDto;

export type SelectUserList1Data = CustomResponseUserDto;

export type SelectTopBarListData = CustomResponseListTopBar;

export type SelectTopBarData = CustomResponseListProductListDto;

export type DeleteTopBarData = CustomResponseBoolean;

export type Test1Data = CustomResponseListInteger;

export type SelectTipListData = CustomResponseListTip;

export type SelectTipData = CustomResponseTip;

export type DeleteTipData = CustomResponseObject;

export type SelectStoreListData = CustomResponseListStore;

export type SelectStoreData = CustomResponseSimpleStore;

export type SelectScrapedStoreData = CustomResponseListSimpleStore;

export type SelectRecommendStoreListData = CustomResponseListSimpleStore;

export type SelectStoreByAdminData = CustomResponseStore;

export type SelectStoreByAdmin1Data = CustomResponseStore;

export type SelectSiteInfoData = CustomResponseSiteInformation;

export type SelectSiteInfoListData = CustomResponseListSiteInformation;

export type SearchProductData = CustomResponseListProductListDto;

export type SelectTopSearchKeywordsData = CustomResponseListSearchKeyword;

export type SearchingProductDirectData = CustomResponseListSearchProductDto;

export type SelectReviewListWithStoreIdData = CustomResponseListReview;

export type SelectReviewListWithProductIdData = CustomResponseListReview;

export type SelectAllReviewListByAdminData = CustomResponseListReview;

export type SelectProductData = CustomResponseSimpleProductDto;

export type DeleteProductData = CustomResponseBoolean;

export type SelectProductOptionListData = CustomResponseListOptionDto;

export type Test2Data = CustomResponseListProductListDto;

export type SelectProductListData = CustomResponseListSimpleProductDto;

export type SelectUsageListData = CustomResponseListProductUsage;

export type SelectTypeListData = CustomResponseListProductType;

export type SelectStorageListData = CustomResponseListProductStorage;

export type SelectProcessListData = CustomResponseListProductProcess;

export type SelectLocationListData = CustomResponseListProductLocation;

export type SelectOrderData = CustomResponseOrders;

export type CheckPaymentDoneData = CustomResponseBoolean;

export type SelectOrderListData = CustomResponseListOrders;

export type SelectCanceledOrderListData = CustomResponseListOrders;

export type SelectNotificationData = CustomResponseListNotification;

export type SelectNoticeData = CustomResponseNotice;

export type UpdateNotice1Data = CustomResponseBoolean;

export type SelectNoticeListData = CustomResponseListNotice;

export type SelectMainItemsData = CustomResponseMain;

export type SelectInquiryData = CustomResponseInquiryDto;

export type SelectInquiryListWithProductData = CustomResponseListInquiryDto;

export type SelectInquiryListByAdminData = CustomResponseListInquiryDto;

export type SelectFilterListData = CustomResponseFilter;

export type SelectDeliverPlaceData = CustomResponseListDeliverPlace;

export type SelectCurationData = CustomResponseCurationDto;

export type SelectCurationProductsData = CustomResponseListProduct;

export type SelectCurationListData = CustomResponseListCurationDto;

export type SelectCouponData = CustomResponseCoupon;

export type DeleteCouponData = CustomResponseBoolean;

export type TestCouponData = CustomResponseBoolean;

export type SelectCouponListByAdminData = CustomResponseListCoupon;

export type SelectDownloadedCouponData = CustomResponseListCoupon;

export type SelectCanUseCouponData = CustomResponseListCoupon;

export type SelectCanDownloadCouponData = CustomResponseListCoupon;

export type Test3Data = CustomResponseListCompareSetDto;

export type SelectCompareSetData = CustomResponseCompareSetDto;

export type SelectCompareSetListData = CustomResponseListCompareSetDto;

export type SelectSaveProductListData = CustomResponseListProduct;

export interface DeleteSaveProductsPayload {
  data: DeleteSaveProductReq;
}

export type DeleteSaveProductsData = CustomResponseBoolean;

export type SelectMainData = CustomResponseCompareMain;

export type SelectCategoriesData = CustomResponseListCategory;

export type SelectBasketData = CustomResponseListBasketProductDto;

export type SelectBannerData = CustomResponseBanner;

export type DeleteBannerData = CustomResponseBoolean;

export type SelectPcWebBannerData = CustomResponseBanner;

export type SelectBannerListByAdminData = CustomResponseListBanner;

export type SelectBannerListData = CustomResponseListBanner;

export type DeleteReviewByUserData = CustomResponseBoolean;

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

export type DeleteCategoryData = CustomResponseCategory;

export interface DeleteBasketPayload {
  data: DeleteBasketReq;
}

export type DeleteBasketData = CustomResponseBoolean;
