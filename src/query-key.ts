const getQueryKeys = <T, F = unknown>(key: string) => {
  const all = [key] as const;
  const lists = [...all, 'list'] as const;
  const details = [...all, 'detail'] as const;

  return {
    all,
    lists,
    list: (variables: T) => [...lists, variables] as const,
    details,
    detail: (variables: F) => [...details, variables] as const,
  };
};

const getOrderKey = () => {
  const all = ['order'] as const;
  const cancel = [...all, 'cancel'] as const;

  return {
    all,
    lists: [...all, 'lists'] as const,
    list: (variables: unknown) => [...all, 'list', variables] as const,
    details: [...all, 'details'] as const,
    detail: (variables: unknown) => [...all, 'detail', variables] as const,
    cancel: {
      all: cancel,
      lists: [...cancel, 'lists'] as const,
      list: (variables: unknown) => [...cancel, 'list', variables] as const,
      details: [...cancel, 'details'] as const,
      detail: (variables: unknown) => [...cancel, 'detail', variables] as const,
    },
  };
};

export const queryKey = {
  /** 메인 */
  main: ['main'],
  /** 카테고리 */
  category: ['category'],
  /** 알아두면 좋은 정보 */
  tipList: getQueryKeys('tipList'),
  /** 인기검색어 */
  topSearchKeywords: ['topSearchKeywords'],
  /** 검색어 결과 */
  search: getQueryKeys('search'),
  /** 큐레이션 */
  curationList: ['curationList'],
  /** 주문 */
  order: getOrderKey(),
  /** 적립금 혜택 정보 */
  pointRule: ['pointRule'],
  /** 내 정보 */
  user: ['user'],
  /** 필터 */
  filter: ['filter'],
  /** 필터 */
  filters: getQueryKeys('filters'),
  /** 필터 카운트 */
  filterCount: getQueryKeys('filterCount'),
  /** 스토어 */
  store: getQueryKeys('store'),
  /** 즐겨찾기 스토어 */
  scrapedStore: ['scrapedStore'],
  /** 상품 */
  product: getQueryKeys('product'),
  /** PC 배너 */
  pcBanner: ['PcBanner'],
  /** 배너 */
  banner: ['banner'],
  /** TopBar */
  topBar: getQueryKeys('topBar'),
  /** 상품 옵션 */
  option: getQueryKeys('option'),
  /** 가진 쿠폰 */
  downloadedCoupon: getQueryKeys('downloadedCoupon'),
  /** 다운 가능한 쿠폰 */
  canDownloadCoupon: getQueryKeys('canDownloadCoupon'),
  /** 공지사항 */
  notice: getQueryKeys('notice'),
  /** faq */
  faq: getQueryKeys('faq'),
  /** 비교하기 */
  compareMain: ['compareMain'],
  /** 비교하기 */
  compare: getQueryKeys('compare'),
  /** 비교하기 3개짜리 세트 */
  compareSet: getQueryKeys('compareSet'),
  /** 장바구니 */
  cart: getQueryKeys('cart'),
  /** 큐레이션, 카테고리 검색 */
  productList: getQueryKeys('productList'),
  /** 리뷰 */
  review: getQueryKeys('review'),
  /** 내가 쓴 후기 */
  myReview: ['myReview'],
  /** 알림 */
  notification: ['notification'],
  /** 배송 */
  deliverPlace: ['deliverPlace'],
  /** 다른고객이 함께 구매한 상품 */
  orderRecommend: getQueryKeys('orderRecommend'),
  /** 최근 본 상품 */
  recent: getQueryKeys('recent'),
  /** 배송 */
  deliverInfo: ['deliverInfo'],
  /** 결제수단 */
  paymentMethod: ['paymentMethod'],
};
