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
  alert: {
    message: string;
    onClick?: () => void;
    buttonText?: string;
    type?: 'text' | 'success';
  } | null;
  setAlert: (alert: AlertStore['alert']) => void;
  clearAlert: () => void;
}

export const useAlertStore = create<AlertStore>()(set => ({
  alert: null,
  setAlert: alert => set({ alert }),
  clearAlert: () => set({ alert: null }),
}));

interface FilterStore {
  filter: { tabIndex: number; text: string; id: number }[] | null;
  isOpen: boolean;
  setFilter: (value: FilterStore['filter']) => void;
  setIsOpen: (value: boolean) => void;
  clearFilter: () => void;
}

export const useFilterStore = create<FilterStore>()(set => ({
  filter: null,
  isOpen: false,
  setFilter: filter => set({ filter }),
  setIsOpen: isOpen => set({ isOpen }),
  clearFilter: () => set({ filter: null, isOpen: false }),
}));

interface ConfirmStore {
  confirm: {
    message: string;
    onClick: () => void;
    buttonText?: string;
    type?: 'error' | 'success';
  } | null;
  setConfirm: (confirm: ConfirmStore['confirm']) => void;
  clearConfirm: () => void;
}

export const useConfirmStore = create<ConfirmStore>()(set => ({
  confirm: null,
  setConfirm: confirm => set({ confirm }),
  clearConfirm: () => set({ confirm: null }),
}));

interface PhotoStore {
  photo: {
    onCamera: () => void;
    onAlbum: () => void;
  } | null;
  setPhoto: (photo: PhotoStore['photo']) => void;
  clearPhoto: () => void;
}

export const usePhotoStore = create<PhotoStore>()(set => ({
  photo: null,
  setPhoto: photo => set({ photo }),
  clearPhoto: () => set({ photo: null }),
}));

interface BottomConfirmStore {
  bottomConfirm: {
    title: string;
    content: string;
    buttonText?: string;
    onClick: () => void;
  } | null;
  setBottomConfirm: (bottomConfirm: BottomConfirmStore['bottomConfirm']) => void;
  clearBottomConfirm: () => void;
}

export const useBottomConfirmStore = create<BottomConfirmStore>()(set => ({
  bottomConfirm: null,
  setBottomConfirm: bottomConfirm => set({ bottomConfirm }),
  clearBottomConfirm: () => set({ bottomConfirm: null }),
}));

interface ToastStore {
  toast: {
    text: string;
    onClick: () => void;
  } | null;
  setToast: (toast: ToastStore['toast']) => void;
  clearToast: () => void;
}

export const useToastStore = create<ToastStore>()(set => ({
  toast: null,
  setToast: toast => set({ toast }),
  clearToast: () => set({ toast: null }),
}));
