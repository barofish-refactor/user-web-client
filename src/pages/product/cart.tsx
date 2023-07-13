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
import { type optionState } from 'src/components/product/bottom-sheet';
import { Checkbox } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { changeSectionBasket, formatToBlob, formatToLocaleString } from 'src/utils/functions';
import { aToB } from 'src/utils/parse';
import { VARIABLES } from 'src/variables';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

const getSectionDeliverFee = (data: BasketProductDto[], store: SimpleStore | undefined) =>
  data
    .map(
      v =>
        Math.ceil(
          v.option?.maxAvailableAmount ? (v.amount ?? 0) / v.option?.maxAvailableAmount : 1,
        ) * (store?.deliverFee ?? 0),
    )
    .reduce((a, b) => a + b, 0);

export interface SectionBasketType {
  index: number;
  store?: SimpleStore;
  data: BasketProductDto[];
}

export interface SectionoptionType {
  index: number;
  storeId: number;
  storeName: string;
  storeImage: string;
  data: optionState[];
}

/** 장바구니 */
const Cart: NextPageWithLayout = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const [isAllCheck, setIsAllCheck] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<BasketProductDto[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDelivery, setTotalDelivery] = useState<number>(0);
  const [sectionCart, setSectionCart] = useState<SectionBasketType[]>([]);

  const { data, refetch, isLoading } = useQuery(
    queryKey.cart.lists,
    async () => {
      const res = await (await client()).selectBasket();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        setAlert({ message: res.data.errorMsg ?? '' });
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      staleTime: 0,
    },
  );

  const { data: selectProductOtherCustomerBuy } = useQuery(
    queryKey.orderRecommend.list(data?.map(x => x.product?.id).join(',')),
    async () => {
      const res = await (
        await client()
      ).selectProductOtherCustomerBuy({
        ids: data?.map(x => x.product?.id).join(',') ?? '',
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
      await (await client()).deleteBasket(args, { type: ContentType.FormData }),
  );

  const { mutateAsync: updateBasket, isLoading: isUpdateLoading } = useMutation(
    async ({ id, query }: { id: number; query: { amount: number } }) =>
      await (await client()).updateBasket(id, query, { type: ContentType.FormData }),
  );

  const onDelete = ({ data }: DeleteBasketPayload) => {
    if (isDeleteLoading) return;
    deleteBasket({ data: formatToBlob<DeleteBasketPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          // setIsAddCart(true);
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
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

      const totalPrice =
        selectedItem.length > 0
          ? selectedItem
              .map(
                v =>
                  ((v.product?.discountPrice ?? 0) +
                    ((v.option?.discountPrice ?? 0) - (v.product?.discountPrice ?? 0))) *
                  (v.amount ?? 0),
              )
              .reduce((a: number, b: number) => a + b, 0)
          : 0;
      const totalDelivery = selectedSection
        .map(x => {
          const sectionTotal = x.data
            .map(
              v =>
                ((v.product?.discountPrice ?? 0) +
                  ((v.option?.discountPrice ?? 0) - (v.product?.discountPrice ?? 0))) *
                (v.amount ?? 0),
            )
            .reduce((a, b) => a + b, 0);

          const sectionDeliverFee = getSectionDeliverFee(x.data, x.store);

          return x.store?.deliverFeeType === 'FREE'
            ? 0
            : x.store?.deliverFeeType === 'FIX'
            ? sectionDeliverFee
            : sectionTotal >= (x.store?.minOrderPrice ?? 0)
            ? 0
            : sectionDeliverFee;
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

  return (
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
        <p className='text-[16px] font-semibold -tracking-[0.03em] text-grey-10'>장바구니</p>
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
                    setIsAllCheck(value);
                    setSelectedItem(value ? data : []);
                  }
                }}
              />
              <div className='flex items-center gap-[5px]'>
                <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                  전체선택
                </p>
                <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`(${
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
                      .filter(x => selectedItem.map(v => v.id).includes(x.id))
                      .map(x => x.id ?? -1),
                  },
                });
                setSelectedItem([]);
              }}
            >
              <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20'>
                선택삭제
              </p>
            </button>
          </div>
          <div className='h-2 bg-grey-90' />
          {sectionCart.map(x => {
            const sectionTotal = x.data
              .map(
                v =>
                  ((v.product?.discountPrice ?? 0) +
                    ((v.option?.discountPrice ?? 0) - (v.product?.discountPrice ?? 0))) *
                  (v.amount ?? 0),
              )
              .reduce((a, b) => a + b, 0);

            const sectionDeliverFee = getSectionDeliverFee(x.data, x.store);

            return (
              <div key={x.index}>
                <div className='flex h-[56px] items-center gap-2 px-4'>
                  <Image
                    unoptimized
                    src={x.store?.profileImage ?? ''}
                    alt='store'
                    width={28}
                    height={28}
                    className='rounded-full border border-grey-90 object-cover'
                    style={{ width: '28px', height: '28px' }}
                  />
                  <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                    {x.store?.name ?? ''}
                  </p>
                </div>
                <Fragment>
                  {x.data.map((v, idx) => {
                    return (
                      <div key={`cart${idx}`} className=''>
                        <div className='h-[1px] bg-grey-90' />
                        <div className='px-4 pb-6 pt-4'>
                          <div className='flex items-start gap-3'>
                            <Checkbox
                              checked={selectedItem.map(x => x.id).includes(v.id)}
                              onCheckedChange={() => {
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
                              <Image
                                unoptimized
                                src={v.product?.image ?? ''}
                                alt=''
                                width={70}
                                height={70}
                                className='rounded'
                                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                              />
                              <div className='flex flex-1 flex-col gap-1'>
                                <p className='line-clamp-2 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                                  {v.product?.title ?? ''}
                                </p>
                                <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-40'>
                                  {v.option?.name ?? '기본'}{' '}
                                  {!v.product?.discountPrice ||
                                    ((v.option?.discountPrice ?? 0) -
                                      (v.product?.discountPrice ?? 0) !==
                                      0 &&
                                      `(+${formatToLocaleString(
                                        (v.option?.discountPrice ?? 0) -
                                          (v.product?.discountPrice ?? 0),
                                      )}원)`)}
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
                              <p className='min-w-[30px] text-center text-[16px] font-semibold tabular-nums leading-[24px] -tracking-[0.03em] text-grey-20'>
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
                            <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
                              (v.product?.discountPrice ?? 0) +
                                ((v.option?.discountPrice ?? 0) - (v.product?.discountPrice ?? 0)),
                            )}원`}</p>
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
                      {x.store?.deliverFeeType === 'FREE'
                        ? '무료'
                        : x.store?.deliverFeeType === 'FIX'
                        ? formatToLocaleString(sectionDeliverFee) + '원'
                        : sectionTotal >= (x.store?.minOrderPrice ?? 0)
                        ? '무료'
                        : formatToLocaleString(sectionDeliverFee) + '원'}
                    </p>
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
                totalPrice,
              )}원`}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                총 배송비
              </p>
              <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                {totalDelivery === 0 ? '무료' : formatToLocaleString(totalDelivery) + '원'}
              </p>
            </div>
            <div className='h-[1px] bg-[#F7F7F7]' />
            <div className='flex items-center justify-between'>
              <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                결제예정금액
              </p>
              <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-black'>{`${formatToLocaleString(
                totalPrice + totalDelivery,
              )}원`}</p>
            </div>
          </div>
          <div className='h-2 bg-grey-90' />

          <div className='px-4 py-6'>
            <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
              다른 고객이 함께 구매한 상품
            </p>
            {(selectProductOtherCustomerBuy ?? []).length > 0 ? (
              <HomeSmallSlideCuration className='mt-4' data={selectProductOtherCustomerBuy ?? []} />
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
          onClick={() => {
            if (selectedItem.length > 0) {
              const selectedOption: optionState[] = selectedItem.map(v => {
                return {
                  isNeeded: true,
                  optionId: v.option?.id ?? -1,
                  productId: v.product?.id ?? -1,
                  name: v.option?.name ?? '',
                  amount: v.amount ?? 0,
                  price: v.product?.discountPrice ?? 0,
                  additionalPrice: (v.option?.discountPrice ?? 0) - (v.product?.discountPrice ?? 0),
                  deliveryFee: v.deliveryFee ?? 0,
                  minOrderPrice: v.store?.minOrderPrice ?? 0,
                  deliverFeeType: v.store?.deliverFeeType ?? 'FREE',
                  stock: v.option?.amount ?? 999,
                  maxAvailableStock: v.option?.maxAvailableAmount ?? 999,
                  deliverBoxPerAmount: v.option?.deliverBoxPerAmount ?? 999,
                  productName: v.product?.title ?? '',
                  productImage: v.product?.image ?? '',
                  storeId: v.store?.storeId ?? -1,
                  storeImage: v.store?.profileImage ?? '',
                  storeName: v.store?.name ?? '',
                };
              });
              router.push({
                pathname: '/product/order',
                query: { options: aToB(JSON.stringify(selectedOption)) },
              });
            }
          }}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>
            {data && data?.length > 0
              ? `총 ${formatToLocaleString(totalPrice + totalDelivery)}원 주문하기`
              : '상품을 담아주세요'}
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
