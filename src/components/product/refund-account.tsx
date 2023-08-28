import { useQuery } from '@tanstack/react-query';
import { type Dispatch, type SetStateAction, useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { client } from 'src/api/client';
import { Selector } from 'src/components/common';
import { type SelectorType } from 'src/components/common/selector';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';

export interface RefundAccountType {
  name: string; // 예금주
  bankCode: string; // 은행 코드
  accountNumber: string; // 계좌번호
}

interface Props {
  setRefundData: Dispatch<SetStateAction<RefundAccountType>>;
}

/** 주문하기 - 환불받을 계좌 */
const RefundAccount = ({ setRefundData }: Props) => {
  const { setAlert } = useAlertStore();
  const [bank, setBank] = useState<SelectorType>();

  const { data: bankData } = useQuery(queryKey.bank, async () => {
    const res = await (await client()).selectBankCodeList();
    if (res.data.isSuccess) {
      return res.data.data;
    } else setAlert({ message: res.data.errorMsg ?? '' });
  });

  useEffect(() => {
    if (bank) {
      setRefundData(v => {
        return { ...v, bankCode: bank.value };
      });
    }
  }, [bank, setRefundData]);

  return (
    <div className='px-4 py-[22px]'>
      <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
        환불받을 계좌
      </p>
      <div className='mt-4 flex flex-col gap-6'>
        <div className='flex flex-col gap-3'>
          <p className='text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
            예금주명
          </p>
          <input
            maxLength={10}
            className='flex h-11 w-full items-center rounded-lg border border-grey-80 px-3 text-[14px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-80'
            placeholder='예금주명을 입력해 주세요'
            onChange={e => {
              setRefundData(v => {
                return { ...v, name: e.target.value };
              });
            }}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
            입금 은행
          </p>
          <Selector
            className='flex-1'
            placeHolder='입금 은행을 선택해 주세요'
            value={bank}
            setValue={setBank}
            list={(bankData ?? []).map(v => ({
              label: v.name ?? '',
              value: v.id?.toString() ?? '',
            }))}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
            계좌번호
          </p>
          <NumericFormat
            allowLeadingZeros
            allowNegative={false}
            maxLength={20}
            inputMode='numeric'
            className='flex h-11 w-full items-center rounded-lg border border-grey-80 px-3 text-[14px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-80'
            placeholder='계좌번호를 입력해 주세요'
            onChange={e => {
              setRefundData(v => {
                return { ...v, accountNumber: e.target.value };
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RefundAccount;
