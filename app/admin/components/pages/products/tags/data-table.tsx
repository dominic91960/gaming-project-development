import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";

import AddTagsPop from "./AddTagsPop";

interface DataTableProps<TData, TValue> {
  columns: (onDelete: (id: string) => void) => ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete: (id: string) => void;
  onAddTags: (newTags: {
    name: string;
    description: string;
    imageUrl: string;
  }) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
  onAddTags,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns: columns(onDelete),
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
      <div className="flex-grow bg-black/40 border border-[#0D6D49] px-[2em] py-[1.2em] rounded-md text-white">
        <div className="flex justify-between items-center pb-[1.2em] border-b border-b-[#0D6D49]">
          <h2 className="font-semibold text-[24px] text-white">Tags</h2>
          <div className="flex items-center text-[12px] gap-x-[1em]">
            <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em]">
              <CiSearch className="text-[1.6em] text-white" />
              <input
                placeholder="Filter names..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="bg-transparent outline-none border-y-0 border-e-0 border-s rounded-none px-[1em] w-[38ch] text-white"
              />
            </div>

            <AddTagsPop onAddTags={onAddTags} />
          </div>
        </div>
        <div className="mt-[1.5em] text-white">
          <Table className="border-separate border-spacing-y-[0.8em] px-[0.4em]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-inherit border-none"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
                    className="bg-white/5 hover:bg-white/5 cursor-pointer hover:shadow-[0px_0px_5px_#00FFA1] rounded-sm"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={
                          index === 0
                            ? "relative rounded-s-sm"
                            : index === 3
                            ? "rounded-e-sm"
                            : ""
                        }
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
      <div className="flex items-center space-x-2 py-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="hover:bg-[#00FFA1]"
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="hover:bg-[#00FFA1]"
        >
          Next
        </Button>
      </div>
    </>
  );
}
