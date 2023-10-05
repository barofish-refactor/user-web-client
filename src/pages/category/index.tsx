import { useQuery } from '@tanstack/react-query';
import { type GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { client } from 'src/api/client';
import { Category, type CustomResponseListCategory } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';

const defaultCategoryList: Category[] = [{ id: -1, name: '전체보기' }];

interface Props {
  initialData: CustomResponseListCategory;
}

/** 카테고리 */
const Category: NextPageWithLayout<Props> = ({ initialData }) => {
  const [selectedId, setSelectedId] = useState<number>();

  const { data } = useQuery(
    queryKey.category,
    async () => {
      const res = await (await client()).selectCategories();
      return res.data;
    },
    { initialData },
  );

  return (
    <div className='pb-6 max-md:w-[100vw]'>
      <p className='px-4 pb-4 pt-[25px] text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
        카테고리
      </p>
      <div className='h-[1px] bg-grey-90' />
      {data.data
        ?.filter(v => v.categoryId === null)
        .map(v => {
          return (
            <div key={`category${v.id}`}>
              <button
                className='flex h-[56px] w-full items-center gap-5 px-4'
                onClick={() => {
                  if (selectedId === v.id) setSelectedId(undefined);
                  else setSelectedId(v.id);
                }}
              >
                <Image
                  unoptimized
                  src={v.image ?? ''}
                  alt={v.name ?? ''}
                  width={30}
                  height={30}
                  className='object-cover'
                  draggable={false}
                />
                <p className='flex-1 text-start text-[16px] font-medium -tracking-[0.01em] text-grey-20'>
                  {v.name}
                </p>
                <Image
                  unoptimized
                  src='/assets/icons/common/chevron-category.svg'
                  alt='chevron'
                  width={23.5}
                  height={24.5}
                  className={cm({ 'rotate-180': selectedId !== v.id })}
                  draggable={false}
                />
              </button>
              <div className='h-[1px] bg-grey-90' />

              {selectedId === v.id && (
                <div className='grid grid-cols-2 gap-y-0.5 bg-grey-90'>
                  {defaultCategoryList.concat(v.categoryList ?? []).map((subItem, idx) => {
                    return (
                      <Link
                        key={`subItem${subItem.id}`}
                        href={{
                          pathname: '/search/product-result',
                          query: {
                            id: v.id,
                            subItemId: subItem.id,
                            type: 'category',
                          },
                        }}
                        className={cm('ml-[50px] flex h-[38px] items-center pl-4', {
                          'ml-[14px] mr-[36px]': idx % 2 === 1,
                        })}
                      >
                        <p className='text-[14px] font-normal -tracking-[0.03em] text-grey-20'>
                          {subItem.name ?? ''}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

Category.getLayout = page => <Layout>{page}</Layout>;

export const getStaticProps: GetStaticProps = async () => {
  const { selectCategories } = await client();
  return {
    props: { initialData: (await selectCategories()).data },
    revalidate: 60,
  };
};

export default Category;
