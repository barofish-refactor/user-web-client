import { setCookie } from 'cookies-next';
import { addDays, isSunday, lightFormat } from 'date-fns';
import { type BasketProductDto, type Jwt } from 'src/api/swagger/data-contracts';
import { VARIABLES } from 'src/variables';
import { REG_EXP } from './regex';
import { type SectionOptionType, type SectionBasketType } from 'src/pages/product/cart';
import { type OptionState } from 'src/components/product/bottom-sheet';

export function setToken(jwt: Jwt | undefined) {
  const { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_MAX_AGE } = VARIABLES;

  const option = { maxAge: TOKEN_MAX_AGE };
  setCookie(ACCESS_TOKEN, jwt?.accessToken, option);
  setCookie(REFRESH_TOKEN, jwt?.refreshToken, option);
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'login',
        accessToken: jwt?.accessToken,
        refreshToken: jwt?.refreshToken,
      }),
    );
  }
}

export const requestPermission = (type: string, value?: string) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type,
        value,
      }),
    );
  }
};

/** 모바일 토큰 초기화 */
export const resetToken = () => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: 'cookies', key: VARIABLES.ACCESS_TOKEN, value: '' }),
    );
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: 'cookies', key: VARIABLES.REFRESH_TOKEN, value: '' }),
    );
  }
};

export function maskingCardNumber(value: Nullish<string>) {
  if (!value) return '';
  return value
    .replace(/-/g, '')
    .replace(/(\d{6})(\d{6})(\d{4})/, '$1******$3')
    .replace(/(.{15})(\d{1})/, '$1*');
}

/* HTTP Status 415 에러 헨들링 */
export function formatToBlob<T>(value: T, toJson?: boolean) {
  // @ts-ignore
  return new Blob([toJson ? JSON.stringify(value) : value], {
    type: 'application/json',
  }) as unknown as T;
}

/** 문자열을 base64로 암호화 */
export const atob = (str = ''): string => Buffer.from(str, 'base64').toString('binary');

/** base64를 문자열로 복호화 */
export const btoa = (str = ''): string => Buffer.from(str, 'binary').toString('base64');

/**
 * 해당 토큰이 어드민 토큰인지 확인하는 함수
 */
export function isTokenHasAdminId(token: Nullish<string>, id = 'adminId') {
  if (!token) return false;
  return decodeToken(token)[id] !== undefined;
}

/**
 * JWT 토큰 분해하는 함수
 */
export function decodeToken(token: Nullish<string>) {
  return token ? JSON.parse(String(Buffer.from(token.split('.')[1], 'base64'))) : '';
}

/**
 * 전화번호 하이픈 함수
 */
export function formatToPhone(value: Nullish<string>): string {
  const { tel } = REG_EXP;

  if (value) {
    const match = value.match(tel);
    if (match !== null) {
      const groups = match?.groups;
      if (groups?.a === undefined) {
        return [groups?.c, groups?.d].join('-');
      } else {
        return [groups?.a, groups?.b, groups?.d].join('-');
      }
    }
  }
  return '-';
}

/**
 * 콤마 파싱 함수
 * @param value 숫자 혹은 숫자로 이루어진 문자
 * @param option prefix: 접두사, suffix: 접미사
 * @returns 콤마가 붙은 숫자
 */
export function formatToLocaleString(
  value: Nullish<string | number>,
  option?: { prefix?: string; suffix?: string },
): string {
  let result = value;

  if (!result) {
    return '0';
  }

  if (typeof result === 'string' || typeof result === 'number') {
    if (Number.isNaN(result)) {
      result = '-';
    } else {
      result = Number(result).toLocaleString();
    }
  }

  return `${option?.prefix ?? ''}${result}${option?.suffix ?? ''}`;
}

/**
 * 시간 포맷 함수
 * @param date iso 날짜
 * @param dateFormat 포맷형식(선택)
 */
export function formatToUtc(date: Nullish<Date | string>, dateFormat?: string): string {
  if (!date) return '-';
  return lightFormat(new Date(date), dateFormat ?? 'yyyy-MM-dd');
}

/**
 * 함수형 addEventListner
 * @param obj 이벤트를 핸들링할 Element
 * @param args 이벤트 종류, 이벤트 핸들러
 */
export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['addEventListener']>
    // eslint-disable-next-line @typescript-eslint/ban-types
    | [Parameters<T['addEventListener']>[0], Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
  }
}

/**
 * 함수형 removeEventListner
 * @param obj 이벤트를 핸들링할 Element
 * @param args 이벤트 종류, 이벤트 핸들러
 */
export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  // eslint-disable-next-line @typescript-eslint/ban-types
  ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
  }
}

/**
 * 할인율 계산 처리 (10자리 반올림)
 */
export function calcDiscountPrice(
  originPrice: number | undefined,
  discountRate: number | undefined,
): number {
  return (
    Math.round(((originPrice ?? 0) - (originPrice ?? 0) * ((discountRate ?? 0) / 100)) / 10) * 10
  );
}

/**
 * 100 - ((97 / 100) * 100)
 * 할인율 비율 계산 (올림)
 */
export function calcDiscountRate(
  originPrice: number | undefined,
  discountPrice: number | undefined,
): number {
  if (!discountPrice || !originPrice) return 0;
  return Math.ceil(100 - (discountPrice / originPrice) * 100);
}

/** string undfined */
export const emptyToUndefined = (value: string) => {
  return value === '' ? undefined : value;
};

