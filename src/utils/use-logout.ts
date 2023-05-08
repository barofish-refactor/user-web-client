import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useTokenStore } from 'src/store';
import { VARIABLES } from '../variables';

const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;

/** apollo초기화, cookie삭제 후 로그인페이지로 이동 */
export default function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearToken = useTokenStore(state => state.clearToken);
  const onLogout = async () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      await router.push('/login').then(() => {
        deleteCookie(ACCESS_TOKEN);
        deleteCookie(REFRESH_TOKEN);
        clearToken();
        queryClient.clear();
        // 로그아웃 로직
      });
    }
  };

  return onLogout;
}
