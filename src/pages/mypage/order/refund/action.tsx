import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';
import Image from 'next/image';
import Link from 'next/link';
import { formatToLocaleString } from 'src/utils/functions';
import { inputClassName, submitButtonClassName } from 'src/components/form';
import { Selector } from 'src/components/common';
import clsx from 'clsx';

/* 
  TODO Int 필요
*/

/** 마이페이지/주문 내역/주문 취소 */
const MypageOrderRefundAction: NextPageWithLayout = () => {
  return (
    <section className='flex flex-1 flex-col pb-6'>
      <div className='flex items-center gap-2.5 bg-grey-90 p-4'>
        <Link href={{ pathname: '/product', query: { id: 1 } }}>
          <Image
            priority
            src='https://picsum.photos/70/70'
            alt='product'
            width={70}
            height={70}
            className='aspect-square h-[70px] w-[70px] rounded object-cover'
          />
        </Link>
        <div className='flex-1'>
          <h4 className='line-clamp-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-10'>
            [3차 세척, 스킨포장] 목포 손질 먹갈치 대 1팩 (4토막) 650g 내외
          </h4>
          <p className='line-clamp-1 text-[13px] leading-[20px] -tracking-[0.03em] text-grey-40'>
            중 1팩(4토막) 400g 내외, [직송] 손질 완료 500g 입니다
          </p>
          <div className='mt-0.5 flex items-center gap-1'>
            <span className='text-[13px] leading-[20px] -tracking-[0.03em] text-grey-60'>
              {formatToLocaleString(2, { suffix: '개' })}
            </span>
            <strong className='text-[14px] font-medium leading-[22px] -tracking-[0.03em]'>
              {formatToLocaleString(14900, { suffix: '원' })}
            </strong>
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col justify-between px-4 pt-6'>
        <div>
          <h3 className='text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
            취소/환불 사유
          </h3>
          <div className='space-y-1.5 pt-3'>
            <Selector
              placeHolder='취소/환불 사유를 선택해주세요'
              list={[
                { label: '단순 변심', value: '단순 변심' },
                { label: '배송 지연', value: '배송 지연' },
                { label: '주문 실수', value: '주문 실수' },
                { label: '서비스 불만족', value: '서비스 불만족' },
              ]}
            />
            <textarea
              className={clsx(inputClassName, 'py-3 [&]:h-[212px]')}
              spellCheck={false}
              placeholder='취소/환불 사유를 작성해 주세요'
            />
          </div>
        </div>
        <button disabled={false} className={submitButtonClassName}>
          취소/환불 요청
        </button>
      </div>
    </section>
  );
};

MypageOrderRefundAction.getLayout = page => (
  <Layout
    className='flex flex-1 flex-col'
    footerProps={{ disable: true }}
    headerProps={{ disable: true }}
  >
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>취소/환불</h2>
        <div className='h-6 w-6' />
      </header>
      {page}
    </div>
  </Layout>
);

export default MypageOrderRefundAction;
