export function parseGenerator<T extends string>(obj: { [_ in T]: string }, fallback = '-') {
  return (v: Nullish<T>) => (v ? obj[v] : fallback);
}

// base64, utf8
export const aToB = (str = ''): string => Buffer.from(str, 'utf8').toString('base64');
export const bToA = (str = ''): string => Buffer.from(str, 'base64').toString('utf8');

/** 결제완료여부 파싱 */
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
      return '요청 취소됨';
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
