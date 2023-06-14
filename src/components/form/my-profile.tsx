import { useControllableState } from '@radix-ui/react-use-controllable-state';
import Image from 'next/image';
import { type ComponentProps, useRef } from 'react';
import { type FileType } from 'src/types/common';

export const myProfileDefaultValue: FileType = {
  file: null,
  previewUrl: '/assets/icons/common/default-profile.png',
};

interface Props {
  readonly?: boolean;
  value?: FileType;
  onChange?: (value: FileType) => void;
  defaultValue?: Partial<FileType>;
}

export function MyProfile({ defaultValue: defaultProp, onChange, readonly, value }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [innerValue, setInnerValue] = useControllableState<FileType>({
    prop: value,
    defaultProp: {
      file: defaultProp?.file ?? myProfileDefaultValue.file,
      previewUrl: defaultProp?.previewUrl || myProfileDefaultValue.previewUrl,
    },
    onChange,
  });

  const imgElement = (
    <Image
      priority
      src={innerValue?.previewUrl || myProfileDefaultValue.previewUrl}
      alt='profile'
      width={90}
      height={90}
      className='aspect-square h-[90px] w-[90px] rounded-full object-cover'
    />
  );

  const onChangeFile: ComponentProps<'input'>['onChange'] = e => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setInnerValue({ file, previewUrl: reader.result as string });
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  const onClickProfile = () => {
    inputRef.current?.click();
    // if (window.ReactNativeWebView) {
    //   setPopup(POPUP_KEY);
    // } else {
    //   inputRef.current?.click();
    // }
  };

  if (readonly) return imgElement;

  return (
    <div>
      <button type='button' className='relative inline-flex' onClick={onClickProfile}>
        {imgElement}
        <Image
          src='/assets/icons/common/edit.svg'
          width={32}
          height={32}
          className='absolute bottom-0 right-0'
          alt='프로필 수정'
        />
      </button>
      <input
        ref={inputRef}
        type='file'
        id='profile'
        accept='image/*'
        className='hidden'
        onChange={onChangeFile}
      />
    </div>
  );
}
