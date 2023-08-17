import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';

const CartIcon = () => {
  const { data, isLoading } = useQuery(queryKey.cartCount, async () => {
    const { countBasket } = await client();
    const res = await countBasket();
    return res.data.data;
  });

  return (
    <div className='relative h-[23px] w-[22px]'>
      {data && !isLoading && (
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
