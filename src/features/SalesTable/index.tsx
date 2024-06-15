import { useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import classes from "./SalesTable.module.css";
import data from "../../../data.json";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

interface RowData {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function sortData(
  data: { sales: RowData[] }[],
  {
    sortBy,
    reversed,
    search,
  }: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const filteredData = data[0].sales.filter((row) => {
    return (
      row.weekEnding.toLowerCase().includes(search.toLowerCase()) ||
      row.retailSales.toString().includes(search) ||
      row.wholesaleSales.toString().includes(search) ||
      row.unitsSold.toString().includes(search) ||
      row.retailerMargin.toString().includes(search)
    );
  });

  if (!sortBy) {
    return filteredData;
  }

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return reversed ? 1 : -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return reversed ? -1 : 1;
    }
    return 0;
  });

  return sortedData;
}

const useAppSelector = useSelector.withTypes<RootState>();

export default function SalesTable() {
  const product = useAppSelector((state) => state.sales);
  const search = "";
  const [sortedData, setSortedData] = useState(product.sales);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const rows = sortedData.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{row.weekEnding}</Table.Td>
      <Table.Td>{formatCurrency(row.retailSales)}</Table.Td>
      <Table.Td>{formatCurrency(row.wholesaleSales)}</Table.Td>
      <Table.Td>{row.unitsSold}</Table.Td>
      <Table.Td>{formatCurrency(row.retailerMargin)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "weekEnding"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("weekEnding")}
            >
              Week Ending
            </Th>
            <Th
              sorted={sortBy === "retailSales"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("retailSales")}
            >
              Retail Sales
            </Th>
            <Th
              sorted={sortBy === "wholesaleSales"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("wholesaleSales")}
            >
              Wholesale Sales
            </Th>
            <Th
              sorted={sortBy === "unitsSold"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("unitsSold")}
            >
              Unit Sold
            </Th>
            <Th
              sorted={sortBy === "retailerMargin"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("retailerMargin")}
            >
              Retailer Margin
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
