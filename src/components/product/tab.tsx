import cm from 'src/utils/class-merge';

interface Props {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
}

const Tab = ({ selectedTab, setSelectedTab }: Props) => {
  return (
    <div className='mt-3 flex w-full items-center justify-between border-b border-b-[#F2F2F2] px-3'>
      {['상품상세', '후기 9,999+', '문의', '배송'].map((v, idx) => {
        const isActive = selectedTab === idx;

        return (
          <button
            key={`filter${idx}`}
            className={cm(
              'px-2 pb-1.5 pt-2',
              isActive ? '-mb-[1px] border-b-2 border-b-primary-50' : 'border-b border-b-white', // 파란선 1px 겹침 처리
            )}
            onClick={() => {
              setSelectedTab(idx);
            }}
          >
            <p
              className={cm(
                'text-[14px] leading-[22px] -tracking-[3%]',
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
