import { Root, type CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox';
import clsx from 'clsx';

export interface CheckboxProps extends RadixCheckboxProps {
  iconSize?: number;
}

export function Checkbox({ iconSize = 24, className, ...props }: CheckboxProps) {
  return (
    <Root {...props} className={clsx('group', className)}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        {/* default */}
        <circle
          cx='12'
          cy='12'
          r='11.5'
          stroke='#D4D5D8'
          className='hidden group-data-[state=unchecked]:block'
        />
        <path
          d='M7 13L10.3586 16.3586C10.4367 16.4367 10.5633 16.4367 10.6414 16.3586L18 9'
          stroke='#D4D5D8'
          strokeWidth='1.5'
          strokeLinecap='round'
          className='hidden group-data-[state=unchecked]:block'
        />
        {/* active */}
        <circle
          cx='12'
          cy='12'
          r='12'
          fill='#2659E5'
          className='hidden group-data-[state=checked]:block'
        />
        <path
          d='M7 13L10.3586 16.3586C10.4367 16.4367 10.5633 16.4367 10.6414 16.3586L18 9'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          className='hidden group-data-[state=checked]:block'
        />
        {/* disabled */}
        <circle
          cx='12'
          cy='12'
          r='11.25'
          fill='#C2C3C7'
          stroke='#F7F7F7'
          strokeWidth='1.5'
          className='hidden group-disabled:block'
        />
        <path
          d='M7 13L10.3586 16.3586C10.4367 16.4367 10.5633 16.4367 10.6414 16.3586L18 9'
          stroke='#F7F7F7'
          strokeWidth='1.5'
          strokeLinecap='round'
          className='hidden group-disabled:block'
        />
      </svg>
    </Root>
  );
}
