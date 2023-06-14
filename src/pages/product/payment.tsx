import { type GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';

const pause = () => {
  // return new Promise(r => setTimeout(r, 0))
  return new Promise(r => setTimeout(r, 1));
};

const Payment: NextPageWithLayout = () => {
  const router = useRouter();
  const { id, options, orderId, imp_success, error_msg } = router.query;
  const { setAlert } = useAlertStore();

  const interval = 2; // interval + 1 초 반복
  const [timer, setTimer] = useState<number>(interval);
  const [limit, setLimit] = useState<number>(10); // 확인할 반복 횟수 (3 * 10 -> 30초동안 반복)
  const [isPurchaseCheck, setIsPurchaseCheck] = useState<boolean>(false);

  useEffect(() => {
    if (!error_msg || imp_success === 'true') setIsPurchaseCheck(true);
    else {
      setAlert({
        message: error_msg
          ? (error_msg as string)
          : '결제에 실패했습니다. 잠시 후 다시 시도해주세요.',
      });
      router.replace({
        pathname: '/product/order',
        query: { id, options },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imp_success, router]);

  useEffect(() => {
    pause();
    if (imp_success === 'false') {
      setIsPurchaseCheck(false);
      console.log('payment fail');
      setAlert({ message: '결제에 실패했습니다. 잠시 후 다시 시도해주세요.' });
      router.back();
      return;
    }
    if (isPurchaseCheck) {
      const countdown = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else if (timer === 0) {
          client()
            .checkPaymentDone(orderId as string)
            .then(res => {
              setLimit(limit - 1);
              if (res) {
                // 결제 성공
                if (res.data.isSuccess && res.data.data) {
                  setIsPurchaseCheck(false);
                  router.replace('/mypage');
                }
                // 사이클 다 돌았는데도 확인 안되면 결제 실패 처리
                else if (limit === 1) {
                  setIsPurchaseCheck(false);
                  console.log('limit_count -> 30 Second');
                  setAlert({
                    message: '결제에 실패했습니다. 잠시 후 다시 시도해주세요.',
                    onClick: () => {
                      //
                    },
                  });
                  router.back();
                }
                // 확인 안되면 사이클 계속 돌림
                else {
                  setTimer(interval);
                }
              }
              // 확인 안되면 사이클 계속 돌림
              else {
                setTimer(interval);
              }
            });
        }
      }, 1000);
      return () => clearTimeout(countdown);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPurchaseCheck, timer]);

  return (
    <div className='flex h-full items-center justify-center max-md:w-[100vw]'>
      {`결제를 진행중입니다${[...Array(3 - timer)].map(_ => '.').join('')}`}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

Payment.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Payment;
