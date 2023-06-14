import { Controller, useForm } from 'react-hook-form';
import { NumberFormatBase, PatternFormat } from 'react-number-format';
import Layout from 'src/components/common/layout';
import { inputClassName, labelClassName, submitButtonClassName } from 'src/components/form';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';

/* 
  TODO Int 필요
*/

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
  cardNumber: string;
  cardExpiration: string;
  cardPassword: string;
  birth: string;
};

const MypagePayMethodCreate: NextPageWithLayout = () => {
  const { control } = useForm<FormType>({ mode: 'onBlur' });

  return (
    <form className='flex flex-1 flex-col justify-between p-4 py-6'>
      <div className='space-y-4'>
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
