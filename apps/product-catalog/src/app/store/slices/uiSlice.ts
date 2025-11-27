import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@react-learning-monorepo/types';

export interface UINotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  timestamp: number;
}

export interface ProductDetailModalState {
  isOpen: boolean;
  selectedProduct: Product | null;
  selectedImageIndex: number;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  modals: {
    productDetail: ProductDetailModalState;
    cart: boolean;
    filters: boolean;
  };
  layout: {
    sidebarOpen: boolean;
    gridView: boolean;
    itemsPerRow: number;
  };
  notifications: UINotification[];
  loading: {
    products: boolean;
    categories: boolean;
  };
}

const initialState: UIState = {
  modals: {
    productDetail: {
      isOpen: false,
      selectedProduct: null,
      selectedImageIndex: 0,
      loading: false,
      error: null,
    },
    cart: false,
    filters: false,
  },
  layout: {
    sidebarOpen: false,
    gridView: true,
    itemsPerRow: 4,
  },
  notifications: [],
  loading: {
    products: false,
    categories: false,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Product Detail Modal
    openProductDetailModal: (state, action: PayloadAction<Product>) => {
      state.modals.productDetail.isOpen = true;
      state.modals.productDetail.selectedProduct = action.payload;
      state.modals.productDetail.selectedImageIndex = 0;
      state.modals.productDetail.error = null;
    },

    closeProductDetailModal: (state) => {
      state.modals.productDetail.isOpen = false;
      state.modals.productDetail.selectedProduct = null;
      state.modals.productDetail.selectedImageIndex = 0;
      state.modals.productDetail.error = null;
    },

    setProductDetailImage: (state, action: PayloadAction<number>) => {
      state.modals.productDetail.selectedImageIndex = action.payload;
    },

    setProductDetailLoading: (state, action: PayloadAction<boolean>) => {
      state.modals.productDetail.loading = action.payload;
    },

    setProductDetailError: (state, action: PayloadAction<string | null>) => {
      state.modals.productDetail.error = action.payload;
    },

    // Cart Modal
    toggleCartModal: (state) => {
      state.modals.cart = !state.modals.cart;
    },

    openCartModal: (state) => {
      state.modals.cart = true;
    },

    closeCartModal: (state) => {
      state.modals.cart = false;
    },

    // Filters Modal
    toggleFiltersModal: (state) => {
      state.modals.filters = !state.modals.filters;
    },

    openFiltersModal: (state) => {
      state.modals.filters = true;
    },

    closeFiltersModal: (state) => {
      state.modals.filters = false;
    },

    // Layout
    toggleSidebar: (state) => {
      state.layout.sidebarOpen = !state.layout.sidebarOpen;
    },

    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.layout.sidebarOpen = action.payload;
    },

    toggleGridView: (state) => {
      state.layout.gridView = !state.layout.gridView;
    },

    setGridView: (state, action: PayloadAction<boolean>) => {
      state.layout.gridView = action.payload;
    },

    setItemsPerRow: (state, action: PayloadAction<number>) => {
      state.layout.itemsPerRow = Math.max(1, Math.min(6, action.payload));
    },

    // Notifications
    addNotification: (
      state,
      action: PayloadAction<Omit<UINotification, 'id' | 'timestamp'>>
    ) => {
      const notification: UINotification = {
        ...action.payload,
        id: `notification-${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },

    clearAllNotifications: (state) => {
      state.notifications = [];
    },

    // Loading states
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.products = action.payload;
    },

    setCategoriesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.categories = action.payload;
    },
  },
});

export const {
  openProductDetailModal,
  closeProductDetailModal,
  setProductDetailImage,
  setProductDetailLoading,
  setProductDetailError,
  toggleCartModal,
  openCartModal,
  closeCartModal,
  toggleFiltersModal,
  openFiltersModal,
  closeFiltersModal,
  toggleSidebar,
  setSidebarOpen,
  toggleGridView,
  setGridView,
  setItemsPerRow,
  addNotification,
  removeNotification,
  clearAllNotifications,
  setProductsLoading,
  setCategoriesLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
