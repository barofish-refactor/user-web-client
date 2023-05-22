import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { CheckIcon } from 'src/components/icons';
import { categoryList } from 'src/pages/category';
import { useOpenStore } from 'src/store';
import cm from 'src/utils/class-merge';
import useClickAway from 'src/utils/use-click-away';

const BottomSheet = () => {
  const target = useRef<HTMLDivElement>(null);
  const [check, setCheck] = useState<boolean>(false);
  const { setIsOpen } = useOpenStore();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  // TODO : 구조 제대로 안잡혀있어서 데이터 보고 바꿔야함
  const [selectedItem, setSelectedItem] = useState<{ text: string; id: number }[]>([]);

  useClickAway(target, () => {
    if (!check) setCheck(true);
    else setIsOpen(false);
  });

  return (
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
          {categoryList.map((v, idx) => {
            const isActive = selectedItem.map(x => x.id).includes(idx);
            return (
              <button
                key={`filterList${idx}`}
                className='flex h-[38px] items-center justify-center gap-2 px-2'
                onClick={() => {
                  const tmp = [...selectedItem];
                  const findIndex = tmp.findIndex(x => idx === x.id);
                  if (findIndex > -1) tmp.splice(findIndex, 1);
                  else tmp.push({ id: idx, text: v.name });
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
                  {v.name}
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
                onClick={() => {
                  setSelectedItem(selectedItem.filter(x => x.id !== v.id));
                }}
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
          <Image src='/assets/icons/common/refresh.svg' alt='refresh' width={15} height={10} />
          <p className='text-[16px] font-semibold leading-[19px] -tracking-[0.05em] text-grey-80'>
            초기화
          </p>
        </button>
        <button
          className='flex h-[52px] flex-1 items-center justify-center rounded-lg bg-primary-50'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>
            {`${selectedItem.length > 0 ? '0개의 ' : ''}상품보기`}
          </p>
        </button>
      </div>
    </div>
  );
};

export default BottomSheet;
