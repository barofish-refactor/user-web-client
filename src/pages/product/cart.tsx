import { useMutation, useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { client } from 'src/api/client';
import {
  type SimpleStore,
  type BasketProductDto,
  type DeleteBasketPayload,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import Layout from 'src/components/common/layout';
import { HomeSmallSlideCuration } from 'src/components/home';
import { type miniOptionState, type OptionState } from 'src/components/product/bottom-sheet';
import { Checkbox } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type deliverFeeTypeEnum, type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { changeSectionBasket, formatToBlob, formatToLocaleString } from 'src/utils/functions';
import { aToB } from 'src/utils/parse';
import { VARIABLES } from 'src/variables';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { DefaultSeo } from 'next-seo';
import Skeleton from 'src/components/common/skeleton';
import * as kakaoPixel from 'src/utils/kakaoPixel';
import Script from 'next/script';
export interface SectionBasketType {
  index: number;
  deliverFee: number;
  deliverFeeType: 'FREE' | 'FIX' | 'FREE_IF_OVER' | 'S_CONDITIONAL';
  minOrderPrice: number;
  minStorePrice: number;
  store?: SimpleStore;
  data: BasketProductDto[];
}

export interface SectionOptionType {
  index: number;
  deliverFee: number;
  // deliverFeeType: 'FREE' | 'FIX' | 'FREE_IF_OVER';
  // minOrderPrice: number;
  storeId: number;
  storeName: string;
  storeImage: string;
  data: OptionState[];
}

interface DeliverPriceCheckType {
  result: number;
  sectionTotal: number;
  minOrderPrice: number;
  deliverFeeType?: deliverFeeTypeEnum;
  minStorePrice: number;
}

function getAdditionalPrice(
  value: BasketProductDto,
  addDiscountPrice?: boolean,
  multiple?: boolean,
) {
  const discountPrice = value.product?.discountPrice ?? 0;
  let result = (value.option?.discountPrice ?? 0) - discountPrice;

  if (addDiscountPrice) {
    result = discountPrice + result;
  }

  if (multiple) {
    result = result * (value.amount ?? 0);
  }

  return result;
}

const deliverPriceAfterCheckType = ({
  result,
  sectionTotal,
  minOrderPrice,
  deliverFeeType,
  minStorePrice,
}: DeliverPriceCheckType) => {
  let finalResult;
  if (deliverFeeType === 'FREE') {
    finalResult = 0;
  } else if (deliverFeeType === 'FIX') {
    finalResult = result;
  } else if (deliverFeeType === 'FREE_IF_OVER') {
    finalResult = sectionTotal >= minOrderPrice ? 0 : result;
  } else if (deliverFeeType === 'S_CONDITIONAL') {
    finalResult = sectionTotal >= minStorePrice ? 0 : result;
  } else {
    finalResult = result;
  }

  return finalResult;
};
const NAVER_PIXEL_ID = process.env.NEXT_PUBLIC_NAVER_PIEXL_ID;
/** 장바구니 */
const Cart: NextPageWithLayout = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const [isAllCheck, setIsAllCheck] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<BasketProductDto[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDelivery, setTotalDelivery] = useState<number>(0);
  const [sectionCart, setSectionCart] = useState<SectionBasketType[]>([]);

  const { data, refetch, isLoading } = useQuery(queryKey.cart.lists, async () => {
    const res = await (await client()).selectBasketV2();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      if (res.data.code === 'FORBIDDEN') {
        router.replace('/login');
        return;
      }
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

  const { data: selectProductOtherCustomerBuy } = useQuery(
    queryKey.orderRecommend.list(data?.map((x: any) => x.product?.id).join(',')),
    async () => {
      const res = await (
        await client()
      ).selectProductOtherCustomerBuy({
        ids: data?.map((x: any) => x.product?.id).join(',') ?? '',
      });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!data,
    },
  );

  const { mutateAsync: deleteBasket, isLoading: isDeleteLoading } = useMutation(
    async (args: DeleteBasketPayload) =>
      await (await client()).deleteBasketV2(args, { type: ContentType.FormData }),
  );

  const { mutateAsync: updateBasket, isLoading: isUpdateLoading } = useMutation(
    async ({ id, query }: { id: number; query: { amount: number } }) =>
      await (await client()).updateBasketV2(id, query, { type: ContentType.FormData }),
  );

  const onDelete = ({ data }: DeleteBasketPayload) => {
    if (isDeleteLoading) return;
    deleteBasket({ data: formatToBlob<DeleteBasketPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => setAlert({ message: error.response.data.errorMsg }));
  };

  const onUpdate = ({ id, query }: { id: number; query: { amount: number } }) => {
    if (isUpdateLoading) return;
    updateBasket({ id, query })
      .then(res => {
        if (res.data.isSuccess) {
          // setIsAddCart(true);
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  /** 옵션 갯수 -1 처리 */
  const onPressMinus = (item: BasketProductDto) => {
    const amount = item.amount ?? 0;
    if (amount - 1 <= 0) return;
    let tmp = selectedItem.filter(x => x.id === item.id)[0];
    tmp = { ...tmp, amount: amount - 1 };
    const tmp2 = [...selectedItem];
    const findIndex = tmp2.findIndex(x => x.id === item.id);
    tmp2[findIndex] = tmp;
    setSelectedItem(tmp2);
    onUpdate({
      id: item.id ?? -1,
      query: { amount: amount - 1 },
    });
  };

  /** 옵션 갯수 +1 처리 */
  const onPressPlus = (item: BasketProductDto) => {
    const amount = item.amount ?? 0;

    if (item.option?.maxAvailableAmount === amount) return;

    let tmp = selectedItem.filter(x => x.id === item.id)[0];
    tmp = { ...tmp, amount: amount + 1 };
    const tmp2 = [...selectedItem];
    const findIndex = tmp2.findIndex(x => x.id === item.id);
    tmp2[findIndex] = tmp;

    setSelectedItem(tmp2);
    onUpdate({
      id: item.id ?? -1,
      query: { amount: amount + 1 },
    });
  };

  // 옵션에 따른 총 가격
  useEffect(() => {
    if (data) {
      const selectedSection = changeSectionBasket(selectedItem);
      console.log(selectedItem, 'selectedItem');

      const totalPrice =
        selectedItem.length > 0
          ? selectedItem
              .map(v => getAdditionalPrice(v, true, true))
              .reduce((a: number, b: number) => a + b, 0)
          : 0;

      const totalDelivery = selectedSection
        .map(x => {
          console.log(x, 'x');

          const sectionTotal = x.data
            .map(v => getAdditionalPrice(v, true, true))
            .reduce((a, b) => a + b, 0);
          const deliverF = x.data.map(v => {
            const amount = v?.amount as number;
            const deliverResult = deliverPriceAfterCheckType({
              result: (v.store?.deliveryFee as number) ?? 0,
              sectionTotal:
                v.deliverFeeType === 'FREE_IF_OVER'
                  ? (v.product?.discountPrice as number) * amount
                  : sectionTotal,
              minOrderPrice: v.minOrderPrice ?? 10000000,
              deliverFeeType: v.deliverFeeType,
              minStorePrice: v.store?.minStorePrice ?? 10000000,
            });

            return deliverResult;
          });

          // console.log(deliverF2, 'deliverF2');

          // const deliverF = deliverPriceAfterCheckType({
          //   result: x.deliverFee,
          //   sectionTotal,
          //   minOrderPrice: x.minOrderPrice,
          //   deliverFeeType: x.deliverFeeType,
          //   minStorePrice: x.store?.minStorePrice as number,
          // });
          return Math.max(...deliverF);
        })
        .reduce((a, b) => a + b, 0);

      setTotalPrice(totalPrice);
      setTotalDelivery(totalDelivery);
      setIsAllCheck(selectedItem.length === data.length);
    }
  }, [data, selectedItem]);

  useEffect(() => {
    if (data && !isLoading) {
      const result = changeSectionBasket(data);

      setSectionCart(result);
    }
  }, [data, isLoading]);

  /** 구매 적립금 */
  const buyPoint =
    Math.round(Math.floor(Math.max(totalPrice, 0) * (user?.grade?.pointRate ?? 1)) / 10) * 10;

  /** 상품 적립금 */
  const productPoint = Math.floor(
    selectedItem.length > 0
      ? selectedItem
          .map((v: any) => v.option?.discountPrice * v.amount * v.option.pointRate)
          .reduce((a, b) => a + b, 0)
      : 0,
  );
  // 카카오 픽셀
  const [isKakaoCart, setIsKakaoCart] = useState(false);
  useEffect(() => {
    if (!user || isKakaoCart) return;
    if (typeof window.kakaoPixel !== 'undefined') {
      window
        .kakaoPixel(`${kakaoPixel.KAKAO_TRACKING_ID}`)
        .viewCart(`${user?.nickname} : ${user.auth ?? 'email'}`);
      setIsKakaoCart(true);
    }
  }, [isKakaoCart, user]);
  if (isLoading)
    return (
      <>
        <div className='pb-[100px] max-md:w-[100vw]'>
          <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
            <button onClick={router.back}>
              <Image
                unoptimized
                src='/assets/icons/common/close-base.svg'
                alt='close'
                width={24}
                height={24}
              />
            </button>
            <p className='text-[18px] font-semibold -tracking-[0.03em] text-grey-10'>장바구니</p>
            <div className='w-6' />
          </div>
          <Skeleton />
        </div>
      </>
    );
  return (
    <>
      <DefaultSeo title='장바구니 | 바로피쉬' description='장바구니' />
      <>
        <Script
          id='naver-purchase'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            var _nasa={};
            if(window.wcs) _nasa["cnv"] = wcs.cnv("3","1000");
            `,
          }}
        />
        <Script
          id='naver-purchaseTracking'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
          if (!wcs_add) var wcs_add={};
          wcs_add["wa"] = "${NAVER_PIXEL_ID}";
          if (!_nasa) var _nasa={};
          if(window.wcs){
          wcs.inflow("barofish.com");
          wcs_do(_nasa);
          }
          `,
          }}
        />
      </>
      <div className='pb-[100px] max-md:w-[100vw]'>
        {/* header */}
        <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
          <button onClick={router.back}>
            <Image
              unoptimized
              src='/assets/icons/common/close-base.svg'
              alt='close'
              width={24}
              height={24}
            />
          </button>
          <p className='text-[18px] font-semibold -tracking-[0.03em] text-grey-10'>장바구니</p>
          <div className='w-6' />
        </div>

        {data && data?.length > 0 ? (
          <Fragment>
            <div className='flex items-center justify-between px-4 py-3'>
              <div className='flex items-center gap-3'>
                <Checkbox
                  checked={isAllCheck}
                  onCheckedChange={checked => {
                    if (typeof checked === 'boolean') {
                      const value = checked;
                      const filterData = data.map((v: any) => v?.product?.state);
                      if (filterData.includes('INACTIVE'))
                        return setAlert({
                          message: '구매할 수 없는 상품이 포함되어 있습니다.',
                        });
                      setIsAllCheck(value);
                      setSelectedItem(value ? data : []);
                    }
                  }}
                />
                <div className='flex items-center gap-[5px]'>
                  <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                    전체선택
                  </p>
                  <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`(${
                    selectedItem.length
                  }/${data?.length ?? 0})`}</p>
                </div>
              </div>
              <button
                className=''
                onClick={() => {
                  onDelete({
                    data: {
                      ids: data
                        .filter((x: any) => selectedItem.map(v => v.id).includes(x.id))
                        .map((x: any) => x.id ?? -1),
                    },
                  });
                  setSelectedItem([]);
                }}
              >
                <p className='text-[16px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20'>
                  선택삭제
                </p>
              </button>
            </div>
            <div className='h-2 bg-grey-90' />
            {sectionCart.map(x => {
              const sectionTotal = x.data
                .map(v => getAdditionalPrice(v, true, true))
                .reduce((a, b) => a + b, 0);

              // console.log(x, 'x', x.deliverFeeType);

              // const deliverResult = x.deliverFee;
              // const deliverResult = deliverPriceAfterCheckType({
              //   result: x.deliverFee,
              //   sectionTotal,
              //   minOrderPrice: x.minOrderPrice,
              //   deliverFeeType: x.deliverFeeType,
              //   minStorePrice: x.store?.minStorePrice as number,
              // });
              let deliverS = 0;

              return (
                <div key={x.index}>
                  <div className='mt-[5px] flex h-[70px] items-center gap-2 px-4'>
                    <Image
                      unoptimized
                      src={x.store?.profileImage ?? ''}
                      alt='store'
                      width={40}
                      height={40}
                      className='rounded-full border border-grey-90 object-cover'
                      style={{ width: '40px', height: '40px' }}
                    />
                    <div className='flex h-[auto] w-full flex-col  gap-2'>
                      <div
                        className={cm(
                          'mx-1 text-[18px] font-semibold  -tracking-[0.03em] text-grey-10',
                        )}
                      >
                        {x.store?.name ?? ''}
                      </div>
                      {x.deliverFeeType === 'S_CONDITIONAL' && x.minStorePrice > 0 && (
                        <div className='mx-1 text-[14px] font-semibold -tracking-[0.03em] text-[#A2A4A9]'>
                          {x.minStorePrice} 원 이상 구매시{' '}
                          <span className='text-[#2689E5]'> 무료배송</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Fragment>
                    {x.data.map((v, idx) => {
                      const amount = v?.amount as number;

                      const deliverResult = deliverPriceAfterCheckType({
                        result: (v.store?.deliveryFee as number) ?? 0,
                        sectionTotal:
                          v.deliverFeeType === 'FREE_IF_OVER'
                            ? (v.product?.discountPrice as number) * amount
                            : sectionTotal,
                        minOrderPrice: v.minOrderPrice ?? 10000000,
                        deliverFeeType: v.deliverFeeType,
                        minStorePrice: v.store?.minStorePrice ?? 10000000,
                      });
                      if (deliverS > 0) {
                        // 상품중 가장 비싼 배송비
                        deliverS = (v.store?.deliveryFee as number) ?? 0;
                      } else {
                        deliverS = deliverResult;
                      }
                      return (
                        <div key={`cart${idx}`} className=''>
                          <div className='h-[1px] bg-grey-90' />
                          <div className='px-4 pb-6 pt-4'>
                            <div className='flex items-start gap-3'>
                              <Checkbox
                                checked={selectedItem.map(x => x.id).includes(v.id)}
                                onCheckedChange={() => {
                                  if (v.product?.state === 'INACTIVE')
                                    return setAlert({
                                      message: '구매할 수 없는 상품입니다.',
                                    });

                                  const tmp = [...selectedItem];
                                  const findIndex = tmp.findIndex(x => x.id === v.id);
                                  if (findIndex > -1) tmp.splice(findIndex, 1);
                                  else tmp.push(v);

                                  setSelectedItem(tmp);
                                }}
                              />
                              <Link
                                href={{ pathname: '/product', query: { id: v.product?.id } }}
                                className='flex flex-1 items-start gap-3'
                              >
                                {v.product?.state?.includes('INACTIVE') && (
                                  <Image
                                    unoptimized
                                    src='/assets/icons/product/soldout.png'
                                    alt='판매중지'
                                    width={70}
                                    height={70}
                                    className='absolute z-50'
                                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                  />
                                )}

                                <Image
                                  unoptimized
                                  src={v.product?.image ?? ''}
                                  alt='cartImge'
                                  width={70}
                                  height={70}
                                  className='rounded'
                                  style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                />
                                <div className='flex flex-1 flex-col gap-1'>
                                  <p
                                    className={
                                      v.product?.state === 'INACTIVE'
                                        ? 'line-clamp-2 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 line-through'
                                        : 'line-clamp-2 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'
                                    }
                                  >
                                    {v.product?.title ?? ''}
                                  </p>
                                  <p
                                    className={
                                      v.product?.state === 'INACTIVE'
                                        ? 'text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-40 line-through'
                                        : 'text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-40'
                                    }
                                  >
                                    {v.option?.name ?? '기본'}
                                    {!v.product?.discountPrice ||
                                      ((v.option?.discountPrice ?? 0) -
                                        (v.product?.discountPrice ?? 0) !==
                                        0 &&
                                        `(+${formatToLocaleString(
                                          (v.option?.discountPrice ?? 0) -
                                            (v.product?.discountPrice ?? 0),
                                        )}원)`)}
                                  </p>

                                  <p
                                    className={cm('text-[14px]', {
                                      'text-[#E53926]': v.deliverFeeType === 'FIX',
                                      'text-[#2689E5]': v.deliverFeeType === 'FREE',
                                      'text-[#67696F]':
                                        v.deliverFeeType === 'S_CONDITIONAL' ||
                                        v.deliverFeeType === 'FREE_IF_OVER',
                                    })}
                                  >
                                    {v.deliverFeeType === 'FIX' && '개별배송'}
                                    {v.deliverFeeType === 'FREE' && '무료배송'}
                                    {v.deliverFeeType === 'S_CONDITIONAL' && '기본배송'}
                                    {v.deliverFeeType === 'FREE_IF_OVER' && '기본배송'}
                                  </p>
                                </div>
                              </Link>
                              <button
                                className=''
                                onClick={() => {
                                  setSelectedItem([]);
                                  onDelete({ data: { ids: [v.id ?? -1] } });
                                }}
                              >
                                <Image
                                  unoptimized
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
                                <button onClick={() => onPressMinus(v)}>
                                  <Image
                                    unoptimized
                                    src='/assets/icons/product/product-minus.svg'
                                    alt='minus'
                                    width={24}
                                    height={24}
                                  />
                                </button>
                                <p className='min-w-[30px] text-center text-[18px] font-semibold tabular-nums leading-[24px] -tracking-[0.03em] text-grey-20'>
                                  {v.amount}
                                </p>
                                <button onClick={() => onPressPlus(v)}>
                                  <Image
                                    unoptimized
                                    src='/assets/icons/product/product-plus.svg'
                                    alt='minus'
                                    width={24}
                                    height={24}
                                  />
                                </button>
                              </div>
                              <p
                                className={
                                  v.product?.state === 'INACTIVE'
                                    ? 'text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-error line-through'
                                    : 'text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'
                                }
                              >
                                {`${formatToLocaleString(getAdditionalPrice(v, true) * amount, {
                                  suffix: '원',
                                })}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Fragment>
                  <div className='mx-4 mb-6 mt-3.5 flex flex-col gap-1.5 rounded bg-grey-90 px-4 py-3'>
                    <div className='flex items-center justify-between'>
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                        상품금액
                      </p>
                      <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>
                        {`${formatToLocaleString(sectionTotal)}원`}
                      </p>
                    </div>

                    <div className='flex items-center justify-between'>
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                        배송비
                      </p>
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                        {deliverS === 0 ? '무료' : formatToLocaleString(deliverS, { suffix: '원' })}
                      </p>
                    </div>
                  </div>
                  <div className='h-2 bg-grey-90' />
                </div>
              );
            })}

            <div className='flex flex-col gap-3.5 px-4 py-6'>
              <div className='flex items-center justify-between'>
                <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                  총 상품 금액
                </p>
                <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
                  totalPrice,
                )}원`}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                  총 배송비
                </p>
                <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                  {totalDelivery === 0 ? '무료' : formatToLocaleString(totalDelivery) + '원'}
                </p>
              </div>
              <div className='h-[1px] bg-[#F7F7F7]' />
              <div className='flex items-center justify-between'>
                <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                  결제예정금액
                </p>
                <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-black'>{`${formatToLocaleString(
                  totalPrice + totalDelivery,
                )}원`}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                  총 적립금
                </p>
                <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                  {`${formatToLocaleString(buyPoint + productPoint)}원`}
                </p>
              </div>
            </div>
            <div className='h-2 bg-grey-90' />

            <div className='px-4 py-6'>
              <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
                다른 고객이 함께 구매한 상품
              </p>
              {(selectProductOtherCustomerBuy ?? []).length > 0 ? (
                <HomeSmallSlideCuration
                  title=''
                  className='mt-4'
                  data={selectProductOtherCustomerBuy ?? []}
                />
              ) : (
                <div className='flex h-[200px] flex-col items-center justify-center'>
                  <Image
                    unoptimized
                    src='/assets/icons/search/search-error.svg'
                    alt='up'
                    width={40}
                    height={40}
                  />
                  <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
                    상품이 존재하지 않습니다.
                  </p>
                </div>
              )}
            </div>
          </Fragment>
        ) : (
          <div className='h-[calc(100dvb-160px)]'>
            <div className='grid h-full flex-1 place-items-center'>
              <div className='flex flex-col items-center gap-2'>
                <Image
                  unoptimized
                  src='/assets/icons/search/search-error.svg'
                  alt='up'
                  width={40}
                  height={40}
                />
                <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
                  장바구니에 담긴 상품이 없습니다
                </p>
              </div>
            </div>
          </div>
        )}
        <div className='fixed bottom-0 z-50 w-[375px] bg-white px-4 pb-7 pt-2 max-md:w-full'>
          <button
            className={cm(
              'flex h-[52px] w-full items-center justify-center rounded-lg bg-[#D4D5D8]',
              { 'bg-primary-50': selectedItem.length > 0 },
            )}
            onClick={async () => {
              if (selectedItem.length > 0) {
                const selectedOption: OptionState[] = selectedItem.map(v => {
                  // 같은 스토어 총 금액
                  const sectionTotal = selectedItem
                    .filter(
                      x => x.store?.storeId === v.store?.storeId && x.product?.id && v.product?.id,
                    )
                    .map(v => getAdditionalPrice(v, true, true))
                    .reduce((a, b) => a + b, 0);

                  // const deliverResult = v.store?.deliverFee ?? 0;
                  const deliverResult = v.deliveryFee ?? 0;

                  const deliveryFee = deliverPriceAfterCheckType({
                    result: deliverResult,
                    sectionTotal,
                    minOrderPrice: v.minOrderPrice ?? 0,
                    deliverFeeType: v?.deliverFeeType,
                    minStorePrice: v.store?.minStorePrice as number,
                  });

                  return {
                    isNeeded: true,
                    optionId: v.option?.id ?? -1,
                    productId: v.product?.id ?? -1,
                    name: v.option?.name ?? '',
                    amount: v.amount ?? 0,
                    price: v.product?.discountPrice ?? 0,
                    additionalPrice: getAdditionalPrice(v),
                    deliveryFee,
                    minOrderPrice: v.minOrderPrice ?? 0,
                    deliverFeeType: v.deliverFeeType ?? 'FREE',
                    stock: v.option?.amount ?? 999,
                    maxAvailableStock: v.option?.maxAvailableAmount ?? 999,
                    productName: v.product?.title ?? '',
                    productImage: v.product?.image ?? '',
                    storeId: v.store?.storeId ?? -1,
                    storeImage: v.store?.profileImage ?? '',
                    storeName: v.store?.name ?? '',
                    needTaxation: v.product?.isNeedTaxation ?? false, //
                    pointRate: v.option?.pointRate ?? 0,
                  };
                });

                const querySendData: miniOptionState[] = selectedOption.map(v => ({
                  productId: v.productId,
                  optionId: v.optionId,
                  name: v.name,
                  amount: v.amount,
                  additionalPrice: v.additionalPrice,
                  deliveryFee: totalDelivery,
                  stock: v.stock,
                  maxAvailableStock: v.maxAvailableStock,
                  needTaxation: v.needTaxation,
                  pointRate: v.pointRate,
                }));

                router.push({
                  pathname: '/product/order',
                  query: { options: aToB(JSON.stringify(querySendData)) },
                });
              }
            }}
          >
            <p className='text-[18px] font-bold -tracking-[0.03em] text-white'>
              {data && data?.length > 0
                ? `총 ${formatToLocaleString(totalPrice + totalDelivery)}원 주문하기`
                : '상품을 담아주세요'}
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

Cart.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async context => {
  if (!getCookie(VARIABLES.ACCESS_TOKEN, context)) {
    {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
  } else {
    return {
      props: {},
    };
  }
};

export default Cart;
