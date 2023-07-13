import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { client } from 'src/api/client';
import { CheckIcon } from 'src/components/icons';
import { queryKey } from 'src/query-key';
import { type indexFilterType, useFilterStore, useAlertStore } from 'src/store';
import cm from 'src/utils/class-merge';
import useClickAway from 'src/utils/use-click-away';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Api } from 'src/api/swagger/Api';

import 'swiper/css';

type Instance = InstanceType<typeof Api>;
type selectProductCountByUserRequestInstance = Instance['selectProductCountByUser'];
type selectTopBarCountRequestInstance = Instance['selectTopBarCount'];
type selectProductCountByUserVariables = NonNullable<
  Parameters<selectProductCountByUserRequestInstance>
>;
type selectTopBarCountVariables = NonNullable<Parameters<selectTopBarCountRequestInstance>>;

/** 필터 BottomSheet */
const BottomSheet = () => {
  const target = useRef<HTMLDivElement>(null);
  const [check, setCheck] = useState<boolean>(false);
  const { setAlert } = useAlertStore();
  const { filter, type, setFilter, isOpen, setIsOpen } = useFilterStore();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<indexFilterType[]>([]);
  const [savedFilter, setSavedFilter] = useState<number[]>();

  const { data: filterData } = useQuery(
    queryKey.filters.lists,
    async () => {
      const res = await (await client()).selectSearchFilterList();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        setAlert({ message: res.data.errorMsg ?? '' });
        // throw new Error(res.data.errorMsg);
      }
    },
    {
      enabled: isOpen,
      staleTime: 0,
    },
  );

  const variables: selectProductCountByUserVariables | selectTopBarCountVariables = [
    {
      filterFieldIds: savedFilter?.join(','),
      categoryIds: type.type === 'category' ? type.id?.toString() : undefined,
      storeId: type.type === 'store' ? type.id : undefined,
      curationId: type.type === 'curation' ? type.id : undefined,
    },
  ];

  const { data: productCount } = useQuery(
    queryKey.filterCount.list({
      ...type,
      ...variables,
    }),
    async () => {
      const res = await (type.type === 'topBar'
        ? (await client()).selectTopBarCount(type.id ?? 0, ...variables)
        : (await client()).selectProductCountByUser(...variables));

      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.errorMsg);
      }
    },
    {
      enabled: selectedItem.length > 0,
      staleTime: 0,
    },
  );

  useEffect(() => {
    if (selectedItem.length > 0) setSavedFilter(selectedItem.map(v => v.id));
    else setSavedFilter(undefined);
  }, [selectedItem]);

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
      setSelectedTab(0);
    } else {
      document.body.style.overflow = 'overlay';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (filter) {
      setSelectedItem(filter);
    } else if (!filter && !isOpen) {
      setSelectedItem([]);
      setSelectedTab(0);
    }
  }, [filter, isOpen]);

  return (
    <div role='navigation' className='sticky top-0 z-[150] w-full'>
      {isOpen && (
        <div className='absolute top-0 z-[150] flex h-[100dvb] w-full flex-col justify-end bg-black/40'>
          <div
            ref={target}
            className='flex w-full flex-col items-center overflow-hidden rounded-t-[16px] bg-white pb-10'
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
            <Swiper
              freeMode
              slidesPerView='auto'
              modules={[FreeMode]}
              className='mt-3'
              pagination={false}
              spaceBetween={12}
              style={{
                marginLeft: '-8px',
                marginRight: '-8px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              {filterData?.map((v, idx) => {
                const isActive = selectedTab === idx;
                return (
                  <SwiperSlide key={`filter${idx}`} className='h-full !w-auto'>
                    <button
                      className={cm(
                        'w-full border-b-2 px-2 py-1',
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
                        {v.name}
                      </p>
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className='h-[1px] w-full bg-grey-90' />
            <div className='h-[250px] w-full overflow-y-auto'>
              <div className='flex flex-col items-start px-2 py-4'>
                {filterData &&
                  filterData[selectedTab].searchFilterFields?.map(v => {
                    const isActive = selectedItem.map(x => x.id).includes(v.id ?? -1);
                    return (
                      <button
                        key={`filterList${selectedTab}/${v.id}`}
                        className='flex h-[38px] items-center justify-center gap-2 px-2'
                        onClick={() => {
                          const tmp = [...selectedItem];
                          const findIndex = tmp.findIndex(x => x.id === v.id);
                          if (findIndex > -1) tmp.splice(findIndex, 1);
                          else tmp.push({ id: v.id ?? -1, text: v.field ?? '' });
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
                          {v.field}
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
                      onClick={() => setSelectedItem(selectedItem.filter(x => !(x.id === v.id)))}
                    >
                      <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-primary-50'>
                        {v.text}
                      </p>
                      <Image
                        unoptimized
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
                  unoptimized
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
                  {`${selectedItem.length > 0 ? `${productCount ?? 0}개의 ` : ''}상품보기`}
                  {/* 상품보기 */}
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
