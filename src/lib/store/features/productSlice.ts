import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProductState {
  allSubCategory: any[];
  allCategory: any[];
  allProduct: any[];
}

const initialState: ProductState = {
  allSubCategory: [],
  allCategory: [],
  allProduct: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllCategory: (state, action: PayloadAction<any[]>) => {
      state.allCategory = [...action.payload];
    },
    setAllSubCategory: (state, action: PayloadAction<any[]>) => {
      state.allSubCategory = [...action.payload];
    },
    setAllProduct: (state, action: PayloadAction<any[]>) => {
      state.allProduct = [...action.payload];
    },
  },
});

export const { setAllCategory, setAllSubCategory, setAllProduct } = productSlice.actions;
export default productSlice.reducer;
