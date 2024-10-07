import { useState } from "react";
import { Brands, columns } from "./brands/columns";
import { DataTable } from "./brands/data-table";
import { EditBrandPopup } from "./brands/EditBrandPopup";

const getData = (): Brands[] => {
  return [
    {
      id: "1",
      name: "Brand 1",
      description: "Description for Brand 1",
      imageUrl: "/images/sample-pic.png",
    },
    {
      id: "2",
      name: "Brand 2",
      description: "Description for Brand 2",
      imageUrl: "/images/sample-pic.png",
    },
  ];
};

export default function BrandsPage() {
  const [data, setData] = useState<Brands[]>(getData());
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brands | null>(null);

  const handleAddBrands = (newBrands: {
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    const newEntry: Brands = {
      id: Math.random().toString(36).substring(2),
      ...newBrands,
    };
    setData((prevData) => [...prevData, newEntry]);
  };

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleEdit = (brand: Brands) => {
    setEditingBrand(brand);
    setEditPopupOpen(true);
  };

  const handleSaveEdit = (brandData: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === brandData.id ? { ...item, ...brandData } : item
      )
    );
  };

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-[2px] text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Brands
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">
          Products / Brands
        </p>
      </div>

      <DataTable
        columns={(onDelete) => columns(handleEdit, onDelete)}
        data={data}
        onDelete={handleDelete}
        onAddBrands={handleAddBrands}
      />

      <EditBrandPopup
        isOpen={isEditPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        onSave={handleSaveEdit}
        brand={editingBrand ?? undefined}
      />
    </div>
  );
}
