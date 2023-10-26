import React, { useRef, useState } from 'react';
import { usePhotoStore } from 'src/store';
import useClickAway from 'src/utils/use-click-away';

const PhotoSheet = () => {
  const target = useRef<HTMLDivElement>(null);
  const [check, setCheck] = useState<boolean>(false);
  const { setPhoto, photo } = usePhotoStore();

  useClickAway(target, () => {
    if (!check) setCheck(true);
    else setPhoto(null);
  });

  return (
    <div className='sticky top-0 z-[150] w-full'>
      {photo && (
        <div className='absolute top-0 z-[150] flex h-[100dvb] w-full flex-col justify-end bg-black/40'>
          <div
            ref={target}
            className='flex w-full flex-col items-center gap-2 rounded-t-[16px] bg-white pb-2'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <div className='mb-[10px] mt-[17px] h-1 w-9 rounded-full bg-grey-80' />
            <button
              className='flex h-[56px] w-full items-center justify-center'
              onClick={() => {
                photo.onCamera();
                setPhoto(null);
              }}
            >
              <p className='text-[18px] font-medium -tracking-[0.03em] text-grey-20'>사진 촬영</p>
            </button>
            <button
              className='flex h-[56px] w-full items-center justify-center'
              onClick={() => {
                photo.onAlbum();
                setPhoto(null);
              }}
            >
              <p className='text-[18px] font-medium -tracking-[0.03em] text-grey-20'>앨범</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoSheet;
