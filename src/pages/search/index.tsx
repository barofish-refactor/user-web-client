import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from 'src/components/common/layout';
import { HomeCurationItem } from 'src/components/home';
import ProductList from 'src/components/home/product-list';
import { PopularSearchTerms, RecentSearches } from 'src/components/search';
import { type NextPageWithLayout } from 'src/types/common';

/**
 * 랜덤 한글 테스트 (임의의 한글 문자 생성)
 * @returns string
 */
export function random_hangul() {
  return String.fromCharCode(44031 + Math.ceil(11172 * Math.random()));
}

/** 검색 */
const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const [searchState, setSearchState] = useState<'default' | 'searching' | 'result'>(); // 기본, 검색중, 결과
  const [recentData, setRecentData] = useState<string[]>([]); // 최근 검색어

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
        <button onClick={() => router.back()}>
          <Image src='/assets/icons/common/arrow-back.svg' alt='back' width={24} height={24} />
        </button>
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
            className='flex-1 bg-grey-90 text-[14px] font-normal leading-[22px] -tracking-[3%] text-grey-10 placeholder:text-grey-80'
            placeholder='검색어를 입력해주세요.'
            value={searchText}
            onChange={e => {
              const text = e.target.value;
              setSearchText(text);
              if (text.trim() === '') setSearchState('default');
              else setSearchState('searching');
            }}
            onFocus={() => {
              if (searchText.trim() === '') setSearchState('default');
              else setSearchState('searching');
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (searchText.trim() === '') return;
                setSearchState('result');
                handleAddKeyword(searchText);
              }
            }}
          />
          <button className='h-full cursor-default pr-3' onClick={() => setSearchText('')}>
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
            <PopularSearchTerms setSearchText={onSearch} />
          </>
        ) : searchState === 'searching' ? (
          <div className='mt-1.5'>
            <p className='text-[12px] font-medium leading-[18px] -tracking-[3%] text-grey-60'>
              상품 바로가기
            </p>
            <div className='flex flex-col'>
              {[...Array(5)].map((v, idx) => {
                const example =
                  random_hangul() + random_hangul() + random_hangul() + random_hangul();
                return (
                  <button
                    key={`searching${idx}`}
                    className='flex h-[52px] items-end border-b border-b-grey-90 pb-3'
                    onClick={() => {
                      //
                    }}
                  >
                    <p className='line-clamp-1 text-start text-[14px] font-medium leading-[22px] -tracking-[3%] text-grey-20'>
                      {`[상품${idx}] ${searchText}${example}`}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <ProductList className='p-0' />
          // 검색 결과 없을 경우
          // <div className=''>
          //   <div className='h-[176px] flex flex-col items-center justify-center gap-2'>
          //     <Image src='/assets/icons/search/search-error.svg' alt='up' width={40} height={40} />
          //     <p className='font-medium text-[14px] leading-[20px] -tracking-[5%] text-[#B5B5B5] text-center whitespace-pre'>
          //       {`‘${searchText}’의 검색결과가 없습니다.\n다른 키워드로 검색해보세요.`}
          //     </p>
          //   </div>
          //   <div className='mt-4 h-2 bg-[#F2F2F2]' />
          //   <HomeCurationItem
          //     type='TABLE'
          //     title='지금이 딱인 제철 해산물 🦐'
          //     description='따뜻한 봄, 가장 맛있게 먹을 수 있는 봄철 해산물 어때요?'
          //     className='p-0'
          //   />
          // </div>
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

export default Search;
