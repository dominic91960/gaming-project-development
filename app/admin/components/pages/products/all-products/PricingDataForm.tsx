import React, { SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PricingDataFormProps {
  regularPrice: string;
  setRegularPrice: (value: SetStateAction<string>) => void;
  sellingPrice: string;
  setSellingPrice: (value: SetStateAction<string>) => void;
  sku: string;
  setSku: (value: SetStateAction<string>) => void;
  stock: string;
  setStock: (value: SetStateAction<string>) => void;
}

const PricingDataForm: React.FC<PricingDataFormProps> = ({
  regularPrice,
  setRegularPrice,
  sellingPrice,
  setSellingPrice,
  sku,
  setSku,
  stock,
  setStock,
}) => {
  return (
    <>
      {/* Regular pice and selling price */}
      <div className="grid grid-cols-2 gap-x-[7.4em] mb-[1.5em]">
        {/* Regular price */}
        <div>
          <label className="block mb-[0.5em]">Regular Price ($)</label>
          <input
            type="text"
            value={regularPrice}
            onChange={(e) => setRegularPrice(e.target.value)}
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>

        {/* Selling price */}
        <div>
          <label className="block mb-[0.5em]">Selling Price ($)</label>
          <input
            type="text"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>
      </div>

      {/* Sale quantity and SKU */}
      <div className="grid grid-cols-2 gap-x-[7.4em] mb-[1.5em]">
        {/* Sale quantity */}
        <div>
          <label className="block mb-[0.5em]">Sale Quantity</label>
          <input
            type="text"
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block mb-[0.5em]">SKU</label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>
      </div>

      {/* Stock status */}
      <div>
        <label className="block mb-[0.5em]">Stock status</label>
        <Select
          value={stock}
          onValueChange={(value: string) => setStock(value)}
          required
        >
          <SelectTrigger className="text-[15px] border-[#606060]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
            {["In Stock", "Out Of Stock", "On Backorder"].map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="h-fit ps-[3.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[15px]"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default PricingDataForm;
