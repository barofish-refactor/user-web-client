import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';

const FAILURE_MESSAGE = '결제에 실패했습니다. 잠시 후 다시 시도해주세요.';

const interval = 2; // interval + 1 초 반복

const Payment: NextPageWithLayout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id, options, orderId, imp_success, error_msg } = router.query;

  const isError = !!error_msg;
  const { setAlert } = useAlertStore();

  const isCountDownOnce = useRef(false);
  const [timer, setTimer] = useState<number>(interval);
  const [limit, setLimit] = useState<number>(10); // 확인할 반복 횟수 (3 * 10 -> 30초동안 반복)
  const [isPurchaseCheck, setIsPurchaseCheck] = useState<boolean>(false);

  const onCountDown = useCallback(async () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else if (timer === 0) {
      if (typeof orderId === 'string') {
        await (await client()).checkPaymentDone(orderId).then(res => {
          setLimit(limit - 1);
          if (res) {
            // 결제 성공
            if (res.data.isSuccess && res.data.data) {
              router.replace('/product/complete');
              queryClient.invalidateQueries(queryKey.order.lists);
            }
            // 사이클 다 돌았는데도 확인 안되면 결제 실패 처리
            else if (limit === 1) {
              setAlert({
                message: FAILURE_MESSAGE,
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
    }
  }, [limit, orderId, queryClient, router, setAlert, timer]);

  useEffect(() => {
    // 모바일은 isError, pc는 imp_success 체크 (모바일은 imp_success가 없는게 있음)
    if (!router.isReady) return;
    if (!isError || imp_success === 'true') {
      setIsPurchaseCheck(true);
    } else {
      // pc 에서 error_msg가 false로 오는게 있음
      const message = error_msg === 'false' ? FAILURE_MESSAGE : (error_msg as string);
      setAlert({ message });
      router.replace({
        pathname: '/product/order',
        query: { id, options },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (isPurchaseCheck) return;
    if (isCountDownOnce.current) return;
    isCountDownOnce.current = true;
    onCountDown();
  }, [isPurchaseCheck, onCountDown]);

  useEffect(() => {
    if (isPurchaseCheck) {
      const interval = setInterval(onCountDown, 1000);
      return () => clearTimeout(interval);
    }
  }, [isPurchaseCheck, onCountDown]);

  return (
    <div className='flex h-full items-center justify-center max-md:w-[100vw]'>
      {`결제를 진행중입니다${[...Array(3 - timer)].map(_ => '.').join('')}`}
    </div>
  );
};

Payment.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Payment;
