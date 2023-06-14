import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { VARIABLES } from '../variables';
import { useConfirmStore } from 'src/store';
import { requestPermission } from 'src/utils/functions';

const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;

export default function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setConfirm } = useConfirmStore();
  // const clearToken = useTokenStore(state => state.clearToken);
  const onLogout = async () => {
    setConfirm({
      message: '로그아웃 하시겠습니까?',
      onClick: async () => {
        await router.push('/login').then(() => {
          deleteCookie(ACCESS_TOKEN);
          deleteCookie(REFRESH_TOKEN);
          // clearToken();
          queryClient.clear();
          requestPermission('logout', '');
        });
      },
    });
  };

  return onLogout;
}
