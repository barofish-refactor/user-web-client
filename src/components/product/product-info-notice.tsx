import { useQuery } from '@tanstack/react-query';
import React, { Fragment } from 'react';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';

// 농수축산물 itemCode 19
interface InfoType19 {
  productId: number;
  itemCode: string;
  nameOfProduct: string; // 품목 또는 명칭
  volume: string; // 포장단위별 내용물의 용량(중량), 수량, 크기
  producer: string; // 생산자,수입품의 경우 수입자를 함께 표기
  originCountry: string; // 농수산물의 원산지 표시 등에 관한 법률에 따른 원산지
  qualityMaintenanceDeadline: string; // 제조연월일, 소비기한 또는 품질유지기한
  geneticallyModifiedInfo: string; // 농수산물-농수산물 품질관리법에 따른 유전자변형농산물 표시, 지리적 표시
  productGrade: string; // 축산물 – 축산법에 따른 등급 표시, 가축 및 축산물 이력관리에 관한 법률에 따른 이력관리대상축산물 유무
  importInformation: string; // 수입 농수축산물 - “수입식품안전관리 특별법에 따른 수입신고를 필함”의 문구
  contentsOfProduct: string; // 상품구성
  howToKeep: string; // 보관방법 또는 취급방법
  phoneNumber: string; // 소비자상담관련 전화번호
  cautionGuidelines: string; // 소비자안전을 위한 주의사항
}

// 가공식품 itemCode 20
interface InfoType20 {
  productId: number;
  itemCode: string;
  nameOfProduct: string; // 제품명
  typesOfFood: string; // 식품의 유형
  producer: string; // 생산자 및 소재지 (수입품의 경우 생산자, 수입자 및 제조국)
  qualityMaintenanceDeadline: string; // 제조연월일, 소비기한 또는 품질유지기한
  volume: string; // 포장단위별 내용물의 용량(중량), 수량
  rawMaterialInfo: string; // 원재료명 (농수산물의 원산지 표시 등에 관한 법률에 따른 원산지 표시 포함) 및 함량
  nutritionalIngredients: string; // 영양성분(영양성분 표시대상 식품에 한함)
  geneticallyModifiedInfo: string; // 유전자변형식품에 해당하는 경우의 표시
  importedPhrase: string; // 수입식품의 경우 “수입식품안전관리 특별법에 따른 수입신고를 필함”의 문구
  phoneNumber: string; // 소비자상담관련 전화번호
  cautionGuidelines: string; // 소비자안전을 위한 주의사항
}

const isItem19 = (item: object): item is InfoType19 => {
  return 'itemCode' in item && item.itemCode === '19';
};
const isItem20 = (item: object): item is InfoType20 => {
  return 'itemCode' in item && item.itemCode === '20';
};

interface Props {
  id: number;
}

const ProductInfoNotice = ({ id }: Props) => {
  // 상품고시정보
  const { data: productInfo } = useQuery(queryKey.productInfo.detail(id), async () => {
    const res = await (await client()).get(id);
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  return (
    <>
      {productInfo && (
        <Fragment>
          <div className='mt-5 h-2 bg-grey-90' />
          <div className='px-4 pb-6 pt-[22px]'>
            <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>
              상품고시정보
            </p>
            <div className='mt-3 flex flex-col gap-3.5'>
              {isItem19(productInfo) && (
                <Fragment>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      품목 또는 명칭
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.nameOfProduct ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      포장단위별 내용물의 용량(중량), 수량, 크기
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.volume ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      생산자,수입품의 경우 수입자를 함께 표기
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.producer ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      농수산물의 원산지 표시 등에 관한 법률에 따른 원산지
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.originCountry ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      제조연월일, 소비기한 또는 품질유지기한
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.qualityMaintenanceDeadline ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      농수산물-농수산물 품질관리법에 따른 유전자변형농산물 표시, 지리적 표시
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.geneticallyModifiedInfo ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      축산물 - 축산법에 따른 등급 표시, 가축 및 축산물 이력관리에 관한 법률에 따른
                      이력관리대상축산물 유무
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.productGrade ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      수입 농수축산물 - “수입식품안전관리 특별법에 따른 수입신고를 필함”의 문구
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.importInformation ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      상품구성
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.contentsOfProduct ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      보관방법 또는 취급방법
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.howToKeep ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      소비자상담관련 전화번호
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.phoneNumber ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      소비자안전을 위한 주의사항
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.cautionGuidelines ?? ''}`}
                    </p>
                  </div>
                </Fragment>
              )}
              {isItem20(productInfo) && (
                <Fragment>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      제품명
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.nameOfProduct ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      식품의 유형
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.typesOfFood ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      생산자 및 소재지 (수입품의 경우 생산자, 수입자 및 제조국)
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.producer ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      제조연월일, 소비기한 또는 품질유지기한
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.qualityMaintenanceDeadline ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      포장단위별 내용물의 용량(중량), 수량
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.volume ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      원재료명 (농수산물의 원산지 표시 등에 관한 법률에 따른 원산지 표시 포함) 및
                      함량
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.rawMaterialInfo ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      영양성분(영양성분 표시대상 식품에 한함)
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.nutritionalIngredients ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      유전자변형식품에 해당하는 경우의 표시
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.geneticallyModifiedInfo ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      수입식품의 경우 “수입식품안전관리 특별법에 따른 수입신고를 필함”의 문구
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.importedPhrase ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      소비자상담관련 전화번호
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.phoneNumber ?? ''}`}
                    </p>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <p className='w-[100px] whitespace-pre-line text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      소비자안전을 위한 주의사항
                    </p>
                    <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
                      {`${productInfo.cautionGuidelines ?? ''}`}
                    </p>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default ProductInfoNotice;
