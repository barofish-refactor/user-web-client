import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { client } from 'src/api/client';
import {
  type AddDeliverPlacePayload,
  type AddDeliverPlaceReq,
  type DeliverPlace,
  type UpdateDeliverPlacePayload,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { Selector } from 'src/components/common';
import { type SelectorType } from 'src/components/common/selector';
import { DaumPostcode } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import cm from 'src/utils/class-merge';
import { formatToBlob, formatToPhone } from 'src/utils/functions';
import { REG_EXP } from 'src/utils/regex';

interface Props {
  setIsVisible: (value: boolean) => void;
  onClick?: (value: DeliverPlace) => void;
}

const messageList = [
  // '배송 메시지 선택',
  '부재 시 경비실에 맡겨주세요',
  '부재 시 연락주세요',
  '부재 시 문 앞에 놓아주세요',
  '배송 전에 연락주세요',
  '직접입력',
];

const ShippingAddress = ({ setIsVisible, onClick }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [message, setMessage] = useState<SelectorType>();
  const { setAlert } = useAlertStore();

  const { data: deliverPlace, refetch } = useQuery(queryKey.deliverPlace, async () => {
    const res = await (await client()).selectDeliverPlace();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

  const { mutateAsync: addDeliverPlace, isLoading } = useMutation(
    async (args: AddDeliverPlacePayload) =>
      await (await client()).addDeliverPlace(args, { type: ContentType.FormData }),
  );

  const { mutateAsync: updateDeliverPlace, isLoading: isUpdateLoading } = useMutation(
    async ({ id, args }: { id: number; args: UpdateDeliverPlacePayload }) =>
      await (await client()).updateDeliverPlace(id, args, { type: ContentType.FormData }),
  );

  const { mutateAsync: deleteDeliverPlace, isLoading: isDeleteLoading } = useMutation(
    async (args: number) =>
      await (await client()).deleteDeliverPlace(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: AddDeliverPlacePayload) => {
    if (isLoading) return;
    checkError();

    addDeliverPlace({ data: formatToBlob<AddDeliverPlacePayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({ message: '추가되었습니다.', type: 'success' });
          refetch();
          onClear();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const onUpdateMutate = ({ id, data }: { id: number; data: AddDeliverPlaceReq }) => {
    if (isUpdateLoading) return;
    checkError();
    updateDeliverPlace({
      id,
      args: { data: formatToBlob<UpdateDeliverPlacePayload['data']>(data, true) },
    })
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({ message: '배송지를 수정했습니다.', type: 'success' });
          refetch();
          onClear();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const onDeleteMutate = ({ id }: { id: number }) => {
    if (isDeleteLoading) return;
    deleteDeliverPlace(id)
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({ message: '배송지를 삭제했습니다.', type: 'success' });
          refetch();
          onClear();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const [updateId, setUpdateId] = useState<number>();
  const [name, setName] = useState<string>('');
  const [receiverName, setReceiverName] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [bCode, setBCode] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [openDaum, setOpenDaum] = useState(false);
  const [content, setContent] = useState<string>('');

  const onClear = () => {
    setName('');
    setReceiverName('');
    setTel('');
    setPostalCode('');
    setAddress('');
    setAddressDetail('');
    setIsDefault(false);
    setIsEdit(false);
  };

  const checkError = () => {
    if (name.trim() === '') return setAlert({ message: '배송지명을 입력해주세요.' });
    if (receiverName.trim() === '') return setAlert({ message: '수령인을 입력해주세요.' });
    if (tel.trim() === '') return setAlert({ message: '연락처를 입력해주세요.' });
    if (address.trim() === '') return setAlert({ message: '주소를 입력해주세요.' });
    if (addressDetail.trim() === '') return setAlert({ message: '상세주소를 입력해주세요.' });
  };

  useEffect(() => {
    if (!isEdit) setUpdateId(undefined);
  }, [isEdit]);

  return (
    <div className='flex h-full w-full flex-col items-center overscroll-y-contain bg-white pb-[90px]'>
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
            onClear();
          }}
        />
        <p className='text-[16px] font-bold -tracking-[0.03em] text-grey-10'>
          {isEdit ? '배송지 입력' : '배송지 목록'}
        </p>
        <div className='w-6' />
      </div>
      {!isEdit ? (
        <div className='w-full flex-1 overflow-auto scrollbar-hide'>
          {(deliverPlace ?? []).map((v, idx) => {
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
                    {onClick && (
                      <button
                        className=''
                        onClick={() => {
                          onClick(v);
                          setIsVisible(false);
                        }}
                      >
                        <Image
                          unoptimized
                          alt='check'
                          width={24}
                          height={24}
                          src='/assets/icons/common/check-box-off.svg'
                        />
                      </button>
                    )}
                  </div>
                  <p className='mt-1 text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>{`${
                    v.receiverName
                  }, ${formatToPhone(v.tel)}`}</p>
                  <div className='my-2.5 h-[1px] bg-grey-90' />
                  <p className='text-[16px[ font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                    {`(${v.postalCode}) ${v.address} ${v.addressDetail}`}
                  </p>
                  <p className='mt-1 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
                    {v.deliverMessage}
                  </p>
                  <div className='flex items-center justify-end gap-[18px]'>
                    <button className='' onClick={() => onDeleteMutate({ id: v.id ?? -1 })}>
                      <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                        삭제
                      </p>
                    </button>
                    <div className='h-5 w-[1px] bg-grey-80' />
                    <button
                      className=''
                      onClick={() => {
                        setUpdateId(v.id);
                        setName(v.name ?? '');
                        setReceiverName(v.receiverName ?? '');
                        setTel(v.tel ?? '');
                        setPostalCode(v.postalCode ?? '');
                        setAddress(v.address ?? '');
                        setAddressDetail(v.addressDetail ?? '');
                        setMessage(
                          v.deliverMessage
                            ? { label: v.deliverMessage, value: v.deliverMessage }
                            : undefined,
                        );
                        setIsEdit(true);
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
                maxLength={10}
                value={name}
                onChange={e => setName(e.target.value.replaceAll(REG_EXP.emoji, ''))}
              />
            </div>
            <div className='flex items-center'>
              <p className='w-[84px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                수령인
              </p>
              <input
                className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 px-3 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
                placeholder='이름을 입력해주세요'
                maxLength={10}
                value={receiverName}
                onChange={e => setReceiverName(e.target.value.replaceAll(REG_EXP.emoji, ''))}
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
                value={tel}
                onChange={e => setTel(e.target.value)}
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
                      {postalCode}
                    </p>
                  </div>
                  <button
                    className='flex h-[44px] w-[77px] items-center justify-center rounded-lg border border-primary-50'
                    onClick={() => setOpenDaum(true)}
                  >
                    <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-primary-50'>
                      주소 찾기
                    </p>
                  </button>
                  <DaumPostcode
                    open={openDaum}
                    onOpenChange={setOpenDaum}
                    onComplete={value => {
                      setBCode(value.bcode);
                      setPostalCode(value.zonecode);
                      setAddress(value.address);
                    }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2 pl-[84px]'>
                <div className='flex h-[44px] w-full items-center rounded-lg border border-grey-80  bg-grey-90 px-3'>
                  <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                    {address}
                  </p>
                </div>
                <input
                  className='flex h-[44px] w-full items-center rounded-lg border border-grey-80 px-3 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
                  placeholder='상세주소를 입력해주세요'
                  maxLength={100}
                  value={addressDetail}
                  onChange={e => setAddressDetail(e.target.value.replaceAll(REG_EXP.emoji, ''))}
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
            {message?.value === '직접입력' && (
              <div>
                <div className='ml-[84px] h-[130px] flex-1 rounded-lg border border-grey-80 py-3'>
                  <textarea
                    spellCheck={false}
                    className='h-full  w-full px-3 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-80'
                    placeholder='직접 입력'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className='mt-[22px]'>
              <button
                className='flex items-center gap-2'
                onClick={() => {
                  setIsDefault(!isDefault);
                }}
              >
                <Image
                  unoptimized
                  alt='check'
                  width={24}
                  height={24}
                  src={
                    isDefault
                      ? '/assets/icons/common/check-box-on.svg'
                      : '/assets/icons/common/check-box-off.svg'
                  }
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
              if (updateId) {
                onUpdateMutate({
                  id: updateId,
                  data: {
                    name,
                    receiverName,
                    tel: tel.replaceAll('-', ''),
                    bcode: bCode,
                    postalCode,
                    address,
                    addressDetail,
                    deliverMessage: message?.value === '직접입력' ? content : message?.label ?? '',
                    isDefault,
                  },
                });
              } else {
                onMutate({
                  data: {
                    name,
                    receiverName,
                    tel: tel.replaceAll('-', ''),
                    bcode: bCode,
                    postalCode,
                    address,
                    addressDetail,
                    deliverMessage: message?.value === '직접입력' ? content : message?.label ?? '',
                    isDefault,
                  },
                });
              }
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
