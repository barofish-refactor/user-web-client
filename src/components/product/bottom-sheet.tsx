import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ProductSelector } from 'src/components/product';
import { type ProductSelectorType } from 'src/components/product/selector';
import { formatToLocaleString } from 'src/utils/functions';
import useClickAway from 'src/utils/use-click-away';

const dummyOption: ProductSelectorType[] = [
  {
    id: 1,
    option: '중 1팩(4토막) 400g 내외',
    price: 12300,
    value: '1',
  },
  {
    id: 2,
    option: '대 1팩(4토막) 600g 내외',
    price: 18450,
    value: '2',
  },
];

export interface optionState {
  id: number;
  name: string;
  amount: number;
  price: number;
  additionalPrice: number;
  stock: number;
}

interface Props {
  setIsVisible: (value: boolean) => void;
}

const BottomSheet = ({ setIsVisible }: Props) => {
  const target = useRef<HTMLDivElement>(null);
  const [check, setCheck] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<optionState[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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
        ? selectedOption.map(x => x.price * x.amount).reduce((a: number, b: number) => a + b)
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
      <div className='flex w-full flex-col'>
        <p className='self-center text-[16px] font-semibold leading-[24px] -tracking-[0.05em] text-black'>
          옵션 선택
        </p>
        <div className='min-h-[220px] px-4 pt-3.5'>
          <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-40'>
            필수옵션
          </p>
          <ProductSelector
            list={dummyOption}
            className='mt-1.5'
            placeHolder='옵션을 선택해주세요'
            setValue={value => {
              const tmp = [...selectedOption];
              const objIndex = tmp.findIndex(obj => obj.id === value.id);
              if (objIndex === -1) {
                tmp.push({
                  id: value.id,
                  name: value.option,
                  amount: 1,
                  price: value.price,
                  additionalPrice: 0,
                  stock: 999,
                });
                setSelectedOption(tmp);
              }
            }}
          />
          <div className='flex flex-col gap-3 pb-[25.5px] pt-[15px]'>
            {selectedOption.map((v, idx) => {
              return (
                <div
                  key={`selected${idx}`}
                  className='flex h-[100px] flex-col justify-between rounded-lg bg-[#F7F7F7] px-3 pb-3 pt-[12.5px]'
                >
                  <div className='flex items-start justify-between gap-1'>
                    <p className='line-clamp-1 flex-1 text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                      {v.name}
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
                      v.price,
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
                    //
                  }}
                >
                  <p className='text-[16px] font-bold -tracking-[0.03em] text-primary-50'>
                    장바구니
                  </p>
                </button>
                <Link
                  className='flex h-[52px] flex-1 items-center justify-center rounded-lg bg-primary-50'
                  href={{ pathname: '/product/order', query: { id: 1 } }}
                >
                  <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>바로 구매</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
