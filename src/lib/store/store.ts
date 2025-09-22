import { configureStore } from '@reduxjs/toolkit';
import productSlice from '@/lib/store/features/productSlice'

export const store = configureStore({
    reducer:{
        product:productSlice
    }
})
export default store;