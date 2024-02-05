import { useRouter } from 'next/router';

interface Props {
  onBack?: () => void;
}

export function BackButton({ onBack }: Props) {
  const router = useRouter();
  return (
    <button
      type='button'
      className='aspect-square h-6 w-6 bg-[url(/assets/icons/common/arrow-back.svg)] bg-cover'
      onClick={onBack ?? router.back ?? router.push('/')}
    />
  );
}
interface LinkProps {
  link: string;
}
export function LinkButton({ link }: LinkProps) {
  const router = useRouter();
  return (
    <button
      type='button'
      className='aspect-square h-6 w-6 bg-[url(/assets/icons/common/arrow-back.svg)] bg-cover'
      onClick={() => router.push(`${link}`)}
    />
  );
}
