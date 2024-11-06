"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { CiSearch } from "react-icons/ci";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchTerm: string;
  setSearchTerm: (key: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchTerm,
  setSearchTerm,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // Handle search input change
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

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

  return (
    <>
      <div className="flex-grow bg-black/40 border border-[#0D6D49] px-[2em] py-[1.2em] rounded-3xl md:rounded-md text-white">
        <div className="hidden pb-[1.2em] border-b border-b-[#0D6D49] md:flex md:justify-between md:items-center">
          <h2 className="font-semibold text-white">Reviews</h2>

          <div className="flex items-center text-[0.5em] gap-x-[1em]">
            <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em] mb-[1em]">
              <CiSearch className="text-[1.6em] text-white" />
              <input
                type="text"
                value={
                  (table
                    .getColumn("productName")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("productName")
                    ?.setFilterValue(event.target.value)
                }
                placeholder="Search by product"
                className="bg-transparent outline-none border-s px-[1em] w-[50ch] text-white"
              />
            </div>
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
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="hidden md:table-cell h-fit py-[1em]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
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
    </>
  );
}
