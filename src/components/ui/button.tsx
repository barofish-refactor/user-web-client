import { type ComponentProps } from 'react';

import cm from 'src/utils/class-merge';

export interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ type = 'button', className, ...props }: ButtonProps) {
  return <button {...props} type={type} className={cm('', className)} />;
}
