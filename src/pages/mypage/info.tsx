import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { type MouseEventHandler, useEffect, useState, Fragment } from 'react';
import { client } from 'src/api/client';
import { type UpdateUserPayload } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { MyProfile, myProfileDefaultValue } from 'src/components/form';
import { ProductShippingAddress } from 'src/components/product';
import { BackButton, Checkbox } from 'src/components/ui';
import { type MypageEditType } from 'src/pages/mypage/edit/[type]';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToBlob, formatToPhone } from 'src/utils/functions';
import useLogout from 'src/utils/use-logout';
import { VARIABLES } from 'src/variables';

const getDynamicEditHref = (type: MypageEditType): LinkProps['href'] => ({
  pathname: '/mypage/edit/[type]',
  query: { type },
});
const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;

const MypageInfo: NextPageWithLayout = () => {
  const { setAlert } = useAlertStore();
  const router = useRouter();
  const [profile, setProfile] = useState(myProfileDefaultValue);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const onLogout = useLogout();

  const { data: user, refetch } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();

    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      if (res.data.code === '101' || res.data.code === '102') {
        router.replace('/login');
        return;
      } else if (res.data.code === '103') {
        deleteCookie(ACCESS_TOKEN);
        deleteCookie(REFRESH_TOKEN);
        return;
      }
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

  const { mutateAsync: updateUser, isLoading } = useMutation(
    async (args: UpdateUserPayload) => await (await client()).updateUser(args),
  );

  const onMutate = ({ data, profileImage }: UpdateUserPayload) => {
    if (isLoading) return;
    updateUser({
      data: formatToBlob<UpdateUserPayload['data']>(data, true),
      profileImage,
    })
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
          setAlert({ message: '변경되었습니다.', type: 'success' });
        } else {
          setAlert({ message: res.data.errorMsg ?? '' });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!user) return;

    setProfile(p => ({ ...p, previewUrl: user.profileImage ?? '' }));
  }, [user]);

  useEffect(() => {
    const close = () => {
      setIsVisible(false);
    };
    window.addEventListener('popstate', close, { passive: false });

    return () => {
      window.removeEventListener('popstate', close);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'overlay';
    }
  }, [isVisible]);

  return (
    <div className='flex flex-1 flex-col'>
      {/* 배송지 변경 */}
      <div className='sticky top-0 z-[100] w-full'>
        {isVisible && (
          <div className='absolute top-0 z-[100] flex h-[100dvb] w-full flex-col justify-end bg-black/50'>
            <ProductShippingAddress setIsVisible={setIsVisible} />
          </div>
        )}
      </div>
      <header className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>내 정보</h2>
        <div className='w-6' />
      </header>
      <section className='flex flex-1 flex-col justify-between px-4 pb-8 pt-4'>
        <div>
          <div className='grid place-items-center'>
            <MyProfile
              value={profile}
              onChange={profile => {
                setProfile(profile);
                if (profile.file) onMutate({ data: {}, profileImage: profile.file });
              }}
            />
          </div>
          <div className='mt-10'>
            <Row label='이름' value={user?.name} />
            <Row label='닉네임' value={user?.nickname} href={getDynamicEditHref('nickname')} />
            <Row label='이메일' value={user?.email ? user.email : '소셜계정'} />
            {user?.email && (
              <Row label='비밀번호' value='변경하기' href={getDynamicEditHref('password')} />
            )}
            <Row
              label='휴대폰 번호'
              value={formatToPhone(user?.phone)}
              href={getDynamicEditHref('phone')}
            />
            <Row
              label='배송지'
              value='배송지 목록'
              onClick={() => {
                setIsVisible(true);
                history.pushState(location.href, '', '');
              }}
            />
            <div className='flex items-center justify-between border-b border-b-[#f2f2f2] py-5'>
              <span className='text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                마케팅 수신 동의
              </span>
              <div className='flex items-center gap-1.5'>
                <Checkbox
                  id='check'
                  iconSize={18}
                  checked={user?.isAgreeMarketing}
                  onCheckedChange={checked => {
                    if (typeof checked !== 'boolean') return;
                    onMutate({
                      data: {
                        isAgreeMarketing: checked,
                      },
                    });
                  }}
                />
                <div className='flex items-center'>
                  <Link
                    className='border-b border-b-grey-50 text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-50'
                    href='/marketing'
                  >
                    마케팅 수신
                  </Link>
                  <p className='text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-50'>
                    에 동의합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className='mt-[30px] flex items-center justify-center gap-4 text-[15px] leading-[20px] -tracking-[0.03em] text-grey-70'>
          <button onClick={onLogout}>로그아웃</button>
          <div className='h-[14px] w-[1px] bg-grey-90' />
          <Link href='/mypage/withdrawal'>회원탈퇴</Link>
        </nav>
      </section>
    </div>
  );
};

function Row({
  label,
  value,
  href,
  onClick,
}: {
  label: string;
  value: string | undefined;
  href?: LinkProps['href'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const wrapClassname = 'flex items-center justify-between border-b border-b-[#f2f2f2] py-5';
  const innerElement = (
    <>
      <span className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
        {label}
      </span>
      <p className='ml-2 mr-3 flex-1 text-right text-[14px] leading-[22px] -tracking-[0.03em] text-grey-50'>
        {value}
      </p>
      <Image
        unoptimized
        src='/assets/icons/common/chevron-mypage.svg'
        alt='mypageImge'
        width={24}
        height={24}
        className={`${href || onClick ? '' : 'invisible'}`}
      />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={wrapClassname}>
        {innerElement}
      </Link>
    );
  } else if (onClick) {
    return (
      <button className={cm(wrapClassname, 'w-full')} onClick={onClick}>
        {innerElement}
      </button>
    );
  }
  return <div className={wrapClassname}>{innerElement}</div>;
}

MypageInfo.getLayout = page => (
  <Layout
    className='flex flex-1 flex-col'
    headerProps={{ disable: true }}
    footerProps={{ disable: true }}
  >
    <DefaultSeo title='내정보 | 바로피쉬' description='내 정보' />
    {page}
  </Layout>
);

export default MypageInfo;
