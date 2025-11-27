import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import type { Product } from '@react-learning-monorepo/types';
import {
  applyAllFilters,
  sortProducts,
  calculateDiscountedPrice,
  formatPrice,
} from '@react-learning-monorepo/utils';

// Cart Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartSubtotal = (state: RootState) => state.cart.subtotal;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.totalQuantity;
export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;
export const selectCartLastAddedItem = (state: RootState) =>
  state.cart.lastAddedItem;
export const selectCartSavings = (state: RootState) => state.cart.discount;

// UI Selectors
export const selectUILayout = (state: RootState) => state.ui.layout;
export const selectSidebarOpen = (state: RootState) =>
  state.ui.layout.sidebarOpen;
export const selectGridView = (state: RootState) => state.ui.layout.gridView;
export const selectItemsPerRow = (state: RootState) =>
  state.ui.layout.itemsPerRow;
export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectProductDetailModal = (state: RootState) =>
  state.ui.modals.productDetail;
export const selectCartModal = (state: RootState) => state.ui.modals.cart;
export const selectFiltersModal = (state: RootState) => state.ui.modals.filters;

// Filters Selectors
export const selectFilters = (state: RootState) => state.filters.filters;
export const selectPriceRange = (state: RootState) => state.filters.priceRange;
export const selectAvailableCategories = (state: RootState) =>
  state.filters.availableCategories;
export const selectAvailableBrands = (state: RootState) =>
  state.filters.availableBrands;
export const selectCurrentSearch = (state: RootState) =>
  state.filters.filters.search;

// Memoized Selectors

// Get filtered and sorted products
export const selectFilteredProducts = createSelector(
  [(state: RootState) => state.productsApi.queries],
  (queries) => {
    // Get products from the first successful query
    const productQuery = Object.values(queries).find(
      (query) => query?.data && Array.isArray((query.data as any)?.products)
    );

    if (!productQuery?.data) {
      return [];
    }

    return (productQuery.data as any).products || [];
  }
);

export const selectProcessedProducts = createSelector(
  [selectFilteredProducts, selectFilters],
  (products: Product[], filters) => {
    if (!products.length) return [];

    // Apply filters
    let filteredProducts = applyAllFilters(products, filters);

    // Apply sorting
    return sortProducts(filteredProducts, filters.sortBy);
  }
);

// Get unique brands from products for filter options
export const selectUniqueBrands = createSelector(
  [selectFilteredProducts],
  (products: Product[]) => {
    const brands = new Set(products.map((product) => product.brand));
    return Array.from(brands).sort();
  }
);

// Get price range from products
export const selectProductPriceRange = createSelector(
  [selectFilteredProducts],
  (products: Product[]) => {
    if (!products.length) return { min: 0, max: 1000 };

    const prices = products.map((product) =>
      calculateDiscountedPrice(product.price, product.discountPercentage)
    );

    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }
);

// Check if product is in cart
export const makeSelectIsProductInCart = () =>
  createSelector(
    [selectCartItems, (state: RootState, productId: number) => productId],
    (cartItems, productId) => {
      return cartItems.some((item) => item.id === productId);
    }
  );

// Get cart item quantity for a product
export const makeSelectCartItemQuantity = () =>
  createSelector(
    [selectCartItems, (state: RootState, productId: number) => productId],
    (cartItems, productId) => {
      const item = cartItems.find((item) => item.id === productId);
      return item?.quantity || 0;
    }
  );

// Calculate formatted cart total
export const selectFormattedCartTotal = createSelector(
  [selectCartTotal],
  (total) => formatPrice(total)
);

// Calculate formatted cart subtotal
export const selectFormattedCartSubtotal = createSelector(
  [selectCartSubtotal],
  (subtotal) => formatPrice(subtotal)
);

// Calculate formatted cart savings
export const selectFormattedCartSavings = createSelector(
  [selectCartSavings],
  (savings) => formatPrice(savings)
);

// Get active filters count (for UI badge)
export const selectActiveFiltersCount = createSelector(
  [selectFilters],
  (filters) => {
    let count = 0;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.brand && filters.brand !== 'all') count++;
    if (filters.minPrice !== null || filters.maxPrice !== null) count++;
    if (filters.search.trim()) count++;
    return count;
  }
);

// Check if any filters are active
export const selectHasActiveFilters = createSelector(
  [selectActiveFiltersCount],
  (count) => count > 0
);
