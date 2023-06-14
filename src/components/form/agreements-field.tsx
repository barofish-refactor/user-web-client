import clsx from 'clsx';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { errorMessageClassName } from 'src/components/form';
import { Checkbox, ExternalLink } from 'src/components/ui';

const linkClassName =
  'text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-70 underline underline-offset-2';

export type AgreementsFormType = {
  privacyPolicy: boolean;
  termsOfService: boolean;
  marketingPolicy: boolean;
};

export function AgreementsField() {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const { control, setValue, getValues } = useFormContext<AgreementsFormType>();

  return (
    <div className='pb-8'>
      <div className='flex items-center gap-1'>
        <Checkbox
          id='all'
          checked={isAllChecked}
          onCheckedChange={checked => {
            if (typeof checked !== 'boolean') return;
            setIsAllChecked(checked);
            setValue('privacyPolicy', checked);
            setValue('termsOfService', checked);
            setValue('marketingPolicy', checked);
          }}
        />
        <label
          htmlFor='all'
          className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-grey-20'
        >
          전체 약관동의
        </label>
      </div>
      <hr className='my-4 border-[#f2f2f2]' />
      <div className='space-y-3'>
        <Controller
          control={control}
          name='privacyPolicy'
          rules={{ required: true }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className='flex items-center gap-1'>
              <Checkbox
                id='1'
                checked={value}
                onCheckedChange={checked => {
                  onChange(checked);
                  const { termsOfService, marketingPolicy } = getValues();
                  if (checked && termsOfService) {
                    setIsAllChecked(marketingPolicy);
                  } else {
                    setIsAllChecked(false);
                  }
                }}
              />
              <div className='flex flex-1 items-center justify-between'>
                <div className='flex items-center'>
                  <label
                    htmlFor='1'
                    className='required text-[14px] leading-[22px] -tracking-[0.03em] text-grey-20'
                  >
                    [필수] 개인정보처리방침
                  </label>
                  {error && (
                    <span className={clsx(errorMessageClassName, 'mb-1 [&]:m-0')}>
                      약관에 동의하세요
                    </span>
                  )}
                </div>
                <ExternalLink href='/privacy' className={linkClassName}>
                  보기
                </ExternalLink>
              </div>
            </div>
          )}
        />
        <Controller
          control={control}
          name='termsOfService'
          rules={{ required: true }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className='flex items-center gap-1'>
              <Checkbox
                id='2'
                checked={value}
                onCheckedChange={checked => {
                  onChange(checked);
                  const { privacyPolicy, marketingPolicy } = getValues();
                  if (checked && privacyPolicy) {
                    setIsAllChecked(marketingPolicy);
                  } else {
                    setIsAllChecked(false);
                  }
                }}
              />
              <div className='flex flex-1 items-center justify-between'>
                <div className='flex items-center'>
                  <label
                    htmlFor='2'
                    className='required text-[14px] leading-[22px] -tracking-[0.03em] text-grey-20'
                  >
                    [필수] 이용약관
                  </label>
                  {error && (
                    <span className={clsx(errorMessageClassName, 'mb-1 [&]:m-0')}>
                      약관에 동의하세요
                    </span>
                  )}
                </div>
                <ExternalLink href='/terms-of-service' className={linkClassName}>
                  보기
                </ExternalLink>
              </div>
            </div>
          )}
        />
        <Controller
          control={control}
          name='marketingPolicy'
          render={({ field: { value, onChange } }) => (
            <div className='flex items-center gap-1'>
              <Checkbox
                id='3'
                checked={value}
                onCheckedChange={checked => {
                  onChange(checked);
                  const { privacyPolicy, termsOfService } = getValues();
                  setIsAllChecked(checked && privacyPolicy && termsOfService);
                }}
              />
              <div className='flex flex-1 items-center justify-between'>
                <label
                  htmlFor='3'
                  className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-20'
                >
                  [선택] 마케팅 수신 동의
                </label>
                <ExternalLink href='/marketing' className={linkClassName}>
                  보기
                </ExternalLink>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
