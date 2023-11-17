import React from 'react';

const TastingInfo = ({ info }: any) => {
  return (
    <>
      <div className='mb-[15px] flex flex-row'>
        <span className='ml-2 mr-2 flex h-[34px] items-center justify-center rounded-lg bg-primary-90 px-2'>
          <p className='text-[15px] font-bold text-primary-70'>부드러워요</p>
        </span>
        <span className='flex h-[34px] items-center justify-center rounded-lg bg-primary-90 px-2'>
          <p className='text-[15px] font-bold text-primary-70'>뭐가 부드러워요</p>
        </span>
      </div>
      <div className='ml-[20px] flex w-full flex-col items-start text-[18px]'>
        <div className='mb-[10px] mt-3 '>
          <span className=''>손질 난이도 :</span>
          <span
            className={
              info.난이도.includes('상')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70  '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            상
          </span>
          <span
            className={
              info.난이도.includes('중')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70  '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            중
          </span>
          <span
            className={
              info.난이도.includes('하')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70  '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            하
          </span>
        </div>
        <div className='mb-[10px]'>
          <span className=''>바다향 :</span>
          <span
            className={
              info.바다향.includes('초')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70  '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            초
          </span>
          <span
            className={
              info.바다향.includes('중')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70  '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            중
          </span>
          <span
            className={
              info.바다향.includes('고')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70  '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            고
          </span>
        </div>
        <div className='mb-[30px]'>
          <span className=''>추천 조리법 :</span>
          <span
            className={
              info.추천.includes('회')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70  '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            회
          </span>
          <span
            className={
              info.추천.includes('구이')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70 '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            구이
          </span>
          <span
            className={
              info.추천.includes('찜')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70 '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            찜
          </span>
          <span
            className={
              info.추천.includes('조림')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70 '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            조림
          </span>
          <span
            className={
              info.추천.includes('탕')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70 '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            탕
          </span>
          <span
            className={
              info.추천.includes('튀김')
                ? 'ml-1 mr-1 rounded-[45%] border bg-primary-90 p-[3px] pl-[5px] pr-[5px] text-primary-70 '
                : 'ml-1 mr-1 text-grey-50'
            }
          >
            튀김
          </span>
        </div>
      </div>
    </>
  );
};

export default TastingInfo;
