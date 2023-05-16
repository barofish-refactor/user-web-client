import Image from 'next/image';
import React from 'react';
import cm from 'src/utils/class-merge';
import { formatToUtc } from 'src/utils/functions';

interface Props {
  setSearchText: (value: string) => void;
}

interface SearchRankType {
  rank: number;
  name: string;
  state: 'UP' | 'DOWN' | 'NEW' | 'NONE'; // 순위 상승, 하락, 신규, 유지
}

const searchRank: SearchRankType[] = [
  {
    rank: 1,
    name: '연어슬라이스',
    state: 'UP',
  },
  {
    rank: 2,
    name: '반건조 오징어',
    state: 'DOWN',
  },
  {
    rank: 3,
    name: '생굴',
    state: 'UP',
  },
  {
    rank: 4,
    name: '광어',
    state: 'DOWN',
  },
  {
    rank: 5,
    name: '반건조병어',
    state: 'NEW',
  },
  {
    rank: 6,
    name: '흰다리새우',
    state: 'DOWN',
  },
  {
    rank: 7,
    name: '칵테일새우',
    state: 'UP',
  },
  {
    rank: 8,
    name: '홍게',
    state: 'DOWN',
  },
  {
    rank: 9,
    name: '문어',
    state: 'NONE',
  },
  {
    rank: 10,
    name: '랍스터',
    state: 'NEW',
  },
];

/** 인기검색어 */
const PopularSearchTerms = ({ setSearchText }: Props) => {
  const parseRankState = (state: 'UP' | 'DOWN' | 'NEW' | 'NONE') => {
    switch (state) {
      case 'UP':
        return <Image src='/assets/icons/search/rank-up.svg' alt='up' width={15} height={15} />;
      case 'DOWN':
        return <Image src='/assets/icons/search/rank-down.svg' alt='down' width={15} height={15} />;
      case 'NEW':
        return <Image src='/assets/icons/search/rank-new.svg' alt='new' width={28} height={21} />;
      case 'NONE':
        return <p className='w-[15px] text-[16px] font-normal text-grey-10'>-</p>;
      default:
        return <p className='w-[15px] text-[16px] font-normal text-grey-10'>-</p>;
    }
  };

  return (
    <>
      <div className='mt-[35px] flex items-end gap-2'>
        <p className='text-[16px] font-semibold leading-[24px] -tracking-[3%] text-grey-10'>
          인기 검색어
        </p>
        <p className='pb-0.5 text-[12px] font-medium leading-[18px] -tracking-[3%] text-grey-80'>{`${formatToUtc(
          new Date(),
          'MM.dd HH:mm',
        )} 기준`}</p>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        {searchRank.map((v, idx) => {
          return (
            <button
              key={`rank${idx}`}
              className='flex items-center gap-2.5'
              onClick={() => {
                setSearchText(v.name);
              }}
            >
              <p
                className={cm(
                  'text-[16px] font-bold tabular-nums leading-[24px] -tracking-[3%] text-grey-10',
                  { 'w-[22px] text-end': v.rank % 2 === 0 },
                )}
              >
                {v.rank}
              </p>
              <p className='flex-1 text-start text-[14px] font-normal leading-[22px] -tracking-[3%] text-grey-10'>
                {v.name}
              </p>
              {parseRankState(v.state)}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default PopularSearchTerms;
