import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { client } from 'src/api/client';
import { type JoinAppleSnsPayload, type JoinUserPayload } from 'src/api/swagger/data-contracts';
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

export function SignupForm({
  appleId,
  name,
}: {
  appleId?: string | string[];
  name?: string | string[];
}) {
  const router = useRouter();
  const form = useForm<FormType>();
  const { handleSubmit, getValues, setError, setFocus, setValue } = form;
  const [profile, setProfile] = useState(myProfileDefaultValue);
  const { setAlert } = useAlertStore();

  const { mutateAsync: joinUser, isLoading } = useMutation(
    async (args: JoinUserPayload) => await (await client()).joinUser(args),
  );

  const { mutateAsync: joinAppleSns, isLoading: isAppleLoading } = useMutation(
    async (args: JoinAppleSnsPayload) => await (await client()).joinAppleSns(args),
  );

  const onSubmit = handleSubmit(data => {
    if (isLoading || isAppleLoading) return;

    if (!data.verificationId) {
      setError('verificationCode', { message: '휴대폰 인증을 진행해 주세요.' });
      setFocus('verificationCode');
      return;
    }

    // 애플 아이디로 처음로그인 시 회원가입 정보를 받아옴
    if (appleId) {
      joinAppleSns({
        data: formatToBlob<JoinAppleSnsPayload['data']>(
          {
            loginId: String(appleId),
            address: data.address,
            addressDetail: data.addressDetail,
            isAgreeMarketing: data.marketingPolicy,
            nickname: data.nickname,
            name: data.name,
            phone: data.phone,
            verificationId: data.verificationId,
            postalCode: data.postalCode,
            bcode: data.bcode,
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
    }
    // 아이디, 패스워드 회원가입
    else {
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
            bcode: data.bcode,
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
          setAlert({ message: error.response.data.errorMsg ?? '' });
        });
    }
  });

  useEffect(() => {
    if (name) setValue('name', String(name));
  }, [name, setValue]);

  return (
    <FormProvider {...form}>
      <form autoComplete='new-password' className='pb-6' onSubmit={onSubmit}>
        <div className='flex justify-center pt-6'>
          <MyProfile value={profile} onChange={setProfile} />
        </div>
        <div className='space-y-6 px-4 py-6'>
          {!appleId && (
            <FormField
              fieldKey='email'
              label='이메일'
              placeholder='이메일을 입력해 주세요'
              options={{ required: { value: !appleId, message: '이메일을 입력해 주세요' } }}
              className='required'
            />
          )}
          <FormField
            label='이름'
            fieldKey='name'
            placeholder='이름을 입력해 주세요'
            options={{ required: { value: true, message: '이름을 입력해 주세요' } }}
            className='required'
          />
          <FormField
            fieldKey='nickname'
            label='닉네임'
            placeholder='닉네임을 입력해 주세요'
            options={{ required: { value: true, message: '닉네임을 입력해 주세요' } }}
            className='required'
          />
          {!appleId && (
            <Fragment>
              <PasswordField
                label='비밀번호'
                fieldKey='password'
                placeholder='영문,숫자,특수문자 8자리 이상'
                className='required'
                options={{
                  required: {
                    value: !appleId,
                    message: '비밀번호를 입력해 주세요 (영문,숫자,특수문자 8자리 이상)',
                  },
                }}
              />
              <PasswordField
                label='비밀번호 확인'
                fieldKey='passwordCheck'
                placeholder='비밀번호를 한번 더 입력해 주세요'
                className='required'
                options={{
                  required: { value: !appleId, message: '비밀번호를 한번 더 입력해 주세요' },
                  validate: v => v === getValues('password') || '동일한 비밀번호를 입력하세요.',
                }}
              />
            </Fragment>
          )}
          <PhoneField className='required' />
          <AddressField className='required' />
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
