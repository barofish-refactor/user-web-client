/*
  수정의 경우 [id]값으로 조회하여 값을 미리 불러온다.
  상품 조회를 위해 ?productId 등으로 상품을 조회
*/
import clsx from 'clsx';
import Image from 'next/image';
import { type SyntheticEvent, useEffect, useRef } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { inputClassName, submitButtonClassName } from 'src/components/form';
import { type FileType } from 'src/types/common';
import { formatToBlob, setSquareBrackets } from 'src/utils/functions';
import { asyncUploads } from 'src/utils/upload';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import { type UpdateReviewPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import 'swiper/css';
import 'swiper/css/free-mode';

const IMAGE_MAX_COUNT = 10;

const keywords = [
  { icon: '/assets/icons/emoji/thumbs-up.svg', text: '맛이 만족스러워요', value: 'TASTE' },
  { icon: '/assets/icons/emoji/droplet.svg', text: '신선도가 좋아요', value: 'FRESH' },
  { icon: '/assets/icons/emoji/money-wing.svg', text: '가격이 합리적이에요', value: 'PRICE' },
  { icon: '/assets/icons/emoji/gift.svg', text: '포장이 꼼꼼해요', value: 'PACKAGING' },
  { icon: '/assets/icons/emoji/dolphin.svg', text: '크기가 사진과 같아요', value: 'SIZE' },
];

type FormType = {
  selectKeywords: string[];
  images: FileType[];
  description: string;
};

export function RetouchReviewForm({ order }: { order?: any; subId?: number }) {
  const queryClient = useQueryClient();
  const form = useForm<FormType>({
    defaultValues: { description: '', images: [], selectKeywords: order?.evaluations },
  });
  useEffect(() => {
    if (order && order.evaluations) {
      form.setValue('selectKeywords', order?.evaluations);
    }
    if (order && order.content) {
      form.setValue('description', order?.content);
    }
    if (order && order.images) {
      form.setValue('images', order?.images);
    }
  }, [form, order]);
  const { handleSubmit, register } = form;
  const { setAlert } = useAlertStore();
  const router = useRouter();
  // const [productInfo, setProductInfo] = useState<OrderProductDto>();

  const { mutateAsync: updateReview, isLoading } = useMutation(
    async (args: UpdateReviewPayload) =>
      await (await client()).updateReview(order?.id, args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data, imageUrlsToRemain, newImages }: UpdateReviewPayload) => {
    if (isLoading) return;

    updateReview({
      data: formatToBlob<UpdateReviewPayload['data']>(data, true),
      newImages,
      imageUrlsToRemain,
    })
      .then(res => {
        if (res.data.isSuccess) {
          queryClient.invalidateQueries(queryKey.order.lists);
          queryClient.invalidateQueries(queryKey.myReview);
          queryClient.invalidateQueries(queryKey.review.lists);
          setAlert({
            message: '리뷰를 수정했습니다.',
            onClick: () => router.push('/mypage/review'),
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };
  //
  const onSubmit = handleSubmit(data => {
    if (data.description.trim().length === 0) return setAlert({ message: '내용을 입력해 주세요' });
    const img = data.images.filter(v => v.toString() !== '');

    const newImages = img.filter((v: any) => !!v.file).map(v => v.file as File);

    const existingImages: any =
      img.length === 0
        ? []
        : formatToBlob(
            img.filter(v => !v.file && v.toString() !== '').map(v => v),
            true,
          );

    onMutate({
      data: {
        content: data.description,
        evaluations: data.selectKeywords as ('TASTE' | 'FRESH' | 'PRICE' | 'PACKAGING' | 'SIZE')[],
      },
      newImages,
      imageUrlsToRemain: existingImages,

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    });
  });

  return (
    <FormProvider {...form}>
      <form className='flex flex-1 flex-col justify-between' onSubmit={onSubmit}>
        <div>
          <Product data={order} />
          <SelectKeywords data={order} />
          <div className='pt-8'>
            <h3 className='px-4 font-bold leading-[24px] -tracking-[0.03em]'>리뷰를 남겨주세요</h3>
            <p className='px-4 text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              좋았던 점이나 아쉬운 점을 적어주세요
            </p>
            <Images />
            <div className='px-4'>
              <textarea
                {...register('description')}
                className={clsx(inputClassName, '[&]:h-[212px] [&]:p-3')}
                placeholder='리뷰를 작성해 주세요'
                spellCheck={false}
              />
            </div>
          </div>
        </div>
        <div className='px-4 pb-6 pt-2'>
          <button type='submit' className={submitButtonClassName}>
            {`${true ? '수정하기' : '등록하기'}`}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

function Product({ data }: { data?: any }) {
  return (
    <div className='p-4'>
      <div className='flex items-center gap-[13px] rounded-lg bg-grey-90 p-2'>
        {data?.simpleProduct?.image && (
          <Image
            unoptimized
            priority
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8XQ8AAnsBfKyAV94AAAAASUVORK5CYII='
            placeholder='blur'
            src={data?.simpleProduct?.image}
            alt='product'
            width={72}
            height={72}
            className='aspect-square rounded-lg object-cover'
          />
        )}
        <div className='flex-1'>
          <h4 className='line-clamp-1 text-[15px] font-bold leading-[16px] -tracking-[0.05em]'>
            {`${setSquareBrackets(data?.store?.name)} ${data?.simpleProduct?.title}`}
            {/* {data?.product?.title ?? ''} */}
          </h4>
          {/* <p className='mt-0.5 line-clamp-1 text-[13px] font-medium leading-[20px] -tracking-[0.05em] text-grey-30'>
            {data?.optionName ?? '기본'} {data?.amount ?? 0}개
          </p> */}
          {/* <div className='flex items-center gap-0.5'>
            {(data?.product?.originPrice ?? 0) !== 0 && (
              <strong className='font-semibold leading-[19px] -tracking-[0.05em] text-teritory'>
                {calcDiscountRate(data?.product?.originPrice, data?.product?.discountPrice)}%
              </strong>
            )}
            <strong className='font-bold leading-[22px] -tracking-[0.05em] text-grey-10'>
              {formatToLocaleString(data?.product?.discountPrice, { suffix: '원' })}
            </strong>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function SelectKeywords({ data }: any) {
  const { control } = useFormContext<FormType>();

  // defaultValues: { description: '', images: [], selectKeywords: [] }
  return (
    <div className='bg-grey-90 px-4 py-8'>
      <h3 className='font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
        어떤 점이 좋았나요?
      </h3>
      <p className='text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
        해당 상품에 대한 키워드를 골라주세요. (중복 가능)
      </p>

      <ul className='flex flex-wrap gap-2 pt-4'>
        {keywords.map(v => (
          <li key={v.text} className='rounded-lg bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]'>
            <Controller
              control={control}
              name='selectKeywords'
              defaultValue={data?.evaluations}
              render={({ field: { value, onChange } }) => {
                const isActive = value?.find((v2: any) => v2 === v.value);
                return (
                  <button
                    type='button'
                    data-active={!!isActive}
                    className={clsx(
                      'flex items-center gap-2 rounded-lg px-4 py-2.5 text-[16px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10',
                      'data-[active=true]:bg-primary-90 data-[active=true]:shadow-[0px_0px_0px_1px_theme(colors.primary.50)]',
                    )}
                    onClick={() => {
                      if (isActive) {
                        onChange(value.filter((v2: string) => v2 !== v.value));
                      } else {
                        onChange([...value, v.value]);
                      }
                    }}
                  >
                    <Image unoptimized src={v.icon} width={16} height={16} alt='후기 이미지' />
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
        slidesPerView='auto'
        spaceBetween={12}
        modules={[FreeMode]}
        className='review-form-swiper'
        slidesOffsetAfter={16}
        freeMode={{
          momentumRatio: 0.3,
          momentumBounceRatio: 0.5,
          momentumVelocityRatio: 0.5,
        }}
      >
        {images.map(v => {
          if (v.toString() === '') return null;
          return (
            <SwiperSlide key={v.id}>
              <button
                type='button'
                className='absolute right-2.5 top-2.5 z-10 h-6 w-6 bg-[url(/assets/icons/review/circle-close.svg)] bg-cover'
                onClick={() =>
                  setValue(
                    'images',
                    images.filter(v2 => v2 !== v),
                  )
                }
              />
              <Image
                unoptimized
                fill
                src={v.toString()}
                alt=''
                className='object-cover'
                onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                  if (v.toString() === '') return;
                  e.currentTarget.src = '/assets/icons/common/default-image.png';
                }}
              />
            </SwiperSlide>
          );
        })}
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
              accept='image/*'
              onChange={e => {
                if (!e.target.files) return;
                asyncUploads(e).then(res => {
                  setValue('images', [...images, ...(res ?? [])].slice(0, IMAGE_MAX_COUNT));
                });
                e.target.value = '';
              }}
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
