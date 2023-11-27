import { useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';
// import { useAlertStore } from 'src/store';
import { VARIABLES } from 'src/variables';

const CartIcon = () => {
  const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;
  // const { setAlert } = useAlertStore();
  const { data, isLoading, refetch } = useQuery(queryKey.cartCount, async () => {
    const { countBasket } = await client();
    const res = await countBasket();
    if (res.data.isSuccess) {
      return res.data.data;
    } else if (
      (res.data.code === '101' || res.data.code === '102' || res.data.code === '103',
      res.data.code === '9999')
    ) {
      deleteCookie(REFRESH_TOKEN);
      deleteCookie(ACCESS_TOKEN);
      return;
    }
    console.log(res.data.errorMsg);
    throw new Error(res.data.errorMsg);
  });

  return (
    <div className='relative h-[23px] w-[22px]'>
      {!!data && !isLoading && (
        <div className='absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-50'>
          <p className='text-[11px] font-medium text-white'>{data}</p>
        </div>
      )}
      <Image
        unoptimized
        src='/assets/icons/common/cart-title.svg'
        alt='cart'
        width={22}
        height={23}
      />
    </div>
  );
};

export default CartIcon;
