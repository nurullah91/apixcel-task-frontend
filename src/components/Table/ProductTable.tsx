"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import { TProduct } from "@/src/types";

export default function App() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useGetAllProductsQuery([]);

  const products = data?.data;

  const pages = React.useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState = isLoading || products.length === 0 ? "loading" : "idle";

  return (
    <Table
      aria-label="Product table"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="thumbnail">Thumbnail</TableColumn>
        <TableColumn key="title">Title</TableColumn>
        <TableColumn key="category">Category</TableColumn>
        <TableColumn key="price">Price</TableColumn>
        <TableColumn key="stock">Stock</TableColumn>
        <TableColumn key="discount">Discount</TableColumn>
      </TableHeader>
      <TableBody
        items={products ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item: TProduct) => (
          <TableRow key={item?.title}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
