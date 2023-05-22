import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import Layout from 'src/components/common/layout';
import { HomeSmallSlideCuration } from 'src/components/home';
import { type optionState } from 'src/components/product/bottom-sheet';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';

/** 장바구니 */
const Cart: NextPageWithLayout = () => {
  const router = useRouter();

  const [isAllCheck, setIsAllCheck] = useState<boolean>(false);

  /** 옵션 갯수 -1 처리 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressMinus = (item: optionState) => {
    // const tmp = [...selectedOption];
    // const amount = item.amount;
    // if (amount - 1 <= 0) return;
    // const objIndex = tmp.findIndex(obj => obj.name === item.name);
    // tmp[objIndex].amount = amount - 1;
    // setSelectedOption(tmp);
  };

  /** 옵션 갯수 +1 처리 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressPlus = (item: optionState) => {
    // const tmp = [...selectedOption];
    // const amount = item.amount;
    // const objIndex = tmp.findIndex(obj => obj.name === item.name);
    // if (item.stock === amount) return;
    // tmp[objIndex].amount = amount + 1;
    // setSelectedOption(tmp);
  };

  return (
    <div className='pb-[100px] max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
        <button onClick={() => router.back()}>
          <Image src='/assets/icons/common/close-base.svg' alt='close' width={24} height={24} />
        </button>
        <p className='text-[16px] font-semibold -tracking-[0.03em] text-grey-10'>장바구니</p>
        <div className='w-6' />
      </div>

      {true ? (
        <Fragment>
          <div className='flex items-center justify-between px-4 py-3'>
            <button
              className='flex items-center gap-3'
              onClick={() => {
                setIsAllCheck(!isAllCheck);
              }}
            >
              <Image
                alt='check'
                width={24}
                height={24}
                src={
                  isAllCheck
                    ? '/assets/icons/common/check-box-on.svg'
                    : '/assets/icons/common/check-box-off.svg'
                }
              />
              <div className='flex items-center gap-[5px]'>
                <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                  전체선택
                </p>
                <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`(${2}/${2})`}</p>
              </div>
            </button>
            <button
              className=''
              onClick={() => {
                //
              }}
            >
              <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20'>
                선택삭제
              </p>
            </button>
          </div>
          <div className='h-2 bg-grey-90' />
          {[...Array(2)].map((v, idx) => {
            return (
              <div key={`cart${idx}`} className=''>
                <div className='flex h-[56px] items-center gap-2 px-4'>
                  <Image
                    src='/dummy/dummy-partner-1.png'
                    alt='store'
                    width={28}
                    height={28}
                    className='bordre rounded-full border-grey-90'
                  />
                  <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                    서준수산
                  </p>
                </div>
                <div className='h-[1px] bg-grey-90' />
                <div className='px-4 pb-6 pt-4'>
                  <div className='flex items-start gap-3'>
                    <button
                      className=''
                      onClick={() => {
                        //
                      }}
                    >
                      <Image
                        alt='check'
                        width={24}
                        height={24}
                        src={
                          isAllCheck
                            ? '/assets/icons/common/check-box-on.svg'
                            : '/assets/icons/common/check-box-off.svg'
                        }
                      />
                    </button>
                    <Image
                      src='/dummy/dummy-product-detail-1.png'
                      alt=''
                      width={70}
                      height={70}
                      className='rounded'
                    />
                    <div className='flex flex-1 flex-col gap-1'>
                      <p className='line-clamp-2 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                        [3차 세척, 스킨포장] 목포 손질 먹갈치 400~650g
                      </p>
                      <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-40'>
                        중 1팩(4토막) 400g 내외
                      </p>
                    </div>
                    <button
                      className=''
                      onClick={() => {
                        //
                      }}
                    >
                      <Image
                        src='/assets/icons/common/close-small.svg'
                        alt='delete'
                        width={24}
                        height={24}
                        className='h-6 w-6'
                      />
                    </button>
                  </div>
                  <div className='mt-6 flex items-center justify-between'>
                    <div className='flex items-center rounded border border-grey-80 bg-white px-[3px] py-1'>
                      <button className='' onClick={() => onPressMinus(v)}>
                        <Image
                          src='/assets/icons/product/product-minus.svg'
                          alt='minus'
                          width={24}
                          height={24}
                        />
                      </button>
                      <p className='min-w-[30px] text-center text-[16px] font-semibold tabular-nums leading-[24px] -tracking-[0.03em] text-grey-20'>
                        {1}
                      </p>
                      <button className='' onClick={() => onPressPlus(v)}>
                        <Image
                          src='/assets/icons/product/product-plus.svg'
                          alt='minus'
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                    <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
                      12300,
                    )}원`}</p>
                  </div>
                  <div className='mt-3.5 flex flex-col gap-1.5 rounded bg-grey-90 px-4 py-3'>
                    <div className='flex items-center justify-between'>
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                        상품금액
                      </p>
                      <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
                        12300,
                      )}원`}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                        배송비
                      </p>
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                        무료
                      </p>
                    </div>
                  </div>
                </div>
                <div className='h-2 bg-grey-90' />
              </div>
            );
          })}

          <div className='flex flex-col gap-3.5 px-4 py-6'>
            <div className='flex items-center justify-between'>
              <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                총 상품 금액
              </p>
              <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
                24600,
              )}원`}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                총 배송비
              </p>
              <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                무료
              </p>
            </div>
            <div className='h-[1px] bg-[#F7F7F7]' />
            <div className='flex items-center justify-between'>
              <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                결제예정금액
              </p>
              <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-black'>{`${formatToLocaleString(
                24600,
              )}원`}</p>
            </div>
          </div>
          <div className='h-2 bg-grey-90' />

          <div className='px-4 py-6'>
            <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
              다른 고객이 함께 구매한 상품
            </p>
            <HomeSmallSlideCuration className='mt-4' />
          </div>
        </Fragment>
      ) : (
        <div className=''>
          <div className='mt-[145px] flex h-[188px] flex-col items-center justify-center gap-2'>
            <Image src='/assets/icons/search/search-error.svg' alt='up' width={40} height={40} />
            <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
              장바구니에 담긴 상품이 없습니다
            </p>
          </div>
        </div>
      )}
      <div className='fixed bottom-0 z-50 w-[375px] bg-white px-4 pb-7 pt-2 max-md:w-full'>
        <button
          className={cm(
            'flex h-[52px] w-full items-center justify-center rounded-lg bg-[#D4D5D8]',
            { 'bg-primary-50': isAllCheck },
          )}
          onClick={() => {
            if (isAllCheck) {
              router.push({ pathname: '/product/order', query: { id: 1 } });
            }
          }}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>
            {`총 ${formatToLocaleString(24600)}원 주문하기`}
          </p>
        </button>
      </div>
    </div>
  );
};

Cart.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Cart;
