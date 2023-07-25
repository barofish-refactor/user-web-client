import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { client } from 'src/api/client';
import { type InquiryDto } from 'src/api/swagger/data-contracts';
import { InquiryDots } from 'src/components/product/inquiry-dots';
import { queryKey } from 'src/query-key';
import { useAlertStore, useConfirmStore } from 'src/store';
import cm from 'src/utils/class-merge';
import { formatToUtc, maskingName, setSquareBrackets } from 'src/utils/functions';
import { parseInquiryState } from 'src/utils/parse';
import { VARIABLES } from 'src/variables';

interface Props {
  productId: number;
  data: InquiryDto[];
  refetch: () => void;
}

const Inquiry = ({ productId, data, refetch }: Props) => {
  const router = useRouter();
  const { setConfirm } = useConfirmStore();
  const { setAlert } = useAlertStore();
  const [openIndex, setOpenIndex] = useState<number>();

  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.errorMsg);
    }
  });

  const { mutateAsync: deleteInquiryByUser, isLoading } = useMutation(
    async (id: number) => await (await client()).deleteInquiryByUser(id),
  );

  const onDeleteMutate = ({ id }: { id: number }) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    if (isLoading) return;
    deleteInquiryByUser(id)
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className=''>
      <Link
        href={{ pathname: '/product/inquiry', query: { id: productId } }}
        className='mx-4 mb-[18px] mt-5 flex h-[42px] items-center justify-center rounded-lg border border-primary-50'
      >
        <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>
          상품 문의하기
        </p>
      </Link>
      <div>
        {data.map((v, idx) => {
          const isDone = !!v.answer;
          return (
            <div key={`inquiry${idx}`} className='flex-col'>
              <div
                className='flex w-full cursor-pointer justify-between border-b border-b-grey-90 py-[22px] pl-4 pr-[14.5px] text-start'
                onClick={() => {
                  if (v.isSecret && v.user?.userId !== user?.userId) return;
                  setOpenIndex(openIndex === idx ? undefined : idx);
                }}
              >
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-0.5'>
                    <p
                      className={cm(
                        'text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20',
                        { 'text-grey-70': v.isSecret },
                      )}
                    >
                      {`${setSquareBrackets(parseInquiryState(v.type))}`}{' '}
                      {v.isSecret ? '비밀글입니다.' : v.content}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <p
                      className={cm(
                        'text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-30',
                        { 'font-medium text-primary-50': isDone },
                      )}
                    >
                      {isDone ? '답변완료' : '답변대기'}
                    </p>
                    <div className='h-2.5 w-[1px] bg-grey-80' />
                    <p className='text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-30'>
                      {maskingName(v.user?.nickname ?? '*')}
                    </p>
                    <div className='h-2.5 w-[1px] bg-grey-80' />
                    <p className='text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-30'>{`${formatToUtc(
                      v.createdAt,
                      'yyyy.MM.dd',
                    )}`}</p>
                  </div>
                </div>
                <div className='flex flex-col justify-between self-stretch'>
                  {v.user?.userId === user?.userId ? (
                    <InquiryDots
                      isCanEdit={!isDone}
                      onUpdate={e => {
                        e.stopPropagation();
                        router.push({
                          pathname: '/product/inquiry',
                          query: { id: productId, inquiryId: v.id },
                        });
                      }}
                      onDelete={e => {
                        e.stopPropagation();
                        setConfirm({
                          message: '정말로 삭제하시겠습니까?',
                          onClick: () => {
                            if (!v.id) return;
                            onDeleteMutate({ id: v.id });
                            setAlert({ message: '삭제했습니다.' });
                          },
                          buttonText: '삭제',
                          type: 'error',
                        });
                      }}
                    />
                  ) : (
                    <div />
                  )}
                  <Image
                    unoptimized
                    src='/assets/icons/common/chevron-category.svg'
                    alt='chevron'
                    width={20}
                    height={20}
                    className={cm('self-end', { 'rotate-180': openIndex !== idx })}
                    draggable={false}
                  />
                </div>
              </div>
              {openIndex === idx && (
                <div className='flex flex-col gap-[17px] bg-grey-90 px-4 pb-[27px] pt-5'>
                  <div className='flex gap-3'>
                    <div className='flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary-70'>
                      <p className='text-[14px] font-bold -tracking-[0.03em] text-primary-90'>Q</p>
                    </div>
                    <p className='flex-1 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-20'>
                      {v.content}
                    </p>
                  </div>
                  <div className='flex gap-3'>
                    <div className='flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary-50'>
                      <p className='text-[14px] font-bold -tracking-[0.03em] text-primary-90'>A</p>
                    </div>
                    <p className='flex-1 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-20'>
                      {v.answer ?? '-'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inquiry;
