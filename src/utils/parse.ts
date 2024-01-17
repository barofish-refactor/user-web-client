import { IamportPayMethod } from 'src/utils/use-iamport';

// base64, utf8
export const aToB = (str = ''): string => Buffer.from(str, 'utf8').toString('base64');
export const bToA = (str = ''): string => Buffer.from(str, 'base64').toString('utf8');

// JSON.parse
export function safeParse<T>(json: string): T | undefined {
  try {
    return JSON.parse(json) satisfies T;
  } catch (e) {
    return undefined;
  }
}

export function parseGenerator<T extends string>(obj: { [_ in T]: string }, fallback = '-') {
  return (v: Nullish<T>) => (v ? obj[v] : fallback);
}

/** 문의하기 타입 파싱 */
export const parseInquiryState = (v: Nullish<'PRODUCT' | 'DELIVERY' | 'CANCEL' | 'ETC'>) => {
  switch (v) {
    case 'PRODUCT':
      return '상품문의';
    case 'DELIVERY':
      return '배송문의';
    case 'CANCEL':
      return '반품/취소';
    case 'ETC':
      return '기타';
    default:
      return '-';
  }
};

/** 결제완료여부 파싱 */
export const parseProductInfoState = (
  v: Nullish<
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
  >,
) => {
  switch (v) {
    case 'WAIT_DEPOSIT':
      return '결제 대기중';
    case 'PAYMENT_DONE':
      return '결제 완료';
    case 'DELIVERY_READY':
      return '배송 준비중';
    case 'ON_DELIVERY':
      return '배송중';
    case 'DELIVERY_DIFFICULT':
      return '배송 불가지역';
    case 'DELIVERY_DONE':
      return '배송 완료';
    case 'EXCHANGE_REQUEST':
      return '교환 요청';
    case 'EXCHANGE_ACCEPT':
      return '교환 완료';
    case 'FINAL_CONFIRM':
      return '구매확정';
    case 'CANCELED':
      return '취소됨';
    case 'CANCEL_REQUEST':
      return '취소/환불 요청됨';
    case 'REFUND_REQUEST':
      return '환불 요청';
    case 'REFUND_ACCEPT':
      return '환불 처리 중';
    case 'REFUND_DONE':
      return '환불 완료';
    default:
      return '-';
  }
};

export type sortType =
  | 'RECOMMEND'
  | 'NEW'
  | 'SALES'
  | 'REVIEW'
  | 'LIKE'
  | 'LOW_PRICE'
  | 'HIGH_PRICE';
/** 정렬 기준 파싱 */
export const parseSort = (v: Nullish<sortType>) => {
  switch (v) {
    case 'RECOMMEND':
      return '추천순';
    case 'NEW':
      return '신상품순';
    case 'SALES':
      return '판매량순';
    case 'REVIEW':
      return '리뷰 많은순';
    case 'LIKE':
      return '좋아요 많은순';
    case 'LOW_PRICE':
      return '낮은 가격순';
    case 'HIGH_PRICE':
      return '높은 가격순';
    default:
      return '-';
  }
};

/** 결제수단 파싱 */
export const parseIamportPayMethod = (v: Nullish<IamportPayMethod>) => {
  switch (v) {
    case IamportPayMethod.Card:
      return '신용카드';
    case IamportPayMethod.Kakaopay:
      return '카카오페이';
    case IamportPayMethod.Naverpay:
      return '네이버페이';
    case IamportPayMethod.Phone:
      return '휴대폰결제';
    case IamportPayMethod.Vbank:
      return '가상계좌';
    case IamportPayMethod.Tosspay:
      return '토스페이';
    case IamportPayMethod.Trans:
      return '실시간계좌이체';
    default:
      return '수기결제';
  }
};
// "CARD" | "KEY_IN" | "NAVER" | "KAKAO_PAY" | "PHONE" | "DEPOSIT" | 'TOSS_PAY' | "VIRTUAL_ACCOUNT"

/** 결제수단 파싱 (결제할 때) */
export const parsePaymentWay = (v: Nullish<IamportPayMethod>) => {
  switch (v) {
    case IamportPayMethod.Card:
      return 'CARD';
    case IamportPayMethod.Kakaopay:
      return 'KAKAO_PAY';
    case IamportPayMethod.Naverpay:
      return 'NAVER';
    case IamportPayMethod.Phone:
      return 'PHONE';
    case IamportPayMethod.Vbank:
      return 'VIRTUAL_ACCOUNT';
    case IamportPayMethod.Trans:
      return 'DEPOSIT';
    case IamportPayMethod.Tosspay:
      return 'TOSS_PAY';
    default:
      return 'KEY_IN';
  }
};

/** 결제수단 파싱 */
export const parsePaymentWay2 = (
  v: Nullish<
    'CARD' | 'KAKAO_PAY' | 'NAVER' | 'PHONE' | 'VIRTUAL_ACCOUNT' | 'DEPOSIT' | 'TOSS_PAY' | 'KEY_IN'
  >,
) => {
  switch (v) {
    case 'CARD':
      return '신용카드';
    case 'KAKAO_PAY':
      return '카카오페이';
    case 'NAVER':
      return '네이버페이';
    case 'PHONE':
      return '휴대폰결제';
    case 'VIRTUAL_ACCOUNT':
      return '가상계좌';
    case 'DEPOSIT':
      return '실시간계좌이체';
    case 'TOSS_PAY':
      return '토스페이';
    default:
      return '수기결제';
  }
};
