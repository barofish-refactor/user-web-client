import { setCookie } from 'cookies-next';
import { lightFormat } from 'date-fns';
import { type Jwt } from 'src/api/swagger/data-contracts';
import { VARIABLES } from 'src/variables';
import { REG_EXP } from './regex';

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
