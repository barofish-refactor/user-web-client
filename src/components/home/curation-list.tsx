import { useQuery } from '@tanstack/react-query';
import { client } from 'src/api/client';
import { type Main } from 'src/api/swagger/data-contracts';
import { HomeCurationItem, HomePartner, HomeSubBanner } from 'src/components/home';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';

interface Props {
  mainData: Main | undefined;
  mainRefetch: () => void;
}

export default function CurationList({ mainData, mainRefetch }: Props) {
  const { setAlert } = useAlertStore();

  const { data: curationData } = useQuery(queryKey.mainCuration, async () => {
    const res = await (await client()).selectMainCurationList();
    if (res.data.isSuccess) {
      return res.data.data;
    } else setAlert({ message: res.data.errorMsg ?? '' });
  });

  return (
    <>
      {curationData
        ?.filter(x => x.title && x.title.length > 0)
        .map((v, idx) => {
          return (
            <div key={v.id}>
              <HomeCurationItem data={v} />
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
                  {mainData?.store && <HomePartner data={mainData?.store} refetch={mainRefetch} />}
                </>
              )}
            </div>
          );
        })}
    </>
  );
}
