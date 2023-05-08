/** 유효성검사 생성 함수 타입 */
type MakePasswordRegExpType = {
  /** 대문자 필수 여부 */
  requireUppercase?: boolean;
  /** 소문자 필수 여부 */
  requireLowercase?: boolean;
  /** 숫자 필수 여부 */
  requireNumber?: boolean;
  /** 특수문자 필수 여부 */
  requireSpecialCharacter?: boolean;
  /** 허용할 특수문자 집합, 없으면 기본값 "!@#$%^&*()_+\-=~" */
  specialCharacterSet?: string;
  /** 최대 문자 길이, minLength가 없으면 무시됨 */
  minLength?: number;
  /** 최대 문자 길이, minLength가 없으면 무시됨 */
  maxLength?: number;
};

export const makePasswordRegExp = (rule: MakePasswordRegExpType) => {
  if (!rule.minLength && rule.maxLength) rule.maxLength = undefined;
  const specialCharSet = rule.specialCharacterSet
    ? '[' + rule.specialCharacterSet + ']'
    : '[!@#$%^&*()_+\\-=~]';
  const requireUppercase = rule.requireUppercase ? '(?=.*[A-Z])' : '';
  const requireLowercase = rule.requireLowercase ? '(?=.*[a-z])' : '';
  const requireNumber = rule.requireNumber ? '(?=.*[0-9])' : '';
  const requireSpecialCharacter = rule.requireSpecialCharacter
    ? '(?=.*' + specialCharSet + ')'
    : '';
  const lengthRestrict =
    !rule.minLength && !rule.maxLength
      ? '*'
      : '{' + (rule.minLength ?? '') + ',' + (rule.maxLength ?? '') + '}';
  return new RegExp(
    '^' +
      requireUppercase +
      requireLowercase +
      requireNumber +
      requireSpecialCharacter +
      '.' +
      lengthRestrict +
      '$',
  );
};

export const REG_EXP = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  phone: /^(?:\+?82-?|0)(1(?:0|1|[6-9]))[.-]?(\d{3,4})[.-]?(\d{4})$/,
  tel: /^((?<a>01[016789]{1}|02|0[3-8]{1}[0-9]{1})[.-]?(?<b>[0-9]{3,4})|(?<c>(15|16|18)[0-9]{2}))[.-]?(?<d>[0-9]{4})$/,
  url: /^https?:\/\/[-\w.]+(:\d+)?(\/([\w/_.]*(\?\S+)?)?)?/,
  registrationNumber: /^(\d{3})-?(\d{2})-?(\d{5})$/,
  password: makePasswordRegExp({
    minLength: 8,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialCharacter: true,
    requireUppercase: false,
  }),
};