export function distanceFromNow(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffS = Math.floor(diffMs / 1000);
  if (diffS < 60) {
    return `${diffS}초 전`;
  }
  const diffM = Math.floor(diffS / 60);
  if (diffM < 60) {
    return `${diffM}분 전`;
  }
  const diffH = Math.floor(diffM / 60);
  if (diffH < 24) {
    return `${diffH}시간 전`;
  }
  const diffD = Math.floor(diffH / 24);
  if (diffD < 5) {
    return `${diffD}일 전`;
  }
  return `${formatToUtc(date, 'M월 d일')}`;
}

/** 이름 마스킹 */
export function maskingName(name: string) {
  if (name.length > 2) {
    const originName = name.split('');
    originName.forEach(function (splitName, i) {
      if (i === 0 || i === originName.length - 1) return;
      originName[i] = '*';
    });
    const joinName = originName.join();
    return joinName.replace(/,/g, '');
  } else {
    const pattern = /.$/;
    return name.replace(pattern, '*');
  }
}

export interface checkDeliverType {
  type: 'FREE' | 'FIX' | 'FREE_IF_OVER';
  totalPrice: number;
  deliverFee: number;
  minOrderPrice: number;
}

export const getDeliverFee = ({
  type,
  deliverFee,
  minOrderPrice,
  totalPrice,
}: checkDeliverType): number => {
  const result =
    type === 'FREE'
      ? 0
      : type === 'FIX'
      ? deliverFee
      : totalPrice >= (minOrderPrice ?? 0)
      ? 0
      : deliverFee;
  return result;
};

/** 장바구니 타입 변경 */
export const changeSectionBasket = (value: BasketProductDto[]): SectionBasketType[] => {
  let idx = 0;
  const result = value.reduce<SectionBasketType[]>((acc, cur) => {
    const ownerId = cur.store?.storeId;

    const index = acc.findIndex(v => v.store?.storeId === ownerId);
    const productId = cur.product?.id;

    const curTotalPrice = value
      .filter(v => v.product?.id === productId)
      .map(v => (v.amount ?? 0) * (v.option?.discountPrice ?? 0))
      .reduce((a, b) => a + b, 0);
    const curDeliverFee = getDeliverFee({
      type: cur.deliverFeeType ?? 'FREE',
      deliverFee: cur.deliveryFee ?? 0,
      totalPrice: curTotalPrice,
      minOrderPrice: cur.minOrderPrice ?? 0,
    });

    if (index === -1) {
      acc.push({
        index: idx,
        store: cur.store,
        deliverFee: curDeliverFee,
        data: [cur],
      });
      idx++;
    } else {
      acc[index].deliverFee = Math.max(acc[index].deliverFee, curDeliverFee);
      acc[index].data.push(cur);
    }
    return acc;
  }, []);
  return result;
};

/** 주문하기 상품 타입 변경 */
export const changeSectionOption = (value: OptionState[]): SectionOptionType[] => {
  let idx = 0;
  const result = value.reduce<SectionOptionType[]>((acc, cur) => {
    const ownerId = cur.storeId;

    const index = acc.findIndex(v => v.storeId === ownerId);
    const productId = cur.productId;

    const curTotalPrice = value
      .filter(v => v.productId === productId)
      .map(v => v.amount * (v.price + v.additionalPrice))
      .reduce((a, b) => a + b, 0);
    const curDeliverFee = getDeliverFee({
      type: cur.deliverFeeType,
      deliverFee: cur.deliveryFee,
      totalPrice: curTotalPrice,
      minOrderPrice: cur.minOrderPrice,
    });

    if (index === -1) {
      acc.push({
        index: idx,
        storeId: cur.storeId,
        storeImage: cur.storeImage,
        storeName: cur.storeName,
        data: [cur],
        deliverFee: curDeliverFee,
      });
      idx++;
    } else {
      acc[index].deliverFee = Math.max(acc[index].deliverFee, curDeliverFee);
      acc[index].data.push(cur);
    }
    return acc;
  }, []);
  return result;
};

/** 동일 상품 옵션 합치기 (배송비 계산용) - 주문하기 */
export const mergeOptionState = (value: OptionState[]): OptionState[] => {
  const result = value.reduce<OptionState[]>((acc, cur) => {
    const productId = cur.productId;
    const index = acc.findIndex(v => v.productId === productId);

    if (index === -1) acc.push({ ...cur });
    else acc[index].amount = cur.amount + acc[index].amount;

    return acc;
  }, []);
  return result;
};

/** 동일 상품 옵션 합치기 (배송비 계산용) - 장바구니 */
export const mergeBasketProduct = (value: BasketProductDto[]): BasketProductDto[] => {
  const result = value.reduce<BasketProductDto[]>((acc, cur) => {
    const productId = cur.product?.id;
    const index = acc.findIndex(v => v.product?.id === productId);

    if (index === -1) acc.push({ ...cur });
    else acc[index].amount = (cur.amount ?? 0) + (acc[index].amount ?? 0);

    return acc;
  }, []);
  return result;
};

/** 대괄호 씌워주기 */
export const setSquareBrackets = (value: Nullish<string>) => {
  if (value) return '[' + value + ']';
  else return '';
};

/** 배송 날짜 세팅 */
export const setDeliverDate = (expectedDeliverDay: number) => {
  let value = addDays(new Date(), expectedDeliverDay);

  // 12시 이후면 +1일
  if (value.getHours() >= 12) value = addDays(value, 1);
  // 일요일이면 +1일
  if (isSunday(value)) value = addDays(value, 1);

  return formatToUtc(value, 'M/d');
};
