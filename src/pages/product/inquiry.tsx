import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCookie, getCookie } from 'cookies-next';
import { type GetServerSideProps } from 'next';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import {
  type UpdateInquiryPayload,
  type AddInquiryPayload,
  type SimpleProductDto,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { Selector } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { type SelectorType } from 'src/components/common/selector';
import { CheckIcon } from 'src/components/icons';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { calcDiscountRate, formatToBlob, formatToLocaleString } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';

export type inquiryType = 'PRODUCT' | 'DELIVERY' | 'CANCEL' | 'ETC'; // 상품문의, 배송문의, 반품/취소, 기타

interface Props {
  initialData: SimpleProductDto;
}
const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;
/** 문의하기 */
const Inquiry: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { id, inquiryId } = router.query;
  const { setAlert } = useAlertStore();

  const [selectedType, setSelectedType] = useState<SelectorType>();
  const [content, setContent] = useState<string>('');
  const [isSecret, setIsSecret] = useState<boolean>(false);

  const selectorList: SelectorType[] = [
    { label: '상품문의', value: 'PRODUCT' },
    { label: '배송문의', value: 'DELIVERY' },
    { label: '반품/취소', value: 'CANCEL' },
    { label: '기타', value: 'ETC' },
  ];

  const { data } = useQuery(
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
      initialData,
    },
  );
  // 로그인 검증용
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      if (res.data.code === '101' || res.data.code === '102' || res.data.code === '103') {
        deleteCookie(ACCESS_TOKEN);
        deleteCookie(REFRESH_TOKEN);
        setAlert({ message: res.data.errorMsg ?? '' });
        router.replace('/login');
      }
      console.log(res.data.errorMsg);
      //
      throw new Error(res.data.errorMsg);
    }
  });

  const { data: inquiryData } = useQuery(
    queryKey.inquiry.detail(inquiryId),
    async () => {
      const res = await (await client()).selectInquiry(Number(inquiryId));
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    { enabled: !!inquiryId },
  );

  const { mutateAsync: addInquiry, isLoading } = useMutation(
    async (args: AddInquiryPayload) =>
      await (await client()).addInquiry(args, { type: ContentType.FormData }),
  );

  const { mutateAsync: updateInquiry, isLoading: isUpdateLoading } = useMutation(
    async ({ id, args }: { id: number; args: UpdateInquiryPayload }) =>
      await (await client()).updateInquiry(id, args, { type: ContentType.FormData }),
  );

  const onMutate = () => {
    if (isLoading) return;
    if (!selectedType) return;

    addInquiry({
      data: formatToBlob<AddInquiryPayload['data']>(
        {
          productId: Number(id),
          type: selectedType.value as inquiryType,
          content,
          isSecret,
        },
        true,
      ),
    }).then(res => {
      if (res.data.isSuccess) onSuccess();
      else setAlert({ message: res.data.errorMsg ?? '' });
    });
  };

  const onUpdateMutate = () => {
    if (isUpdateLoading) return;
    if (!selectedType) return;

    updateInquiry({
      id: Number(inquiryId),
      args: {
        data: formatToBlob<UpdateInquiryPayload['data']>(
          {
            type: selectedType.value as inquiryType,
            content,
            isSecret,
          },
          true,
        ),
      },
    }).then(res => {
      if (res.data.isSuccess) onSuccess();
      else setAlert({ message: res.data.errorMsg ?? '' });
    });
  };

  const onSuccess = () => {
    setAlert({
      message: `문의 내용이 ${inquiryId ? '수정' : '등록'}되었습니다.`,
      onClick: () => {
        router.back();
      },
      type: 'success',
    });
  };

  useEffect(() => {
    if (inquiryData) {
      if (inquiryData.type) {
        const selected = selectorList.filter(v => v.value === inquiryData.type);
        setSelectedType(selected.length > 0 ? selected[0] : undefined);
      }
      setContent(inquiryData.content ?? '');
      setIsSecret(inquiryData.isSecret ?? false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiryData]);

  return (
    <>
      <DefaultSeo title='상품문의 | 바로피쉬' description='상품문의' />
      <div className='pb-[100px] max-md:w-[100vw]'>
        {/* header */}
        <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
          <BackButton />
          <p className='text-[18px] font-bold -tracking-[0.03em] text-grey-10'>문의하기</p>
          <div className='w-6' />
        </div>

        <div className='px-4 pt-1.5'>
          {/* Product */}
          <div className='flex w-full items-center gap-[13px] rounded-lg bg-grey-90 p-2'>
            <Image
              unoptimized
              src={data?.images?.[0] ?? '/'}
              alt='product'
              className='h-[72px] w-[72px] rounded-lg object-cover'
              width={72}
              height={72}
            />
            <div className='flex flex-1 flex-col truncate text-start'>
              <p className='text-[15px] font-bold leading-[16px] -tracking-[0.05em] text-grey-10'>
                {data?.store?.name ?? ''}
              </p>
              <p className='mt-0.5 truncate text-[15px] font-medium leading-[20px] -tracking-[0.05em] text-grey-30'>
                {/* {`${setSquareBrackets(data?.storeName)} ${data?.title}`} */}
                {data?.title}
              </p>
              <div className='flex items-center gap-0.5'>
                {(data?.originPrice ?? 0) !== 0 && (
                  <p className='text-[18px] font-semibold leading-[19px] -tracking-[0.05em] text-teritory'>{`${calcDiscountRate(
                    data?.originPrice,
                    data?.discountPrice,
                  )}%`}</p>
                )}
                <p className='text-[18px] font-bold leading-[22px] -tracking-[0.05em] text-grey-10'>{`${formatToLocaleString(
                  data?.discountPrice,
                )}원`}</p>
              </div>
            </div>
          </div>

          <p className='mt-[26px] text-[15px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
            문의유형
          </p>
          <Selector
            className='mt-2'
            list={selectorList}
            placeHolder='문의 유형을 선택해주세요.'
            value={selectedType}
            setValue={setSelectedType}
          />
          <div className='mt-4 h-[212px] w-full rounded-lg border border-grey-80 py-3'>
            <textarea
              spellCheck={false}
              className='h-full  w-full px-3 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-80'
              placeholder='문의 내용을 작성 해 주세요.'
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <button
            className='mt-2.5 flex items-center gap-1.5 py-2.5'
            onClick={() => setIsSecret(!isSecret)}
          >
            <CheckIcon isActive={isSecret} width={24} height={24} />
            <p className='text-[15px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
              비밀글로 문의하기
            </p>
          </button>
        </div>
        <div className='fixed bottom-0 z-50 w-[375px] px-4 pb-7 max-md:w-full'>
          <button
            className={cm(
              'flex h-[52px] w-full items-center justify-center rounded-lg bg-[#D4D5D8]',
              { 'bg-primary-50': selectedType && content.trim().length > 0 },
            )}
            onClick={() => {
              if (selectedType && content.trim().length > 0) {
                if (inquiryId) onUpdateMutate();
                else onMutate();
              }
            }}
          >
            <p className='text-[18px] font-bold -tracking-[0.03em] text-white'>
              {inquiryId ? '수정하기' : '등록하기'}
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

Inquiry.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;
  const { selectProduct } = await client();
  if (!getCookie(VARIABLES.ACCESS_TOKEN, context)) {
    {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
  } else {
    return {
      props: { initialData: (await selectProduct(Number(id))).data.data },
    };
  }
};

export default Inquiry;
