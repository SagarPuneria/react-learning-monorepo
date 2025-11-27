import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '@react-learning-monorepo/types';
import {
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartItemQuantity as updateCartItemQuantityUtil,
  clearCart as clearCartUtil,
  calculateCartSubtotal,
  calculateCartSavings,
  calculateTax,
  calculateCartTotal,
  saveCartToStorage,
  loadCartFromStorage,
  clearCartFromStorage,
} from '@react-learning-monorepo/utils';

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  isOpen: boolean;
  lastAddedItem: CartItem | null;
  taxRate: number;
}

const initialState: CartState = {
  items: loadCartFromStorage(),
  totalQuantity: 0,
  subtotal: 0,
  discount: 0,
  tax: 0,
  total: 0,
  isOpen: false,
  lastAddedItem: null,
  taxRate: 0.08, // 8% tax rate
};

// Calculate derived values
const calculateDerivedValues = (state: CartState) => {
  state.totalQuantity = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  state.subtotal = calculateCartSubtotal(state.items);
  state.discount = calculateCartSavings(state.items);
  state.tax = calculateTax(state.subtotal, state.taxRate);
  state.total = calculateCartTotal(state.subtotal, state.tax);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: (() => {
    const state = { ...initialState };
    calculateDerivedValues(state);
    return state;
  })(),
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      state.items = addToCartUtil(state.items, product, quantity);

      // Set last added item for UI feedback
      const addedItem = state.items.find((item) => item.id === product.id);
      if (addedItem) {
        state.lastAddedItem = addedItem;
      }

      calculateDerivedValues(state);
      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = removeFromCartUtil(state.items, productId);
      state.lastAddedItem = null;
      calculateDerivedValues(state);
      saveCartToStorage(state.items);
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      state.items = updateCartItemQuantityUtil(
        state.items,
        productId,
        quantity
      );
      state.lastAddedItem = null;
      calculateDerivedValues(state);
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = clearCartUtil();
      state.lastAddedItem = null;
      calculateDerivedValues(state);
      clearCartFromStorage();
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    clearLastAddedItem: (state) => {
      state.lastAddedItem = null;
    },

    updateTaxRate: (state, action: PayloadAction<number>) => {
      state.taxRate = action.payload;
      calculateDerivedValues(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  clearLastAddedItem,
  updateTaxRate,
} = cartSlice.actions;

export default cartSlice.reducer;
