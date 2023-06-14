import { useMutation, useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import { type SimpleProductDto } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import {
  ProductBanner,
  ProductBottomSheet,
  // ProductCompare,
  ProductInformationDefault,
  ProductInquiry,
  ProductTab,
} from 'src/components/product';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';
import { getCookie } from 'cookies-next';
import { VARIABLES } from 'src/variables';
import { queryKey } from 'src/query-key';
import { ReviewChart, ReviewPhoto } from 'src/components/review';
import { useAlertStore } from 'src/store';

interface Props {
  initialData: SimpleProductDto;
}

/** 상품 상세 */
const ProductDetail: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { id, openState } = router.query;
  const { setAlert } = useAlertStore();

  const { data } = useQuery(
    queryKey.product.detail(id),
    async () => {
      const res = await client().selectProduct(Number(id));
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!id,
      initialData,
      staleTime: 0,
    },
  );

  const { mutateAsync: likeProductByUser, isLoading } = useMutation(
    (args: { productId: number; type: 'LIKE' | 'UNLIKE' }) => client().likeProductByUser(args),
  );

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [content, setContent] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (data) {
      console.log(data);
      setIsLiked(data.isLike ?? false);
      if (data.description) {
        fetch(data.description)
          .then(res => {
            res.text().then(res => {
              setDescription(res);
            });
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });
      }
    }
  }, [data]);

  useEffect(() => {
    fetch('/HTML_delivery.html')
      .then(res => {
        res.text().then(res => {
          setContent(res);
        });
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }, []);

  useEffect(() => {
    if (openState === 'open') {
      setIsVisible(true);
    }
  }, [openState]);

  return (
    <div className='pb-[80px] max-md:w-[100vw]'>
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
            <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
          </Link>
          <button
            onClick={() => {
              //
            }}
          >
            <Image src='/assets/icons/common/share.svg' alt='share' width={18} height={19} />
          </button>
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
          <div dangerouslySetInnerHTML={{ __html: description }} className='mt-5' />
        ) : // <Image
        //   width='0'
        //   height='0'
        //   sizes='100vw'
        //   className='h-auto w-full'
        //   src={data?.description ?? ''}
        //   alt='상품상세'
        //   draggable={false}
        // />
        selectedTab === 1 ? (
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
          <ProductInquiry productId={Number(id)} data={data?.inquiries ?? []} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} className='mt-5 px-4' />
        )}
      </div>

      {/* 하단 부분 */}
      <div className='fixed bottom-0 z-50 flex w-[375px] items-center gap-2 bg-white px-4 pb-5 pt-2 max-md:w-full'>
        <button
          className='flex h-[52px] w-[54px] items-center justify-center rounded-lg border border-grey-80'
          onClick={() => {
            if (isLoading) return;
            const value = !isLiked;
            likeProductByUser({
              productId: Number(id),
              type: value ? 'UNLIKE' : 'LIKE',
            })
              .then(res => {
                if (res.data.isSuccess) {
                  setIsLiked(value);
                } else {
                  setAlert({
                    message: res.data.errorMsg ?? '',
                    onClick: () => {
                      //
                    },
                  });
                }
              })
              .catch(error => {
                console.error(error);
              });
          }}
        >
          {isLiked ? (
            <Image
              src='/assets/icons/product/product-bookmark-on.svg'
              alt='heart'
              width={30}
              height={30}
            />
          ) : (
            <Image
              src='/assets/icons/product/product-bookmark-off.svg'
              alt='heart'
              width={30}
              height={30}
            />
          )}
        </button>
        <button
          className='flex h-[52px] flex-1 items-center justify-center rounded-lg bg-primary-50'
          onClick={() => {
            const cookie = getCookie(VARIABLES.ACCESS_TOKEN);
            if (!cookie) router.push('/login');
            else setIsVisible(true);
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
  const { selectProduct } = client();
  return {
    props: { initialData: (await selectProduct(Number(id))).data.data },
  };
};

export default ProductDetail;
