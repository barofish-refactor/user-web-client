import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';
import cm from 'src/utils/class-merge';

const PcBanner = () => {
  const { ref, inView } = useInView({ initialInView: false });
  const { data } = useQuery(
    queryKey.pcBanner,
    async () => {
      const res = await (await client()).selectPcWebBanner();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: inView,
      // staleTime: 0
    },
  );

  return (
    <aside className='w-[375px] max-md:hidden'>
      <div ref={ref} className='fixed flex h-[100dvb] w-[375px] items-center justify-center'>
        {data?.image && (
          <Image
            fill
            unoptimized
            priority
            src={data.image}
            alt='banner'
            className={cm('!relative h-auto object-contain', { 'cursor-pointer': !!data.link })}
            draggable={false}
            onClick={() => {
              if (data.link) {
                window.open(data.link);
              }
            }}
          />
        )}
      </div>
    </aside>
  );
};

export default PcBanner;
