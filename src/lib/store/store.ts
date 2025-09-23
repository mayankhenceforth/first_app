import { configureStore } from '@reduxjs/toolkit';
import productSlice from '@/lib/store/features/productSlice';

export const createStore = () => {
  return configureStore({
    reducer: {
      product: productSlice,
    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
