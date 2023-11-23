import { useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { client } from 'src/api/client';
import { type Main } from 'src/api/swagger/data-contracts';
import { HomeCurationItem, HomePartner, HomeSubBanner } from 'src/components/home';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { VARIABLES } from 'src/variables';

interface Props {
  mainData: Main | undefined;
  mainRefetch: () => void;
}

export default function CurationList({ mainData }: Props) {
  const { setAlert } = useAlertStore();
  const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;
  const { data: curationData, refetch } = useQuery(queryKey.mainCuration, async () => {
    const res = await (await client()).selectMainCurationList();
    if (res.data.isSuccess) {
      return res.data.data;
    } else if (
      res.data.code === '101' ||
      res.data.code === '102' ||
      res.data.code === '103' ||
      res.data.code === '9999'
    ) {
      deleteCookie(REFRESH_TOKEN);
      deleteCookie(ACCESS_TOKEN);
      console.log('dha');
      refetch();
      return;
    } else setAlert({ message: res.data.errorMsg + 'd' ?? '' });
  });

  return (
    <>
      {curationData
        ?.filter(x => x.title && x.title.length > 0 && !x.title.includes('검색'))
        .map((v, idx) => {
          return (
            <div key={v.id}>
              {(v.products ?? []).length > 0 && <HomeCurationItem data={v} />}
              {idx === 0 && (
                <>
                  {/* SubBanner */}
                  {mainData?.subBanner &&
                    mainData.subBanner.filter(x => x.state === 'ACTIVE').length > 0 && (
                      <div className='mx-4 my-[30px]'>
                        <HomeSubBanner
                          data={mainData.subBanner.filter(x => x.state === 'ACTIVE')[0]}
                        />
                      </div>
                    )}
                  {/* Partner */}
                  <HomePartner />
                </>
              )}
            </div>
          );
        })}
    </>
  );
}
