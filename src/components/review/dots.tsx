import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

const buttonClassName =
  'w-full py-[12.5px] font-medium text-[13px] leading-[20px] -tracking-[0.03em]';

interface Props {
  onUpdate: () => void;
}

export function ReviewDots({ onUpdate }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger className='h-[22px] w-[22px] bg-[url(/assets/icons/common/dots.svg)] bg-cover' />
      <Popover.Portal>
        <Popover.Content
          align='end'
          sideOffset={8}
          className='isolate z-[80] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.15)]'
        >
          <nav className='w-[92px] divide-y divide-grey-70 overflow-hidden rounded-sm border border-grey-70'>
            <button
              className={clsx(buttonClassName, 'text-grey-20')}
              type='button'
              onClick={onUpdate}
            >
              수정하기
            </button>
            <button className={clsx(buttonClassName, 'text-grey-60')} type='button'>
              삭제하기
            </button>
          </nav>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
