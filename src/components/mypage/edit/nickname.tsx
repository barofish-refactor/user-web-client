import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { type UpdateUserPayload } from 'src/api/swagger/data-contracts';
import { FormField, submitButtonClassName } from 'src/components/form';
import { mypageEditFormClassName } from 'src/components/mypage/edit';

interface Props {
  currentNickname: string;
  onMutate: (value: UpdateUserPayload) => void;
}

type FormType = {
  currentNickname: string;
  newNickname: string;
};

export function MypageEditNickname({ currentNickname, onMutate }: Props) {
  const form = useForm<FormType>();
  const { handleSubmit, setValue } = form;

  const onSubmit = handleSubmit(data => {
    onMutate({ data: { nickname: data.newNickname } });
  });

  useEffect(() => {
    setValue('currentNickname', currentNickname);
  }, [currentNickname, setValue]);

  return (
    <FormProvider {...form}>
      <form className={mypageEditFormClassName} onSubmit={onSubmit}>
        <div className='space-y-6'>
          <FormField label='현재 닉네임' fieldKey='currentNickname' options={{ disabled: true }} />
          <FormField
            label='변경할 닉네임'
            fieldKey='newNickname'
            placeholder='닉네임을 입력해 주세요'
            options={{ required: { value: true, message: '닉네임을 입력해 주세요' } }}
          />
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
