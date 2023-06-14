import Image from 'next/image';
import { useEffect } from 'react';
import { type ProductListDto, type Product } from 'src/api/swagger/data-contracts';
import { ProductItem } from 'src/components/common';
import { useFilterStore } from 'src/store';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';

interface Props {
  type?: string; // 신상품, 인기상품, 특가할인 등등...
  data: Product[];
  dataDto?: ProductListDto[];
  className?: string;
}

/** 홈화면 - 상품 리스트 (신상품, 인기상품, ...) */
const ProductList = ({ type, data, dataDto, className }: Props) => {
  const { setIsOpen, clearFilter } = useFilterStore();

  useEffect(() => {
    clearFilter();
  }, [clearFilter]);

  return (
    <div className={cm('px-4 py-[16px]', className)} id='test'>
      <div className='flex items-center justify-between'>
        <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-black'>{`총 ${formatToLocaleString(
          dataDto ? dataDto.length : data.length,
        )}건`}</p>
        <div className='flex items-center gap-[19px]'>
          {!type && (
            <button
              className='flex items-center gap-[7px]'
              onClick={() => {
                //
              }}
            >
              <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
                추천순
              </p>
              <Image
                src='/assets/icons/common/chevron-filter.svg'
                alt='chevron'
                width={8}
                height={5}
              />
            </button>
          )}
          <button className='flex items-center gap-1' onClick={() => setIsOpen(true)}>
            <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
              필터
            </p>
            <Image src='/assets/icons/common/filter.svg' alt='filter' width={15} height={10} />
          </button>
        </div>
      </div>
      <div className='mt-5 grid grid-cols-2 gap-x-3 gap-y-5'>
        {dataDto
          ? dataDto.map((v, idx) => {
              return <ProductItem key={`curation${idx}`} data={v} dataDto={v} />;
            })
          : data.map((v, idx) => {
              return <ProductItem key={`curation${idx}`} data={v} />;
            })}
      </div>
    </div>
  );
};

export default ProductList;
