import { useState, useEffect } from "react";
import { Platforms, columns } from "./platforms/columns";
import { DataTable } from "./platforms/data-table";
import { EditPlatformPopup } from "./platforms/EditPlatformPopup";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";

export default function PlatformsPage() {
  const [data, setData] = useState<Platforms[]>([]);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editingPlatform, seteditingPlatform] = useState<Platforms | null>(
    null
  );
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
    axiosInstance
      .get("/platforms")
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
    }
    console.log("BrandsPage reloaded");
    getData();
  }, [reload]);

  const handleAddPlatforms = async (newPlatforms: {
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    console.log(newPlatforms);
    try {
      const data = {
      name: newPlatforms.name,
      description: newPlatforms.description,
      image: newPlatforms.imageUrl,
      };
      const response = await axiosInstance.post("/platforms", data);
      if (response.status === 201) {
      toast.success("Platform added successfully");
      } else {
      throw new Error("Failed to add platform");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add platform");
    } finally {
      setReload((prev) => !prev);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Delete platform with id: ", id);
    try {
      const res = await axiosInstance.delete(`/platforms/${id}`);
      if (res.status === 200) {
        toast.success("Platform deleted successfully");
      } else if (res.status === 404) {
        throw new Error("Platform not found");
      }
    } catch (error) {
      toast.error("Error deleting platform");
      console.error(error);
    } finally {
      setReload((prev) => !prev);
    }
  };

  const handleEdit = (platform: Platforms) => {
    seteditingPlatform(platform);
    setEditPopupOpen(true);
  };

  const handleSaveEdit = async (platformData: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    const data = {
      name: platformData.name,
      description: platformData.description,
      image: platformData.imageUrl,
    };
    axiosInstance
      .patch(`/platforms/${platformData.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Platform updated successfully");
        } else {
          throw new Error("Failed to update platform");
        }
      })
      .catch((error) => {
        toast.error("Failed to update platform");
        console.error(error);
      })
      .finally(() => {
        setReload((prev) => !prev);
        setEditPopupOpen(false);
      });
  };

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-[2px] text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Platforms
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">
          Products / Platforms
        </p>
      </div>

      <DataTable
        columns={(onDelete) => columns(handleEdit, onDelete)}
        data={data}
        onDelete={handleDelete}
        onAddPlatforms={handleAddPlatforms}
      />

      <EditPlatformPopup
        isOpen={isEditPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        onSave={handleSaveEdit}
        platform={editingPlatform ?? undefined}
      />
    </div>
  );
}
