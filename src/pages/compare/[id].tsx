import {
  useQuery,
  // useMutation
} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { client } from 'src/api/client';
import // type AddCompareSetPayload,
// type CompareFilterDto,
'src/api/swagger/data-contracts';
import { CartIcon } from 'src/components/common';
import Chat from 'src/components/common/chat';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import {
  calcDiscountRate,
  formatToLocaleString,
  // formatToBlob
} from 'src/utils/functions';

// const initialTable: CompareProductDto[] = [{}];
interface ChatProps {
  tastes: {
    taste: string;
    score: number;
  }[];
  textures: {
    texture: string;
    score: number;
  }[];
  recommendedCookingWay: string;
  difficultyLevelOfTrimming: string;
  theScentOfTheSea: string;
}

/** 비교하기 상세 */
const CompareDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();

  const { id, type } = router.query;
  // const [selectedTag, setSelectedTag] = useState<number[]>([]);
  const [chatData, setChatData] = useState<ChatProps[]>([]);

  // const [compareList, setCompareList] = useState<CompareFilterDto[]>([]);
  const { data: set } = useQuery(
    queryKey.compareSet.detail(id),
    async () => {
      const res = await (type === 'id'
        ? (await client()).selectCompareSet(Number(id))
        : (await client()).getMyProductTastingNotes1({ productIds: String(id) }));
      if (res.data.isSuccess) {
        if (type === 'list' && res.data.data) {
          const Data = res.data.data.map((item: any) => {
            return {
              tastes: item.tastes,
              textures: item.textures,
              recommendedCookingWay: item.recommendedCookingWay,
              difficultyLevelOfTrimming: item.difficultyLevelOfTrimming,
              theScentOfTheSea: item.theScentOfTheSea,
            };
          });
          setChatData(Data);
        }
        return res.data.data;
      } else {
        setAlert({
          message: res.data.errorMsg ?? '',
          onClick: () => {
            router.back();
          },
        });
      }
    },
    {
      enabled: !!id && !!type,
    },
  );

  // const { mutateAsync: addCompareSet, isLoading: isAddLoading } = useMutation(
  //   async (args: AddCompareSetPayload) => await (await client()).addCompareSet(args),
  // );

  // const onAddCompareSetMutate = (args: AddCompareSetPayload) => {
  //   if (isAddLoading) return;
  //   addCompareSet(formatToBlob(args, true))
  //     .then(res => {
  //       if (res.data.isSuccess) {
  //         setAlert({ message: '조합을 저장했습니다.', type: 'success' });
  //       } else setAlert({ message: res.data.errorMsg ?? '' });
  //     })
  //     .catch(error => console.log(error));
  // };

  // useEffect(() => {
  //   if (!isLoading && set) {
  //     setCompareList(set[0].compareFilters ?? []);
  //   }
  // }, [set, isLoading]);
  // border border-[#E2E2E2]
  // border-b border-r border-[#E2E2E2] bg-[#F7F7F7]

  return (
    <div className='pb-[140px] max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center bg-white pl-4 pr-[18px]'>
        <BackButton />
        <p className='flex-1 text-center text-[16px] font-bold -tracking-[0.03em] text-grey-10'>
          피쉬 비교하기
        </p>
        <Link href='/product/cart'>
          <CartIcon />
        </Link>
      </div>

      {/* <div className='px-4 pt-5'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          비교대상
        </p>
        <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
          선택한 상품을 한눈에 비교하세요.
        </p>
      </div> */}
      {/* bg-[#F7F9FA] */}
      <div className='flex px-4 pt-5'>
        {set?.map((v: any, idx: number) => {
          return (
            <div key={`set${idx}`} className={cm('w-[50%]  px-6 py-4 ')}>
              <Link
                className='flex flex-col items-center gap-6 '
                href={{ pathname: '/product', query: { id: v.productId } }}
              >
                <div className='relative h-[150px] w-[150px]  overflow-hidden rounded-lg'>
                  <Image
                    unoptimized
                    width={150}
                    height={150}
                    src={v.image ?? ''}
                    alt='product'
                    draggable={false}
                    className='aspect-square w-full object-cover'
                  />
                  <div
                    className={cm(
                      'absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-br-lg bg-[#1744BF]/90',
                      { 'bg-[#5B83FF]/90': idx === 0 },
                      { 'bg-[#849ee6]/90': idx === 1 },
                    )}
                  >
                    <p className='text-[14px] font-bold text-white'>{idx + 1}</p>
                  </div>
                </div>
                <div className='flex flex-1 gap-6 '>
                  <div className='flex-1 '>
                    <div className='flex-low flex w-full text-[16px] font-bold leading-[22px] -tracking-[0.05em] text-black'>
                      <p className='w-[80%]'> {`${v.storeName ?? ''}`}</p>
                      <Image
                        unoptimized
                        src='/assets/icons/common/chevron-compare.svg'
                        alt='chevron'
                        width={24}
                        height={24}
                        draggable={false}
                      />
                    </div>

                    <p className='mt-2 text-[13px] font-medium leading-[16px] -tracking-[0.05em] text-black'>
                      {v.productTitle}
                    </p>

                    <div className='mt-1.5 flex items-center gap-0.5'>
                      {(v.originPrice ?? 0) !== 0 && (
                        <p className='text-[16px] font-bold leading-[20px] -tracking-[0.05em] text-[#FF4A09]'>{`${calcDiscountRate(
                          v.originPrice,
                          v.discountPrice,
                        )}%`}</p>
                      )}
                      <p className='text-[16px] font-bold leading-[20px] -tracking-[0.05em] text-black'>{`${formatToLocaleString(
                        v.discountPrice,
                      )}원`}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* <div className='px-4 pt-6'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          선택상품 비교하기
        </p>
        <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
          비교하고 싶으신 항목을 선택해주세요.
        </p>
      </div> */}
      {/* <div className='flex flex-wrap gap-1.5 px-4 pt-5'>
        {compareList.map((v, idx) => {
          return (
            <button
              key={`tag${idx}`}
              className={cm(
                'flex h-8 items-center justify-center rounded-full border border-grey-80 px-3',
                { 'border-secondary-50 bg-secondary-90': selectedTag.includes(idx) },
              )}
              onClick={() => {
                const tmp = [...selectedTag];
                const findIndex = tmp.findIndex(x => idx === x);
                if (findIndex > -1) tmp.splice(findIndex, 1);
                else tmp.push(idx);
                setSelectedTag(tmp);
              }}
            >
              <p
                className={cm('text-[12px] font-bold -tracking-[0.03em] text-grey-60', {
                  'text-secondary-50': selectedTag.includes(idx),
                })}
              >
                {v.name ?? ''}
              </p>
            </button>
          );
        })}
      </div> */}
      <div className='mb-10 flex items-center'>{chatData && <Chat data={chatData} />}</div>
      <div
        className={cm('mx-4  grid grid-cols-4 overflow-hidden rounded-b-lg  ', {
          'grid-cols-2': set?.length === 2,
        })}
      >
        {set &&
          set.map((v: any, idx: number) => {
            // if (idx === 0) return null;
            // if (idx === 0) {
            //   const text = x === -2 ? '' : x === -1 ? '판매처' : compareList[x].name;
            //   return (
            //     <div
            //       key={`grid${i}/${idx}`}
            //       className={cm(
            //         'flex h-[42px] items-center border-b border-r border-[#E2E2E2] bg-[#F1F1F1] pl-3',
            //         { 'bg-[#F7F7F7]': i !== 0, 'border-b-0': i === selectedTag.length + 1 },
            //       )}
            //     >
            //       <p className='text-[12px] font-bold -tracking-[0.03em] text-grey-20'>{text}</p>
            //     </div>
            //   );
            // }
            // const compareValue =
            //   i > 1 ? v.filterValues?.filter(w => w.compareFilterId === compareList[x].id) : [];

            // const text = x === -2 ? '' : x === -1 ? '판매처' : compareList[x].name;
            return (
              <div
                key={`grid${idx}`}
                className={cm('flex h-[auto] flex-col items-center  px-[7px] ', {
                  // 'bg-white': i !== 0,
                  // 'border-b-0': i === selectedTag.length + 1,
                  'border-r-0': idx === 3,
                })}
              >
                <div
                  className={cm(
                    'mb-[10px] flex h-7 w-full items-center justify-start rounded pl-2',
                    {
                      'bg-[#6F91F8]/90': idx + 1 === 1,
                      'bg-[#849ee6]/90': idx + 1 === 2,
                    },
                  )}
                >
                  <p className='text-[14px] font-bold -tracking-[0.03em] text-white'>{idx + 1}</p>
                </div>

                <div className='mb-[15px]  w-full flex-col border-b-[2px] border-[#e2e2e2] pb-[15px] pl-1'>
                  <p className='mb-2 line-clamp-1 text-[13px] font-bold -tracking-[0.05em] text-[#3c3b3b]'>
                    식감
                  </p>
                  {v.textures.map((item: any, idx: number) => {
                    let itmeText = item.texture;
                    if (itmeText === 'texture1') {
                      if (v.textures.length - 1 !== idx) {
                        return (itmeText = '부드러워요,');
                      } else return (itmeText = '부드러워요');
                    }
                    if (itmeText === 'texture2') {
                      if (v.textures.length - 1 !== idx) {
                        return (itmeText = '쫄깃해요,');
                      } else return (itmeText = '쫄깃해요');
                    }
                    if (itmeText === 'texture3') {
                      if (v.textures.length - 1 !== idx) {
                        return (itmeText = '물렁해요,');
                      } else return (itmeText = '물렁해요');
                    }
                    if (itmeText === 'texture4') {
                      if (v.textures.length - 1 !== idx) {
                        return (itmeText = '아삭해요,');
                      } else return (itmeText = '아삭해요');
                    }
                    if (itmeText === 'texture5') {
                      if (v.textures.length - 1 !== idx) {
                        return (itmeText = '안물렁거려요,');
                      } else return (itmeText = '안물렁거려요');
                    }
                    if (itmeText === 'texture6') {
                      if (v.textures.length - 1 !== idx) {
                        return (itmeText = '맛있어요,');
                      } else return (itmeText = '맛있어요');
                    }

                    return (
                      <p
                        key={idx}
                        className='line-clamp-1 flex text-[13px] font-medium -tracking-[0.05em] text-[#797979] '
                      >
                        {itmeText}
                      </p>
                    );
                  })}
                </div>
                <div className='mb-[15px] w-full  flex-col border-b-[2px] border-[#e2e2e2] pb-[15px] pl-1'>
                  <p className='mb-3 line-clamp-1 text-[13px] font-bold -tracking-[0.05em] text-[#3c3b3b]'>
                    손질난이도
                  </p>
                  <div className='flex flex-row pb-[10px]'>
                    {[1, 2, 3, 4, 5].map((item, idx) => {
                      let isClass;
                      if (idx < Number(v.difficultyLevelOfTrimming)) {
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
                              'bg-[#6F91F8]': isClass,
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
                <div className='mb-[15px] w-full  flex-col border-b-[2px] border-[#e2e2e2] pb-[15px] pl-1'>
                  <p className='mb-3 line-clamp-1 text-[13px] font-bold -tracking-[0.05em] text-[#3c3b3b]'>
                    바다향
                  </p>
                  <div className='flex flex-row pb-[10px]'>
                    {[1, 2, 3, 4, 5].map((item, idx) => {
                      let isClass;
                      if (idx < Number(v.theScentOfTheSea)) {
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
                <div className='mb-[15px]  w-full flex-col border-b-[2px] border-[#e2e2e2] pb-[15px] pl-1'>
                  <p className='mb-2 line-clamp-1 text-[13px] font-bold -tracking-[0.05em] text-[#3c3b3b]'>
                    추천 조리법
                  </p>
                  {v.recommendedCookingWay[0]}
                </div>
              </div>
            );
          })}
      </div>

      {/* <div className='fixed bottom-0 z-50 w-[375px] bg-white px-4 pb-7 pt-2 max-md:w-full'>
        <button
          className='flex h-[52px] w-full items-center justify-center rounded-lg border-0 bg-primary-50'
          onClick={() => {
            if (set && set.length > 0) onAddCompareSetMutate(set.map(x => x.id ?? -1));
          }}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>이 조합 저장하기</p>
        </button>
      </div> */}
    </div>
  );
};

CompareDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default CompareDetail;
