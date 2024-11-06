import React, {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import { useOrderContext } from "@/context/OrderContext";
import Spinner from "@/components/Spinner/Spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: any[];
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  selectedFile: File | null;
  handleUpload: (e: React.MouseEvent) => Promise<void>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isDialogOpen,
  setIsDialogOpen,
  fileInputRef,
  handleFileChange,
  selectedFile,
  handleUpload,
}: DataTableProps<TData, TValue>) {
  console.log("columns", columns);
  console.log("data", data);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [localSearchTerm, setLocalSearchTerm] = useState(""); // Track input value
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced value

  const {
    getAllOrders,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    totalPages,
    setTotalPages,
    loading,
    reloadOrders,
  } = useOrderContext();

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
    getAllOrders(currentPage, searchTerm);
  }, [currentPage, searchTerm, reloadOrders]);

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

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      <div className="flex-grow bg-black/40 border border-[#0D6D49] px-[2em] py-[1.2em] rounded-3xl md:rounded-md text-white">
        <div className="hidden pb-[1.2em] border-b border-b-[#0D6D49] md:flex md:justify-between md:items-center mb-[1em]">
          <h2 className="font-semibold text-white">Orders</h2>

          <div className="flex items-center text-[0.5em] gap-x-[1em]">
            <p className="text-[1.5em]">Upload your CSV File</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="w-fit bg-[#00FFA1] font-bold text-black text-[0.95em] px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100 flex-shrink-0"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Click Here
                </button>
              </DialogTrigger>

              <DialogContent className="w-[425px] bg-gradient-to-tr from-black from-15% to-[#0D6D49] p-[3em] rounded-md border border-[#19D38E] sm:w-auto">
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center w-full">
                  <div className="relative w-max bg-gradient-to-tr from-black from-15% to-[#0D6D49] p-[3em] rounded-md border border-[#19D38E]">
                    <button
                      className="absolute top-[1em] right-[1em] text-[#00FFA1] text-[1.4em] hover:opacity-80 transition-opacity duration-100"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      <IoClose />
                    </button>

                    <h2 className="font-bold text-[1.5em] pb-[0.6em] border-b border-b-[#0D6D49] text-white mb-6">
                      Upload CSV File
                    </h2>

                    <form className="border border-[#0D6D49] rounded-md p-6">
                      <p className="font-primaryFont text-white text-[13px] font-medium mb-2">
                        Upload CSV
                      </p>

                      <div className="flex flex-col items-start justify-start border border-gray-500 rounded-md mb-4 w-full">
                        <label
                          htmlFor="file-upload"
                          className="flex items-center cursor-pointer"
                        >
                          <span className="bg-gray-800 text-white py-2 px-4 rounded-l-md">
                            Browse
                          </span>
                          <input
                            ref={fileInputRef}
                            id="file-upload"
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <div className="border-l border-gray-700  text-gray-400 py-2 px-4 rounded-r-md">
                            {selectedFile
                              ? selectedFile.name
                              : "Select a CSV file to upload"}
                          </div>
                        </label>
                      </div>

                      <div className="flex gap-6 items-center justify-between">
                        <p className="font-primaryFont text-white text-[13px] font-medium mb-2 w-max">
                          Please review and ensure that all the details you have
                          entered are correct before submitting.
                        </p>
                        <Button
                          type="button"
                          onClick={handleUpload}
                          className="bg-[#00FFA1] text-black font-primaryFont text-[13px] font-semibold h-[30px]"
                        >
                          UPLOAD
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div className="border p-[0.75em] ms-[5.5em] rounded-sm flex items-center gap-x-[0.75em]">
              <CiSearch className="text-[1.6em] text-white" />
              <input
                placeholder="Filter Name..."
                value={localSearchTerm}
                onChange={(event) => setLocalSearchTerm(event.target.value)}
                className="bg-transparent outline-none border-s px-[1em] w-[40ch] text-white"
              />
            </div>
            <button
              className="bg-[#00FFA1] font-bold text-black text-[0.95em] px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100 flex-shrink-0"
              onClick={() => getAllOrders(1, "")}
            >
              Refresh
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
        {/* <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}

        <div className="px-[4em] mt-[2em] flex items-center justify-between md:text-[0.65em]">
          <div className="flex text-black gap-x-[1em]">
            {renderPagination()}
          </div>
        </div>
      </div>
    </>
  );
}
