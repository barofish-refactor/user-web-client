import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { NumberFormatBase, PatternFormat } from 'react-number-format';
import { client } from 'src/api/client';
import { type AddPaymentMethodPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import Layout from 'src/components/common/layout';
import { inputClassName, labelClassName, submitButtonClassName } from 'src/components/form';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob } from 'src/utils/functions';
import { REG_EXP } from 'src/utils/regex';

function formatShortBirth(value: string) {
  if (!value) return '';

  const year = value.substring(0, 2);
  let month = value.substring(2, 4);
  let day = value.substring(4, 6);

  if (month.length === 1 && Number(month[0]) > 1) {
    month = `0${month[0]}`;
  } else if (month.length === 2) {
    if (Number(month) === 0) {
      month = `01`;
    } else if (Number(month) > 12) {
      month = '12';
    }
  }

  if (day.length === 1 && Number(day[0]) > 3) {
    day = `0${day[0]}`;
  } else if (day.length === 2) {
    if (Number(day) === 0) {
      day = `01`;
    } else if (Number(day) > 31) {
      day = '31';
    }
  }

  return `${year}${month}${day}`;
}

function formatCardExpiration(value: string) {
  if (!value) return '';
  let month = value.substring(0, 2);
  const year = value.substring(2, 4);

  if (month.length === 1 && Number(month[0]) > 1) {
    month = `0${month[0]}`;
  } else if (month.length === 2) {
    if (Number(month) === 0) {
      month = `01`;
    } else if (Number(month) > 12) {
      month = '12';
    }
  }

  return `${month}/${year}`;
}

type FormType = {
  name: string;
  cardNumber: string;
  cardExpiration: string;
  cardPassword: string;
  birth: string;
};

const MypagePayMethodCreate: NextPageWithLayout = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const queryClient = useQueryClient();
  const { control, handleSubmit, register } = useForm<FormType>({ mode: 'onBlur' });

  const { mutateAsync: addPaymentMethod, isLoading } = useMutation(
    (args: AddPaymentMethodPayload) =>
      client().addPaymentMethod(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: AddPaymentMethodPayload) => {
    if (isLoading) return;
    addPaymentMethod({ data: formatToBlob<AddPaymentMethodPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          queryClient.invalidateQueries(queryKey.paymentMethod);
          setAlert({
            message: '결제 정보가 저장되었습니다.',
            type: 'success',
            onClick: () => router.back(),
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const onSubmit = handleSubmit(data => {
    if (data.name.trim().length === 0) return setAlert({ message: '카드별칭을 입력해주세요.' });
    if (!REG_EXP.cardNo.test(data.cardNumber))
      return setAlert({ message: '잘못된 카드번호입니다.' });
    if (!REG_EXP.expiryAt.test(data.cardExpiration))
      return setAlert({ message: '잘못된 유효기간입니다.' });
    if (!REG_EXP.birth.test(data.birth)) return setAlert({ message: '잘못된 생년월일입니다.' });
    if (!REG_EXP.cardPassword.test(data.cardPassword))
      return setAlert({ message: '잘못된 비밀번호입니다.' });

    onMutate({
      data: {
        name: data.name,
        cardNo: data.cardNumber,
        expiryAt: data.cardExpiration,
        birth: data.birth,
        passwordTwoDigit: data.cardPassword,
      },
    });
  });

  return (
    <form className='flex flex-1 flex-col justify-between p-4 py-6' onSubmit={onSubmit}>
      <div className='space-y-4'>
        <div>
          <label htmlFor='0' className={labelClassName}>
            카드별칭
          </label>
          <input
            {...register('name', { required: true })}
            maxLength={20}
            placeholder='카드별칭을 입력해주세요'
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor='1' className={labelClassName}>
            카드번호
          </label>
          <Controller
            control={control}
            name='cardNumber'
            render={({ field: { ref, ...props } }) => (
              <PatternFormat
                {...props}
                id='1'
                format='####-####-####-####'
                placeholder='0000-0000-0000-0000'
                inputMode='numeric'
                getInputRef={ref}
                className={inputClassName}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor='2' className={labelClassName}>
            유효기간
          </label>
          <Controller
            control={control}
            name='cardExpiration'
            render={({ field: { ref, ...props } }) => (
              <NumberFormatBase
                {...props}
                id='2'
                placeholder='MM/YY'
                inputMode='numeric'
                getInputRef={ref}
                className={inputClassName}
                format={formatCardExpiration}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor='3' className={labelClassName}>
            생년월일
          </label>
          <Controller
            control={control}
            name='birth'
            render={({ field: { ref, ...props } }) => (
              <NumberFormatBase
                {...props}
                id='3'
                className={inputClassName}
                spellCheck={false}
                placeholder='YYMMDD'
                inputMode='numeric'
                getInputRef={ref}
                format={formatShortBirth}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor='4' className={labelClassName}>
            비밀번호
          </label>
          <Controller
            control={control}
            name='cardPassword'
            render={({ field: { ref, ...props } }) => (
              <PatternFormat
                {...props}
                format='##'
                id='4'
                type='password'
                className={inputClassName}
                spellCheck={false}
                placeholder='앞 두자리 입력'
                inputMode='numeric'
                getInputRef={ref}
              />
            )}
          />
        </div>
      </div>
      <button type='submit' className={submitButtonClassName}>
        등록하기
      </button>
    </form>
  );
};

MypagePayMethodCreate.getLayout = page => (
  <Layout className='flex flex-col' footerProps={{ disable: true }} headerProps={{ disable: true }}>
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>카드 등록</h2>
        <div className='h-6 w-6' />
      </header>
      {page}
    </div>
  </Layout>
);

export default MypagePayMethodCreate;
