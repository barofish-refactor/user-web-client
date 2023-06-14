import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';

const PcBanner = () => {
  const { data } = useQuery(
    queryKey.pcBanner,
    async () => {
      const res = await client().selectPcWebBanner();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      // staleTime: 0
    },
  );

  return (
    <aside className='w-[375px] max-md:hidden'>
      <div className='fixed flex h-[100dvb] w-[375px] items-center justify-center'>
        {data?.image && (
          <Image
            fill
            priority
            src={data.image}
            alt='banner'
            className='!relative h-auto object-contain'
            draggable={false}
          />
        )}
      </div>
    </aside>
  );
};

export default PcBanner;
