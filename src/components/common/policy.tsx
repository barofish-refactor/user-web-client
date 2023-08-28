import { BackButton } from 'src/components/ui';

export interface PolicyProps {
  content: string;
  description: string;
}

export function Policy({ content, description }: PolicyProps) {
  return (
    <div>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          {description}
        </h2>
        <div className='h-6 w-6' />
      </header>
      <div dangerouslySetInnerHTML={{ __html: content }} className='tinymce my-6 px-4' />
    </div>
  );
}
