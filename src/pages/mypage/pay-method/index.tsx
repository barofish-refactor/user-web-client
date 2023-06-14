import Image from 'next/image';
import Link from 'next/link';
import Layout from 'src/components/common/layout';
import { submitButtonClassName } from 'src/components/form';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';
import { maskingCardNumber } from 'src/utils/functions';

/* 
  TODO Int 필요
*/

const dummyPayMethods = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  name: '신한카드',
  number: '1234-1234-1234-1234',
}));

const MypagePayMethod: NextPageWithLayout = () => {
  const isEmpty = false;

  if (isEmpty) return <Empty />;

  return (
    <article className='flex-1'>
      <ul>
        {dummyPayMethods.map(v => (
          <li
            key={v.id}
            className='flex items-center justify-between border-b border-b-[#f2f2f2] p-4'
          >
            <div className='font-medium leading-[24px] -tracking-[0.03em]'>
              <h3 className='mb-1.5 text-grey-20'>{v.name}</h3>
              <span className='text-grey-50'>{maskingCardNumber(v.number)}</span>
            </div>
            <button className='h-[32px] w-[55px] rounded-sm border border-[#e2e2e2] text-[13px] leading-[20px] -tracking-[0.03em] text-grey-30'>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
};

function Empty() {
  return (
    <div className='grid flex-1 place-items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image src='/assets/icons/search/search-error.svg' alt='Empty' width={40} height={40} />
        <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
          {`둥록된 결제수단이 없습니다.\n결제수단을 추가해주세요.`}
        </p>
      </div>
    </div>
  );
}

MypagePayMethod.getLayout = page => (
  <Layout className='flex flex-col' headerProps={{ disable: true }} footerProps={{ disable: true }}>
    <div className='flex flex-1 flex-col pb-6'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          결제수단 관리
        </h2>
        <div className='h-6 w-6' />
      </header>
      {page}
      <footer className='sticky bottom-0 w-full px-4'>
        <Link href='/mypage/pay-method/create' className={submitButtonClassName}>
          추가하기
        </Link>
      </footer>
    </div>
  </Layout>
);

export default MypagePayMethod;
