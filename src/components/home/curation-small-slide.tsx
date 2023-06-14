import { ProductSmallSlideItem } from 'src/components/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';
import cm from 'src/utils/class-merge';
import { type AddBasketPayload, type ProductListDto } from 'src/api/swagger/data-contracts';
import { useMutation } from '@tanstack/react-query';
import { client } from 'src/api/client';
import { useAlertStore } from 'src/store';

interface Props {
  data: ProductListDto[];
  className?: string;
}

/** 홈화면 - 큐레이션 (슬라이드 - 소) */
const CurationSmallSlide = ({ data, className }: Props) => {
  const { setAlert } = useAlertStore();

  const { mutateAsync: addBasket, isLoading } = useMutation((args: AddBasketPayload) =>
    client().addBasket(args),
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
      freeMode
      slidesPerView={2.5}
      modules={[FreeMode]}
      spaceBetween={11}
      className={cm('mt-5', className)}
      style={{
        marginLeft: '-16px',
        marginRight: '-16px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      {data.map((v, idx) => {
        return (
          <SwiperSlide key={`curation${idx}`} className=''>
            <ProductSmallSlideItem data={v} type='SMALL' onMutate={onMutate} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CurationSmallSlide;
