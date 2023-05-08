declare module '*.svg' {
  import type { ReactElement, ComponentProps } from 'react';

  const content: (props: ComponentProps<'svg'>) => ReactElement;
  export default content;
}
