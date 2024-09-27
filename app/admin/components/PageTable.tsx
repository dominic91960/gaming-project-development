import React, { ReactNode } from "react";
import { CiSearch } from "react-icons/ci";

interface PageTableProps {
  title: string;
  buttonText: string;
  buttonFunction: () => void;
  children: ReactNode;
}

const PageTable: React.FC<PageTableProps> = ({
  title,
  buttonText = "",
  buttonFunction,
  children,
}) => {
  return (
    <div className="flex-grow bg-black/40 border border-[#0D6D49] px-[2em] py-[1.2em] rounded-md">
      <div className="flex justify-between items-center pb-[1.2em] border-b border-b-[#0D6D49]">
        <h2 className="font-semibold capitalize translate-y-[0.3em]">
          {title}
        </h2>
        <div className="flex items-center text-[12px] gap-x-[1em]">
          <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em]">
            <CiSearch className="text-[1.6em]" />
            <input
              type="search"
              placeholder="Search"
              className="bg-transparent outline-none border-s px-[1em] w-[38ch]"
            />
          </div>
          {buttonText !== "" && (
            <button
              className="bg-[#00FFA1] font-bold text-black text-[11px] capitalize px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100"
              onClick={buttonFunction}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageTable;
