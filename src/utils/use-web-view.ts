import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { off, on } from 'src/utils/functions';

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

/** React Native Backbutton 처리 */
export default function useWebView() {
  const router = useRouter();

  useEffect(() => {
    if (window.ReactNativeWebView) {
      const listener = (event: MessageEvent) => {
        const message = JSON.parse(event.data);

        if (message.type === 'backEvent') {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: 'exitApp',
            }),
          );
          router.back();
        } else if (message.type === 'navigate') {
          router.push(message.url);
        }
      };
      /** android */
      on(document, 'message', e => listener(e as MessageEvent));
      /** ios */
      on(window, 'message', e => listener(e as MessageEvent));
      return () => {
        /** android */
        off(document, 'message', e => listener(e as MessageEvent));
        /** ios */
        off(window, 'message', e => listener(e as MessageEvent));
      };
    }
  }, [router]);
}
