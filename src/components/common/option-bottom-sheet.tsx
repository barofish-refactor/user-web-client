import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { client } from 'src/api/client';
import { type AddBasketPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { HomeSmallSlideCuration } from 'src/components/home';
import { ProductSelector } from 'src/components/product';
import { type optionSelectorType, type OptionState } from 'src/components/product/bottom-sheet';
import { queryKey } from 'src/query-key';
import { useAlertStore, useProductOptionStore, useToastStore } from 'src/store';
import { formatToBlob, formatToLocaleString } from 'src/utils/functions';
import useClickAway from 'src/utils/use-click-away';
import { VARIABLES } from 'src/variables';
import * as fpixel from 'src/utils/fpixel';
interface Props {}

/** 옵션 선택 BottomSheet */
const BottomSheet = ({}: Props) => {
  const target = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [check, setCheck] = useState<boolean>(false);
  const [isAddCart, setIsAddCart] = useState<boolean>(false);
  const { setAlert } = useAlertStore();
  const { productOption, clearProductOption } = useProductOptionStore();
  const { setToast } = useToastStore();

  const { data: optionData, isLoading } = useQuery(
    queryKey.option.list(productOption?.data?.id),
    async () => {
      const res = await (await client()).selectProductOptionList(productOption?.data?.id ?? -1);
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!productOption?.data,
    },
  );

  const { data: selectProductOtherCustomerBuy } = useQuery(
    queryKey.orderRecommend.list(productOption?.data?.id),
    async () => {
      const res = await (
        await client()
      ).selectProductOtherCustomerBuy({
        ids: productOption?.data?.id?.toString() ?? '',
      });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!productOption && !!productOption?.data?.id,
    },
  );

  const { mutateAsync: addBasket, isLoading: isMutateLoading } = useMutation(
    async (args: AddBasketPayload) =>
      await (await client()).addBasket(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: AddBasketPayload) => {
    if (isMutateLoading) return;
    addBasket({ data: formatToBlob<AddBasketPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          initClear();
          queryClient.invalidateQueries(queryKey.cart.lists);
          queryClient.invalidateQueries(queryKey.cartCount);
          setToast({
            text: `${data.options
              ?.map(x => x.amount ?? 0)
              .reduce((a, b) => a + b, 0)}개의 상품을 장바구니에 담았습니다.`,
            buttonText: '장바구니 확인하기',
            onClick: () => router.push('/product/cart'),
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const [selectedOption, setSelectedOption] = useState<OptionState[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [options, setOptions] = useState<optionSelectorType[]>([]);

  useEffect(() => {
    if (!isLoading && optionData) {
      setOptions(
        optionData.map(v => {
          return {
            id: v.id ?? -1,
            isNeeded: v.isNeeded ?? false,
            options: (v.optionItems ?? []).map(x => {
              return {
                optionId: x.id ?? -1,
                productId: productOption?.data?.id ?? -1,
                option: x.name ?? '',
                price: productOption?.data?.discountPrice ?? 0,
                value: x.id?.toString() ?? '',
                amount: x.amount ?? 0,
                additionalPrice: (x.discountPrice ?? 0) - (productOption?.data?.discountPrice ?? 0),
                stock: x.amount ?? 999,
                maxAvailableStock: x.maxAvailableAmount ?? 999,
              };
            }),
          };
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionData, isLoading]);

  useClickAway(target, () => {
    // initClear();
    if (!check) {
      // initClear();
      setCheck(true);
    } else {
      initClear();
      setCheck(false);
    }
  });

  /** 옵션 갯수 -1 처리 */
  const onPressMinus = (item: OptionState) => {
    const tmp = [...selectedOption];
    const amount = item.amount;
    if (amount - 1 <= 0) return;
    const objIndex = tmp.findIndex(obj => obj.name === item.name);
    tmp[objIndex].amount = amount - 1;
    setSelectedOption(tmp);
  };

  /** 옵션 갯수 +1 처리 */
  const onPressPlus = (item: OptionState) => {
    const tmp = [...selectedOption];
    const amount = item.amount;
    const objIndex = tmp.findIndex(obj => obj.name === item.name);

    if (item.stock === amount) return;
    if (item.maxAvailableStock === amount) return;

    tmp[objIndex].amount = amount + 1;
    setSelectedOption(tmp);
  };

  /** 상품 옵션 삭제 */
  const onPressDelete = (item: OptionState) => {
    const tmp = [...selectedOption];
    const objIndex = tmp.findIndex(obj => obj.name === item.name);
    tmp.splice(objIndex, 1);
    setSelectedOption(tmp);
  };

  // 옵션에 따른 총 가격
  useEffect(() => {
    const totalPrice =
      selectedOption.length > 0
        ? selectedOption
            .map(x => (x.price + x.additionalPrice) * x.amount)
            .reduce((a: number, b: number) => a + b)
        : 0;
    setTotalPrice(totalPrice);
  }, [selectedOption]);

  useEffect(() => {
    if (productOption) {
      if (options.length === 0) {
        setOptions([]);
      }
    } else {
      // initClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearProductOption, options.length, productOption]);

  const initClear = () => {
    setIsAddCart(false);
    setSelectedOption([]);
    clearProductOption();
  };

  return (
    <div className='sticky top-0 z-[101] w-full'>
      {productOption && (
        <div className='absolute top-0 z-[102] flex h-[100dvb] w-full flex-col justify-end bg-black/50'>
          <div
            ref={target}
            className='flex w-full flex-col items-center rounded-t-[16px] bg-white pb-5'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <div className='mb-4 mt-2 h-1 w-8 rounded-full bg-grey-80' />
            {!isAddCart ? (
              <div className='flex w-full flex-col'>
                <p className='self-center text-[18px] font-semibold leading-[24px] -tracking-[0.05em] text-black'>
                  옵션 선택
                </p>
                <div className='max-h-[560px] min-h-[280px]  overflow-y-scroll px-4 scrollbar-hide'>
                  <div className='mb-3.5 min-h-[120px]'>
                    {options.map((v, i) => {
                      return (
                        <div key={`${v.id}`} className='pt-3.5'>
                          <p className='text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-40'>
                            {`${v.isNeeded ? '필수옵션' : '추가옵션'}`}
                          </p>
                          <ProductSelector
                            index={i}
                            list={v.options}
                            className='mt-1.5'
                            placeHolder='옵션을 선택해주세요'
                            setValue={value => {
                              const tmp = [...selectedOption];
                              const objIndex = tmp.findIndex(
                                obj => obj.optionId === value.optionId,
                              );
                              if (objIndex === -1) {
                                tmp.push({
                                  isNeeded: v.isNeeded ?? false,
                                  optionId: value.optionId,
                                  productId: value.productId,
                                  name: value.option,
                                  amount: 1,
                                  price: value.price,
                                  additionalPrice: value.additionalPrice,
                                  deliveryFee: 0,
                                  deliverFeeType: 'FREE',
                                  minOrderPrice: 0,
                                  stock: value.amount,
                                  maxAvailableStock: value.maxAvailableStock,
                                  productImage: '',
                                  productName: '',
                                  storeId: -1,
                                  storeImage: '',
                                  storeName: '',
                                  needTaxation: false, //
                                  pointRate: 0,
                                });
                                setSelectedOption(tmp);
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className='flex max-h-[280px] flex-col gap-3 overflow-y-scroll pb-[25.5px] pt-[15px] scrollbar-hide'>
                    {selectedOption.map((v, idx) => {
                      return (
                        <div
                          key={`selected${idx}`}
                          className='flex h-[100px] shrink-0 flex-col justify-between rounded-lg bg-[#F7F7F7] px-3 pb-3 pt-[12.5px]'
                        >
                          <div className='flex items-start justify-between gap-1'>
                            <p className='line-clamp-1 flex-1 text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                              {`${v.name}`}{' '}
                              {v.additionalPrice !== 0 &&
                                `(${v.additionalPrice > 0 ? '+' : ''}${formatToLocaleString(
                                  v.additionalPrice,
                                )}원)`}
                            </p>
                            <button
                              className=''
                              onClick={() => {
                                onPressDelete(v);
                              }}
                            >
                              <Image
                                unoptimized
                                src='/assets/icons/common/close-small-grey.svg'
                                alt='close'
                                width={19}
                                height={19}
                              />
                            </button>
                          </div>
                          {v.maxAvailableStock !== 999 && (
                            <p className='text-[13px] leading-[16px] -tracking-[0.03em] text-grey-50'>
                              최대 주문 가능 수량 : {v.maxAvailableStock}
                            </p>
                          )}
                          <div className='flex items-end justify-between'>
                            <div className='flex items-center rounded border border-grey-80 bg-white px-[3px] py-1'>
                              <button className='' onClick={() => onPressMinus(v)}>
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
                              <button className='' onClick={() => onPressPlus(v)}>
                                <Image
                                  unoptimized
                                  src='/assets/icons/product/product-plus.svg'
                                  alt='minus'
                                  width={24}
                                  height={24}
                                />
                              </button>
                            </div>
                            <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
                              v.price + v.additionalPrice,
                            )}원`}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {selectedOption.length > 0 && (
                    <div className=''>
                      <div className='h-[1px] bg-grey-90' />
                      <div className='mt-[10.5px] flex items-center justify-between'>
                        <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-40'>{`${selectedOption.length}개 상품`}</p>
                        <p className='text-[22px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>{`총 ${formatToLocaleString(
                          totalPrice,
                        )}원`}</p>
                      </div>
                      <div className='mt-[30px] flex items-center gap-[7px]'>
                        <button
                          className='h-[52px] flex-1 rounded-lg border border-primary-50'
                          onClick={() => {
                            if (!getCookie(VARIABLES.ACCESS_TOKEN)) {
                              sessionStorage.setItem('Path', router.asPath);
                              router.push('/login');
                              initClear();
                              return;
                            }
                            if (selectedOption.filter(v => v.isNeeded === false).length > 0)
                              return setAlert({ message: '필수옵션만 선택해주세요.' });
                            // fpixel.addToCart({
                            //   content_ids: productOption.data?.id,
                            //   content_type: 'product',
                            //   contents: selectedOption.map(item => {
                            //     return {
                            //       item_id: item.productId,
                            //       item_name: item.productName,
                            //       affiliation: '바로피쉬',
                            //       currency: 'KRW',
                            //       quantity: item.amount,
                            //       item_brand: item.storeName,
                            //       price: (item.price + item.additionalPrice) * item.amount,
                            //     };
                            //   }),
                            // });
                            // gtag('event', 'add_to_cart', {
                            //   currency: 'KRW',
                            //   value: totalPrice,
                            //   event_label: productOption.data?.title,
                            //   items: selectedOption.map(item => {
                            //     return {
                            //       item_id: item.productId,
                            //       item_name: item.name,
                            //       affiliation: '바로피쉬',
                            //       currency: 'KRW',
                            //       item_brand: item.storeName,
                            //       price: (item.price + item.additionalPrice) * item.amount,
                            //       quantity: item.amount,
                            //     };
                            //   }),
                            // });
                            onMutate({
                              data: {
                                productId: productOption.data?.id,
                                options: selectedOption.map(x => {
                                  return {
                                    optionId: x.optionId === -1 ? undefined : x.optionId,
                                    amount: x.amount,
                                  };
                                }),
                              },
                            });
                          }}
                        >
                          <p className='text-[18px] font-bold -tracking-[0.03em] text-primary-50'>
                            장바구니
                          </p>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className='flex w-full flex-col px-4 pb-9'>
                <div className='flex items-center gap-3'>
                  <Image
                    unoptimized
                    src={productOption.data?.image ?? ''}
                    alt='image'
                    width={50}
                    height={50}
                    style={{ width: '50px', height: '50px' }}
                  />
                  <p className='text-[16px] font-medium -tracking-[0.03em] text-grey-20'>
                    장바구니에 상품을 담았습니다.
                  </p>
                </div>
                <div className='my-4 h-[1px] bg-grey-90' />
                <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
                  다른 고객이 함께 구매한 상품
                </p>
                {(selectProductOtherCustomerBuy ?? []).length > 0 ? (
                  <HomeSmallSlideCuration
                    title=''
                    className='mt-4'
                    data={selectProductOtherCustomerBuy ?? []}
                    onClick={() => initClear()}
                  />
                ) : (
                  <div className='flex h-[252px] flex-col items-center justify-center'>
                    <Image
                      unoptimized
                      src='/assets/icons/search/search-error.svg'
                      alt='up'
                      width={40}
                      height={40}
                    />
                    <p className='whitespace-pre text-center text-[16px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
                      상품이 존재하지 않습니다.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomSheet;
