import Link from 'next/link';
import { type ComponentProps } from 'react';
import { requestPermission } from 'src/utils/functions';

export function ExternalLink({
  href,
  target = '_blank',
  rel = 'noreferrer',
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      href={href}
      target={target}
      rel={rel}
      onClick={() => {
        if (window.ReactNativeWebView) {
          requestPermission('link', `${location.origin}${href}`);
        }
      }}
    />
  );
}
