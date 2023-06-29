import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { client } from 'src/api/client';
import { type JoinUserPayload } from 'src/api/swagger/data-contracts';
import {
  AddressField,
  AgreementsField,
  FormField,
  MyProfile,
  PasswordField,
  PhoneField,
  myProfileDefaultValue,
  submitButtonClassName,
  type AddressFormType,
  type AgreementsFormType,
  type PhoneFormType,
} from 'src/components/form';
import { useAlertStore } from 'src/store';
import { formatToBlob } from 'src/utils/functions';

interface FormType extends PhoneFormType, AddressFormType, AgreementsFormType {
  email: string;
  name: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

export function SignupForm() {
  const router = useRouter();
  // const { onCertification } = useIamport();
  const form = useForm<FormType>();
  const { handleSubmit, getValues, setError, setFocus } = form;
  const [profile, setProfile] = useState(myProfileDefaultValue);
  const { mutateAsync: joinUser, isLoading } = useMutation((args: JoinUserPayload) =>
    client().joinUser(args),
  );
  const { setAlert } = useAlertStore();

  const onSubmit = handleSubmit(data => {
    if (isLoading) return;

    if (!data.verificationId) {
      setError('verificationCode', { message: '휴대폰 인증을 진행해 주세요.' });
      setFocus('verificationCode');
      return;
    }
    // if (!profile.file) {
    //   setAlert({ message: '프로필 사진을 등록해주세요.' });
    //   return;
    // }

    joinUser({
      data: formatToBlob<JoinUserPayload['data']>(
        {
          address: data.address,
          addressDetail: data.addressDetail,
          email: data.email,
          isAgreeMarketing: data.marketingPolicy,
          nickname: data.nickname,
          name: data.name,
          password: data.password,
          phone: data.phone,
          verificationId: data.verificationId,
          postalCode: data.postalCode,
        },
        true,
      ),
      profileImage: profile.file ?? undefined,
    })
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({
            message: '회원가입이 완료되었습니다.',
            onClick: () => {
              router.push('/login');
            },
            type: 'success',
          });
        } else {
          setAlert({ message: res.data.errorMsg ?? '' });
        }
      })
      .catch(error => {
        console.error(error);
      });
  });

  // useEffect(() => {
  //   const imp_uid = router.query.imp_uid;

  //   if (!imp_uid) return;
  //   client().verification({ impUid: imp_uid }})
  // }, [router]);

  return (
    <FormProvider {...form}>
      <form autoComplete='new-password' className='pb-6' onSubmit={onSubmit}>
        <div className='flex justify-center pt-6'>
          <MyProfile value={profile} onChange={setProfile} />
        </div>
        <div className='space-y-6 px-4 py-6'>
          <FormField
            fieldKey='email'
            label='이메일'
            placeholder='이메일을 입력해 주세요'
            options={{ required: { value: true, message: '이메일을 입력해 주세요' } }}
          />
          <FormField
            label='이름'
            fieldKey='name'
            placeholder='이름을 입력해 주세요'
            options={{ required: { value: true, message: '이름을 입력해 주세요' } }}
          />
          <FormField
            fieldKey='nickname'
            label='닉네임'
            placeholder='닉네임을 입력해 주세요'
            options={{ required: { value: true, message: '닉네임을 입력해 주세요' } }}
          />
          <PasswordField
            label='비밀번호'
            fieldKey='password'
            placeholder='영문,숫자,특수문자 8자리 이상'
            options={{
              required: {
                value: true,
                message: '비밀번호를 입력해 주세요 (영문,숫자,특수문자 8자리 이상)',
              },
            }}
          />
          <PasswordField
            label='비밀번호 확인'
            fieldKey='passwordCheck'
            placeholder='비밀번호를 한번 더 입력해 주세요'
            options={{
              required: { value: true, message: '비밀번호를 한번 더 입력해 주세요' },
              validate: v => v === getValues('password') || '동일한 비밀번호를 입력하세요.',
            }}
          />
          {/* 본인인증시 필요 */}
          {/* <div>
            <label className={labelClassName}>본인 인증</label>
            <button
              type='button'
              className='h-11 w-full rounded-lg border border-primary-50 text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-primary-50 data-[invalid=true]:border-error data-[invalid=true]:text-error'
              onClick={onCertification}
            >
              본인 인증
            </button>
          </div> */}
          <PhoneField />
          <AddressField />
        </div>
        <hr className='border-t-8 border-[#f2f2f2]' />
        <div className='p-4'>
          <AgreementsField />
          <button className={submitButtonClassName} type='submit'>
            완료
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
