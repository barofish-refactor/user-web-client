import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';
import { StoreItem } from 'src/components/store';
import { formatToLocaleString } from 'src/utils/functions';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';
import { useInView } from 'react-intersection-observer';
import { useAlertStore, useBottomConfirmStore } from 'src/store';
import { getCookie } from 'cookies-next';
import { VARIABLES } from 'src/variables';
import { useRouter } from 'next/router';

const perView = 10;

type sortType = 'RECENT' | 'BOOKMARK' | 'ORDER' | 'REVIEW';
const sortlist: sortType[] = ['RECENT', 'BOOKMARK', 'ORDER', 'REVIEW'];

/** 스토어 */
const Store: NextPageWithLayout = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const { setBottomConfirm } = useBottomConfirmStore();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const [selectedLiked, setSelectedLiked] = useState<number[]>([]);

  const variables = {
    type: sortlist[selectedSort],
    keyword: searchText.trim() !== '' ? searchText : undefined,
  };

  const { data, refetch, hasNextPage, fetchNextPage } = useInfiniteQuery(
    queryKey.store.list(variables),
    async ({ pageParam = 1 }) => {
      const res = await client().selectRecommendStoreList({
        ...variables,
        page: pageParam,
        take: perView,
      });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!selectedSort || selectedSort === 0,
      staleTime: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return nextId + 1;
      },
    },
  );

  const { data: likedData, refetch: likedRefecth } = useQuery(
    queryKey.scrapedStore,
    async () => {
      const res = await client().selectScrapedStore();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: selectedTab === 1,
      staleTime: 0,
    },
  );

  const { mutateAsync: likeStoreByUser, isLoading } = useMutation(
    (args: { storeId: number; type: 'LIKE' | 'UNLIKE' }) => client().likeStoreByUser(args),
  );

  const onMutate = ({ storeId, type }: { storeId: number; type: 'LIKE' | 'UNLIKE' }) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    likeStoreByUser({
      storeId,
      type,
    })
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
          likedRefecth();
        } else {
          setAlert({ message: res.data.errorMsg ?? '' });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage,
    onChange: inView => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <div className='max-md:w-[100vw]'>
      {/* Header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-4 bg-white px-[18px]'>
        <div className='w-[60px]' />
        <p className='flex-1 text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          스토어
        </p>
        <Link href='/compare/storage'>
          <Image
            src='/assets/icons/common/bookmark-title.svg'
            alt='bookmark'
            width={24}
            height={24}
          />
        </Link>
        <Link href='/product/cart'>
          <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
        </Link>
      </div>

      {/* Tab */}
      <div className='mt-4 flex w-full items-center justify-around border-b border-b-[#F7F7F7] px-[46px] md:justify-between'>
        {['추천 ', '즐겨찾기'].map((v, idx) => {
          const isActive = selectedTab === idx;

          return (
            <button
              key={`storeTab${idx}`}
              className={cm(
                'pb-1.5',
                isActive ? '-mb-[1px] border-b-2 border-b-primary-50' : 'border-b border-b-white', // 파란선 1px 겹침 처리
                idx === 0 ? 'px-[43.5px]' : 'px-[30px] ',
              )}
              onClick={() => {
                if (idx === 1 && !getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
                setSelectedTab(idx);
              }}
            >
              <p
                className={cm(
                  'whitespace-pre text-[16px] leading-[24px] -tracking-[0.03em]',
                  isActive ? 'font-semibold text-primary-50' : 'font-medium text-grey-50',
                )}
              >
                {v}
              </p>
            </button>
          );
        })}
      </div>

      {selectedTab === 0 ? (
        <Fragment>
          <div className='px-4 pt-[30px]'>
            <div className='flex h-10 items-center gap-2 rounded-lg bg-grey-90 px-3'>
              <button
                className=''
                // onClick={() => {
                //   if (searchText.trim() === '') return;
                //   setSearchState('result');
                //   handleAddKeyword(searchText);
                // }}
              >
                <Image src='/assets/icons/common/search.svg' alt='search' width={24} height={24} />
              </button>
              <input
                className='flex-1 bg-grey-90 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-70'
                placeholder='찾는 스토어가 있으신가요?'
                value={searchText}
                onChange={e => {
                  const text = e.target.value;
                  setSearchText(text);
                  // if (text.trim() === '') setSearchState('default');
                  // else setSearchState('searching');
                }}
                onFocus={() => {
                  // if (searchText.trim() === '') setSearchState('default');
                  // else setSearchState('searching');
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    if (searchText.trim() === '') return;
                    // setSearchState('result');
                    // handleAddKeyword(searchText);
                  }
                }}
              />
            </div>
          </div>
          <div className='mb-[30px] mt-10 px-4'>
            <Swiper
              freeMode
              modules={[FreeMode]}
              spaceBetween={6}
              style={{
                marginLeft: '-16px',
                marginRight: '-16px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              {['최신 입점순', '즐겨찾기 많은 순', '판매순', '리뷰많은 순'].map((v, idx) => {
                return (
                  <SwiperSlide key={`sort${idx}`} className='!w-auto'>
                    <button
                      className={cm(
                        'flex h-8 items-center justify-center rounded-lg border border-grey-90 px-3',
                        { 'border-transparent bg-primary-50': selectedSort === idx },
                      )}
                      onClick={() => {
                        setSelectedSort(idx);
                      }}
                    >
                      <p
                        className={cm('text-[12px] font-bold -tracking-[0.03em] text-grey-50', {
                          'text-white': selectedSort === idx,
                        })}
                      >
                        {v}
                      </p>
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className='flex flex-col gap-5 px-4 pb-[100px]'>
            {(data?.pages ?? []).map(x =>
              (x ?? [])?.map((v, idx) => {
                return (
                  <StoreItem
                    key={`store${idx}`}
                    data={v}
                    buttonType='star'
                    onButtonClick={e => {
                      e.preventDefault();
                      if (isLoading) return;
                      onMutate({
                        storeId: v.storeId ?? -1,
                        type: v.isLike ? 'UNLIKE' : 'LIKE',
                      });
                    }}
                  />
                );
              }),
            )}
          </div>
          <div ref={ref} />
        </Fragment>
      ) : (
        <Fragment>
          <div className='mt-6 flex items-center px-4'>
            <p className='flex-1 text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-60'>
              {`즐겨찾는 스토어 ${formatToLocaleString(likedData?.length ?? 0)}`}
            </p>
            <button
              onClick={() => {
                if (selectedLiked.length === 0)
                  return setAlert({ message: '스토어를 선택해주세요.' });
                setBottomConfirm({
                  title: '저장한 스토어 삭제',
                  content: '선택하신 스토어를 저장함에서 삭제하시겠습니까?',
                  onClick: () => {
                    selectedLiked.map(v => onMutate({ storeId: v, type: 'UNLIKE' }));
                  },
                });
              }}
            >
              <p
                className={cm(
                  'text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20',
                  { 'text-primary-50': selectedLiked.length > 0 },
                )}
              >
                삭제
              </p>
            </button>
            {selectedLiked.length > 0 && (
              <button
                className='ml-10'
                onClick={() => {
                  setSelectedLiked([]);
                }}
              >
                <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20'>
                  취소
                </p>
              </button>
            )}
          </div>

          <div className='flex flex-col gap-5 px-4 pb-[100px] pt-6'>
            {(likedData ?? []).map((v, idx) => {
              const storeId = v.storeId ?? -1;
              return (
                <StoreItem
                  key={`store${idx}`}
                  data={v}
                  buttonType='select'
                  isSelected={selectedLiked.includes(storeId)}
                  onButtonClick={e => {
                    e.preventDefault();
                    const tmp = [...selectedLiked];
                    const findIndex = tmp.findIndex(x => storeId === x);
                    if (findIndex > -1) tmp.splice(findIndex, 1);
                    else tmp.push(storeId);
                    setSelectedLiked(tmp);
                  }}
                />
              );
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Store.getLayout = page => <Layout headerProps={{ disable: true }}>{page}</Layout>;

export default Store;
