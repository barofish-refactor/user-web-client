import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import {
  type DeleteSaveProductsPayload,
  type CustomResponseListSearchKeyword,
  type SaveProductPayload,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import Layout from 'src/components/common/layout';
import { HomeCurationItem, HomeProductList } from 'src/components/home';
import { PopularSearchTerms, RecentSearches } from 'src/components/search';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore, useFilterStore, type indexFilterType, useToastStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob } from 'src/utils/functions';
import { aToB, bToA, safeParse, type sortType } from 'src/utils/parse';
import { REG_EXP } from 'src/utils/regex';
import { VARIABLES } from 'src/variables';

const perView = 10;

interface Props {
  initialData: CustomResponseListSearchKeyword;
}

/** 검색 */
const Search: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { v = '', f } = router.query;
  const [searchText, setSearchText] = useState<string>(v as string);
  const [searchState, setSearchState] = useState<'default' | 'searching' | 'result'>(); // 기본, 검색중, 결과
  const [recentData, setRecentData] = useState<string[]>([]); // 최근 검색어
  const inputRef = useRef<HTMLInputElement>(null);
  const { filter, setFilter } = useFilterStore();
  const { setAlert } = useAlertStore();
  const { setToast } = useToastStore();

  const [dummyFilter, setDummyFilter] = useState<indexFilterType[]>();
  const [savedFilter, setSavedFilter] = useState<number[]>([]);
  const [sort, setSort] = useState<sortType>('RECOMMEND'); // default: 추천순

  const { data: rankData } = useQuery(
    queryKey.topSearchKeywords,
    async () => {
      const { selectTopSearchKeywords } = await client();
      const res = await selectTopSearchKeywords();
      return res.data;
    },
    { initialData },
  );

  const { data: curationData } = useQuery(queryKey.mainCuration, async () => {
    const res = await (await client()).selectMainCurationList();
    if (res.data.isSuccess) {
      return res.data.data;
    } else setAlert({ message: res.data.errorMsg ?? '' });
  });

  const {
    data: searchData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    queryKey.search.list({
      filterFieldIds: savedFilter.length > 0 ? savedFilter.join(',') : undefined,
      sortby: sort,
      keyword: v as string,
    }),
    async ({ pageParam = 1 }) => {
      if (pageParam === -1) return;
      const res = await (
        await client()
      ).selectProductListByUser({
        filterFieldIds: savedFilter.length > 0 ? savedFilter.join(',') : undefined,
        sortby: sort,
        page: pageParam,
        take: perView,
        keyword: v as string,
      });
      if (res.data.isSuccess) {
        return res.data.data;
      } else setAlert({ message: res.data.errorMsg ?? '' });
    },
    {
      enabled: v !== '',
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return lastPage?.content?.length !== 0 ? nextId + 1 : -1;
      },
    },
  );

  const { data: directData } = useQuery(
    queryKey.search.list(searchText),
    async () => {
      const { searchingProductDirect } = await client();
      const res = await searchingProductDirect({ keyword: searchText as string });
      return res.data.data;
    },
    { enabled: searchText !== '' },
  );

  const { mutateAsync: saveProduct, isLoading: isSaveLoading } = useMutation(
    async (args: SaveProductPayload) =>
      await (await client()).saveProduct(args, { type: ContentType.FormData }),
  );

  const { mutateAsync: deleteSaveProducts, isLoading: isDeleteLoading } = useMutation(
    async (args: DeleteSaveProductsPayload) =>
      await (await client()).deleteSaveProducts(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: SaveProductPayload, isRefetch = true) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    if (isSaveLoading) return;
    saveProduct({ data: formatToBlob<SaveProductPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setToast({
            text: '1개의 상품이 저장함에 담겼어요.',
            onClick: () => router.push('/compare/storage'),
          });
          if (isRefetch) refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const onDeleteSaveProductsMutate = ({ data }: DeleteSaveProductsPayload) => {
    if (isDeleteLoading) return;
    deleteSaveProducts({ data: formatToBlob<DeleteSaveProductsPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]';
      setRecentData(JSON.parse(result));
    }

    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(recentData));
  }, [recentData]);

  // 검색어 추가
  const handleAddKeyword = (text: string) => {
    const trim = text.trim();
    const deleted = recentData.filter(data => data !== trim);
    setRecentData([trim, ...deleted]);
    router.replace({ pathname: '/search', query: { v: text } });
  };

  // 검색어 삭제
  const handleRemoveKeyword = (text: string) => {
    const nextKeyword = recentData.filter(data => data !== text);
    setRecentData(nextKeyword);
  };

  // 검색어 전체 삭제
  const handleClearKeywords = () => {
    setRecentData([]);
  };

  const onSearch = (text: string) => {
    setSearchText(text);
    setSearchState('result');
    handleAddKeyword(text);
  };

  useEffect(() => {
    if (searchText.trim() === '') setSearchState('default');
  }, [searchText]);

  useEffect(() => {
    if (filter) {
      setDummyFilter(filter);

      router.replace({
        pathname: '/search',
        query: {
          ...router.query,
          f: aToB(JSON.stringify(filter.map(v => v.id))),
        },
      });
      setFilter(null);
    } else {
      // setSavedFilter(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (router.isReady && f) {
      try {
        setSavedFilter(safeParse(bToA(f as string)) ?? []);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSavedFilter([]);
    }
  }, [f, router.isReady]);

  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage,
    onChange: inView => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <div className='max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <BackButton />
        <div className='ite ms-center flex h-[40px] flex-1 gap-2 rounded-md bg-grey-90 pl-3'>
          <button
            onClick={() => {
              if (searchText.trim() === '') return;
              setSearchState('result');
              handleAddKeyword(searchText);
            }}
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
            ref={inputRef}
            className='flex-1 bg-grey-90 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-80'
            placeholder='검색어를 입력해주세요.'
            maxLength={50}
            value={searchText}
            onChange={e => {
              const text = e.target.value.replaceAll(REG_EXP.emoji, '');
              setSearchText(text);
              if (text.trim() === '') setSearchState('default');
              else setSearchState('searching');
            }}
            onFocus={() => {
              // if (searchText.trim() === '') setSearchState('default');
              // else setSearchState('searching');
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (searchText.trim() === '') {
                  router.replace('/search');
                  setSearchState('default');
                  return;
                }
                setSearchState('result');
                handleAddKeyword(searchText);
              }
            }}
          />
          <button
            className='h-full cursor-default pr-3'
            onClick={() => {
              setSearchText('');
              router.replace({ pathname: '/search' });
            }}
          >
            <Image
              unoptimized
              src='/assets/icons/search/close-search.svg'
              alt='delete'
              width={16}
              height={16}
              className='cursor-pointer'
            />
          </button>
        </div>
      </div>
      {/* content */}
      <div className='p-4'>
        {searchState === 'default' ? (
          <>
            <RecentSearches
              recentData={recentData}
              setSearchText={onSearch}
              handleAddKeyword={handleAddKeyword}
              handleRemoveKeyword={handleRemoveKeyword}
              handleClearKeywords={handleClearKeywords}
            />
            <PopularSearchTerms data={rankData.data ?? []} setSearchText={onSearch} />
          </>
        ) : searchState === 'searching' ? (
          <div className=''>
            <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>
              상품 바로가기
            </p>
            <div className='flex flex-col'>
              {(directData ?? []).map((v, idx) => {
                return (
                  <Link
                    key={`searching${idx}`}
                    className='flex h-[52px] items-end border-b border-b-grey-90 pb-3'
                    href={{ pathname: '/product', query: { id: v.id } }}
                  >
                    <p className='line-clamp-1 text-start text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
                      {`${v.title}`}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : isLoading ? null : searchData?.pages &&
          searchData.pages.length > 0 &&
          (searchData?.pages.filter(x => (x?.content ?? []).length > 0) ?? []).length > 0 ? (
          <Fragment>
            <HomeProductList
              storeType='search'
              storeId={undefined}
              className='p-0.5'
              dataDto={searchData?.pages ?? []}
              filter={dummyFilter}
              sort={sort}
              setSort={setSort}
              onMutate={onMutate}
              onDeleteSaveProductsMutate={onDeleteSaveProductsMutate}
            />
            <div ref={ref} className='pb-10' />
          </Fragment>
        ) : (
          // 검색 결과 없을 경우
          <div className=''>
            <div className='flex h-[176px] flex-col items-center justify-center gap-2 px-4'>
              <Image
                unoptimized
                src='/assets/icons/search/search-error.svg'
                alt='up'
                width={40}
                height={40}
              />
              <p className='whitespace-pre-wrap break-all text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
                {`‘${v}’의 검색결과가 없습니다.\n다른 키워드로 검색해보세요.`}
              </p>
            </div>
            <div className='-mx-4 mt-4 h-2 bg-[#F2F2F2]' />
            {curationData && curationData.length > 0 && (
              <HomeCurationItem
                className='mt-[30px] p-0'
                data={curationData[0]}
                showViewAll={false}
                onMutate={onMutate}
                onDeleteSaveProductsMutate={onDeleteSaveProductsMutate}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Search.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const { selectTopSearchKeywords } = await client();
  return {
    props: { initialData: (await selectTopSearchKeywords()).data },
  };
};

export default Search;
