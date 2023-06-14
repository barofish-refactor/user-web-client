import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { type DeliverPlace } from 'src/api/swagger/data-contracts';
import { Selector } from 'src/components/common';
import { type SelectorType } from 'src/components/common/selector';
import cm from 'src/utils/class-merge';

interface Props {
  data: DeliverPlace[];
  setIsVisible: (value: boolean) => void;
}

const messageList = [
  '배송 메시지 선택',
  '부재 시 경비실에 맡겨주세요',
  '부재 시 연락주세요',
  '부재 시 문 앞에 놓아주세요',
  '배송 전에 연락주세요',
  '직접입력',
];

const ShippingAddress = ({ data, setIsVisible }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [message, setMessage] = useState<SelectorType>();

  return (
    <div className='flex h-full w-full flex-col items-center overscroll-y-contain bg-white'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] w-full shrink-0 items-center justify-between gap-3.5 bg-white px-4'>
        <button
          className={clsx(
            'h-6 w-6 bg-cover',
            isEdit
              ? 'bg-[url(/assets/icons/common/close-base.svg)]'
              : 'bg-[url(/assets/icons/common/arrow-back.svg)]',
          )}
          onClick={() => {
            if (isEdit) {
              setIsEdit(false);
            } else {
              history.back();
              setIsVisible(false);
            }
          }}
        />
        <p className='text-[16px] font-bold -tracking-[0.03em] text-grey-10'>
          {isEdit ? '배송지 입력' : '배송지 목록'}
        </p>
        <div className='w-6' />
      </div>
      {!isEdit ? (
        <div className='w-full flex-1 overflow-auto scrollbar-hide'>
          {data.map((v, idx) => {
            return (
              <div key={`shipping${idx}`} className=''>
                <div className='px-4 py-[22px]'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
                        {v.name}
                      </p>
                      {v.isDefault && (
                        <div className='flex h-[22px] items-center justify-center rounded-full bg-primary-90 px-2'>
                          <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-primary-60'>
                            기본배송지
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      className=''
                      onClick={() => {
                        //
                      }}
                    >
                      <Image
                        alt='check'
                        width={24}
                        height={24}
                        src='/assets/icons/common/check-box-off.svg'
                      />
                    </button>
                  </div>
                  <p className='mt-1 text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>{`${'홍길동, 010-1111-1111'}`}</p>
                  <div className='my-2.5 h-[1px] bg-grey-90' />
                  <p className='text-[16px[ font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                    {`${v.address} ${v.addressDetail}`}
                  </p>
                  <p className='mt-1 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
                    {v.deliverMessage}
                  </p>
                  <div className='flex items-center justify-end gap-[18px]'>
                    <button
                      className=''
                      onClick={() => {
                        //
                      }}
                    >
                      <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                        삭제
                      </p>
                    </button>
                    <div className='h-5 w-[1px] bg-grey-80' />
                    <button
                      className=''
                      onClick={() => {
                        //
                      }}
                    >
                      <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                        수정
                      </p>
                    </button>
                  </div>
                </div>
                <div className='h-2 bg-grey-90' />
              </div>
            );
          })}
        </div>
      ) : (
        <div className='w-full flex-1 overflow-auto scrollbar-hide'>
          <div className='flex flex-col gap-4 px-4 py-[22px]'>
            <div className='flex items-center'>
              <p className='w-[84px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                배송지명
              </p>
              <input
                className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 px-3 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
                placeholder='예) 집, 회사'
              />
            </div>
            <div className='flex items-center'>
              <p className='w-[84px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                수령인
              </p>
              <input
                className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 px-3 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
                placeholder='이름을 입력해주세요'
              />
            </div>
            <div className='flex items-center'>
              <p className='w-[84px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                연락처
              </p>
              <PatternFormat
                format='###-####-####'
                placeholder='휴대폰 번호를 입력해주세요'
                inputMode='numeric'
                spellCheck={false}
                className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 px-3 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
                // value={phone}
                // onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center'>
                <p className='w-[84px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                  주소
                </p>
                <div className='flex flex-1 items-center gap-2'>
                  <div className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80  bg-grey-90 px-3'>
                    <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                      06227
                    </p>
                  </div>
                  <button
                    className='flex h-[44px] w-[77px] items-center justify-center rounded-lg border border-primary-50'
                    onClick={() => {
                      //
                    }}
                  >
                    <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-primary-50'>
                      주소 찾기
                    </p>
                  </button>
                </div>
              </div>
              <div className='flex flex-col gap-2 pl-[84px]'>
                <div className='flex h-[44px] w-full items-center rounded-lg border border-grey-80  bg-grey-90 px-3'>
                  <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                    서울 강남구 강남대로 지하 396 (역삼동)
                  </p>
                </div>
                <input
                  className='flex h-[44px] w-full items-center rounded-lg border border-grey-80 px-3 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
                  placeholder='상세주소를 입력해주세요'
                />
              </div>
            </div>
            <div className='flex items-center'>
              <p className='w-[84px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                배송메시지
              </p>
              <Selector
                className='flex-1'
                placeHolder='배송 메시지 선택'
                value={message}
                setValue={setMessage}
                list={messageList.map(v => {
                  return { label: v, value: v };
                })}
              />
            </div>

            <div className='mt-[22px]'>
              <button
                className='flex items-center gap-2'
                onClick={() => {
                  //
                }}
              >
                <Image
                  alt='check'
                  width={24}
                  height={24}
                  src='/assets/icons/common/check-box-off.svg'
                />
                <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-40'>
                  기본 배송지로 저장
                </p>
              </button>
            </div>
            <div className='h-[150px]' />
          </div>
        </div>
      )}

      <div className='fixed bottom-0 z-50 w-[375px] bg-white px-4 pb-7 pt-2 max-md:w-full'>
        <button
          className={cm(
            'flex h-[52px] w-full items-center justify-center rounded-lg border border-grey-80',
            { 'border-0 bg-primary-50': isEdit },
          )}
          onClick={() => {
            // 배송지 추가
            if (!isEdit) {
              setIsEdit(true);
            }
            // 저장하기
            else {
              //
              setIsEdit(false);
            }
          }}
        >
          <p
            className={cm('text-[16px] font-bold -tracking-[0.03em] text-grey-10', {
              'text-white': isEdit,
            })}
          >
            {isEdit ? '저장하기' : '배송지 추가'}
          </p>
        </button>
      </div>
    </div>
  );
};

export default ShippingAddress;
