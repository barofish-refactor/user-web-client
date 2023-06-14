import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { client } from 'src/api/client';
import { type AddBasketPayload, type SimpleProductDto } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { ProductSelector } from 'src/components/product';
import { type ProductSelectorType } from 'src/components/product/selector';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { calcDiscountPrice, formatToBlob, formatToLocaleString } from 'src/utils/functions';
import { aToB } from 'src/utils/parse';
import useClickAway from 'src/utils/use-click-away';

export interface optionState {
  optionId: number;
  productId: number;
  name: string;
  amount: number;
  price: number;
  additionalPrice: number;
  deliveryFee: number;
  stock: number;
  productName: string;
  productImage: string;
  storeImage: string;
  storeName: string;
}

interface Props {
  data?: SimpleProductDto;
  setIsVisible: (value: boolean) => void;
}

/** 옵션 선택 BottomSheet */
const BottomSheet = ({ data, setIsVisible }: Props) => {
  const target = useRef<HTMLDivElement>(null);
  const [check, setCheck] = useState<boolean>(false);
  const [isAddCart, setIsAddCart] = useState<boolean>(false);
  const { setAlert } = useAlertStore();

  const { data: optionData, isLoading } = useQuery(queryKey.option.list(data?.id), async () => {
    const res = await client().selectProductOptionList(data?.id ?? -1);
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const { mutateAsync: addBasket, isLoading: isMutateLoading } = useMutation(
    (args: AddBasketPayload) => client().addBasket(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: AddBasketPayload) => {
    if (isMutateLoading) return;
    addBasket({ data: formatToBlob<AddBasketPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setIsAddCart(true);
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const [selectedOption, setSelectedOption] = useState<optionState[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [options, setOptions] = useState<ProductSelectorType[]>([
    {
      // id: -1,
      productId: -1,
      optionId: -1,
      option: '기본',
      price: calcDiscountPrice(data?.originPrice, data?.discountRate),
      value: '-1',
      amount: -1,
      additionalPrice: 0,
    },
  ]);

  useEffect(() => {
    if (!isLoading && optionData) {
      if (
        optionData.length > 0 &&
        optionData[0].isNeeded &&
        optionData[0].optionItems &&
        optionData[0].optionItems.length > 0
      ) {
        setOptions(
          optionData[0].optionItems.map(v => {
            return {
              optionId: v.id ?? -1,
              productId: data?.id ?? -1,
              option: v.name ?? '',
              price: calcDiscountPrice(data?.originPrice, data?.discountRate),
              value: v.id?.toString() ?? '',
              amount: v.amount ?? 0,
              additionalPrice: v.price ?? 0,
            };
          }),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionData, isLoading]);

  useClickAway(target, () => {
    if (!check) setCheck(true);
    else setIsVisible(false);
  });

  /** 옵션 갯수 -1 처리 */
  const onPressMinus = (item: optionState) => {
    const tmp = [...selectedOption];
    const amount = item.amount;
    if (amount - 1 <= 0) return;
    const objIndex = tmp.findIndex(obj => obj.name === item.name);
    tmp[objIndex].amount = amount - 1;
    setSelectedOption(tmp);
  };

  /** 옵션 갯수 +1 처리 */
  const onPressPlus = (item: optionState) => {
    const tmp = [...selectedOption];
    const amount = item.amount;
    const objIndex = tmp.findIndex(obj => obj.name === item.name);

    if (item.stock === amount) return;

    tmp[objIndex].amount = amount + 1;
    setSelectedOption(tmp);
  };

  /** 상품 옵션 삭제 */
  const onPressDelete = (item: optionState) => {
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

  return (
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
          <p className='self-center text-[16px] font-semibold leading-[24px] -tracking-[0.05em] text-black'>
            옵션 선택
          </p>
          <div className='min-h-[280px] px-4 pt-3.5'>
            <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-40'>
              필수옵션
            </p>
            <ProductSelector
              list={options}
              className='mt-1.5'
              placeHolder='옵션을 선택해주세요'
              setValue={value => {
                const tmp = [...selectedOption];
                const objIndex = tmp.findIndex(obj => obj.optionId === value.optionId);
                if (objIndex === -1) {
                  tmp.push({
                    optionId: value.optionId,
                    productId: value.productId,
                    name: value.option,
                    amount: 1,
                    price: value.price,
                    additionalPrice: value.additionalPrice,
                    deliveryFee: data?.deliveryFee ?? 0,
                    stock: value.amount,
                    productImage:
                      data && data.images && data.images.length > 0 ? data.images[0] : '',
                    productName: data?.title ?? '',
                    storeImage: data?.store?.profileImage ?? '',
                    storeName: data?.store?.name ?? '',
                  });
                  setSelectedOption(tmp);
                }
              }}
            />
            <div className='flex max-h-[280px] flex-col gap-3 overflow-y-scroll pb-[25.5px] pt-[15px] scrollbar-hide'>
              {selectedOption.map((v, idx) => {
                return (
                  <div
                    key={`selected${idx}`}
                    className='flex h-[100px] shrink-0 flex-col justify-between rounded-lg bg-[#F7F7F7] px-3 pb-3 pt-[12.5px]'
                  >
                    <div className='flex items-start justify-between gap-1'>
                      <p className='line-clamp-1 flex-1 text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                        {`${v.name}`}{' '}
                        {v.additionalPrice !== 0 &&
                          `(+${formatToLocaleString(v.additionalPrice)}원)`}
                      </p>
                      <button
                        className=''
                        onClick={() => {
                          onPressDelete(v);
                        }}
                      >
                        <Image
                          src='/assets/icons/common/close-small-grey.svg'
                          alt='close'
                          width={19}
                          height={19}
                        />
                      </button>
                    </div>
                    <div className='flex items-end justify-between'>
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
                  <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-40'>{`${selectedOption.length}개 상품`}</p>
                  <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>{`총 ${formatToLocaleString(
                    totalPrice,
                  )}원`}</p>
                </div>
                <div className='mt-[30px] flex items-center gap-[7px]'>
                  <button
                    className='h-[52px] flex-1 rounded-lg border border-primary-50'
                    onClick={() => {
                      onMutate({
                        data: {
                          productId: data?.id,
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
                    <p className='text-[16px] font-bold -tracking-[0.03em] text-primary-50'>
                      장바구니
                    </p>
                  </button>
                  <Link
                    className='flex h-[52px] flex-1 items-center justify-center rounded-lg bg-primary-50'
                    href={{
                      pathname: '/product/order',
                      query: { id: data?.id, options: aToB(JSON.stringify(selectedOption)) },
                    }}
                  >
                    <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>바로 구매</p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex w-full flex-col px-4 pb-9'>
          <div className='flex items-center gap-3'>
            <Image
              src={data?.images?.[0] ?? '/'}
              alt='image'
              width={50}
              height={50}
              style={{ width: '50px', height: '50px' }}
            />
            <p className='text-[14px] font-medium -tracking-[0.03em] text-grey-20'>
              장바구니에 상품을 담았습니다.
            </p>
          </div>
          <div className='my-4 h-[1px] bg-grey-90' />
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            다른 고객이 함께 구매한 상품
          </p>
        </div>
      )}
    </div>
  );
};

export default BottomSheet;
