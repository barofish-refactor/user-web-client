import { useAlertStore } from 'src/store';

interface Props {
  clipboardSuccessText?: string;
}

export function ShareButton({ clipboardSuccessText = '주소가 복사되었습니다.' }: Props) {
  const { setAlert } = useAlertStore();
  const onShare = async () => {
    if (window.ReactNativeWebView) {
      const { href } = window.location;
      window.ReactNativeWebView.postMessage(
        // JSON.stringify({ type: 'share', url: `${location.origin}${href}` }),
        JSON.stringify({ type: 'share', url: `${href}` }),
      );
    } else {
      const { href } = window.location;
      if (typeof navigator.canShare === 'function' && navigator.canShare()) {
        try {
          await navigator.share({ url: href });
        } catch {}
        return;
      }
      await navigator.clipboard.writeText(href).then(() => {
        setAlert({ message: clipboardSuccessText });
      });
    }
  };

  return (
    <button
      className='h-[19px] w-[18px] bg-[url(/assets/icons/common/share.svg)] bg-cover'
      onClick={onShare}
    />
  );
}
