import { useRouter } from 'next/router';
import cm from 'src/utils/class-merge';

interface Props {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
  reviewCount: number;
}

const Tab = ({ selectedTab, setSelectedTab, reviewCount }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className='mt-3 flex w-full items-center justify-between border-b border-b-[#F2F2F2] px-3'>
      {['상품상세', `후기 ${reviewCount}`, '문의', '배송'].map((v, idx) => {
        const isActive = selectedTab === idx;

        return (
          <button
            key={`filter${idx}`}
            className={cm(
              'px-2 pb-1.5 pt-2',
              isActive ? '-mb-[1px] border-b-2 border-b-primary-50' : 'border-b border-b-white', // 파란선 1px 겹침 처리
            )}
            onClick={() => {
              console.log(idx);

              setSelectedTab(idx);
              sessionStorage.setItem(
                'productView',
                JSON.stringify({
                  id,
                  tabId: idx,
                }),
              );
            }}
          >
            <p
              className={cm(
                'text-[15px] leading-[22px] -tracking-[0.03em]',
                isActive ? 'font-semibold text-primary-50' : 'font-medium text-grey-50',
              )}
            >
              {v}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default Tab;
