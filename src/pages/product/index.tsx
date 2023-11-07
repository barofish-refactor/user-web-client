import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { type GetServerSideProps } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { client } from 'src/api/client';
import {
  type DeleteSaveProductsPayload,
  type SaveProductPayload,
  type SimpleProductDto,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { CartIcon } from 'src/components/common';
import {
  // HEAD_DESCRIPTION,
  HEAD_NAME,
} from 'src/components/common/head';
import Layout from 'src/components/common/layout';
import {
  ProductBanner,
  ProductBottomSheet,
  ProductInfoNotice,
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
import { formatToBlob, formatToLocaleString } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';
import * as fpixel from 'src/utils/fpixel';
import { HeaderBanner } from 'src/components/common/header-banner';
import { DefaultSeo } from 'next-seo';
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
  // const headDescription = `${data?.title} - ${HEAD_DESCRIPTION}`;

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

  useEffect(() => {
    if (!data) return;
    const value = {
      content_ids: [data?.id],
      content_type: 'product',
      currency: 'KRW',
      value:
        formatToLocaleString(data?.discountPrice).replace(',', '.') ||
        formatToLocaleString(data?.originPrice).replace(',', '.'),
    };
    gtag('event', 'view_item', {
      items: [
        {
          id: data?.id,
          name: data?.title,
          list_name: '해산물',
          brand: data?.store?.name,
          category: data?.category?.name,
          variant: '상품 옵션',
          list_position: data?.category?.parentCategoryName,
          quantity: 1,
          price: data?.discountPrice || data?.originPrice,
        },
      ],
    });
    // google ads
    gtag('event', 'conversion', { send_to: 'AW-11315318272/9kSpCOrK_9cYEICcyJMq' });
    fpixel.view({ value });
  }, [data, headTitle, router.events]);
  // 배너 확인용 유저
  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    }
  });
  useEffect(() => {
    // 페이지 탭 기억
    const getProductView = sessionStorage.getItem('productView');
    const getProductViewJson = JSON.parse(getProductView as string);
    if (!getProductViewJson) return;
    if (getProductViewJson.id === id) {
      setSelectedTab(getProductViewJson.tabId);
    } else {
      sessionStorage.removeItem('productView');
    }
  }, [id]);

  const testtext =
    '해산물은 주로 해양 환경에서 얻어지는 다양한 식품으로, 이것은 주로 생선, 조개류, 게, 새우, 해조류 등의 바다 생물을 포함합니다. 이러한 해산물은 다양한 크기와 종류로 나타나며, 각각 특유의 맛과 영양성분을 가지고 있습니다. 해산물은 고단백질과 다양한 미네랄, 오메가-3 지방산과 같은 건강에 이로운 영양소를 풍부하게 함유하고 있어 식품의 한 종류로서 널리 소비됩니다.해산물은 많은 문화에서 다양한 요리로 준비되며, 그 중에서도 회, 스시, 해산물 요리, 찜 요리, 그리고 바비큐와 같은 다양한 조리 방식으로 손쉽게 즐길 수 있습니다. 또한 해산물은 레스토랑의 주요 메뉴 아이템 중 하나로 자리하며, 해산물 시장은 식품 산업에서 중요한 부분을 차지하고 있습니다.  이러한 이유로 해산물은 맛과 건강을 동시에 즐길 수 있는 다재다능한 식재료로 여겨지며, 수많은 사람들에게 사랑받고 있습니다.';
  return (
    <>
      {data && (
        <Head>
          <meta property='og:price:currency' content='KRW' />
          <meta property='og:image' content={`${data?.images ? data?.images[0] : ''}`} />

          <meta
            property='og:url'
            content={`https://barofish.com${router.pathname}?id=${router?.query.id}`}
          />
          <meta property='og:price:currency' content='KRW' />
          <meta
            property='og:price:amount'
            content={`${
              initialData?.discountPrice?.toString() || initialData?.originPrice?.toString()
            }`}
          />
          <meta property='product:availability' content='in stock' />
          <meta property='product:brand' content={data?.store?.name} />
          <meta property='product:condition' content='new' />
          <meta property='product:plural_title' content={headTitle} />
          <meta property='product:price:currency' content='KRW' />
          <meta
            property='product:price:amount'
            content={`${
              initialData?.discountPrice?.toString() || initialData?.originPrice?.toString()
            }`}
          />
          <meta property='product:item_group_id' content={data?.id?.toString()} />
          <meta property='product:retailer_item_id' content={'facebook_' + data?.id?.toString()} />
        </Head>
      )}

      {/* <Head></Head> */}
      <div className='pb-[80px] max-md:w-[100vw]'>
        <DefaultSeo
          title={headTitle}
          description={testtext}
          openGraph={{
            title: headTitle,
            description: testtext,
            images: data?.images?.map((v: string) => {
              return {
                url: v,
                alt: headTitle,
              };
            }),
          }}
        />
        {/* bottomSheet : 옵션 선택 */}
        <div className='sticky top-0 z-[100] w-full '>
          {isVisible && (
            <div className='absolute top-0 z-[100] flex h-[100vh] w-full flex-col justify-end bg-black/50'>
              <ProductBottomSheet data={data} setIsVisible={setIsVisible} />
            </div>
          )}
        </div>
        {/* header */}
        {!user && (
          <div className='sticky top-0 z-50'>
            <HeaderBanner />
          </div>
        )}
        <div
          className={
            !user
              ? 'sticky top-11 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white pl-4 pr-[18px]'
              : 'sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white pl-4 pr-[18px]'
          }
        >
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
        <ProductInformationDefault data={data} user={user} />
        {/* <ProductCompare /> */}
        {/* Tab Content */}
        <ProductTab
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          reviewCount={data?.reviewCount ?? 0}
        />
        <div className='min-h-[calc(100dvb-180px)]'>
          {selectedTab === 0 ? (
            <Fragment>
              <div dangerouslySetInnerHTML={{ __html: description }} className='[&_img]:w-full' />
              <ProductInfoNotice id={Number(id)} />
            </Fragment>
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
          {/* <button
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
          </button> */}
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
            <p className='text-[18px] font-bold -tracking-[0.03em] text-white'>구매하기</p>
          </button>
        </div>
      </div>
    </>
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
