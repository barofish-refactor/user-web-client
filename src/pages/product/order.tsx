import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from 'src/components/common/layout';
import { ProductShippingAddress } from 'src/components/product';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';

/** 주문하기 */
const Order: NextPageWithLayout = () => {
  const router = useRouter();
  // const { id } = router.query;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [point, setPoint] = useState<string>('');
  const [isCheck, setIsCheck] = useState<boolean>(false);

  useEffect(() => {
    const close = () => {
      setIsVisible(false);
    };
    window.addEventListener('popstate', close, { passive: false });

    return () => {
      window.removeEventListener('popstate', close);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'overlay';
    }
  }, [isVisible]);

  return (
    <div className='pb-[100px] max-md:w-[100vw]'>
      {/* 배송지 변경 */}
      <div className='sticky top-0 z-[100] w-full'>
        {isVisible && (
          <div className='absolute top-0 z-[100] flex h-[100dvb] w-full flex-col justify-end bg-black/50'>
            <ProductShippingAddress setIsVisible={setIsVisible} />
          </div>
        )}
      </div>

      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
        <button onClick={() => router.back()}>
          <Image src='/assets/icons/common/arrow-back.svg' alt='back' width={24} height={24} />
        </button>
        <p className='text-[16px] font-bold -tracking-[0.03em] text-grey-10'>주문하기</p>
        <div className='w-6' />
      </div>

      {/* 주문자 정보 */}
      <div className='flex flex-col gap-4 px-4 py-5'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          주문자 정보
        </p>
        <div className='flex items-center'>
          <p className='w-[71px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
            이름
          </p>
          <input
            maxLength={10}
            className='h-[44px] flex-1 rounded-lg border border-grey-80 px-3 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
            placeholder='이름을 입력해주세요'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='flex items-center'>
          <p className='w-[71px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
            연락처
          </p>
          <input
            maxLength={13}
            type='number'
            className='h-[44px] flex-1 rounded-lg border border-grey-80 px-3 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
            placeholder='휴대폰 번호를 입력해주세요'
            value={phone}
            onChange={e => {
              const text = e.target.value;
              if (text.length > 11) return;
              setPhone(text);
            }}
          />
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 배송지 */}
      <div className='flex flex-col px-4 py-[22px]'>
        <div className='flex items-center justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            배송지
          </p>
          <button
            className=''
            onClick={() => {
              setIsVisible(true);
              history.pushState(location.href, '', '');
            }}
          >
            <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>
              배송지 변경
            </p>
          </button>
        </div>
        <div className='mt-[22px] flex items-center gap-2'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>집</p>
          <div className='flex h-[22px] items-center justify-center rounded-full bg-primary-90 px-2'>
            <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-primary-60'>
              기본배송지
            </p>
          </div>
        </div>
        <p className='mt-1 text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
          홍길동, 010-1111-1111
        </p>
        <div className='my-2.5 h-[1px] bg-grey-90' />
        <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
          서울 강남구 강남대로 지하 396 (역삼동) 강남역, 지하 1층 강남역, 지하 1층 강남역, 지하 1층
        </p>
        <p className='mt-1 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
          부재 시 연락주세요
        </p>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 주문 상품 */}
      <button
        className='flex h-[68px] w-full items-center gap-1.5 px-4'
        onClick={() => {
          //
        }}
      >
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          주문 상품
        </p>
        <p className='line-clamp-1 flex-1 text-end text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
          목포 손질먹갈치 400g 외 1개
        </p>
        <Image
          src='/assets/icons/common/chevron-mypage.svg'
          alt='chevron'
          width={24}
          height={24}
          className='rotate-90'
        />
      </button>
      <div className='h-2 bg-grey-90' />

      {/* 쿠폰 */}
      <div className='px-4 py-[22px]'>
        <div className='flex items-center justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            쿠폰
          </p>
          <div className='flex items-center'>
            <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
              사용 가능 쿠폰
            </p>
            <p className='whitespace-pre text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>{` ${0}`}</p>
            <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
              장
            </p>
          </div>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <div className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 bg-grey-90 px-4'>
            <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-60'>
              사용 가능한 쿠폰이 없습니다
            </p>
          </div>
          <button
            className='flex h-[44px] w-[93px] items-center justify-center rounded-lg border border-grey-80'
            onClick={() => {
              //
            }}
          >
            <p className='text-[14px] font-semibold -tracking-[0.03em] text-grey-10'>쿠폰 선택</p>
          </button>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 적립금 */}
      <div className='px-4 py-[22px]'>
        <div className='flex items-center justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            적립금
          </p>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <input
            type='number'
            className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 px-4 text-grey-10 placeholder:text-grey-60'
            placeholder='0원'
            value={point}
            onChange={e => {
              const text = e.target.value;
              if (text.length > 11) return;
              setPoint(text);
            }}
          />
          <button
            className='flex h-[44px] w-[93px] items-center justify-center rounded-lg border border-grey-80'
            onClick={() => {
              //
            }}
          >
            <p className='text-[14px] font-semibold -tracking-[0.03em] text-grey-10'>모두 사용</p>
          </button>
        </div>
        <div className='mt-2 flex items-center'>
          <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
            보유 적립금
          </p>
          <p className='whitespace-pre text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>{` ${formatToLocaleString(
            0,
          )}원`}</p>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 결제수단 */}
      <button
        className='flex h-[68px] w-full items-center gap-1.5 px-4'
        onClick={() => {
          //
        }}
      >
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          결제수단
        </p>
        <p className='flex-1 text-end text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          네이버페이
        </p>
        <Image
          src='/assets/icons/common/chevron-mypage.svg'
          alt='chevron'
          width={24}
          height={24}
          className='rotate-90'
        />
      </button>
      <div className='h-2 bg-grey-90' />

      {/* 결제 금액 */}
      <div className='px-4 py-[22px]'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          결제 금액
        </p>
        <div className='mt-4 flex flex-col gap-2.5'>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              주문금액
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
              36480,
            )}원`}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              배송비
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`+${formatToLocaleString(
              3000,
            )}원`}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              쿠폰할인
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
              0,
            )}원`}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              적립금사용
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`-${formatToLocaleString(
              480,
            )}원`}</p>
          </div>
        </div>
        <div className='mb-[22px] mt-4 h-[1px] bg-grey-90' />
        <div className='flex items-start justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            최종 결제 금액
          </p>
          <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
            36000,
          )}원`}</p>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 결제 금액 */}
      <div className='px-4 py-[22px]'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          적립금 혜택
        </p>
        <div className='mt-4 flex items-start justify-between'>
          <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
            구매적립
          </p>
          <div className='flex flex-col items-end'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
              360,
            )}원`}</p>
            <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
              (멸치 등급 : 구매 적립 1%)
            </p>
          </div>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
            후기작성
          </p>
          <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`최대 ${formatToLocaleString(
            650,
          )}원`}</p>
        </div>
        <div className='mb-[22px] mt-4 h-[1px] bg-grey-90' />
        <div className='flex items-start justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-black'>
            예상 적립 금액
          </p>
          <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-primary-50'>{`${formatToLocaleString(
            36000,
          )}원`}</p>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 개인정보 수집 이용 동의 */}
      <div className='py-[22px]'>
        <button
          className='flex w-full items-center gap-2 px-4'
          onClick={() => setIsCheck(!isCheck)}
        >
          <Image
            alt='check'
            width={24}
            height={24}
            src={
              isCheck
                ? '/assets/icons/common/check-box-on.svg'
                : '/assets/icons/common/check-box-off.svg'
            }
          />
          <p className='flex-1 text-start text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
            개인정보 수집 이용 동의 (필수)
          </p>
          <button
            className=''
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Image
              src='/assets/icons/common/chevron-mypage.svg'
              alt='chevron'
              width={24}
              height={24}
              className='rotate-90'
            />
          </button>
        </button>
      </div>

      <div className='fixed bottom-0 z-50 w-[375px] bg-white px-4 pb-7 pt-2 max-md:w-full'>
        <button
          className={cm(
            'flex h-[52px] w-full items-center justify-center rounded-lg bg-[#D4D5D8]',
            { 'bg-primary-50': isCheck },
          )}
          onClick={() => {
            if (isCheck) {
              router.back();
            }
          }}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>
            {`${formatToLocaleString(36000)}원 결제하기`}
          </p>
        </button>
      </div>
    </div>
  );
};

Order.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Order;
