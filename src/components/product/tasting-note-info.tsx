import React from 'react';
import cm from 'src/utils/class-merge';
import Image from 'next/image';
import { tastingText } from 'src/utils/functions';
import { type TastingNoteTexture } from 'src/api/swagger/data-contracts';
interface Props {
  info?:
    | {
        difficultyLevelOfTrimming: number | string;
        recommendedCookingWay: string[] | string;
        theScentOfTheSea: number | string;
      }
    | undefined;
  keyword?: TastingNoteTexture[] | undefined;
}

const TastingInfo = ({ info, keyword }: Props) => {
  const spanClass = 'text-[16px] font-bold leading-[24px] mb-[10px] ml-[20px] w-[30%] text-center';
  return (
    <div className='flex w-full flex-col items-center'>
      <div className=' mt-[20px] flex h-[180px] flex-col items-start  text-[18px]'>
        <div className='mb-[10px] flex w-[100%] flex-col items-center '>
          <div className='flex w-full flex-row  items-center px-[10px]'>
            <div className={spanClass}>손질 난이도 </div>
            <div className='relative bottom-[5px] flex flex-row shadow-lg'>
              {[1, 2, 3, 4, 5].map((item, idx) => {
                let isClass;
                const difficultyLevelOfTrimming = info?.difficultyLevelOfTrimming as number;
                const trimming = Math.floor(difficultyLevelOfTrimming);
                if (idx < trimming) {
                  isClass = true;
                } else {
                  isClass = false;
                }

                return (
                  <div
                    key={idx}
                    className={cm(
                      ' h-[15px]  w-[30px] justify-start  border border-l-0 border-grey-60',
                      { 'border-l-1 rounded-l-lg': idx === 0 },
                      { 'rounded-r-lg border-l-0': idx === 4 },
                      {
                        'bg-[#505fcd]': isClass,
                      },
                      {
                        'bg-transparent': !isClass,
                      },
                    )}
                  />
                );
              })}
            </div>
          </div>
          <div className='flex w-full flex-row px-[10px] '>
            <div className={spanClass}>바다향 </div>
            <div className='relative top-[5px] flex flex-row'>
              {[1, 2, 3, 4, 5].map((item, idx) => {
                let isClass;
                const theScentOfTheSea = info?.theScentOfTheSea as number;
                const sea = Math.floor(theScentOfTheSea);
                if (idx < sea) {
                  isClass = true;
                } else {
                  isClass = false;
                }

                return (
                  <div
                    key={idx}
                    className={cm(
                      ' h-[15px]  w-[30px] justify-start  border border-l-0 border-grey-60',
                      { 'border-l-1 rounded-l-lg': idx === 0 },
                      { 'rounded-r-lg border-l-0': idx === 4 },
                      {
                        'bg-[#505fcd]': isClass,
                      },
                      {
                        'bg-transparent': !isClass,
                      },
                    )}
                  />
                );
              })}
            </div>
          </div>
          <div className='mb-3 mt-10 flex w-full  flex-row'>
            <div className={spanClass} style={{ width: '100px', marginLeft: '0' }}>
              <div className='flex flex-row rounded-full border bg-[#5B83FF] text-white'>
                <span className='w-[78px] text-center text-[14px]'>식감</span>
                <div className='flex w-[22px] items-center rounded-full bg-[#7e9df9] text-center'>
                  <Image
                    unoptimized
                    src='/assets/icons/common/Check.png'
                    alt='check'
                    className='relative left-[3px]'
                    width={15}
                    height={8}
                  />
                </div>
              </div>
            </div>
            <div className='flex-low  ml-2  flex  flex-wrap  '>
              {keyword &&
                keyword.map((item, idx) => {
                  const text = item.texture as string;
                  return (
                    <span key={idx} className='font-500  relative top-[3px] text-[15px]'>
                      {tastingText(text, idx + 1, keyword.length)}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className='flex w-full flex-row '>
            <div className={spanClass} style={{ width: '100px', marginLeft: '0' }}>
              <div className='flex flex-row rounded-full border bg-[#5B83FF] text-white '>
                <span className='w-[78px] text-center text-[14px]'>추천조리법</span>
                <div className='flex w-[22px] items-center rounded-full bg-[#7e9df9] text-center'>
                  <Image
                    unoptimized
                    src='/assets/icons/common/Check.png'
                    alt='check'
                    className='relative left-[3px]'
                    width={15}
                    height={8}
                  />
                </div>
              </div>
            </div>
            <div className='flex-low  ml-2 flex'>
              <span className='font-500 relative top-[3px] mx-[2px] text-[15px] '>
                {info?.recommendedCookingWay ?? ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TastingInfo;
