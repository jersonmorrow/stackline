import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import data from "../../../data.json";

interface ProductSales {
  weekEnding: string;
  retailSales: number;
}

export interface SalesState {
  sales: ProductSales[];
}

const initialState: SalesState = {
  sales: data[0].sales,
};

export const salesChartSlice = createSlice({
  name: "sales_chart",
  initialState,
  reducers: {},
});

export const selectCount = (state: RootState) => state.sales_chart;

export default salesChartSlice.reducer;
