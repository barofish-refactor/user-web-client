import React from 'react';
import Image from 'next/image';

interface Props {
  storeType: 'category' | 'topBar' | 'curation' | 'store' | 'search';
  title?: string;
}

const ImageBox = ({ storeType, title }: Props) => {
  const blurDataURL =
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';

  return (
    <>
      {title?.includes('캠핑') && storeType.includes('curation') && (
        <div style={{ marginTop: '20px' }}>
          <Image
            src='/assets/icons/common/curationA.jpg'
            style={{ objectFit: 'fill', borderRadius: '11px' }}
            width={400}
            height={200}
            loading='lazy'
            alt='bannerAds'
            blurDataURL={blurDataURL}
            placeholder='blur'
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100vw'
          />
        </div>
      )}
      {title?.includes('혼술용') && storeType.includes('curation') && (
        <div style={{ marginTop: '20px' }}>
          <Image
            src='/assets/icons/common/curationB.jpg'
            style={{ objectFit: 'fill', borderRadius: '11px' }}
            width={400}
            height={200}
            loading='lazy'
            alt='bannerAds'
            blurDataURL={blurDataURL}
            placeholder='blur'
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100vw'
          />
        </div>
      )}
      {title?.includes('밥도둑') && storeType.includes('curation') && (
        <div style={{ marginTop: '20px' }}>
          <Image
            src='/assets/icons/common/curationC.jpg'
            style={{ objectFit: 'fill', borderRadius: '11px' }}
            width={400}
            height={200}
            loading='lazy'
            alt='bannerAds'
            blurDataURL={blurDataURL}
            placeholder='blur'
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100vw'
          />
        </div>
      )}
      {title?.includes('파워충전') && storeType.includes('curation') && (
        <div style={{ marginTop: '20px' }}>
          <Image
            src='/assets/icons/common/curationF.jpg'
            style={{ objectFit: 'fill', borderRadius: '11px' }}
            width={400}
            height={200}
            loading='lazy'
            alt='bannerAds'
            blurDataURL={blurDataURL}
            placeholder='blur'
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100vw'
          />
        </div>
      )}
      {title?.includes('문어야') && storeType.includes('curation') && (
        <div style={{ marginTop: '20px' }}>
          <Image
            src='/assets/icons/common/curationG.jpg'
            style={{ objectFit: 'fill', borderRadius: '11px' }}
            width={400}
            height={200}
            loading='lazy'
            alt='bannerAds'
            blurDataURL={blurDataURL}
            placeholder='blur'
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100vw'
          />
        </div>
      )}
      {title?.includes('독도새우') && storeType.includes('curation') && (
        <div style={{ marginTop: '20px' }}>
          <Image
            src='/assets/icons/common/curationQ.jpg'
            style={{ objectFit: 'fill', borderRadius: '11px' }}
            width={400}
            height={200}
            loading='lazy'
            alt='bannerAds'
            blurDataURL={blurDataURL}
            placeholder='blur'
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100vw'
          />
        </div>
      )}
      {title?.includes("BEST'맛'") && storeType.includes('curation') && (
        <div style={{ marginTop: '20px' }}>
          <Image
            src='/assets/icons/common/curationW.jpg'
            style={{ objectFit: 'fill', borderRadius: '11px' }}
            width={400}
            height={200}
            loading='lazy'
            alt='bannerAds'
            blurDataURL={blurDataURL}
            placeholder='blur'
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100vw'
          />
        </div>
      )}
      {title?.includes('혼자다') && storeType.includes('curation') && (
        <div style={{ marginTop: '20px' }}>
          <Image
            src='/assets/icons/common/curationE.png'
            style={{ objectFit: 'fill', borderRadius: '11px' }}
            width={400}
            height={200}
            loading='lazy'
            alt='bannerAds'
            blurDataURL={blurDataURL}
            placeholder='blur'
            sizes='(max-width: 768px) 100%, (max-width: 1200px) 100vw'
          />
        </div>
      )}
    </>
  );
};

export default ImageBox;
