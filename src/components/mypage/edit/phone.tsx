import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { type UpdateUserPayload } from 'src/api/swagger/data-contracts';
import {
  FormField,
  type PhoneFormType,
  submitButtonClassName,
  PhoneField,
} from 'src/components/form';
import { mypageEditFormClassName } from 'src/components/mypage/edit';
import { formatToPhone } from 'src/utils/functions';

interface Props {
  currentPhone: string;
  onMutate: (value: UpdateUserPayload) => void;
}

interface FormType extends PhoneFormType {
  currentPhone: string;
}

export function MypageEditPhone({ currentPhone, onMutate }: Props) {
  const form = useForm<FormType>();
  const { handleSubmit, setValue, setError, setFocus } = form;

  const onSubmit = handleSubmit(data => {
    if (!data.verificationId) {
      setError('verificationCode', { message: '휴대폰 인증을 진행해 주세요.' });
      setFocus('verificationCode');
      return;
    }
    onMutate({ data: { phone: data.phone, verificationId: data.verificationId } });
  });

  useEffect(() => {
    setValue('currentPhone', formatToPhone(currentPhone));
  }, [currentPhone, setValue]);

  return (
    <FormProvider {...form}>
      <form className={mypageEditFormClassName} onSubmit={onSubmit}>
        <div className='space-y-6'>
          <FormField
            label='현재 휴대폰 번호'
            options={{ disabled: true }}
            fieldKey='currentPhone'
          />
          <PhoneField />
        </div>
        <div>
          <button type='submit' className={submitButtonClassName}>
            변경하기
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
