import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { client } from 'src/api/client';
import {
  type ProductLocation,
  type Category,
  type ProductType,
  type ProductProcess,
  type ProductUsage,
  type ProductStorage,
} from 'src/api/swagger/data-contracts';
import { CheckIcon } from 'src/components/icons';
import { queryKey } from 'src/query-key';
import { useFilterStore } from 'src/store';
import cm from 'src/utils/class-merge';
import useClickAway from 'src/utils/use-click-away';

type FilterType =
  | Category[]
  | ProductType[]
  | ProductLocation[]
  | ProductProcess[]
  | ProductUsage[]
  | ProductStorage[];

export interface filterType {
  categoryIds?: string;
  typeIds?: string;
  locationIds?: string;
  processIds?: string;
  usageIds?: string;
  storageIds?: string;
}

/** 필터 BottomSheet */
const BottomSheet = () => {
  const target = useRef<HTMLDivElement>(null);
  const [check, setCheck] = useState<boolean>(false);
  const { filter, setFilter, isOpen, setIsOpen } = useFilterStore();
  const [filterList, setFilterList] = useState<FilterType[]>([[], [], [], [], [], [], []]);

  const { data } = useQuery(
    queryKey.filter,
    async () => {
      const res = await client().selectFilterList();

      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.errorMsg);
      }
    },
    {
      enabled: isOpen,
      staleTime: 0,
    },
  );

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<
    { tabIndex: number; text: string; id: number }[]
  >([]);

  useEffect(() => {
    if (data) {
      setFilterList([
        data.categories ?? [],
        data.types ?? [],
        data.locations ?? [],
        data.processes ?? [],
        data.usages ?? [],
        data.storages ?? [],
        [], // 가격
      ]);
    }
  }, [data]);

  const closeModal = () => {
    setIsOpen(false);
    setCheck(false);
  };

  useClickAway(target, () => {
    if (!check) setCheck(true);
    else {
      closeModal();
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'overlay';
    }
  }, [isOpen]);

  useEffect(() => {
    if (filter) {
    } else {
      setSelectedItem([]);
      setSelectedTab(0);
    }
  }, [filter]);

  return (
    <div role='navigation' className='sticky top-0 z-[150] w-full'>
      {isOpen && (
        <div className='absolute top-0 z-[150] flex h-[100dvb] w-full flex-col justify-end bg-black/40'>
          <div
            ref={target}
            className='flex w-full flex-col items-center rounded-t-[16px] bg-white pb-10'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <div className='mb-[10px] mt-[18px] h-1 w-9 rounded-full bg-grey-80' />
            <div className='flex w-full flex-col'>
              <p className='pl-4 text-[20px] font-semibold leading-[30px] -tracking-[0.05em] text-black'>
                필터
              </p>
            </div>
            <div className='mt-3 flex w-full items-center justify-between pl-4 pr-[27px]'>
              {['카테고리', '구분', '지역', '가공', '용도', '보관', '가격'].map((v, idx) => {
                const isActive = selectedTab === idx;

                return (
                  <button
                    key={`filter${idx}`}
                    className={cm(
                      'border-b-2 py-1',
                      v.length === 4 ? 'px-1' : 'px-2',
                      isActive ? 'border-b-primary-50' : 'border-b-white',
                    )}
                    onClick={() => {
                      setSelectedTab(idx);
                    }}
                  >
                    <p
                      className={cm(
                        'text-[14px] leading-[22px] -tracking-[0.03em]',
                        isActive ? 'font-semibold text-primary-50' : 'font-medium text-grey-50',
                      )}
                    >
                      {v}
                    </p>
                  </button>
                );
              })}
            </div>
            <div className='h-[1px] w-full bg-grey-90' />
            <div className='h-[250px] w-full overflow-y-auto'>
              <div className='flex flex-col items-start px-2 py-4'>
                {filterList[selectedTab].map(v => {
                  const isActive = selectedItem
                    .map(x => x.tabIndex + '/' + x.id)
                    .includes(selectedTab + '/' + v.id);
                  const title = selectedTab === 0 ? (v as Category).name : (v as ProductType).field;

                  return (
                    <button
                      key={`filterList${selectedTab}/${v.id}`}
                      className='flex h-[38px] items-center justify-center gap-2 px-2'
                      onClick={() => {
                        const tmp = [...selectedItem];
                        const findIndex = tmp.findIndex(
                          x => x.id === v.id && x.tabIndex === selectedTab,
                        );
                        if (findIndex > -1) tmp.splice(findIndex, 1);
                        else tmp.push({ tabIndex: selectedTab, id: v.id ?? -1, text: title ?? '' });
                        setSelectedItem(tmp);
                      }}
                    >
                      <CheckIcon isActive={isActive} />
                      <p
                        className={cm(
                          'text-[14px] font-medium -tracking-[0.03em]',
                          isActive ? 'text-grey-10' : 'text-grey-50',
                        )}
                      >
                        {title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            {selectedItem.length > 0 && (
              <div className='mb-[4.54px] flex w-full flex-wrap items-center gap-3 border-t border-t-grey-90 px-4 py-2'>
                {selectedItem.map((v, idx) => {
                  return (
                    <button
                      key={`selected${idx}`}
                      className='flex items-center'
                      onClick={() =>
                        setSelectedItem(
                          selectedItem.filter(x => !(x.id === v.id && x.tabIndex === v.tabIndex)),
                        )
                      }
                    >
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-primary-50'>
                        {v.text}
                      </p>
                      <Image
                        src='/assets/icons/common/close-small.svg'
                        alt='delete'
                        width={19}
                        height={19}
                      />
                    </button>
                  );
                })}
              </div>
            )}
            <div className='mt-4 flex w-full items-center gap-[18px] px-4'>
              <button
                className='flex h-full items-center gap-2'
                onClick={() => {
                  setSelectedItem([]);
                }}
              >
                <Image
                  src='/assets/icons/common/refresh.svg'
                  alt='refresh'
                  width={15}
                  height={10}
                />
                <p className='text-[16px] font-semibold leading-[19px] -tracking-[0.05em] text-grey-80'>
                  초기화
                </p>
              </button>
              <button
                className='flex h-[52px] flex-1 items-center justify-center rounded-lg bg-primary-50'
                onClick={() => {
                  setFilter(selectedItem);
                  closeModal();
                }}
              >
                <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>
                  {/* {`${selectedItem.length > 0 ? '0개의 ' : ''}상품보기`} */}
                  상품보기
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomSheet;
