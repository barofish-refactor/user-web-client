import { useRouter } from 'next/router';

interface Props {
  onBack?: () => void;
}

export function BackButton({ onBack }: Props) {
  const router = useRouter();
  return (
    <button
      type='button'
      className='h-6 w-6 bg-[url(/assets/icons/common/arrow-back.svg)] bg-cover'
      onClick={onBack ?? router.back}
    />
  );
}
