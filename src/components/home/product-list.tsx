import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  type DeleteSaveProductsPayload,
  type SaveProductPayload,
  type PageProductListDto,
} from 'src/api/swagger/data-contracts';
import { ProductItem } from 'src/components/common';
import { useFilterStore, type indexFilterType } from 'src/store';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';
import { parseSort, type sortType } from 'src/utils/parse';

interface Props {
  storeType: 'category' | 'topBar' | 'curation' | 'store' | 'search';
  storeId?: number;
  type?: string; // 신상품, 인기상품, 특가할인 등등...
  dataDto: (PageProductListDto | undefined)[];
  className?: string;
  filter?: indexFilterType[];
  sort?: sortType;
  setSort?: (value: sortType) => void;
  onMutate?: (value: SaveProductPayload) => void;
  onDeleteSaveProductsMutate?: (value: DeleteSaveProductsPayload) => void;
  title?: string;
}

/** 홈화면 - 상품 리스트 (신상품, 인기상품, ...) */
const ProductList = ({
  storeType,
  storeId,
  type,
  dataDto,
  className,
  filter,
  sort,
  title,
  setSort,
  onMutate,
  onDeleteSaveProductsMutate,
}: Props) => {
  const { setFilter, setType, setIsOpen, clearFilter } = useFilterStore();
  const [isShowSort, setIsShowSort] = useState<boolean>();

  useEffect(() => {
    clearFilter();
  }, [clearFilter]);
  const blurDataURL =
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';

  return (
    <div className={cm('px-4 py-[16px]', className)} id='test'>
      <div className='flex items-center justify-between'>
        <p className='text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-black'>{`총 ${formatToLocaleString(
          dataDto[0]?.totalElements ?? 0,
        )}건`}</p>

        <div className='flex items-center gap-[19px]'>
          {!type && (
            <div className='relative h-[22px] overflow-visible'>
              <button
                className='flex h-[22px] items-center gap-[7px]'
                onClick={() => setIsShowSort(!isShowSort)}
              >
                <p className='text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
                  {parseSort(sort)}
                </p>
                <Image
                  unoptimized
                  src='/assets/icons/common/chevron-filter.svg'
                  alt='chevron'
                  width={8}
                  height={5}
                  loading='lazy'
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8XQ8AAnsBfKyAV94AAAAASUVORK5CYII='
                  placeholder='blur'
                  className={cm({ 'rotate-180': isShowSort })}
                />
              </button>
              {isShowSort && (
                <div className='absolute right-0 z-50 mt-1.5 flex w-[104px] flex-col items-start gap-[18px] rounded-lg bg-white py-3 pl-4 shadow-[0px_5px_10px_0px_rgba(0,0,0,0.15)]'>
                  {(
                    [
                      // { value: 'RECOMMEND' },
                      { value: 'NEW' },
                      { value: 'SALES' },
                      { value: 'REVIEW' },
                      // { value: 'LIKE' },
                      { value: 'LOW_PRICE' },
                      { value: 'HIGH_PRICE' },
                    ] as { value: sortType }[]
                  ).map((v, idx) => {
                    return (
                      <button
                        key={`sort${idx}`}
                        onClick={() => {
                          setSort && setSort(v.value);
                          setIsShowSort(false);
                        }}
                      >
                        <p
                          className={cm(
                            'text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-20',
                            { 'font-semibold text-primary-50': sort === v.value },
                          )}
                        >
                          {parseSort(v.value)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          <button
            className='flex items-center gap-1'
            onClick={() => {
              if (filter) setFilter(filter);
              setType({
                type: storeType,
                id: storeId,
              });
              setIsOpen(true);
            }}
          >
            <p
              className={cm(
                'text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10',
                { 'text-primary-50': filter && filter.length > 0 },
              )}
            >
              필터
            </p>
            <Image
              unoptimized
              alt='filter'
              width={15}
              height={10}
              loading='lazy'
              src={
                filter && filter.length > 0
                  ? '/assets/icons/common/filter-on.svg'
                  : '/assets/icons/common/filter.svg'
              }
            />
          </button>
        </div>
      </div>
      {title?.includes('캠핑') && storeType.includes('curation') && (
        <button style={{ marginTop: '20px' }}>
          <Image
            src='/assets/icons/common/curationA.jpg'
            style={{ objectFit: 'fill', borderRadius: '11px' }}
            width={400}
            height={200}
            loading='lazy'
            alt='bannerAds'
            blurDataURL={blurDataURL}
            placeholder='blur'
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100vw'
          />
        </button>
      )}
      <div className='mt-5 grid grid-cols-2 gap-x-3 gap-y-5'>
        {(dataDto[0]?.totalElements ?? 0) > 0
          ? dataDto.map(x =>
              (x?.content ?? []).map((v, idx) => {
                return (
                  <ProductItem
                    key={`curation${idx}`}
                    dataDto={v}
                    onMutate={onMutate}
                    onDeleteSaveProductsMutate={onDeleteSaveProductsMutate}
                  />
                );
              }),
            )
          : Empty()}
      </div>
    </div>
  );
};

function Empty() {
  return (
    <div className='col-span-2 h-[calc(100dvb-170px)]'>
      <div className='grid h-full flex-1 place-items-center'>
        <div className='flex flex-col items-center gap-2'>
          <Image
            unoptimized
            src='/assets/icons/common/error.svg'
            alt='error'
            width={40}
            height={40}
            loading='lazy'
          />
          <p className='whitespace-pre text-center text-[16px] font-medium leading-[24px] -tracking-[0.05em] text-[#B5B5B5]'>
            상품이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
