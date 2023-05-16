import { type CookieValueTypes } from 'cookies-next';
import { create } from 'zustand';

interface TokenStore {
  token: CookieValueTypes;
  setToken: (token: TokenStore['token']) => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenStore>()(set => ({
  token: null,
  setToken: token => set({ token }),
  clearToken: () => set({ token: null }),
}));

interface AlertStore {
  alert: { message: string } | null;
  setAlert: (alert: AlertStore['alert']) => void;
  clearAlert: () => void;
}

export const useAlertStore = create<AlertStore>()(set => ({
  alert: null,
  setAlert: alert => set({ alert }),
  clearAlert: () => set({ alert: null }),
}));

interface OpenStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useOpenStore = create<OpenStore>()(set => ({
  isOpen: false,
  setIsOpen: value => set(() => ({ isOpen: value })),
}));
