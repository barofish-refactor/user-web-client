import React from 'react';
import cm from 'src/utils/class-merge';
import Image from 'next/image';
import { tastingText } from 'src/utils/functions';
interface Props {
  info?:
    | {
        difficultyLevelOfTrimming: string;
        recommendedCookingWay: string;
        theScentOfTheSea: string;
      }
    | any;
  keyword?:
    | {
        texture: string;
        score: number;
      }[]
    | any;
}

const TastingInfo = ({ info, keyword }: Props) => {
  const spanClass = 'flex-low flex text-[16px] font-bold leading-[24px] mb-[10px]';

  return (
    <>
      <div className='ml-[20px] flex h-[180px] w-full flex-col items-start px-[20px] text-[18px]'>
        <div className='mb-[10px] flex w-[100%] flex-row'>
          <div className='flex w-[50%] flex-col'>
            <span className={spanClass}>
              <Image
                unoptimized
                alt='heart'
                width={2}
                height={15}
                src='/assets/icons/product/product-stick.svg'
              />
              &nbsp;손질 난이도{' '}
            </span>
            <div className='flex flex-row'>
              {[1, 2, 3, 4, 5].map((item, idx) => {
                let isClass;
                if (idx < Number(info?.difficultyLevelOfTrimming)) {
                  isClass = true;
                } else {
                  isClass = false;
                }

                return (
                  <div
                    key={idx}
                    className={cm(
                      ' mx-[1.5px] h-[18px]  w-[18px] justify-start rounded-full border border-grey-60',
                      {
                        'bg-[#5B83FF]': isClass,
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
          <div className='flex w-[50%] flex-col'>
            <span className={spanClass}>
              <Image
                unoptimized
                alt='heart'
                width={2}
                height={15}
                src='/assets/icons/product/product-stick.svg'
              />
              &nbsp;식감{' '}
            </span>
            <div className='flex-low flex flex-wrap '>
              {keyword &&
                keyword.map((item: { texture: string }, idx: number) => {
                  // let textChange= item
                  let itemText;
                  if (idx === keyword.length - 1) {
                    itemText = item.texture;
                  } else {
                    itemText = item.texture + ',';
                  }
                  console.log(tastingText(item.texture, idx + 1, keyword.length));

                  return (
                    <span key={idx} className='font-500  text-[15px]'>
                      {tastingText(item.texture, idx + 1, keyword.length)}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
        <div className='mb-[30px] mt-3 flex w-[100%] flex-row pb-3'>
          <div className='flex w-[50%] flex-col'>
            <span className={spanClass}>
              <Image
                unoptimized
                alt='heart'
                width={2}
                height={15}
                src='/assets/icons/product/product-stick.svg'
              />
              &nbsp;바다향{' '}
            </span>
            <div className='flex flex-row'>
              {[1, 2, 3, 4, 5].map((item, idx) => {
                let isClass;
                if (idx < Number(info?.theScentOfTheSea)) {
                  isClass = true;
                } else {
                  isClass = false;
                }

                return (
                  <div
                    key={idx}
                    className={cm(
                      ' mx-[1.5px] h-[18px]  w-[18px] justify-start rounded-full border border-grey-60',
                      {
                        'bg-[#5B83FF]': isClass,
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
          <div className='flex w-[50%] flex-col'>
            <span className={spanClass}>
              <Image
                unoptimized
                alt='heart'
                width={2}
                height={15}
                src='/assets/icons/product/product-stick.svg'
              />
              &nbsp;추천조리법{' '}
            </span>
            <div className='flex-low flex'>
              <span className='font-500 mx-[2px] text-[15px]'>
                {info?.recommendedCookingWay ?? ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TastingInfo;
