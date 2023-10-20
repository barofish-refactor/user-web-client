import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { ProductBanner } from 'src/components/product';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToLocaleString, formatToUtc } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';

/** 후기 상세보기 */
const Review: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setAlert } = useAlertStore();

  const { data, refetch } = useQuery(
    queryKey.review.detail(Number(id)),
    async () => {
      const res = await (await client()).selectReview(Number(id));

      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.errorMsg);
      }
    },
    { enabled: !!id },
  );

  const { mutateAsync: likeReviewByUser, isLoading } = useMutation(
    async (id: number) => await (await client()).likeReviewByUser(id),
  );

  const { mutateAsync: unlikeReviewByUser, isLoading: isUnlikeLoading } = useMutation(
    async (id: number) => await (await client()).unlikeReviewByUser(id),
  );

  const onLikeMutate = ({ id }: { id: number }) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    if (isLoading) return;
    likeReviewByUser(id)
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const onUnlikeMutate = ({ id }: { id: number }) => {
    if (isUnlikeLoading) return;
    unlikeReviewByUser(id)
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='max-md:w-[100vw]'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <BackButton />
        <p className='flex-1 text-center text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          후기 상세보기
        </p>
        <div className='w-6' />
        {/* <Link href='/product/cart'>
          <Image unoptimized src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
        </Link> */}
      </div>
      <ProductBanner isShowArrow image={data?.images ?? []} />
      <div className='p-4'>
        <div className='flex items-center gap-1'>
          <p className='text-[16px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10'>
            {data?.user?.nickname ?? ''}
          </p>
          <div className='flex h-[22px] items-center justify-center rounded border border-[#6085EC] px-2'>
            <p className='text-[14px] font-medium -tracking-[0.03em] text-primary-50'>
              {data?.user?.grade?.name ?? ''}
            </p>
          </div>
        </div>
        <p className='mt-[7px] truncate text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
          {/* {`옵션 : ${data?.simpleProduct?.title ?? ''}`} */}
          {data?.simpleProduct?.title ?? ''}
        </p>
        <p className='mt-4 text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-50'>
          {data?.content}
        </p>
        <div className='mt-[18px] flex items-center justify-between'>
          <p className='text-[14px] font-medium leading-[18px] -tracking-[0.03em] text-grey-70'>{`${formatToUtc(
            data?.createdAt,
            'yyyy.MM.dd',
          )}`}</p>
          <button
            className='flex h-8 items-center gap-1.5 rounded-full border border-grey-80 px-3.5'
            onClick={() => {
              if (!data?.id) return;
              if (data.isLike) onUnlikeMutate({ id: data.id });
              else onLikeMutate({ id: data.id });
            }}
          >
            <Image
              unoptimized
              src='/assets/icons/product/review-like.svg'
              alt='like'
              width={12}
              height={13}
            />
            <p className='text-[14px] font-medium -tracking-[0.05em] text-grey-60'>도움돼요</p>
            <p className='text-[14px] font-medium -tracking-[0.05em] text-grey-60'>{`${formatToLocaleString(
              data?.likeCount ?? 0,
            )}`}</p>
          </button>
        </div>
        <div className='mt-[15px] h-[1px] bg-[#F2F2F2]' />
      </div>
    </div>
  );
};

Review.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Review;
