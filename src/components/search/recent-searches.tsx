import Image from 'next/image';
import React from 'react';

interface Props {
  recentData: string[];
  setSearchText: (value: string) => void;
  handleAddKeyword: (value: string) => void;
  handleRemoveKeyword: (value: string) => void;
  handleClearKeywords: () => void;
}

/** 최근 검색어 */
const RecentSearches = ({
  recentData,
  setSearchText,
  handleAddKeyword,
  handleRemoveKeyword,
  handleClearKeywords,
}: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          최근 검색어
        </p>
        <button onClick={handleClearKeywords}>
          <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
            모두삭제
          </p>
        </button>
      </div>
      <div className='flex flex-wrap gap-2'>
        {recentData.map((v, idx) => {
          return (
            <button
              key={`recent${idx}`}
              className='flex h-9 max-w-full items-center justify-center gap-1 rounded-full border border-grey-80 px-3'
              onClick={() => {
                setSearchText(v);
                handleAddKeyword(v);
              }}
            >
              <p className='line-clamp-1 break-keep text-[14px] font-normal -tracking-[0.05em] text-grey-10'>
                {v}
              </p>
              <Image
                src='/assets/icons/common/close-small.svg'
                alt='delete'
                width={19}
                height={19}
                onClick={e => {
                  e.stopPropagation();
                  handleRemoveKeyword(v);
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RecentSearches;
