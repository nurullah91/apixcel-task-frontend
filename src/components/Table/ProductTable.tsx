"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
} from "@/src/redux/api/productApi";
import { TProduct } from "@/src/types";
import { SearchIcon } from "../icons";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import Image from "next/image";

export default function ProductTable() {
  const [page, setPage] = useState(1);

  // Products search and sorting states
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("-createdAt");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState<string | undefined>(undefined);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    // timeout cleanup function
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch products dynamically with query parameters
  const { data: productsData, isLoading } = useGetAllProductsQuery(
    [
      { name: "searchTerm", value: debouncedSearch },
      { name: "category", value: category },
      { name: "sort", value: sortOrder },
      { name: "page", value: page.toString() },
    ].filter((param) => param.value !== undefined)
  );
  const { data: categoriesData } = useGetAllCategoriesQuery([]);

  const products: TProduct[] = productsData?.data || [];
  const totalPages = productsData?.meta?.totalPage || 1;
  const categories = categoriesData?.data || [];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "all") {
      setCategory(undefined);
    } else {
      setCategory(value);
    }
  };

  const loadingState = isLoading ? "loading" : "idle";

  return (
    <div className="w-full">
      {/* Search and Filter Section */}
      <div className="flex items-center justify-between gap-4 mb-4 w-full">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startContent={<SearchIcon />}
        />

        <Select
          className="max-w-xs"
          label="Category"
          placeholder="Filter by category"
          value={category}
          onChange={(e) => handleCategoryChange(e)}
        >
          <SelectItem key={"all"} value="all">
            All Category
          </SelectItem>

          {categories.map((cat: string) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </Select>

        <Select
          className="max-w-xs"
          label="Sort order"
          placeholder="Sort by"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <SelectItem value="-createdAt">Newest</SelectItem>
          <SelectItem value="createdAt">Oldest</SelectItem>
          <SelectItem value="-price">Price: High to Low</SelectItem>
          <SelectItem value="price">Price: Low to High</SelectItem>
        </Select>
      </div>

      <Table
        aria-label="Product table"
        bottomContent={
          totalPages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={totalPages}
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
        <TableBody loadingContent={<Spinner />} loadingState={loadingState}>
          {products.map((item) => (
            <TableRow key={item?._id}>
              <TableCell>
                <Image
                  src={item.photos.thumbnail}
                  alt={item.title}
                  width={150}
                  height={100}
                  className="w-[120px] h-[80px] overflow-hidden rounded-md"
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.discount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
