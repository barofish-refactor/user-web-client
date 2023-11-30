import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';
import cm from 'src/utils/class-merge';
import { VARIABLES } from 'src/variables';

const PcBanner = () => {
  const { ref, inView } = useInView({ initialInView: false });
  const router = useRouter();
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
    { enabled: inView },
  );

  return (
    <aside className='z-10 w-[375px] max-md:hidden'>
      <div
        ref={ref}
        className='fixed top-[0%] flex h-[100dvb] w-[375px] items-center justify-center'
      >
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
              const link = data.link;
              const productionUrl = VARIABLES.PRODUCTION_URL;
              if (link) {
                if (link.includes(productionUrl))
                  return router.push(link.replace(productionUrl, ''));

                return window.open(`${link}`, '_blank');
              }
            }}
          />
        )}
      </div>
    </aside>
  );
};

export default PcBanner;
