import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  ProductFilters,
  ProductSortOption,
} from '@react-learning-monorepo/types';

export interface FiltersState {
  filters: ProductFilters;
  priceRange: {
    min: number;
    max: number;
    current: [number, number];
  };
  availableCategories: string[];
  availableBrands: string[];
}

const initialState: FiltersState = {
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    brand: null,
    sortBy: 'default',
    search: '',
  },
  priceRange: {
    min: 0,
    max: 5000,
    current: [0, 5000],
  },
  availableCategories: [],
  availableBrands: [],
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.filters.category = action.payload;
    },

    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange.current = action.payload;
      state.filters.minPrice = action.payload[0];
      state.filters.maxPrice = action.payload[1];
    },

    setBrand: (state, action: PayloadAction<string | null>) => {
      state.filters.brand = action.payload;
    },

    setSortBy: (state, action: PayloadAction<ProductSortOption>) => {
      state.filters.sortBy = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },

    clearAllFilters: (state) => {
      state.filters = {
        category: null,
        minPrice: null,
        maxPrice: null,
        brand: null,
        sortBy: 'default',
        search: '',
      };
      state.priceRange.current = [state.priceRange.min, state.priceRange.max];
    },

    clearSearchFilter: (state) => {
      state.filters.search = '';
    },

    setAvailableCategories: (state, action: PayloadAction<string[]>) => {
      state.availableCategories = action.payload;
    },

    setAvailableBrands: (state, action: PayloadAction<string[]>) => {
      state.availableBrands = action.payload;
    },

    updatePriceRangeBounds: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      const { min, max } = action.payload;
      state.priceRange.min = min;
      state.priceRange.max = max;

      // Reset current range if it's outside the new bounds
      if (
        state.priceRange.current[0] < min ||
        state.priceRange.current[1] > max
      ) {
        state.priceRange.current = [min, max];
        state.filters.minPrice = min;
        state.filters.maxPrice = max;
      }
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.priceRange.current = [state.priceRange.min, state.priceRange.max];
    },
  },
});

export const {
  setCategory,
  setPriceRange,
  setBrand,
  setSortBy,
  setSearch,
  clearAllFilters,
  clearSearchFilter,
  setAvailableCategories,
  setAvailableBrands,
  updatePriceRangeBounds,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
