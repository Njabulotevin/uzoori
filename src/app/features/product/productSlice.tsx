import { ProductRes } from "@/components/molecules/Products/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState = () => {
  let initialState = {
    product: {
      id: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      userId: "",
      name: "",
      price: 0,
      originalPrice: 0,
      collectionType: "",
      currency: "",
      available: true,
      description: "",
      productImage: [],
    },
  };

  return initialState;
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    viewProduct: (state, action: PayloadAction<ProductRes>) => {
      // do something
    },
  },
});

export const { viewProduct } = productSlice.actions;
export const selectProduct = (state: RootState) => state;
export default productSlice.reducer;
