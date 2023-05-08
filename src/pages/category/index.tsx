import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';

interface CategoryType {
  id: number;
  icon: string;
  name: string;
  subItem: {
    id: number;
    name: string;
  }[];
}

const categoryList: CategoryType[] = [
  {
    id: 0,
    icon: '/dummy/dummy-category-1.png',
    name: '활어',
    subItem: [
      {
        id: 0,
        name: '우럭',
      },
      {
        id: 1,
        name: '광어',
      },
      {
        id: 2,
        name: '참돔',
      },
      {
        id: 3,
        name: '농어',
      },
      {
        id: 4,
        name: '숭어',
      },
      {
        id: 5,
        name: '방어',
      },
    ],
  },
  {
    id: 1,
    icon: '/dummy/dummy-category-2.png',
    name: '선어',
    subItem: [
      {
        id: 6,
        name: '고등어',
      },
      {
        id: 7,
        name: '갈치',
      },
      {
        id: 8,
        name: '가자미',
      },
      {
        id: 9,
        name: '연어',
      },
      {
        id: 10,
        name: '굴비',
      },
      {
        id: 11,
        name: '홍어',
      },
      {
        id: 12,
        name: '병어',
      },
    ],
  },
  {
    id: 2,
    icon: '/dummy/dummy-category-3.png',
    name: '갑각류',
    subItem: [
      {
        id: 13,
        name: '대게',
      },
      {
        id: 14,
        name: '킹크랩',
      },
      {
        id: 15,
        name: '새우',
      },
      {
        id: 16,
        name: '랍스터',
      },
      {
        id: 17,
        name: '홍게',
      },
      {
        id: 18,
        name: '갯가재',
      },
    ],
  },
];

/** 카테고리 */
const Category: NextPageWithLayout = () => {
  const [selectedId, setSelectedId] = useState<number>();

  return (
    <div className='max-md:w-[100vw]'>
      <p className='px-4 pb-4 pt-[25px] text-[20px] font-bold leading-[30px] -tracking-[3%] text-grey-10'>
        카테고리
      </p>
      <div className='h-[1px] bg-grey-90' />
      {categoryList.map(v => {
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
                src={v.icon}
                alt={v.name}
                width={30}
                height={30}
                className='cover'
                draggable={false}
              />
              <p className='flex-1 text-start text-[16px] font-medium -tracking-[1%] text-grey-20'>
                {v.name}
              </p>
              <Image
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
                {[{ id: -1, name: '전체보기' }].concat(v.subItem).map((subItem, idx) => {
                  return (
                    <Link
                      key={`subItem${subItem.id}`}
                      href='/category'
                      className={cm('ml-[50px] flex h-[38px] items-center pl-4', {
                        'ml-[14px] mr-[36px]': idx % 2 === 1,
                      })}
                    >
                      <p className='text-[14px] font-normal -tracking-[3%] text-grey-20'>
                        {subItem.name}
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

export default Category;
