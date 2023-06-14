import clsx from 'clsx';

const buttonClassName =
  'py-2 font-medium leading-[24px] -tracking-[0.03em] border-b-2 border-b-grey-80 text-grey-50 data-[active=true]:font-bold data-[active=true]:text-primary-50';

export type CouponNavType = 'holding' | 'available';

export function CouponNav({
  navType,
  setNavType,
}: {
  navType: CouponNavType;
  setNavType: (navType: CouponNavType) => void;
}) {
  return (
    <nav className='relative grid grid-cols-2 bg-white'>
      <hr
        className={clsx(
          'absolute bottom-0 w-1/2 border-t-2 border-t-primary-50',
          navType === 'holding' ? 'left-0' : 'right-0',
        )}
      />
      <button
        data-active={navType === 'holding'}
        className={buttonClassName}
        onClick={() => setNavType('holding')}
      >
        보유 쿠폰
      </button>
      <button
        data-active={navType === 'available'}
        className={buttonClassName}
        onClick={() => setNavType('available')}
      >
        발급 가능한 쿠폰
      </button>
    </nav>
  );
}
