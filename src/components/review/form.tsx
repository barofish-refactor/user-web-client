/* 
  수정의 경우 [id]값으로 조회하여 값을 미리 불러온다.
  상품 조회를 위해 ?productId 등으로 상품을 조회
*/

import clsx from 'clsx';
import Image from 'next/image';
import { useRef } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { inputClassName, submitButtonClassName } from 'src/components/form';
import { type FileType } from 'src/types/common';
import { formatToLocaleString } from 'src/utils/functions';
import { asyncUploads } from 'src/utils/upload';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';

const IMAGE_MAX_COUNT = 10;

const keywords = [
  { icon: '/assets/icons/emoji/thumbs-up.svg', text: '맛이 만족스러워요', value: 'a' },
  { icon: '/assets/icons/emoji/droplet.svg', text: '신선도가 좋아요', value: 'b' },
  { icon: '/assets/icons/emoji/money-wing.svg', text: '가격이 합리적이에요', value: 'c' },
  { icon: '/assets/icons/emoji/gift.svg', text: '포장이 꼼꼼해요', value: 'd' },
  { icon: '/assets/icons/emoji/dolphin.svg', text: '크기가 사진과 같아요', value: 'e' },
];

const dummyProduct = {
  id: 1,
  img: 'https://picsum.photos/72',
  name: '서준수산',
  description: '[3차 세척,스킨포장] 최고 품질의 멸치 5kg',
  price: 10000,
  discountRate: 40,
};

type FormType = {
  selectKeywords: string[];
  images: FileType[];
  description: string;
};

export function ReviewForm() {
  const form = useForm<FormType>({
    defaultValues: { description: '', images: [], selectKeywords: [] },
  });
  const { handleSubmit, register } = form;

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <FormProvider {...form}>
      <form className='flex flex-1 flex-col justify-between' onSubmit={onSubmit}>
        <div>
          <Product />
          <SelectKeywords />
          <div className='pt-8'>
            <h3 className='px-4 font-bold leading-[24px] -tracking-[0.03em]'>리뷰를 남겨주세요</h3>
            <p className='px-4 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              좋았던 점이나 아쉬운 점을 적어주세요
            </p>
            <Images />
            <div className='px-4'>
              <textarea
                {...register('description')}
                className={clsx(inputClassName, '[&]:h-[212px] [&]:p-3')}
                placeholder='취소/환불 사유를 작성 해 주세요'
                spellCheck={false}
              />
            </div>
          </div>
        </div>
        <div className='px-4 pb-6 pt-2'>
          <button type='submit' className={submitButtonClassName}>
            수정하기
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

function Product() {
  return (
    <div className='p-4'>
      <div className='flex items-center gap-[13px] rounded-lg bg-grey-90 p-2'>
        <Image
          priority
          src={dummyProduct.img}
          alt={dummyProduct.name}
          width={72}
          height={72}
          className='aspect-square rounded-lg object-cover'
        />
        <div className='flex-1'>
          <h4 className='line-clamp-1 text-[13px] font-bold leading-[16px] -tracking-[0.05em]'>
            {dummyProduct.name}
          </h4>
          <p className='mt-0.5 line-clamp-1 text-[13px] font-medium leading-[20px] -tracking-[0.05em] text-grey-30'>
            {dummyProduct.description}
          </p>
          <div className='flex items-center gap-0.5'>
            <strong className='font-semibold leading-[19px] -tracking-[0.05em] text-teritory'>
              {formatToLocaleString(dummyProduct.discountRate, { suffix: '%' })}
            </strong>
            <strong className='font-bold leading-[22px] -tracking-[0.05em] text-grey-10'>
              {formatToLocaleString(dummyProduct.price, { suffix: '원' })}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectKeywords() {
  const { control } = useFormContext<FormType>();
  return (
    <div className='bg-grey-90 px-4 py-8'>
      <h3 className='font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
        어떤 점이 좋았나요?
      </h3>
      <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
        해당 상품에 대한 키워드를 골라주세요. (중복 가능)
      </p>
      <ul className='flex flex-wrap gap-2 pt-4'>
        {keywords.map(v => (
          <li key={v.text} className='rounded-lg bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]'>
            <Controller
              control={control}
              name='selectKeywords'
              render={({ field: { value, onChange } }) => {
                const isActive = value.find(v2 => v2 === v.value);
                return (
                  <button
                    type='button'
                    data-active={!!isActive}
                    className={clsx(
                      'flex items-center gap-2 rounded-lg px-4 py-2.5 text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10',
                      'data-[active=true]:bg-primary-90 data-[active=true]:shadow-[0px_0px_0px_1px_theme(colors.primary.50)]',
                    )}
                    onClick={() => {
                      if (isActive) {
                        onChange(value.filter(v2 => v2 !== v.value));
                      } else {
                        onChange([...value, v.value]);
                      }
                    }}
                  >
                    <Image src={v.icon} width={16} height={16} alt='' />
                    <span>{v.text}</span>
                  </button>
                );
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Images() {
  const { watch, setValue } = useFormContext<FormType>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { images } = watch();

  // const handleWebview = useCallback(
  //   (e: MessageEvent) => {
  //     const json = JSON.parse(e.data);
  //     if (json.type === 'imageUpload' || json.type === 'imageGallery') {
  //       setThumbnail({ file: null, key: json.key, previewUrl: json.url });
  //     }
  //     if (json.type === 'alert') {
  //       setAlert({ message: json.message });
  //     }
  //   },
  //   [setAlert],
  // );

  // useWebview(handleWebview);

  return (
    <div className='my-4'>
      <Swiper
        freeMode
        slidesPerView='auto'
        spaceBetween={12}
        modules={[FreeMode]}
        className='review-form-swiper'
        slidesOffsetAfter={16}
      >
        {images.map(v => (
          <SwiperSlide key={v.id}>
            <button
              type='button'
              className='absolute right-2.5 top-2.5 z-10 h-6 w-6 bg-[url(/assets/icons/review/circle-close.svg)] bg-cover'
              onClick={() =>
                setValue(
                  'images',
                  images.filter(v2 => v2.id !== v.id),
                )
              }
            />
            <Image fill src={v.previewUrl} alt='' className='object-cover' />
          </SwiperSlide>
        ))}
        {images.length < IMAGE_MAX_COUNT && (
          <SwiperSlide>
            <button
              type='button'
              className='h-full w-full rounded-lg bg-grey-90 bg-[url(/assets/icons/review/upload-image.svg)] bg-cover'
              onClick={() => inputRef.current?.click()}
            />
            <input
              ref={inputRef}
              hidden
              multiple
              type='file'
              accept='images/*'
              onChange={e => {
                if (!e.target.files) return;

                asyncUploads(e).then(res =>
                  setValue('images', [...images, ...(res ?? [])].slice(0, IMAGE_MAX_COUNT)),
                );

                e.target.value = '';
              }}
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
