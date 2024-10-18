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
  saleQuantity: number;
  setSaleQuantity: (value: SetStateAction<number>) => void;
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
  saleQuantity,
  setSaleQuantity,
}) => {
  return (
    <>
      {/* Regular pice and selling price */}
      <div className="grid grid-cols-2 gap-x-[2em] mb-[1.5em]">
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
      <div className="grid grid-cols-2 gap-x-[2em] mb-[1.5em]">
        {/* Sale quantity */}
        <div>
          <label className="block mb-[0.5em]">Sale Quantity</label>
          <input
            type="number"
            value={saleQuantity}
            onChange={(e) => setSaleQuantity(Number(e.target.value))}
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
          <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-md">
            {["In Stock", "Out Of Stock", "On Backorder"].map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
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
