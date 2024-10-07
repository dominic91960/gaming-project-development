// const platforms = () => {
//   return (
//     <div>
//       <h1>Hello! This is Platforms</h1>
//     </div>
//   );
// };

// export default platforms;

import { useState } from "react";
import { Platforms, columns } from "./platforms/columns";
import { DataTable } from "./platforms/data-table";
import { EditPlatformPopup } from "./platforms/EditPlatformPopup";

const getData = (): Platforms[] => {
  return [
    {
      id: "1",
      name: "platform 1",
      description: "Description for platform 1",
      imageUrl: "/images/sample-pic.png",
    },
    {
      id: "2",
      name: "platform 2",
      description: "Description for platform 2",
      imageUrl: "/images/sample-pic.png",
    },
  ];
};

export default function PlatformsPage() {
  const [data, setData] = useState<Platforms[]>(getData());
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editingPlatform, seteditingPlatform] = useState<Platforms | null>(
    null
  );

  const handleAddPlatforms = (newPlatforms: {
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    const newEntry: Platforms = {
      id: Math.random().toString(36).substring(2),
      ...newPlatforms,
    };
    setData((prevData) => [...prevData, newEntry]);
  };

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleEdit = (platform: Platforms) => {
    seteditingPlatform(platform);
    setEditPopupOpen(true);
  };

  const handleSaveEdit = (platformData: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === platformData.id ? { ...item, ...platformData } : item
      )
    );
  };

  return (
    <div className="min-h-full font-primaryFont text-[24px] p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      <div className="pb-[2em]">
        <h1 className="font-bold text-[36px] leading-none text-white">
          All Platforms
        </h1>
        <p className="text-[12px] text-white">Products / Platforms</p>
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
