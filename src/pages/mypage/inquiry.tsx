import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { client } from 'src/api/client';
import { type InquiryDto } from 'src/api/swagger/data-contracts';
import Skeleton from 'src/components/common/skeleton';
import { InquiryLayout } from 'src/components/mypage/inquiry';
import { InquiryDots } from 'src/components/product';
import { queryKey } from 'src/query-key';
import { useAlertStore, useConfirmStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToUtc, maskingName, setSquareBrackets } from 'src/utils/functions';
import { parseInquiryState } from 'src/utils/parse';
import { VARIABLES } from 'src/variables';

interface Props {
  initialData: InquiryDto[];
}
// { initialData }
const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;
const MypageInquiry: NextPageWithLayout<Props> = () => {
  const { setAlert } = useAlertStore();
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number>();
  const { setConfirm } = useConfirmStore();

  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useQuery(
    queryKey.inquiry.lists,
    async () => {
      const res = await (await client()).selectInquiryListWithUserId();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        if (res.data.code === '101' || res.data.code === '102') {
          setAlert({ message: res.data.errorMsg ?? '' });
          router.replace('/login');
          return;
        } else if (res.data.code === '103') {
          deleteCookie(ACCESS_TOKEN);
          deleteCookie(REFRESH_TOKEN);
          setAlert({ message: res.data.errorMsg ?? '' });
          router.replace('/login');
          return;
        }
        console.log(res.data.errorMsg);
        //
        throw new Error(res.data.errorMsg);
      }
    },
    // {
    //   initialData,
    // },
  );

  const { mutateAsync: deleteInquiryByUser, isLoading } = useMutation(
    async (id: number) => await (await client()).deleteInquiryByUser(id),
  );

  const onDeleteMutate = ({ id }: { id: number }) => {
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
  if (isLoadingData)
    return (
      <>
        <Skeleton />
        <Skeleton />
      </>
    );
  if (!data || data.length === 0) return <Empty />;

  return (
    <>
      <DefaultSeo title='상품문의내역 | 바로피쉬' description='ProductInquiry' />
      <article className='pb-10 pt-2'>
        {data.map((v, idx) => {
          const isDone = !!v.answer;
          return (
            <div key={`inquiry${idx}`} className='flex-col'>
              <div
                className='flex w-full cursor-pointer justify-between border-b border-b-grey-90 py-[22px] pl-4 pr-[14.5px] text-start'
                onClick={() => {
                  setOpenIndex(openIndex === idx ? undefined : idx);
                }}
              >
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-0.5'>
                    <p
                      className={cm(
                        'text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20',
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
                        'text-[15px] font-normal leading-[20px] -tracking-[0.03em] text-grey-30',
                        { 'font-medium text-primary-50': isDone },
                      )}
                    >
                      {isDone ? '답변완료' : '답변대기'}
                    </p>
                    <div className='h-2.5 w-[1px] bg-grey-80' />
                    <p className='text-[15px] font-normal leading-[20px] -tracking-[0.03em] text-grey-30'>
                      {maskingName(v.user?.nickname ?? '*')}
                    </p>
                    <div className='h-2.5 w-[1px] bg-grey-80' />
                    <p className='text-[15px] font-normal leading-[20px] -tracking-[0.03em] text-grey-30'>{`${formatToUtc(
                      v.createdAt,
                      'yyyy.MM.dd',
                    )}`}</p>
                  </div>
                </div>
                <div className='flex flex-col justify-between self-stretch'>
                  <InquiryDots
                    isCanEdit={!isDone}
                    onUpdate={e => {
                      e.stopPropagation();
                      if (isDone) return;
                      router.push({
                        pathname: '/product/inquiry',
                        query: { id: v.productId, inquiryId: v.id },
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
                      <p className='text-[16px] font-bold -tracking-[0.03em] text-primary-90'>Q</p>
                    </div>
                    <p className='flex-1 text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-20'>
                      {v.content}
                    </p>
                  </div>
                  <div className='flex gap-3'>
                    <div className='flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary-50'>
                      <p className='text-[16px] font-bold -tracking-[0.03em] text-primary-90'>A</p>
                    </div>
                    <p className='flex-1 text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-20'>
                      {v.answer ?? '-'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </article>
    </>
  );
};

function Empty() {
  return (
    <>
      <DefaultSeo title='상품문의내역 | 바로피쉬' description='ProductInquiry' />
      <div className='grid flex-1 place-items-center'>
        <div className='flex flex-col items-center gap-2'>
          <Image
            unoptimized
            src='/assets/icons/search/search-error.svg'
            alt='up'
            width={40}
            height={40}
          />
          <p className='whitespace-pre text-center text-[16px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
            문의내역이 없습니다.
          </p>
        </div>
      </div>
    </>
  );
}

MypageInquiry.getLayout = page => <InquiryLayout page={page} />;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { selectInquiryListWithUserId } = await client();
//   return {
//     props: { initialData: (await selectInquiryListWithUserId()).data.data },
//   };
// };

export default MypageInquiry;
