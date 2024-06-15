import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import data from "../../../data.json";

interface ProductSales {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

export interface SalesState {
  sales: ProductSales[];
}

const initialState: SalesState = {
  sales: data[0].sales,
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
});

export const selectCount = (state: RootState) => state.sales;

export default salesSlice.reducer;
