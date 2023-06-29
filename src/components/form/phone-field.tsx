import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { intervalToDuration } from 'date-fns';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { client } from 'src/api/client';
import { type RequestCodeReq, type VerifyCodeReq } from 'src/api/swagger/data-contracts';
import { errorMessageClassName, inputClassName, labelClassName } from 'src/components/form';
import { useAlertStore } from 'src/store';
import { REG_EXP } from 'src/utils/regex';
import useRafInterval from 'src/utils/use-raf-interval';

export type PhoneFormType = {
  phone: string;
  verificationCode: string;
  verificationId: number;
};

const INITIAL_TIMER = 180;
const PHONE_KEY: Extract<keyof PhoneFormType, 'phone'> = 'phone';
const VERIFICATION_CODE_KEY: Extract<keyof PhoneFormType, 'verificationCode'> = 'verificationCode';

export function PhoneField() {
  const { formState, control, trigger, clearErrors, getValues, setValue, watch } =
    useFormContext<PhoneFormType>();
  const { setAlert } = useAlertStore();

  const { mutateAsync: requestCodeVerification, isLoading: requestCodeVerificationLoading } =
    useMutation((args: RequestCodeReq) => client().requestCodeVerification(args));
  const { mutateAsync: verifyCode, isLoading: verifyCodeLoading } = useMutation(
    (args: VerifyCodeReq) => client().verifyCode(args),
  );

  const verificationId = watch('verificationId');
  const phoneError = formState.errors[PHONE_KEY];
  const verificationCodeError = formState.errors[VERIFICATION_CODE_KEY];
  const [timer, setTimer] = useState(0);

  const duration = intervalToDuration({ start: 0, end: timer * 1000 });

  const clearValidation = () => {
    clearErrors(PHONE_KEY);
    clearErrors(VERIFICATION_CODE_KEY);
  };

  const onSendCode = async () => {
    if (requestCodeVerificationLoading) return;
    await trigger(PHONE_KEY).then(async isValid => {
      if (!isValid) return;

      setAlert({ message: '인증번호를 전송했습니다.' });

      await requestCodeVerification({ target: getValues(PHONE_KEY) })
        .then(res => {
          if (res.data.isSuccess) {
            setTimer(INITIAL_TIMER);
            setValue('verificationId', 0); // 재인증시 초기화
            clearValidation();
          } else {
            // setTimer(INITIAL_TIMER); // Toast 연동시 제거
            // setValue('verificationId', 0); // Toast 연동시 제거
            // clearValidation(); // Toast 연동시 제거
            setAlert({
              message: res.data.errorMsg ?? '',
              onClick: () => {
                //
              },
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  const onVerifyPhone = () => {
    if (verifyCodeLoading) return;
    trigger(PHONE_KEY).then(isValid => {
      if (!isValid) return;
      trigger(VERIFICATION_CODE_KEY).then(isVerificationCodeValid => {
        if (!isVerificationCodeValid) return;
        verifyCode({
          target: getValues(PHONE_KEY),
          verificationNumber: getValues(VERIFICATION_CODE_KEY),
        })
          .then(res => {
            if (res.data.isSuccess) {
              setValue('verificationId', res.data.data ?? 0);
              setTimer(0);
              setAlert({
                message: '인증이 완료되었습니다.',
                onClick: () => {
                  //
                },
                type: 'success',
              });
              clearValidation();
            } else {
              setAlert({
                message: res.data.errorMsg ?? '',
                onClick: () => {
                  //
                },
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    });
  };

  useRafInterval(
    () => {
      if (timer <= 0) return;
      setTimer(p => Math.max(p - 1, 0));
    },
    1000,
    timer <= 0,
  );

  return (
    <div>
      <label htmlFor={PHONE_KEY} className={labelClassName}>
        휴대폰 번호
      </label>
      <div className='space-y-1.5'>
        <div>
          <div className='relative'>
            <Controller
              control={control}
              name='phone'
              rules={{
                required: { value: true, message: '휴대폰 번호를 입력해 주세요' },
                pattern: {
                  value: REG_EXP.phone,
                  message: '올바른 휴대폰 번호를 입력해 주세요.',
                },
              }}
              render={({ field: { ref, ...props } }) => {
                return (
                  <PatternFormat
                    {...props}
                    id={PHONE_KEY}
                    format='###-####-####'
                    placeholder='휴대폰 번호를 입력해 주세요'
                    inputMode='numeric'
                    readOnly={!!verificationId}
                    spellCheck={false}
                    data-invalid={!!phoneError}
                    className={clsx(inputClassName, '[&]:pr-10')}
                    getInputRef={ref}
                  />
                );
              }}
            />
            <button
              tabIndex={-1}
              type='button'
              className='absolute right-3 top-1/2 -translate-y-1/2 text-[14px] leading-[22px] -tracking-[0.03em] text-primary-50'
              onClick={onSendCode}
            >
              인증
            </button>
          </div>
          {phoneError && <small className={errorMessageClassName}>{phoneError.message}</small>}
        </div>
        <div>
          <div className='relative'>
            <Controller
              control={control}
              name='verificationCode'
              rules={{
                required: { value: true, message: '인증번호를 입력해 주세요' },
                minLength: { value: 6, message: '올바른 인증번호를 입력해 주세요.' },
              }}
              render={({ field: { ref, ...props } }) => (
                <NumericFormat
                  {...props}
                  placeholder='인증번호를 입력해 주세요'
                  maxLength={6}
                  readOnly={!!verificationId}
                  inputMode='numeric'
                  spellCheck={false}
                  data-invalid={!!verificationCodeError}
                  className={clsx(inputClassName, '[&]:pr-20')}
                  getInputRef={ref}
                />
              )}
            />
            <div className='absolute right-3 top-1/2 flex -translate-y-1/2 gap-1.5 text-[14px] leading-[22px] -tracking-[0.03em] text-primary-50'>
              {!!timer && (
                <span>
                  {duration.minutes}:{String(duration.seconds).padStart(2, '0')}
                </span>
              )}
              <button tabIndex={-1} type='button' onClick={onVerifyPhone}>
                확인
              </button>
            </div>
          </div>
          {verificationCodeError && (
            <small className={errorMessageClassName}>{verificationCodeError.message}</small>
          )}
          {!!verificationId && (
            <small className={clsx(errorMessageClassName, '[&]:text-primary-50')}>
              인증이 완료되었습니다.
            </small>
          )}
        </div>
      </div>
    </div>
  );
}
