import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { CartIcon } from 'src/components/common';
import { HeaderBanner } from 'src/components/common/header-banner';
import Layout from 'src/components/common/layout';
import { StoreItem } from 'src/components/store';
import { queryKey } from 'src/query-key';
import { useAlertStore, useBottomConfirmStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToLocaleString, handleRefresh } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';
import { FreeMode } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Loading from 'src/components/common/loading';

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
      if (pageParam === -1) return;
      const res = await (
        await client()
      ).selectRecommendStoreListV2({
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
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return lastPage?.length !== 0 ? nextId + 1 : -1;
      },
    },
  );

  const { data: likedData, refetch: likedRefecth } = useQuery(
    queryKey.scrapedStore,
    async () => {
      const res = await (await client()).selectScrapedStore();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    { enabled: selectedTab === 1 },
  );

  const { mutateAsync: likeStoreByUser, isLoading } = useMutation(
    async (args: { storeId: number; type: 'LIKE' | 'UNLIKE' }) =>
      await (await client()).likeStoreByUser(args),
  );

  const onMutate = ({ storeId, type }: { storeId: number; type: 'LIKE' | 'UNLIKE' }) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) {
      sessionStorage.setItem('Path', router.asPath);
      router.push('/login');
      return;
    }
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
  // 배너 확인용 유저
  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    }
  });
  useEffect(() => {
    sessionStorage.removeItem('storeView');
  }, []);

  return (
    <div className='max-md:w-[100vw]'>
      {/* Header */}
      {!user && (
        <div className='sticky top-0 z-50'>
          <HeaderBanner />
        </div>
      )}
      <DefaultSeo
        title='스토어'
        description='바로피쉬에 입점되어있는 믿을수있는 스토어'
        openGraph={{
          title: '스토어',
          description: '바로피쉬에 입점되어있는 믿을수있는 스토어,',
          siteName: '입점스토어',
          type: 'website',
        }}
      />
      <div
        className={
          !user
            ? 'sticky top-11 z-50 flex h-[56px] items-center gap-4 bg-white px-[18px]'
            : 'sticky top-0 z-50 flex h-[56px] items-center gap-4 bg-white px-[18px]'
        }
      >
        <div className='w-[13px]' />
        <p className='flex-1 text-center text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          스토어
        </p>
        {/* <Link href='/compare/storage'>
          <Image
            unoptimized
            src='/assets/icons/common/bookmark-title.svg'
            alt='bookmark'
            width={24}
            height={24}
          />
        </Link> */}
        <div
          onClick={() => {
            if (!getCookie(VARIABLES.ACCESS_TOKEN)) {
              sessionStorage.setItem('Path', router.asPath);
              router.push('/login');
              return;
            }
            router.push('/product/cart');
          }}
        >
          <CartIcon />
        </div>
      </div>
      <PullToRefresh pullingContent='' refreshingContent={<Loading />} onRefresh={handleRefresh}>
        <>
          {/* Tab */}
          <div className='mt-4 flex w-full items-center justify-around border-b border-b-[#F7F7F7] px-[46px] md:justify-between'>
            {['추천 ', '즐겨찾기'].map((v, idx) => {
              const isActive = selectedTab === idx;
              return (
                <button
                  key={`storeTab${idx}`}
                  className={cm(
                    'pb-1.5',
                    isActive
                      ? '-mb-[1px] border-b-2 border-b-primary-50'
                      : 'border-b border-b-white', // 파란선 1px 겹침 처리
                    idx === 0 ? 'px-[43.5px]' : 'px-[30px] ',
                  )}
                  onClick={() => {
                    if (idx === 1 && !getCookie(VARIABLES.ACCESS_TOKEN)) {
                      sessionStorage.setItem('Path', router.asPath);
                      router.push('/login');
                      return;
                    }
                    setSelectedTab(idx);
                  }}
                >
                  <p
                    className={cm(
                      'whitespace-pre text-[18px] leading-[24px] -tracking-[0.03em]',
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
                  // onClick={() => {
                  //   if (searchText.trim() === '') return;
                  //   setSearchState('result');
                  //   handleAddKeyword(searchText);
                  // }}
                  >
                    <Image
                      unoptimized
                      src='/assets/icons/common/search.svg'
                      alt='search'
                      width={24}
                      height={24}
                    />
                  </button>
                  <input
                    className='flex-1 bg-grey-90 text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-70'
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
                  style={{ marginInline: '-16px', paddingInline: '16px' }}
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
                            className={cm('text-[14px] font-bold -tracking-[0.03em] text-grey-50', {
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
              <div ref={ref} className='pb-10' />
            </Fragment>
          ) : (
            <Fragment>
              <div className='mt-6 flex items-center px-4'>
                <p className='flex-1 text-[16px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-60'>
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
                      'text-[16px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20',
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
                    <p className='text-[16px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20'>
                      취소
                    </p>
                  </button>
                )}
              </div>

              <div className='flex flex-col gap-5 px-4 pb-[100px] pt-6 '>
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
                {likedData?.length === 0 && <>{Empty('즐겨찾기 목록')}</>}
              </div>
            </Fragment>
          )}
        </>
      </PullToRefresh>
    </div>
  );
};
function Empty(text: string) {
  return (
    <div className='h-[calc(100dvb-136px)]'>
      <div className='grid h-full flex-1 place-items-center'>
        <div className='flex flex-col items-center gap-2'>
          <Image
            unoptimized
            src='/assets/icons/common/error.svg'
            alt='error'
            width={40}
            height={40}
          />
          <p className='whitespace-pre text-center text-[14px] font-medium leading-[24px] -tracking-[0.05em] text-[#B5B5B5]'>
            {`${text}이 없습니다.`}
          </p>
        </div>
      </div>
    </div>
  );
}

Store.getLayout = page => <Layout headerProps={{ disable: true }}>{page}</Layout>;

export default Store;
