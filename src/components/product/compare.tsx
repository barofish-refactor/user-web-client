import Image from 'next/image';

const Compare = () => {
  return (
    <div>
      <div className='px-4 pb-[30px] pt-[22px]'>
        <div className='flex items-center gap-[5px]'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            다른 사람들은 이 상품과 비교했어요
          </p>
          <Image
            unoptimized
            src='/assets/icons/product/compare.svg'
            alt='compare'
            width={16}
            height={16}
          />
        </div>
        <div className='grid grid-cols-2 gap-[11px] pt-[18px]'>
          {/* <ProductItem />
          <ProductItem /> */}
        </div>
      </div>
      <div className='h-2 bg-grey-90' />
    </div>
  );
};

export default Compare;
