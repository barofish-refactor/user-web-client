import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Selector } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { type SelectorType } from 'src/components/common/selector';
import { CheckIcon } from 'src/components/icons';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';

export type inquiryType = 'PRODUCT' | 'DELIVERY' | 'REFUND' | 'ETC'; // 상품문의, 배송문의, 반품/취소, 기타

/** 문의하기 */
const Inquiry: NextPageWithLayout = () => {
  const router = useRouter();
  // const { id } = router.query;
  const [selectedType, setSelectedType] = useState<SelectorType>();
  const [content, setContent] = useState<string>('');
  const [isSecret, setIsSecret] = useState<boolean>(false);

  const selectorList: SelectorType[] = [
    { label: '상품문의', value: 'PRODUCT' },
    { label: '배송문의', value: 'DELIVERY' },
    { label: '반품/취소', value: 'REFUND' },
    { label: '기타', value: 'ETC' },
  ];

  return (
    <div className='pb-[100px] max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
        <button onClick={() => router.back()}>
          <Image src='/assets/icons/common/arrow-back.svg' alt='back' width={24} height={24} />
        </button>
        <p className='text-[16px] font-bold -tracking-[0.03em] text-grey-10'>문의하기</p>
        <div className='w-6' />
      </div>

      <div className='px-4 pt-1.5'>
        {/* Product */}
        <div className='flex w-full items-center gap-[13px] rounded-lg bg-grey-90 p-2'>
          <Image
            src='/dummy/dummy-product-detail-1.png'
            alt='product'
            className='rounded-lg'
            width={72}
            height={72}
          />
          <div className='flex flex-1 flex-col truncate text-start'>
            <p className='text-[13px] font-bold leading-[16px] -tracking-[0.05em] text-grey-10'>
              서준수산
            </p>
            <p className='mt-0.5 truncate text-[13px] font-medium leading-[20px] -tracking-[0.05em] text-grey-30'>
              [3차 세척,스킨포장] 목포 손질 먹갈치 400~650g
            </p>
            <div className='flex items-center gap-0.5'>
              <p className='text-[16px] font-semibold leading-[19px] -tracking-[0.05em] text-teritory'>{`${40}%`}</p>
              <p className='text-[16px] font-bold leading-[22px] -tracking-[0.05em] text-grey-10'>{`${formatToLocaleString(
                9600,
              )}원`}</p>
            </div>
          </div>
        </div>

        <p className='mt-[26px] text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
          문의유형
        </p>
        <Selector
          className='mt-2'
          list={selectorList}
          placeHolder='문의 유형을 선택해주세요.'
          value={selectedType}
          setValue={setSelectedType}
        />
        <div className='mt-4 h-[212px] w-full rounded-lg border border-grey-80 py-3'>
          <textarea
            spellCheck={false}
            className='h-full  w-full px-3 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-80'
            placeholder='문의 내용을 작성 해 주세요.'
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <button
          className='mt-2.5 flex items-center gap-1.5 py-2.5'
          onClick={() => setIsSecret(!isSecret)}
        >
          <CheckIcon isActive={isSecret} width={24} height={24} />
          <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
            비밀글로 문의하기
          </p>
        </button>
      </div>
      <div className='fixed bottom-0 z-50 w-[375px] px-4 pb-7 max-md:w-full'>
        <button
          className={cm(
            'flex h-[52px] w-full items-center justify-center rounded-lg bg-[#D4D5D8]',
            { 'bg-primary-50': selectedType && content.trim().length > 0 },
          )}
          onClick={() => {
            if (selectedType && content.trim().length > 0) {
              alert('등록되었습니다.');
              router.back();
            }
          }}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>등록하기</p>
        </button>
      </div>
    </div>
  );
};

Inquiry.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Inquiry;
