import * as Popover from '@radix-ui/react-popover';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';

const buttonClassName =
  'w-full py-[12.5px] font-medium text-[15px] leading-[20px] -tracking-[0.03em]';

interface Props {
  id: number | undefined;
  onUpdate: () => void;
}

export function ReviewDots({ onUpdate, id }: Props) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertStore();
  const { mutateAsync: deleteReview } = useMutation(
    async (args: number) => await (await client()).deleteReviewByUser(args),
  );

  const onMutate = () => {
    if (!id) return;
    deleteReview(id)
      .then(res => {
        if (res.data.isSuccess) {
          queryClient.invalidateQueries(queryKey.order.lists);
          queryClient.invalidateQueries(queryKey.myReview);
          queryClient.invalidateQueries(queryKey.review.lists);
          setAlert({
            message: '리뷰를 삭제했습니다.',
            // onClick: () => router.push('/mypage'),
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };
  return (
    <Popover.Root>
      <Popover.Trigger className='h-[22px] w-[22px] bg-[url(/assets/icons/common/dots.svg)] bg-cover' />
      <Popover.Portal>
        <Popover.Content
          align='end'
          sideOffset={8}
          className='isolate z-[80] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]'
        >
          <nav className='w-[92px] divide-y divide-grey-70 overflow-hidden rounded-sm border border-grey-70'>
            <button
              className={clsx(buttonClassName, 'text-grey-20')}
              type='button'
              onClick={onUpdate}
            >
              수정하기
            </button>
            <button
              className={clsx(buttonClassName, 'text-grey-60')}
              type='button'
              onClick={onMutate}
            >
              삭제하기
            </button>
          </nav>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
