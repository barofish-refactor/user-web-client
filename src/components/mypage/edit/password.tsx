import { FormProvider, useForm } from 'react-hook-form';
import { type UpdateUserPayload } from 'src/api/swagger/data-contracts';
import { PasswordField, submitButtonClassName } from 'src/components/form';
import { mypageEditFormClassName } from 'src/components/mypage/edit';

interface Props {
  onMutate: (value: UpdateUserPayload) => void;
}

type FormType = {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
};

export function MypageEditPassword({ onMutate }: Props) {
  const form = useForm<FormType>();
  const { handleSubmit, setError } = form;

  const onSubmit = handleSubmit(data => {
    if (data.newPassword !== data.newPasswordCheck) {
      setError('newPasswordCheck', { message: '비밀번호를 확인해 주세요.' });
      return;
    }
    onMutate({ data: { oldPassword: data.currentPassword, newPassword: data.newPassword } });
  });

  return (
    <FormProvider {...form}>
      <form className={mypageEditFormClassName} onSubmit={onSubmit}>
        <div className='space-y-6'>
          <PasswordField
            fieldKey='currentPassword'
            label='변경 전 비밀번호'
            placeholder='현재 비밀번호'
            options={{ required: { value: true, message: '현재 비밀번호를 입력해 주세요' } }}
          />
          <div className='space-y-1'>
            <PasswordField
              fieldKey='newPassword'
              label='변경할 비밀번호'
              placeholder='영문,숫자,특수문자 8자리 이상'
              options={{
                required: {
                  value: true,
                  message: '새 비밀번호를 입력해 주세요 (영문,숫자,특수문자 8자리 이상)',
                },
              }}
            />
            <PasswordField
              fieldKey='newPasswordCheck'
              placeholder='새 비밀번호 확인'
              options={{ required: { value: true, message: '새 비밀번호 확인을 입력해 주세요' } }}
            />
          </div>
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
