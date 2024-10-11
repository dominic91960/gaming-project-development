import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AllProductsNew } from "../all-products/columns";
import GeneralDataForm from "./GeneralDataForm";
import PricingDataForm from "./PricingDataForm";
import SystemRequirements from "./System-Requirement";
import BrandCategories from "../add-product/side-components/BrandCategories";
import TagsCategories from "../add-product/side-components/TagsCategories";
import PlatformCategories from "../add-product/side-components/PlatformCategories";

interface AddProductsProps {
  onAddProduct: (newProduct: AllProductsNew) => void;
}

export default function AddProducts({ onAddProduct }: AddProductsProps) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [status, setStatus] = useState("Public");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: AllProductsNew = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl,
      name,
      sku,
      stock,
      selling_price: sellingPrice,
      regular_price: regularPrice,
      status,
      date,
    };

    onAddProduct(newProduct);

    setName("");
    setSku("");
    setStock("");
    setSellingPrice("");
    setRegularPrice("");
    setStatus("Public");
    setDate("");
    setImageUrl("");
  };

  const [selectedTab, setSelectedTab] = useState("windows");
  const [selectedIcon, setSelectedIcon] = useState("minimum");

  return (
    <form
      onSubmit={handleSubmit}
      className="text-[15px] text-white px-[36px] grid grid-cols-12 gap-[3em]"
    >
      {/* Main form area */}
      <div className="col-span-9">
        {/* General data form*/}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">General Data</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
          <GeneralDataForm
            name={name}
            setName={setName}
            date={date}
            setDate={setDate}
          />
        </div>

        {/* Pricing data form*/}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">Pricing Data</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
          <PricingDataForm
            regularPrice={regularPrice}
            setRegularPrice={setRegularPrice}
            sellingPrice={sellingPrice}
            setSellingPrice={setSellingPrice}
            sku={sku}
            setSku={setSku}
            stock={stock}
            setStock={setStock}
          />
        </div>

        <div className="mt-[2em] mb-[1.5em]">
          <label className="block mb-[0.5em]">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>

        <SystemRequirements />
      </div>

      {/* Dropdown area */}
      <div className="col-span-3 pt-[3.4em]">
        {/* Publish status */}
        <div className="bg-black/40 mb-[2.8em] px-[2em] py-[1em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
          <label className="block mb-1">Status</label>
          <hr className="border-t-[#606060] mb-[0.6em]" />
          <Select
            value={status}
            onValueChange={(value: string) => setStatus(value)}
            required
          >
            <SelectTrigger className="text-[15px] border-[#606060]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
              {["Public", "Private", "Archived"].map((option) => (
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

        <div>
          <div className="mb-10">
            <BrandCategories />
          </div>

          <div className="mb-10">
            <TagsCategories />
          </div>

          <div className="mb-10">
            <PlatformCategories />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-[#00FFA1] font-semibold text-black text-[calc(1em+1px)] uppercase px-[2.4em] py-[0.5em] rounded-sm hover:opacity-90 transition-opacity duration-100"
        >
          Add product
        </button>
      </div>
    </form>
  );
}
