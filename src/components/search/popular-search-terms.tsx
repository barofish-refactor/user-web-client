import Image from 'next/image';
import React from 'react';
import { type SearchKeyword } from 'src/api/swagger/data-contracts';
import cm from 'src/utils/class-merge';
import { formatToUtc } from 'src/utils/functions';

interface Props {
  data: SearchKeyword[];
  setSearchText: (value: string) => void;
}

/** 인기검색어 */
const PopularSearchTerms = ({ data, setSearchText }: Props) => {
  const parseRankState = (state: 'UP' | 'DOWN' | 'NEW' | 'NONE') => {
    switch (state) {
      case 'UP':
        return (
          <Image
            unoptimized
            src='/assets/icons/search/rank-up.svg'
            alt='up'
            width={15}
            height={15}
          />
        );
      case 'DOWN':
        return (
          <Image
            unoptimized
            src='/assets/icons/search/rank-down.svg'
            alt='down'
            width={15}
            height={15}
          />
        );
      case 'NEW':
        return (
          <Image
            unoptimized
            src='/assets/icons/search/rank-new.svg'
            alt='new'
            width={28}
            height={21}
          />
        );
      case 'NONE':
        return <p className='w-[15px] text-[18px] font-normal text-grey-10'>-</p>;
      default:
        return <p className='w-[15px] text-[18px] font-normal text-grey-10'>-</p>;
    }
  };

  return (
    <>
      <div className='mt-[35px] flex items-end gap-2'>
        <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          인기 검색어
        </p>
        <p className='pb-0.5 text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-80'>{`${formatToUtc(
          new Date(),
          'MM.dd HH:mm',
        )} 기준`}</p>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        {data.map((v, idx) => {
          const rank = idx + 1;
          const rankState = v.prevRank
            ? v.prevRank < rank
              ? 'DOWN'
              : v.prevRank > rank
              ? 'UP'
              : 'NONE'
            : 'NEW';
          return (
            <button
              key={`rank${idx}`}
              className='flex items-center gap-2.5'
              onClick={() => {
                setSearchText(v.keyword ?? '');
              }}
            >
              <p
                className={cm(
                  'text-[16px] font-bold tabular-nums leading-[24px] -tracking-[0.03em] text-grey-10',
                  { 'w-[22px] text-end': rank % 2 === 0 },
                )}
              >
                {rank}
              </p>
              <p className='line-clamp-1 flex-1 text-start text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
                {v.keyword}
              </p>
              {parseRankState(rankState)}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default PopularSearchTerms;
