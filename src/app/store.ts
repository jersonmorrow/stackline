import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/productSlice";
import salesReducer from "../features/SalesTable/salesSlice";
import salesChartReducer from "../features/SalesChart/salesChartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    sales: salesReducer,
    sales_chart: salesChartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
