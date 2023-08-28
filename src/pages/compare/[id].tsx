import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import {
  type AddCompareSetPayload,
  type CompareFilterDto,
  type CompareProductDto,
} from 'src/api/swagger/data-contracts';
import { CartIcon } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { calcDiscountRate, formatToBlob, formatToLocaleString } from 'src/utils/functions';

const initialTable: CompareProductDto[] = [{}];

/** 비교하기 상세 */
const CompareDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();

  const { id, type } = router.query;
  const [selectedTag, setSelectedTag] = useState<number[]>([]);

  const [compareList, setCompareList] = useState<CompareFilterDto[]>([]);

  const { data: set, isLoading } = useQuery(
    queryKey.compareSet.detail(id),
    async () => {
      const res = await (type === 'id'
        ? (await client()).selectCompareSet(Number(id))
        : (await client()).compareProductList({ productIdStr: String(id) }));
      if (res.data.isSuccess) {
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

  const { mutateAsync: addCompareSet, isLoading: isAddLoading } = useMutation(
    async (args: AddCompareSetPayload) => await (await client()).addCompareSet(args),
  );

  const onAddCompareSetMutate = (args: AddCompareSetPayload) => {
    if (isAddLoading) return;
    addCompareSet(formatToBlob(args, true))
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({ message: '조합을 저장했습니다.', type: 'success' });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (!isLoading && set) {
      setCompareList(set[0].compareFilters ?? []);
    }
  }, [set, isLoading]);

  return (
    <div className='pb-[140px] max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center bg-white pl-4 pr-[18px]'>
        <BackButton />
        <p className='flex-1 text-center text-[16px] font-bold -tracking-[0.03em] text-grey-10'>
          비교하기
        </p>
        <Link href='/product/cart'>
          <CartIcon />
        </Link>
      </div>

      <div className='px-4 pt-5'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          비교대상
        </p>
        <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
          선택한 상품을 한눈에 비교하세요.
        </p>
      </div>
      <div className='pt-5'>
        {set?.map((v, idx) => {
          return (
            <div
              key={`set${idx}`}
              className={cm('bg-[#F7F9FA] px-6 py-4', { 'bg-white': idx === 1 })}
            >
              <Link
                className='flex items-center gap-6'
                href={{ pathname: '/product', query: { id: v.id } }}
              >
                <div className='relative h-[104px] w-[104px] overflow-hidden rounded-lg'>
                  <Image
                    unoptimized
                    width={104}
                    height={104}
                    src={v.image ?? ''}
                    alt='product'
                    draggable={false}
                    className='aspect-square w-full object-cover'
                  />
                  <div className='absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-br-lg bg-[#1744BF]/90'>
                    <p className='text-[14px] font-bold text-white'>{idx + 1}</p>
                  </div>
                </div>
                <div className='flex flex-1 gap-6'>
                  <div className='flex-1'>
                    <p className='text-[16px] font-bold leading-[22px] -tracking-[0.05em] text-black'>{`${
                      v.storeName ?? ''
                    }`}</p>
                    <p className='mt-2 text-[13px] font-medium leading-[16px] -tracking-[0.05em] text-black'>
                      {v.title}
                    </p>
                    <div className='mt-1.5 flex items-center gap-0.5'>
                      {(v.originPrice ?? 0) !== 0 && (
                        <p className='text-[16px] font-bold leading-[20px] -tracking-[0.05em] text-[#FF4A09]'>{`${calcDiscountRate(
                          v.originPrice,
                          v.discountPrice,
                        )}%`}</p>
                      )}
                      <p className='text-[16px] font-bold leading-[20px] -tracking-[0.05em] text-[#333]'>{`${formatToLocaleString(
                        v.discountPrice,
                      )}원`}</p>
                    </div>
                  </div>
                  <div className='self-end'>
                    <Image
                      unoptimized
                      src='/assets/icons/common/chevron-compare.svg'
                      alt='chevron'
                      width={24}
                      height={24}
                      draggable={false}
                    />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className='px-4 pt-6'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          선택상품 비교하기
        </p>
        <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
          비교하고 싶으신 항목을 선택해주세요.
        </p>
      </div>
      <div className='flex flex-wrap gap-1.5 px-4 pt-5'>
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
      </div>
      <div
        className={cm(
          'mx-4 mt-5 grid grid-cols-4 overflow-hidden rounded border border-[#E2E2E2]',
          { 'grid-cols-3': set?.length === 2 },
        )}
      >
        {[-2, -1].concat(selectedTag).map((x, i) =>
          initialTable.concat(set ?? []).map((v, idx) => {
            if (idx === 0) {
              const text = x === -2 ? '' : x === -1 ? '판매처' : compareList[x].name;
              return (
                <div
                  key={`grid${i}/${idx}`}
                  className={cm(
                    'flex h-[42px] items-center border-b border-r border-[#E2E2E2] bg-[#F1F1F1] pl-3',
                    { 'bg-[#F7F7F7]': i !== 0, 'border-b-0': i === selectedTag.length + 1 },
                  )}
                >
                  <p className='text-[12px] font-bold -tracking-[0.03em] text-grey-20'>{text}</p>
                </div>
              );
            }
            const compareValue =
              i > 1 ? v.filterValues?.filter(w => w.compareFilterId === compareList[x].id) : [];

            return (
              <div
                key={`grid${i}/${idx}`}
                className={cm(
                  'flex h-[42px] items-center border-b border-r border-[#E2E2E2] bg-[#F7F7F7] px-[7px]',
                  {
                    'bg-white': i !== 0,
                    'border-b-0': i === selectedTag.length + 1,
                    'border-r-0': idx === 3,
                  },
                )}
              >
                {i === 0 ? (
                  <div className='flex h-7 w-7 items-center justify-center rounded bg-[#1744BF]/90'>
                    <p className='text-[14px] font-bold -tracking-[0.03em] text-white'>{idx}</p>
                  </div>
                ) : (
                  <p className='line-clamp-1 text-[13px] font-medium -tracking-[0.05em] text-[#797979]'>
                    {i === 1
                      ? v.storeName ?? ''
                      : (compareValue ?? []).length > 0
                      ? compareValue?.[0].value ?? ''
                      : ''}
                  </p>
                )}
              </div>
            );
          }),
        )}
      </div>
      <div className='fixed bottom-0 z-50 w-[375px] bg-white px-4 pb-7 pt-2 max-md:w-full'>
        <button
          className='flex h-[52px] w-full items-center justify-center rounded-lg border-0 bg-primary-50'
          onClick={() => {
            if (set && set.length > 0) onAddCompareSetMutate(set.map(x => x.id ?? -1));
          }}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>이 조합 저장하기</p>
        </button>
      </div>
    </div>
  );
};

CompareDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default CompareDetail;
