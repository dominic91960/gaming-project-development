import { useEffect, useState } from "react";
import { Brands, columns } from "./brands/columns";
import { DataTable } from "./brands/data-table";
import { EditBrandPopup } from "./brands/EditBrandPopup";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";
import { uploadImage } from "@/components/helper/uploadImage";
import { uploadImageToObjectStore } from "@/components/helper/uploadImageToObjectStore";

export default function BrandsPage() {
  const [data, setData] = useState<Brands[]>([]);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brands | null>(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      axiosInstance
        .get("/brands")
        .then((response) => {
          setData(
            response.data.map((brand: any) => ({
              id: brand.id,
              name: brand.name,
              description: brand.description,
              imageUrl: brand.image || "/images/sample-pic.png",
            }))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getData();
  }, [reload]);

  const handleAddBrands = async (newBrands: {
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    try {
      const data = {
        name: newBrands.name,
        description: newBrands.description,
        image: newBrands.imageUrl,
      };
      const response = await axiosInstance.post("/brands", data);
      if (response.status === 201) {
        toast.success("Brand added successfully");
        // setReload(prev => !prev);
      } else {
        throw new Error("Failed to add brand");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add brand");
    } finally {
      setReload((prev) => !prev);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/brands/${id}`);
      if (res.status === 200) {
        toast.success("Brand deleted successfully");
      } else if (res.status === 404) {
        throw new Error("Brand not found");
      }
      // toast.success("Brand deleted successfully");
    } catch (error) {
      toast.error("Error deleting brand");
      console.error(error);
    } finally {
      setReload((prev) => !prev);
    }
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
    const data = {
      name: brandData.name,
      description: brandData.description,
      image: brandData.imageUrl,
    };
    axiosInstance
      .patch(`/brands/${brandData.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Brand updated successfully");
        } else {
          throw new Error("Failed to update brand");
        }
      })
      .catch((error) => {
        toast.error("Failed to update brand");
        console.error(error);
      })
      .finally(() => {
        setReload((prev) => !prev);
        setEditPopupOpen(false);
      });
  };

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
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
