import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { client } from 'src/api/client';
import { ContentType } from 'src/api/swagger/http-client';
import Layout from 'src/components/common/layout';
import { submitButtonClassName } from 'src/components/form';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore, useConfirmStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { setSquareBrackets } from 'src/utils/functions';

const MypagePayMethod: NextPageWithLayout = () => {
  const { setAlert } = useAlertStore();
  const { setConfirm } = useConfirmStore();
  // const isEmpty = false;

  const { data, refetch } = useQuery(queryKey.paymentMethod, async () => {
    const res = await client().selectPaymentMethodList();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

  const { mutateAsync: deletePaymentMethod, isLoading: isDeleteLoading } = useMutation(
    (id: number) => client().deletePaymentMethod(id, { type: ContentType.FormData }),
  );

  const onDeletePaymentMethod = (id: number) => {
    if (isDeleteLoading) return;
    deletePaymentMethod(id)
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({ message: '삭제되었습니다.', type: 'success' });
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  if (!data || data.length === 0) return <Empty />;

  return (
    <article className='flex-1'>
      <ul>
        {data.map(v => (
          <li
            key={v.id}
            className='flex items-center justify-between gap-2 border-b border-b-[#f2f2f2] p-4'
          >
            <div className='flex-1 font-medium leading-[24px] -tracking-[0.03em]'>
              <h3 className='mb-1.5 text-grey-20'>{`${setSquareBrackets(v.cardName)} ${
                v.name
              }`}</h3>
              <span className='break-all text-grey-50'>{v.cardNo}</span>
            </div>
            <button
              className='h-[32px] w-[55px] rounded-sm border border-[#e2e2e2] text-[13px] leading-[20px] -tracking-[0.03em] text-grey-30'
              onClick={() => {
                setConfirm({
                  message: '결제 정보를 삭제하시겠습니까?',
                  onClick: () => {
                    v.id && onDeletePaymentMethod(v.id);
                  },
                });
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
};

function Empty() {
  return (
    <div className='grid flex-1 place-items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image src='/assets/icons/search/search-error.svg' alt='Empty' width={40} height={40} />
        <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
          {`둥록된 결제수단이 없습니다.\n결제수단을 추가해주세요.`}
        </p>
      </div>
    </div>
  );
}

MypagePayMethod.getLayout = page => (
  <Layout className='flex flex-col' headerProps={{ disable: true }} footerProps={{ disable: true }}>
    <div className='flex flex-1 flex-col pb-6'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          결제수단 관리
        </h2>
        <div className='h-6 w-6' />
      </header>
      {page}
      <footer className='sticky bottom-0 w-full px-4'>
        <Link href='/mypage/pay-method/create' className={submitButtonClassName}>
          추가하기
        </Link>
      </footer>
    </div>
  </Layout>
);

export default MypagePayMethod;
