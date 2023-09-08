import Image from 'next/image';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import { type ReviewDto } from 'src/api/swagger/data-contracts';
import { useAlertStore } from 'src/store';
import {
  calcDiscountRate,
  formatToLocaleString,
  formatToUtc,
  setSquareBrackets,
} from 'src/utils/functions';
import { VARIABLES } from 'src/variables';
import 'swiper/css';
import { queryKey } from 'src/query-key';

interface Props {
  data: ReviewDto;
  isMine?: boolean;
  showInfo?: boolean;
  refetch: () => void;
}

/** 구매후기 */
export function ReviewItem({ data, isMine, showInfo = true, refetch }: Props) {
  const router = useRouter();
  const { setAlert } = useAlertStore();

  const { mutateAsync: likeReviewByUser, isLoading } = useMutation(
    async (id: number) => await (await client()).likeReviewByUser(id),
  );

  const { mutateAsync: unlikeReviewByUser, isLoading: isUnlikeLoading } = useMutation(
    async (id: number) => await (await client()).unlikeReviewByUser(id),
  );

  // 유저 조회
  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.errorMsg);
    }
  });

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
    <div className='py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10'>
            {data.user?.nickname ?? ''}
          </p>
          <div className='flex h-[22px] items-center justify-center rounded border border-[#6085EC] px-2'>
            <p className='text-[12px] font-medium -tracking-[0.03em] text-primary-50'>
              {data.user?.grade?.name ?? ''}
            </p>
          </div>
        </div>
        {isMine ? (
          // <ReviewDots onUpdate={() => { router.push({ pathname: '/mypage/review/[id]', query: { id: data.id } }) }} />
          <></>
        ) : (
          <button
            className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'
            onClick={() => {
              router.push({ pathname: '/mypage/review/report', query: { v: data.id } });
            }}
          >
            신고하기
          </button>
        )}
      </div>
      <p className='mt-[7px] truncate text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
        {/* {`옵션 : ${'멸치 5kg'}`} */}
        {data?.simpleProduct?.title ?? ''}
      </p>
      <Swiper
        freeMode
        slidesPerView={2.2}
        modules={[FreeMode]}
        spaceBetween={11}
        className='mt-4'
        style={{ marginInline: '-16px', paddingInline: '16px' }}
      >
        {data.images
          ?.filter(v => v !== '')
          .map((v, idx) => {
            return (
              <SwiperSlide key={`curation${idx}`} className=''>
                <div className='relative overflow-hidden rounded-lg'>
                  <Image
                    unoptimized
                    width={150}
                    height={150}
                    src={v}
                    alt='review'
                    draggable={false}
                    className=' aspect-square w-full object-cover'
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <p className='mt-3 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-50'>
        {data.content ?? ''}
      </p>
      {showInfo && (
        <button
          className='my-[18px] flex w-full items-center gap-[13px] rounded-lg bg-grey-90 p-2'
          onClick={() => {
            router.push({ pathname: '/product', query: { id: data.simpleProduct?.id } });
          }}
        >
          {data.simpleProduct?.image && (
            <Image
              unoptimized
              src={data.simpleProduct?.image}
              alt='product'
              className='rounded-lg'
              width={72}
              height={72}
            />
          )}
          <div className='flex flex-1 flex-col truncate text-start'>
            <p className='text-[13px] font-bold leading-[16px] -tracking-[0.05em] text-grey-10'>
              {data.store?.name ?? ''}
            </p>
            <p className='mt-0.5 truncate text-[13px] font-medium leading-[20px] -tracking-[0.05em] text-grey-30'>
              {`${setSquareBrackets(data.simpleProduct?.storeName)} ${data.simpleProduct?.title}`}
            </p>
            <div className='flex items-center gap-0.5'>
              {(data.simpleProduct?.originPrice ?? 0) !== 0 && (
                <p className='text-[16px] font-semibold leading-[19px] -tracking-[0.05em] text-teritory'>{`${calcDiscountRate(
                  data?.simpleProduct?.originPrice,
                  data?.simpleProduct?.discountPrice,
                )}%`}</p>
              )}
              <p className='text-[16px] font-bold leading-[22px] -tracking-[0.05em] text-grey-10'>
                {`${formatToLocaleString(data.simpleProduct?.discountPrice)}원`}
              </p>
            </div>
          </div>
        </button>
      )}
      <div className='flex items-center justify-between'>
        <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-70'>{`${formatToUtc(
          data.createdAt,
          'yyyy.MM.dd',
        )}`}</p>
        <button
          className='flex h-8 items-center gap-1.5 rounded-full border border-grey-80 px-3.5'
          onClick={() => {
            if (!data.id || user?.userId === data.user?.userId) return;
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
          <p className='text-[12px] font-medium -tracking-[0.05em] text-grey-60'>도움돼요</p>
          <p className='text-[12px] font-medium -tracking-[0.05em] text-grey-60'>{`${formatToLocaleString(
            data.likeCount ?? 0,
          )}`}</p>
        </button>
      </div>

      <div className='mt-[15px] h-[1px] bg-[#F2F2F2]' />
    </div>
  );
}
