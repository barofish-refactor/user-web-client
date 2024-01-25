import { useMutation, useQuery } from '@tanstack/react-query';
import { type Dispatch, type SetStateAction, useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { client } from 'src/api/client';
import { type AccountCheckRequest } from 'src/api/swagger/data-contracts';
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
  setIsRefundBankData: Dispatch<SetStateAction<boolean>>;
  refunData: RefundAccountType;
  isRefundBankData: boolean;
}
/** 주문하기 - 환불받을 계좌 */
const RefundAccount = ({
  setRefundData,
  setIsRefundBankData,
  refunData,
  isRefundBankData,
}: Props) => {
  const { setAlert } = useAlertStore();
  const [bank, setBank] = useState<SelectorType>();

  const { data: bankData } = useQuery(queryKey.bank, async () => {
    const res = await (await client()).selectBankCodeList();
    if (res.data.isSuccess) {
      return res.data.data;
    } else setAlert({ message: res.data.errorMsg ?? '' });
  });

  const { mutateAsync: checkAccount } = useMutation(
    async (args: AccountCheckRequest) => await (await client()).checkAccount(args),
  );

  const onCheckBtn = () => {
    checkAccount({
      bankCodeId: Number(refunData.bankCode),
      bankNum: refunData.accountNumber,
      holderName: refunData.name,
    })
      .then(res => {
        if (res.data.data === true) {
          setIsRefundBankData(true);
          setAlert({ message: '인증완료' });
          return;
        } else if (res.data.data === false) {
          setAlert({ message: res.data.errorMsg ?? '' });
        }
      })
      .catch(err => setAlert({ message: err.response.data.errorMsg ?? '' }));
  };
  const onReset = () => {
    setIsRefundBankData(false);
  };

  useEffect(() => {
    if (bank) {
      setRefundData(v => {
        return { ...v, bankCode: bank.value };
      });
    }
  }, [bank, setRefundData]);

  return (
    <div className='px-4 py-[22px]'>
      <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
        환불받을 계좌
      </p>
      <div className='mt-4 flex flex-col gap-6'>
        <div className='flex flex-col gap-3'>
          <p className='text-[15px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
            예금주명
          </p>
          <input
            disabled={isRefundBankData}
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
          <p className='text-[15px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
            입금 은행
          </p>
          <Selector
            className='flex-1'
            placeHolder='입금 은행을 선택해 주세요'
            disabled={isRefundBankData}
            value={bank}
            setValue={setBank}
            list={(bankData ?? []).map(v => ({
              label: v.name ?? '',
              value: v.id?.toString() ?? '',
            }))}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-[15px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
            계좌번호
          </p>
          <NumericFormat
            allowLeadingZeros
            disabled={isRefundBankData}
            allowNegative={false}
            maxLength={20}
            inputMode='numeric'
            className='flex h-11 w-full items-center rounded-lg border border-grey-80 px-3 text-[15px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-80'
            placeholder='계좌번호를 입력해 주세요'
            onChange={e => {
              setRefundData(v => {
                return { ...v, accountNumber: e.target.value };
              });
            }}
          />
        </div>
      </div>
      <div className='flex pb-6 pt-10'>
        <div
          className='mr-[10px] flex h-[52px] w-[60%] cursor-pointer items-center justify-center rounded-lg bg-primary-50 font-bold leading-[24px] -tracking-[0.03em] text-white disabled:bg-grey-80'
          onClick={onCheckBtn}
        >
          계좌 인증
        </div>
        <div
          className='flex h-[52px] w-[35%] cursor-pointer items-center justify-center rounded-lg bg-grey-60 font-bold leading-[24px] -tracking-[0.03em] text-white disabled:bg-grey-80'
          onClick={onReset}
        >
          수정
        </div>
      </div>
    </div>
  );
};

export default RefundAccount;
