import { useState } from "react";
import { AllProductsNew } from "../all-products/columns";
import GeneralDataForm from "./GeneralDataForm";
import PricingDataForm from "./PricingDataForm";
import SystemRequirements from "./System-Requirement";

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
    <form onSubmit={handleSubmit} className="text-[15px] text-white px-[36px]">
      {/* General data form*/}
      <h2 className="font-bold text-[1.3em] mb-[1.15em]">General Data</h2>
      <div className="bg-black/40 px-[2.2em] py-[3.3em] mb-[3.2em] border border-[#0D6D49] rounded-sm">
        <GeneralDataForm
          name={name}
          setName={setName}
          date={date}
          setDate={setDate}
        />
      </div>

      {/* Pricing data form*/}
      <h2 className="font-bold text-[1.3em] mb-[1.15em]">Pricing Data</h2>
      <div className="bg-black/40 px-[2.2em] py-[3.3em] border border-[#0D6D49] rounded-sm">
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
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#00FFA1] font-semibold text-black text-[calc(1em+1px)] uppercase px-[2.4em] py-[0.5em] rounded-sm hover:opacity-90 transition-opacity duration-100"
        >
          Add product
        </button>
      </div>
    </form>
  );
}
