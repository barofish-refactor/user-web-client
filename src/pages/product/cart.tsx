import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { client } from 'src/api/client';
import { type BasketProductDto, type DeleteBasketPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import Layout from 'src/components/common/layout';
import { HomeSmallSlideCuration } from 'src/components/home';
import { type optionState } from 'src/components/product/bottom-sheet';
import { Checkbox } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { calcDiscountPrice, formatToBlob, formatToLocaleString } from 'src/utils/functions';
import { aToB } from 'src/utils/parse';

/** 장바구니 */
const Cart: NextPageWithLayout = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const [isAllCheck, setIsAllCheck] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDelivery, setTotalDelivery] = useState<number>(0);

  const { data, refetch } = useQuery(
    queryKey.cart.lists,
    async () => {
      const res = await client().selectBasket();
      if (res.data.isSuccess) {
        console.log(res.data.data);
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

  const { mutateAsync: deleteBasket, isLoading: isDeleteLoading } = useMutation(
    (args: DeleteBasketPayload) => client().deleteBasket(args, { type: ContentType.FormData }),
  );

  const { mutateAsync: updateBasket, isLoading: isUpdateLoading } = useMutation(
    ({ id, query }: { id: number; query: { amount: number } }) =>
      client().updateBasket(id, query, { type: ContentType.FormData }),
  );

  const onDelete = ({ data }: DeleteBasketPayload) => {
    if (isDeleteLoading) return;
    deleteBasket({ data: formatToBlob<DeleteBasketPayload['data']>(data, true) })
      .then(res => {
        console.log(res);
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
        console.log(res);
        if (res.data.isSuccess) {
          // setIsAddCart(true);
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  /** 옵션 갯수 -1 처리 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressMinus = (item: BasketProductDto) => {
    const amount = item.amount ?? 0;
    if (amount - 1 <= 0) return;
    onUpdate({
      id: item.id ?? -1,
      query: { amount: amount - 1 },
    });
  };

  /** 옵션 갯수 +1 처리 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressPlus = (item: BasketProductDto) => {
    const amount = item.amount ?? 0;
    onUpdate({
      id: item.id ?? -1,
      query: { amount: amount + 1 },
    });
  };

  // 옵션에 따른 총 가격
  useEffect(() => {
    if (data) {
      const totalPrice =
        selectedItem.length > 0
          ? data
              .filter((x, idx) => selectedItem.includes(idx))
              .map(
                v =>
                  (calcDiscountPrice(v.product?.originPrice, v.product?.discountRate) +
                    (v.option?.price ?? 0)) *
                  (v.amount ?? 0),
              )
              .reduce((a: number, b: number) => a + b, 0)
          : 0;
      const totalDelivery =
        selectedItem.length > 0
          ? data
              .filter((x, idx) => selectedItem.includes(idx))
              .map(v => v.deliveryFee ?? 0)
              .reduce((a: number, b: number) => a + b, 0)
          : 0;
      setTotalPrice(totalPrice);
      setTotalDelivery(totalDelivery);
      setIsAllCheck(selectedItem.length === data.length);
    }
  }, [data, selectedItem]);

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
                    setSelectedItem(value ? [...Array(data?.length ?? 0)].map((x, i) => i) : []);
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
                    ids: data.filter((x, idx) => selectedItem.includes(idx)).map(x => x.id ?? -1),
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
          {(data ?? []).map((v, idx) => {
            return (
              <div key={`cart${idx}`} className=''>
                <div className='flex h-[56px] items-center gap-2 px-4'>
                  <Image
                    src={v.store?.profileImage ?? ''}
                    alt='store'
                    width={28}
                    height={28}
                    className='rounded-full border border-grey-90'
                  />
                  <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                    {v.store?.name ?? ''}
                  </p>
                </div>
                <div className='h-[1px] bg-grey-90' />
                <div className='px-4 pb-6 pt-4'>
                  <div className='flex items-start gap-3'>
                    <Checkbox
                      checked={selectedItem.includes(idx)}
                      onCheckedChange={() => {
                        const tmp = [...selectedItem];
                        const findIndex = tmp.findIndex(x => x === idx);
                        if (findIndex > -1) tmp.splice(findIndex, 1);
                        else tmp.push(idx);
                        setSelectedItem(tmp);
                      }}
                    />
                    <Image
                      src={v.product?.image ?? ''}
                      alt=''
                      width={70}
                      height={70}
                      className='rounded'
                    />
                    <div className='flex flex-1 flex-col gap-1'>
                      <p className='line-clamp-2 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                        {v.product?.title ?? ''}
                      </p>
                      <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-40'>
                        {v.option?.name}{' '}
                        {v.option?.price !== 0 && `(+${formatToLocaleString(v.option?.price)}원)`}
                      </p>
                    </div>
                    <button
                      className=''
                      onClick={() => {
                        setSelectedItem([]);
                        onDelete({ data: { ids: [v.id ?? -1] } });
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
                        {v.amount}
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
                      calcDiscountPrice(v.product?.originPrice, v.product?.discountRate) +
                        (v.option?.price ?? 0),
                    )}원`}</p>
                  </div>
                  <div className='mt-3.5 flex flex-col gap-1.5 rounded bg-grey-90 px-4 py-3'>
                    <div className='flex items-center justify-between'>
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                        상품금액
                      </p>
                      <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
                        (calcDiscountPrice(v.product?.originPrice, v.product?.discountRate) +
                          (v.option?.price ?? 0)) *
                          (v.amount ?? 0),
                      )}원`}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                        배송비
                      </p>
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                        {v.deliveryFee === 0 ? '무료' : formatToLocaleString(v.deliveryFee) + '원'}
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
            <HomeSmallSlideCuration className='mt-4' data={[]} />
          </div>
        </Fragment>
      ) : (
        <div className=''>
          <div className='mt-[145px] flex h-[188px] flex-col items-center justify-center gap-2'>
            <Image src='/assets/icons/search/search-error.svg' alt='up' width={40} height={40} />
            {/* <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
              장바구니에 담긴 상품이 없습니다
            </p> */}
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
              const selectedData: BasketProductDto[] = (data ?? [])?.filter((x, idx) =>
                selectedItem.includes(idx),
              );
              const selectedOption: optionState[] = selectedData.map(v => {
                return {
                  optionId: v.option?.id ?? -1,
                  productId: v.product?.id ?? -1,
                  name: v.option?.name ?? '',
                  amount: v.amount ?? 0,
                  price: calcDiscountPrice(v.product?.originPrice, v.product?.discountRate),
                  additionalPrice: v.option?.price ?? 0,
                  deliveryFee: v.deliveryFee ?? 0,
                  // stock: v.option.
                  stock: 999,
                  productName: v.product?.title ?? '',
                  productImage: v.product?.image ?? '',
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
            {`총 ${formatToLocaleString(totalPrice + totalDelivery)}원 주문하기`}
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
