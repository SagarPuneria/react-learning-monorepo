import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './services/productsApi';
import cartReducer from './slices/cartSlice';
import filtersReducer from './slices/filtersSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    // RTK Query API slice
    [productsApi.reducerPath]: productsApi.reducer,
    // Feature slices
    cart: cartReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(productsApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
