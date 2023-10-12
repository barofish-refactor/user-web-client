import { type ProductListDto } from 'src/api/swagger/data-contracts';
import { create } from 'zustand';

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

export interface indexFilterType {
  // tabIndex: number;
  text: string;
  id: number;
}
interface FilterStore {
  filter: indexFilterType[] | null;
  isOpen: boolean;
  type: {
    type: 'category' | 'topBar' | 'curation' | 'store' | 'search';
    id?: number;
  };
  setFilter: (value: FilterStore['filter']) => void;
  setIsOpen: (value: boolean) => void;
  setType: (value: {
    type: 'category' | 'topBar' | 'curation' | 'store' | 'search';
    id?: number;
  }) => void;
  clearFilter: () => void;
}

export const useFilterStore = create<FilterStore>()(set => ({
  filter: null,
  isOpen: false,
  type: { type: 'category' },
  setFilter: filter => set({ filter }),
  setIsOpen: isOpen => set({ isOpen }),
  setType: type => set({ type }),
  clearFilter: () => set({ filter: null, type: { type: 'category' }, isOpen: false }),
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
    buttonText?: string;
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

interface ProductOptionStore {
  productOption: {
    data?: ProductListDto;
  } | null;
  setProductOption: (productOption: ProductOptionStore['productOption']) => void;
  clearProductOption: () => void;
}

export const useProductOptionStore = create<ProductOptionStore>()(set => ({
  productOption: null,
  setProductOption: productOption => set({ productOption }),
  clearProductOption: () => set({ productOption: null }),
}));

interface OrderGaDataStore {
  orderGaData: {
    data?: any;
  } | null;
  setOrderGaData: (orderData: OrderGaDataStore['orderGaData']) => void;
  clearOrderGaData: () => void;
}

export const useOrderGaDataStore = create<OrderGaDataStore>()(set => ({
  orderGaData: null,
  setOrderGaData: orderGaData => set({ orderGaData }),
  clearOrderGaData: () => set({ orderGaData: null }),
}));
interface OrderFpDataStore {
  orderFpData: {
    data?: any;
  } | null;
  setOrderFpData: (orderGaData: OrderFpDataStore['orderFpData']) => void;
  clearOrderFpData: () => void;
}

export const useOrderFpDataStore = create<OrderFpDataStore>()(set => ({
  orderFpData: null,
  setOrderFpData: orderFpData => set({ orderFpData }),
  clearOrderFpData: () => set({ orderFpData: null }),
}));
