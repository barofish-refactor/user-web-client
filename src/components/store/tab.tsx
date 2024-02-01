import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { type SimpleStore } from 'src/api/swagger/data-contracts';
import cm from 'src/utils/class-merge';

interface Props {
  data?: SimpleStore;
  selectedTab: number;
  setSelectedTab: (value: number) => void;
}

const Tab = ({ data, selectedTab, setSelectedTab }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  // const [isCart, setIsCart] = useState(true);
  useEffect(() => {
    const cart = sessionStorage.getItem('cart') ? sessionStorage.getItem('cart') : null;
    if (cart) {
      setSelectedTab(1);
      // setIsCart(!isCart);
    }
    sessionStorage.removeItem('cart');
  }, [setSelectedTab]);
  return (
    <div className='mt-1 flex w-full items-center justify-between border-b border-b-[#F2F2F2] px-[21.5px]'>
      {['방문일지', `판매상품 ${(data?.products ?? []).length}`, `후기 ${data?.reviewCount}`].map(
        (v, idx) => {
          const isActive = selectedTab === idx;

          return (
            <button
              key={`storeTab${idx}`}
              className={cm(
                'px-2 pb-1.5 pt-2',
                isActive ? '-mb-[1px] border-b-2 border-b-primary-50' : 'border-b border-b-white', // 파란선 1px 겹침 처리
              )}
              onClick={() => {
                setSelectedTab(idx);
                sessionStorage.setItem(
                  'storeView',
                  JSON.stringify({
                    id,
                    tabId: idx,
                  }),
                );
              }}
            >
              <p
                className={cm(
                  'w-[84px] text-[16px] leading-[22px] -tracking-[0.03em]',
                  isActive ? 'font-semibold text-primary-50' : 'font-medium text-grey-50',
                )}
              >
                {v}
              </p>
            </button>
          );
        },
      )}
    </div>
  );
};

export default Tab;
