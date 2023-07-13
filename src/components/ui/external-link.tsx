import Link from 'next/link';
import { type ComponentProps } from 'react';

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
      onClick={e => {
        if (window.ReactNativeWebView) {
          e.preventDefault();
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: 'link', url: `${location.origin}${href}` }),
          );
        }
      }}
    />
  );
}
