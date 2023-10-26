import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import { StoreItem } from 'src/components/store';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { VARIABLES } from 'src/variables';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

/** 홈화면 - 파트너 부분 */
const Partner = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();

  const { data, refetch } = useQuery(queryKey.mainPartner, async () => {
    const res = await (await client()).selectMainStoreList();
    if (res.data.isSuccess) {
      return res.data.data;
    } else setAlert({ message: res.data.errorMsg ?? '' });
  });

  const { mutateAsync: likeStoreByUser, isLoading } = useMutation(
    async (args: { storeId: number; type: 'LIKE' | 'UNLIKE' }) =>
      await (await client()).likeStoreByUser(args),
  );

  const onMutate = ({ storeId, type }: { storeId: number; type: 'LIKE' | 'UNLIKE' }) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    if (isLoading) return;
    likeStoreByUser({
      storeId,
      type,
    })
      .then(res => {
        if (res.data.isSuccess) refetch();
        else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (!data?.length) return null;

  return (
    <div className='px-4 py-[30px]'>
      <p className='line-clamp-1 text-[22px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
        믿고 구매할 수 있는 스토어 🏡
      </p>
      <p className='whitespace-pre-line text-[15px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
        바로피쉬에서 입증한 스토어에서 실패없는 수산물 쇼핑!
      </p>

      <Swiper
        freeMode
        slidesPerView={1.1}
        spaceBetween={16}
        className='mt-5'
        style={{ marginInline: '-16px', paddingInline: '16px' }}
      >
        {data?.map((v, idx) => {
          return (
            <SwiperSlide key={idx} className=''>
              <StoreItem
                data={v}
                buttonType='star'
                onButtonClick={e => {
                  e.preventDefault();
                  onMutate({
                    storeId: v?.storeId ?? -1,
                    type: v?.isLike ? 'UNLIKE' : 'LIKE',
                  });
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <div className='mt-5 flex'>
      </div> */}
    </div>
  );
};

export default Partner;
