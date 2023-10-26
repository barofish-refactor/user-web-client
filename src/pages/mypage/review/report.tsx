import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { client } from 'src/api/client';
import { type AddReportPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToBlob } from 'src/utils/functions';

const reportList = [
  '상품/ 스토어와 무관한 내용 게시',
  '광고 및 홍보성 내용 게시',
  '개인정보 유출 위험',
  '욕설/비방/음란 내용',
  '이미지 도용, 사칭, 저작권 침해',
  '직접 입력',
];

/** 리뷰 신고하기 */
const ReviewReport: NextPageWithLayout = () => {
  const router = useRouter();
  const { v } = router.query;
  const { setAlert } = useAlertStore();

  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [content, setContent] = useState<string>('');

  const { mutateAsync: addReport, isLoading } = useMutation(
    async (args: AddReportPayload) =>
      await (await client()).addReport(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: AddReportPayload) => {
    if (isLoading) return;
    addReport({ data: formatToBlob<AddReportPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({
            message: '신고가 접수되었습니다.',
            type: 'success',
            onClick: () => router.back(),
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <BackButton />
        <p className='flex-1 text-center text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          신고하기
        </p>
        <div className='w-6' />
      </div>

      <div className='flex flex-col gap-[18px] px-4 pt-[30px]'>
        {reportList.map((v, idx) => {
          return (
            <button
              key={idx}
              className='flex h-[42px] gap-2.5 border-b border-b-grey-90 last-of-type:border-0'
              onClick={() => {
                setSelectedItem(idx);
              }}
            >
              <div
                className={cm(
                  'flex h-[22px] w-[22px] items-center justify-center rounded-full border-[2px] border-grey-80',
                  { 'border-0 bg-primary-50': selectedItem === idx },
                )}
              >
                {selectedItem === idx && <div className='h-2 w-2 rounded-full bg-white' />}
              </div>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                {v}
              </p>
            </button>
          );
        })}
      </div>
      <div className='mx-4'>
        {selectedItem === 5 && (
          <textarea
            spellCheck={false}
            placeholder='신고 사유를 입력해주세요.'
            className='min-h-[112px] w-full rounded-lg border-2 border-grey-90 px-4 py-2.5 text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-70'
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        )}
      </div>

      {/* 하단 부분 */}
      <div className='fixed bottom-0 z-50 flex w-[375px] items-center gap-2 bg-white px-4 pb-5 pt-2 max-md:w-full'>
        <button
          className='flex h-[52px] flex-1 items-center justify-center rounded-lg bg-primary-50'
          onClick={() => {
            onMutate({
              data: {
                reviewId: Number(v),
                content: selectedItem === 5 ? content : reportList[selectedItem],
              },
            });
          }}
        >
          <p className='text-[18px] font-bold -tracking-[0.03em] text-white'>신고하기</p>
        </button>
      </div>
    </div>
  );
};

ReviewReport.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default ReviewReport;
