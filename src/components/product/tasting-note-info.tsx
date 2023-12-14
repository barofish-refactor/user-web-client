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
  const spanClass = 'text-[16px] text-[#333333]  leading-[24px]  ml-[20px] w-[30%] text-center';
  const divClass =
    'text-[16px] text-[#333333] font-semibold font leading-[24px] mb-[10px] ml-[20px] w-[30%] text-center';
  return (
    <div className='flex w-full flex-col items-center'>
      <div className=' mt-[40px] flex h-[180px] flex-col items-start  text-[18px]'>
        <div className='mb-[10px] flex w-[100%] flex-col items-center '>
          <div className='flex w-full flex-row  items-center px-[10px]'>
            <div className={divClass}>손질 난이도 </div>
            <div className='relative bottom-[5px] flex flex-row'>
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
                      ' h-[15px]  w-[30px] justify-start  border border-l-0 border-grey-70 text-[#333333]',
                      { 'border-l-1 rounded-l-lg': idx === 0 },
                      { 'rounded-r-lg border-l-0': idx === 4 },
                      {
                        'bg-[#85a4ff]': isClass,
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
            <div className={divClass}>바&nbsp;&nbsp; 다&nbsp;&nbsp; 향 </div>
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
                      'h-[15px]  w-[30px] justify-start  border border-l-0 border-grey-70 text-[#333333]',
                      { 'border-l-1 rounded-l-lg': idx === 0 },
                      { 'rounded-r-lg border-l-0': idx === 4 },
                      {
                        'bg-[#85a4ff]': isClass,
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
          <div className='mt-7 flex w-full  flex-row'>
            <div
              className={spanClass}
              style={{ width: '110px', marginLeft: '0', marginBottom: '0' }}
            >
              <Image
                unoptimized
                src='/assets/icons/common/tastingTag1.png'
                alt='tastingTag'
                className='relative bottom-[10px]   h-[63px] w-[102px]'
                width={102}
                height={63}
              />
            </div>
            <div className='flex-low   flex  flex-wrap  '>
              {keyword &&
                keyword.map((item, idx) => {
                  const text = item.texture as string;
                  return (
                    <span key={idx} className='font-500  relative top-[13px] text-[14px] '>
                      {tastingText(text, idx + 1, keyword.length)}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className='flex w-full flex-row'>
            <div className={spanClass} style={{ width: '110px', marginLeft: '0' }}>
              <Image
                unoptimized
                src='/assets/icons/common/tastingTag2.png'
                alt='tastingTag'
                className='relative bottom-[25px] h-[63px] w-[102px]'
                width={102}
                height={63}
              />
            </div>
            <div className='flex-low  flex'>
              <span className='font-500 relative bottom-[2px] mx-[2px] text-[14px] '>
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
