import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { type GetServerSideProps } from 'next';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import {
  type DeleteSaveProductsPayload,
  type SaveProductPayload,
  type SimpleProductDto,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { CartIcon } from 'src/components/common';
import { HEAD_DESCRIPTION, HEAD_NAME } from 'src/components/common/head';
import Layout from 'src/components/common/layout';
import {
  ProductBanner,
  ProductBottomSheet,
  // ProductCompare,
  ProductInformationDefault,
  ProductInquiry,
  ProductTab,
  ShareButton,
} from 'src/components/product';
import { ReviewChart, ReviewPhoto } from 'src/components/review';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore, useToastStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';

interface Props {
  initialData: SimpleProductDto;
}

/** 상품 상세 */
const ProductDetail: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { id, openState } = router.query;
  const { setAlert } = useAlertStore();
  const { setToast } = useToastStore();

  const { data, refetch } = useQuery(
    queryKey.product.detail(id),
    async () => {
      const res = await (await client()).selectProduct(Number(id));
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!id,
      initialData,
    },
  );

  const { data: deliverInfo } = useQuery(queryKey.deliverInfo, async () => {
    const res = await (await client()).selectSiteInfo('HTML_DELIVER_INFO');
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const { mutateAsync: saveProduct, isLoading: isSaveLoading } = useMutation(
    async (args: SaveProductPayload) =>
      await (await client()).saveProduct(args, { type: ContentType.FormData }),
  );

  const onSaveMutate = ({ data }: SaveProductPayload) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    if (isSaveLoading) return;
    saveProduct({ data: formatToBlob<SaveProductPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setToast({
            text: '1개의 상품이 저장함에 담겼어요.',
            onClick: () => router.push('/compare/storage'),
          });
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const { mutateAsync: deleteSaveProducts, isLoading: isDeleteLoading } = useMutation(
    async (args: DeleteSaveProductsPayload) =>
      await (await client()).deleteSaveProducts(args, { type: ContentType.FormData }),
  );

  const onDeleteSaveProductsMutate = ({ data }: DeleteSaveProductsPayload) => {
    if (isDeleteLoading) return;
    deleteSaveProducts({ data: formatToBlob<DeleteSaveProductsPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const headTitle = `${data?.title} - ${HEAD_NAME}`;
  const headDescription = `${data?.title} - ${HEAD_DESCRIPTION}`;

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [content, setContent] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (data) {
      setIsLiked(data.isLike ?? false);
      if (data.description) {
        fetch(data.description)
          .then(res => res.text())
          .then(setDescription)
          .catch(err => console.log(JSON.stringify(err)));
      }
    }
  }, [data]);

  useEffect(() => {
    if (deliverInfo && deliverInfo.content) {
      fetch(deliverInfo.content)
        .then(res => res.text())
        .then(setContent)
        .catch(err => console.log(JSON.stringify(err)));
    }
  }, [deliverInfo]);

  useEffect(() => {
    if (openState === 'open') {
      setIsVisible(true);
    }
  }, [openState]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('product') || '[]';
      const list: number[] = JSON.parse(result);
      const list2 = new Set<number>([Number(id)].concat(list));
      localStorage.setItem('product', JSON.stringify(Array.from(list2)));
    }
  }, [id]);

  return (
    <div className='pb-[80px] max-md:w-[100vw]'>
      <DefaultSeo
        title={headTitle}
        description={headDescription}
        openGraph={{
          title: headTitle,
          description: headDescription,
          images: data?.images?.map(v => {
            return {
              url: v,
              alt: headTitle,
            };
          }),
        }}
      />
      {/* bottomSheet : 옵션 선택 */}
      <div className='sticky top-0 z-[100] w-full'>
        {isVisible && (
          <div className='absolute top-0 z-[100] flex h-[100dvb] w-full flex-col justify-end bg-black/50'>
            <ProductBottomSheet data={data} setIsVisible={setIsVisible} />
          </div>
        )}
      </div>

      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white pl-4 pr-[18px]'>
        <BackButton />
        <div className='flex items-center gap-4'>
          <Link href='/product/cart'>
            <CartIcon />
          </Link>
          <ShareButton />
        </div>
      </div>

      {/* content */}
      <ProductBanner image={data?.images ?? []} />
      <ProductInformationDefault data={data} />
      {/* <ProductCompare /> */}

      {/* Tab Content */}
      <ProductTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        reviewCount={data?.reviews?.length ?? 0}
      />
      <div className='min-h-[calc(100dvb-180px)]'>
        {selectedTab === 0 ? (
          <div dangerouslySetInnerHTML={{ __html: description }} className='[&_img]:w-full' />
        ) : selectedTab === 1 ? (
          <div>
            {/* 구매자들의 솔직 리뷰 */}
            <ReviewChart
              data={{
                taste: data?.reviewStatistics?.taste ?? 0,
                freshness: data?.reviewStatistics?.fresh ?? 0,
                price: data?.reviewStatistics?.price ?? 0,
                packaging: data?.reviewStatistics?.packaging ?? 0,
                size: data?.reviewStatistics?.size ?? 0,
              }}
            />
            {/* 사진 후기 */}
            <div className='h-2 bg-grey-90' />
            {/* <ReviewPhoto data={data?.reviews ?? []} type='product' /> */}
            <ReviewPhoto id={data?.id ?? -1} type='product' />
          </div>
        ) : selectedTab === 2 ? (
          <ProductInquiry productId={Number(id)} data={data?.inquiries ?? []} refetch={refetch} />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className='product-delivery-description mt-5 px-4'
          />
        )}
      </div>

      {/* 하단 부분 */}
      <div className='fixed bottom-0 z-50 flex w-[375px] items-center gap-2 bg-white px-4 pb-5 pt-2 max-md:w-full'>
        <button
          className='flex h-[52px] w-[54px] items-center justify-center rounded-lg border border-grey-80'
          onClick={() => {
            if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
            if (data?.isLike) onDeleteSaveProductsMutate({ data: { productIds: [Number(id)] } });
            else onSaveMutate({ data: { productId: Number(id) } });
          }}
        >
          <Image
            unoptimized
            alt='heart'
            width={30}
            height={30}
            src={
              isLiked
                ? '/assets/icons/product/product-bookmark-on.svg'
                : '/assets/icons/product/product-bookmark-off.svg'
            }
          />
        </button>
        <button
          className='flex h-[52px] flex-1 items-center justify-center rounded-lg bg-primary-50'
          onClick={() => {
            if (data?.state !== 'ACTIVE') {
              let message = '';
              switch (data?.state) {
                case 'DELETED':
                  message = '삭제된 상품입니다.';
                  break;
                case 'SOLD_OUT':
                  message = '품절된 상품입니다.';
                  break;
                case 'INACTIVE':
                  message = '비활성화된 상품입니다.';
                  break;
                default:
                  break;
              }
              return setAlert({ message });
            }
            setIsVisible(true);
          }}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>구매하기</p>
        </button>
      </div>
    </div>
  );
};

ProductDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;
  const { selectProduct } = await client();
  return {
    props: { initialData: (await selectProduct(Number(id))).data.data },
  };
};

export default ProductDetail;
