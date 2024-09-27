import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface PaginationTabProps {
  showDeleteButtonGroup: boolean;
  showStatusButtonGroup: boolean;
  totalSelections: number;
}

const PaginationTab: React.FC<PaginationTabProps> = ({
  showDeleteButtonGroup = false,
  showStatusButtonGroup = false,
  totalSelections = 0,
}) => {
  return (
    <Pagination className="flex justify-between text-[15px] px-[4em] mt-[2em]">
      <PaginationContent>
        {["Prev", "1", "2", "3", "Next"].map((link) => (
          <PaginationItem key={link}>
            <PaginationLink className="w-fit bg-white text-black px-[1em] py-[0.5em] mx-[0.2em] cursor-pointer font-semibold hover:bg-[#00FFA1]">
              {link}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      {showDeleteButtonGroup && (
        <div className="flex gap-x-[1em]">
          <p className="font-medium px-[1em] py-[0.5em] bg-white text-black rounded-md min-w-[12ch] text-center">
            Selected: {totalSelections}
          </p>
          <Button variant="secondary" className="font-medium w-[12ch]">
            Cancel
          </Button>
          <Button variant="destructive" className="font-medium w-[12ch]">
            Delete
          </Button>
        </div>
      )}
      {showStatusButtonGroup && (
        <div className="flex gap-x-[1em]">
          <p className="font-medium px-[1em] py-[0.5em] bg-white text-black rounded-md min-w-[12ch] text-center">
            Selected: 3
          </p>
          <Button variant="secondary" className="font-medium w-[12ch]">
            Cancel
          </Button>
          <Button variant="destructive" className="font-medium w-[12ch]">
            Status
          </Button>
        </div>
      )}
    </Pagination>
  );
};

export default PaginationTab;
