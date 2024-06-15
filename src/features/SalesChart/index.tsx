import React from "react";
import { useSelector } from "react-redux";
import { AxisOptions, Chart } from "react-charts";
import { RootState } from "../../app/store";
import classes from "./SalesChart.module.css";

interface SalesData {
  weekEnding: string;
  retailSales: Date;
}

const useAppSelector = useSelector.withTypes<RootState>();

const RetailSalesChart = () => {
  const salesChart = useAppSelector((state) => state.sales_chart);

  const formattedData = React.useMemo(
    () =>
      salesChart.sales.map((item) => ({
        weekEnding: new Date(item.weekEnding),
        retailSales: item.retailSales,
      })),
    [salesChart.sales]
  );

  const primaryAxis = React.useMemo<AxisOptions<SalesData>>(
    () => ({
      getValue: (datum) => datum.weekEnding,
      formatters: {
        scale: (date: Date) =>
          new Date(date).toLocaleDateString("en-US", { month: "short" }),
      },
      tickLabelRotationDeg: 0,
    }),
    []
  );

  const secondaryAxes = React.useMemo<AxisOptions<SalesData>[]>(
    () => [
      {
        getValue: (datum) => datum.retailSales,
      },
    ],
    []
  );

  return (
    <div className={classes.container}>
      <Chart
        options={{
          data: [
            {
              label: "Retail Sales",
              data: formattedData,
            },
          ],
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
};

export default RetailSalesChart;
