import clsx from 'clsx';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { errorMessageClassName, inputClassName, labelClassName } from 'src/components/form';
import { DaumPostcode } from 'src/components/ui';
import cm from 'src/utils/class-merge';

export type AddressFormType = {
  postalCode: string;
  address: string;
  addressDetail: string;
  bcode: string;
};

interface Props {
  className?: string;
}

export function AddressField({ className }: Props) {
  const combineInputClassName = clsx(
    inputClassName,
    'flex-1 read-only:border-grey-80 read-only:bg-grey-90',
  );

  const { register, formState, setValue, clearErrors } = useFormContext<AddressFormType>();
  const [openDaum, setOpenDaum] = useState(false);

  const addressError = formState.errors['address'];
  const addressDetailError = formState.errors['addressDetail'];

  return (
    <div>
      <label htmlFor='btn' className={cm(labelClassName, className)}>
        주소
      </label>
      <div className='space-y-1.5'>
        <div className='flex gap-2'>
          <input
            {...register('postalCode', { required: true })}
            readOnly
            className={combineInputClassName}
          />
          <button
            id='btn'
            type='button'
            data-invalid={!!addressError}
            className='h-11 w-[77px] rounded-lg border border-primary-50 text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-primary-50 data-[invalid=true]:border-error data-[invalid=true]:text-error'
            onClick={() => setOpenDaum(true)}
          >
            주소 찾기
          </button>
          <DaumPostcode
            open={openDaum}
            onOpenChange={setOpenDaum}
            onComplete={value => {
              setValue('postalCode', value.zonecode);
              setValue('address', value.address);
              setValue('bcode', value.bcode);
              clearErrors(['postalCode', 'address']);
            }}
          />
        </div>
        <div>
          <input
            {...register('address', { required: true })}
            readOnly
            className={combineInputClassName}
            spellCheck={false}
          />
        </div>
        <div>
          <input
            {...register('addressDetail', {
              required: { value: true, message: '상세주소를 입력해 주세요' },
            })}
            className={inputClassName}
            data-invalid={!!addressDetailError}
            spellCheck={false}
            placeholder='상세주소를 입력해 주세요'
          />
          {addressDetailError && (
            <small className={errorMessageClassName}>{addressDetailError.message}</small>
          )}
        </div>
      </div>
    </div>
  );
}
