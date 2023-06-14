export * from './address-field';
export * from './agreements-field';
export * from './my-profile';
export * from './password-field';
export * from './phone-field';
export * from './field';

export const labelClassName =
  'mb-1.5 inline-flex text-[14px] leading-[22px] -tracking-[0.03em] text-grey-50';
export const errorMessageClassName =
  'mt-1 inline-flex text-[12px] leading-[18px] -tracking-[0.03em] text-error font-medium';
export const inputClassName =
  'h-11 w-full rounded-lg border border-grey-60 bg-white px-3 text-[14px] leading-[22px] -tracking-[0.03em] text-grey-20 placeholder:text-grey-60 data-[invalid=true]:border-error [&:not([data-invalid=true])]:focus:border-primary-50 disabled:bg-grey-90 disabled:text-grey-20';
export const eyeButtonClassName =
  'absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform bg-[url(/assets/icons/sign/eye-off.svg)] bg-cover data-[visible=true]:bg-[url(/assets/icons/sign/eye.svg)]';
export const submitButtonClassName =
  'h-[52px] flex items-center justify-center w-full rounded-lg bg-primary-50 font-bold leading-[24px] -tracking-[0.03em] text-white disabled:bg-grey-80';
