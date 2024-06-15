import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import data from "../../../data.json";

export interface ProductState {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  tags: string[];
}

const initialState: ProductState = {
  id: data[0].id,
  title: data[0].title,
  image: data[0].image,
  subtitle: data[0].subtitle,
  brand: data[0].brand,
  tags: data[0].tags,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const selectCount = (state: RootState) => state.product;

export default productSlice.reducer;
