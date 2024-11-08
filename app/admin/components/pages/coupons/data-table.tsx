"use client";

import React, { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCouponContext } from "@/context/CouponContext";
import Spinner from "@/components/Spinner/Spinner";
import { CiSearch } from "react-icons/ci";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleClick: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleClick,
}: DataTableProps<TData, TValue>) {
  const {
    loading,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    totalPages,
    getAllCoupons,
    reloadCoupons,
  } = useCouponContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [localSearchTerm, setLocalSearchTerm] = useState(""); // Track input value
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced value

  // Debounce effect for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(localSearchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm]);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getAllCoupons(currentPage, searchTerm);
  }, [currentPage, searchTerm, reloadCoupons]);

  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <div
          key={i}
          className={`cursor-pointer font-medium px-[1em] py-[0.5em] rounded-sm ${
            i === currentPage ? "bg-[#00FFA1]" : "bg-white"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </div>
      );
    }
    return buttons;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      {/* Mobile search bar and add menu */}
      <div className="flex items-center justify-center px-[36px] mb-[2em] gap-x-[1em] md:hidden">
        <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em] w-full">
          <CiSearch className="text-[1.6em] text-white" />
          <input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="bg-transparent outline-none border-y-0 border-e-0 border-s rounded-none px-[1em] w-full text-white md:w-[38ch]"
          />
        </div>
        <button
          className="bg-[#00FFA1] font-bold text-black text-[0.95em] px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100 flex-shrink-0"
          onClick={handleClick}
        >
          Add Coupon
        </button>
      </div>

      <div className="flex-grow bg-black/40 border border-[#0D6D49] px-[2em] py-[1.2em] rounded-3xl md:rounded-md text-white">
        <div className="hidden pb-[1.2em] border-b border-b-[#0D6D49] md:flex md:justify-between md:items-center">
          {/* Title */}
          <h2 className="font-semibold text-white">Coupons</h2>

          {/* Search bar and add menu */}
          <div className="flex items-center text-[0.5em] gap-x-[1em]">
            <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em]">
              <CiSearch className="text-[1.6em] text-white" />
              <input
                placeholder="Filter Name..."
                value={localSearchTerm}
                onChange={(event) => setLocalSearchTerm(event.target.value)}
                className="bg-transparent outline-none border-y-0 border-e-0 border-s rounded-none px-[1em] w-[38ch] text-white"
              />
            </div>

            <button
              className="bg-[#00FFA1] font-bold text-black text-[0.95em] px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100 flex-shrink-0"
              onClick={handleClick}
            >
              Add Coupon
            </button>
          </div>
        </div>

        <div className="text-white md:mt-[1.5em]">
          <Table className="border-separate border-spacing-y-[2em] px-[0.4em] text-[0.65em] md:border-spacing-y-[1em]">
            <TableHeader className="text-[1.1em]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-inherit border-none"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="hidden md:table-cell h-fit ps-0 py-[1em]"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="bg-white/5 hover:bg-white/5 cursor-pointer hover:shadow-[0px_0px_5px_#00FFA1] rounded-sm text-[2em] sm:text-[1.4em] md:text-[1em]"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={`py-[1.3em] px-[0.2em] ${
                          index === 0
                            ? "relative rounded-s-sm ps-[1.2em]"
                            : index === 1
                            ? "max-w-[16ch] text-nowrap overflow-hidden text-ellipsis pe-[1em]"
                            : index === 3
                            ? "rounded-e-sm"
                            : ""
                        }`}
                      >
                        {index === 0 && (
                          <div className="w-[0.3em] h-full bg-[#00FFA1] absolute top-0 left-0 rounded-full"></div>
                        )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="ps-[2em]">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="px-[4em] mt-[2em] flex items-center justify-between md:text-[0.65em]">
        <div className="flex text-black gap-x-[1em]">{renderPagination()}</div>
      </div>
    </>
  );
}
