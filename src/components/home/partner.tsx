import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import { type SimpleStore } from 'src/api/swagger/data-contracts';
import { StoreItem } from 'src/components/store';
import { useAlertStore } from 'src/store';
import { VARIABLES } from 'src/variables';

interface Props {
  data?: SimpleStore;
  refetch: () => void;
}

/** 홈화면 - 파트너 부분 */
const Partner = ({ data, refetch }: Props) => {
  const router = useRouter();
  const { setAlert } = useAlertStore();

  const { mutateAsync: likeStoreByUser, isLoading } = useMutation(
    async (args: { storeId: number; type: 'LIKE' | 'UNLIKE' }) =>
      await (await client()).likeStoreByUser(args),
  );

  const onMutate = ({ storeId, type }: { storeId: number; type: 'LIKE' | 'UNLIKE' }) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    if (isLoading) return;
    likeStoreByUser({
      storeId,
      type,
    })
      .then(res => {
        if (res.data.isSuccess) refetch();
        else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='px-4 py-[30px]'>
      <p className='line-clamp-1 text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
        믿고 구매할 수 있는 스토어 🏡
      </p>
      <p className='whitespace-pre-line text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
        바로피쉬에서 입증한 스토어에서 실패없는 수산물 쇼핑!
      </p>

      <div className='mt-5 flex'>
        <StoreItem
          data={data}
          buttonType='star'
          onButtonClick={e => {
            e.preventDefault();
            onMutate({
              storeId: data?.storeId ?? -1,
              type: data?.isLike ? 'UNLIKE' : 'LIKE',
            });
          }}
        />
      </div>
    </div>
  );
};

export default Partner;
