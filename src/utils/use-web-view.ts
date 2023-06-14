import { useEffect } from 'react';
import { userAgentFromString } from 'next/server';

/**
 * @description 가급적 useCallback을 사용하여 listener를 생성해야 합니다.
 */
export default function useWebview(callback: (event: MessageEvent) => void) {
  useEffect(() => {
    if (!window.ReactNativeWebView) return;
    const isAndroid = userAgentFromString(navigator.userAgent).os.name === 'Android';

    const listener = (e: MessageEvent | Event) => {
      const event = e as MessageEvent;
      callback(event);
    };

    if (isAndroid) {
      document.addEventListener('message', listener);
      return () => document.removeEventListener('message', listener);
    } else {
      window.addEventListener('message', listener);
      return () => window.removeEventListener('message', listener);
    }
  }, [callback]);
}
