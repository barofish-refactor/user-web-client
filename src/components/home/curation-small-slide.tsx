import { useMutation } from '@tanstack/react-query';
import { client } from 'src/api/client';
import { type AddBasketPayload, type ProductListDto } from 'src/api/swagger/data-contracts';
import { ProductSmallSlideItem } from 'src/components/common';
import { useAlertStore } from 'src/store';
import cm from 'src/utils/class-merge';
import { FreeMode, Grid } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  data: ProductListDto[];
  className?: string;
  onClick?: () => void;
}

/** 홈화면 - 큐레이션 (슬라이드 - 소) */
const CurationSmallSlide = ({ data, className, onClick }: Props) => {
  const { setAlert } = useAlertStore();

  const { mutateAsync: addBasket, isLoading } = useMutation(
    async (args: AddBasketPayload) => await (await client()).addBasket(args),
  );

  const onMutate = (args: AddBasketPayload) => {
    if (isLoading) return;
    addBasket(args)
      .then(res => {
        if (res.data.isSuccess) {
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };
  return (
    <Swiper
      slidesPerView={2}
      // slidesPerColumnFill="row"
      modules={[FreeMode, Grid]}
      spaceBetween={16}
      // className={cm('mt-5', className)}
      // style={{ marginInline: '-16px', paddingInline: '16px' }}
      grid={{
        rows: 2,
        fill: 'row',
      }}
      freeMode={{
        momentumRatio: 0.3,
        momentumBounceRatio: 0.5,
        momentumVelocityRatio: 0.5,
      }}
    >
      {data.map((v, idx) => {
        return (
          <SwiperSlide key={idx}>
            <ProductSmallSlideItem
              imageOptimize
              data={v}
              type='SMALL'
              onMutate={onMutate}
              onClick={onClick}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CurationSmallSlide;
