import { useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import { type CustomResponseListSearchKeyword } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { HomeProductList } from 'src/components/home';
import { PopularSearchTerms, RecentSearches } from 'src/components/search';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';

interface Props {
  initialData: CustomResponseListSearchKeyword;
}

/** 검색 */
const Search: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { v = '' } = router.query;
  const [searchText, setSearchText] = useState<string>(v as string);
  const [searchState, setSearchState] = useState<'default' | 'searching' | 'result'>(); // 기본, 검색중, 결과
  const [recentData, setRecentData] = useState<string[]>([]); // 최근 검색어

  const { data: rankData } = useQuery(
    queryKey.topSearchKeywords,
    async () => {
      const { selectTopSearchKeywords } = client();
      const res = await selectTopSearchKeywords();
      return res.data;
    },
    {
      initialData,
      staleTime: 0,
    },
  );

  const { data: searchData, isLoading } = useQuery(
    queryKey.search.list(v),
    async () => {
      const { searchProduct } = client();
      const res = await searchProduct({ keyword: v as string, page: 1, take: 10 });
      return res.data.data;
    },
    {
      enabled: v !== '',
      staleTime: 0,
    },
  );

  const { data: directData } = useQuery(
    queryKey.search.list(searchText),
    async () => {
      const { searchingProductDirect } = client();
      const res = await searchingProductDirect({ keyword: searchText as string });
      console.log(res.data.data);
      return res.data.data;
    },
    {
      enabled: searchText !== '',
      staleTime: 0,
    },
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]';
      setRecentData(JSON.parse(result));
    }
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

  return (
    <div className='max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <BackButton />
        <div className='ite ms-center flex h-[40px] flex-1 gap-2 rounded-md bg-grey-90 pl-3'>
          <button
            className=''
            onClick={() => {
              if (searchText.trim() === '') return;
              setSearchState('result');
              handleAddKeyword(searchText);
            }}
          >
            <Image src='/assets/icons/common/search.svg' alt='search' width={24} height={24} />
          </button>
          <input
            className='flex-1 bg-grey-90 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-80'
            placeholder='검색어를 입력해주세요.'
            value={searchText}
            onChange={e => {
              const text = e.target.value;
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
                  <button
                    key={`searching${idx}`}
                    className='flex h-[52px] items-end border-b border-b-grey-90 pb-3'
                    onClick={() => {
                      //
                    }}
                  >
                    <p className='line-clamp-1 text-start text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
                      {`${v.title}`}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : isLoading ? null : searchData && searchData.length > 0 ? (
          <HomeProductList className='p-0.5' data={searchData ?? []} dataDto={searchData ?? []} />
        ) : (
          // 검색 결과 없을 경우
          <div className=''>
            <div className='flex h-[176px] flex-col items-center justify-center gap-2'>
              <Image src='/assets/icons/search/search-error.svg' alt='up' width={40} height={40} />
              <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
                {`‘${v}’의 검색결과가 없습니다.\n다른 키워드로 검색해보세요.`}
              </p>
            </div>
            <div className='mt-4 h-2 bg-[#F2F2F2]' />
            {/* <HomeCurationItem
              className='p-0'
              data={[]}
            /> */}
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
  const { selectTopSearchKeywords } = client();
  return {
    props: { initialData: (await selectTopSearchKeywords()).data },
  };
};

export default Search;
