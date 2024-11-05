import { useCategoryContext } from "@/context/CategoryContext";
import React from "react";
import { MdDeleteForever } from "react-icons/md";

interface Category {
  id: string;
  name: string;
}

interface DeleteCategoryProps {
  currentId: string;
  handleCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({
  currentId,
  handleCancel,
}) => {
   const { deleteCategoriesById } = useCategoryContext();

  const deleteCategory= async () => {
    await deleteCategoriesById(currentId);
    handleCancel(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center text-[9px] md:text-[10px] 2xl:text-[11px] text-center">
      <div className="relative bg-gradient-to-br from-black from-15% to-[#0d6d4a65] p-[4em] rounded-md border border-t-[1em] border-[#0D6D49]">
        <div className="size-[6.5em] absolute top-0 left-0 right-0 mx-auto -translate-y-[60%] bg-[#0D6D49] flex items-center justify-center rounded-full">
          <MdDeleteForever className="text-[5em] text-white" />
        </div>
        <h2 className="text-[1.8em] font-semibold text-white">
          {/* Delete {currentCategory?.name} category */}
        </h2>
        <p className="mt-[2em] mb-[2.5em] w-[40ch] text-white">
          Deleting this category will remove it from the system permanently.
          This cannot be undone.
        </p>
        <div className="flex gap-x-[3em] justify-center font-bold">
          <button
            onClick={() => handleCancel(false)}
            className="py-[1em] px-[1em] border border-[#00FFA1] rounded-sm flex-grow w-full hover:opacity-90 transition-opacity duration-100 font-bold text-white"
          >
            Cancel
          </button>
          <button
            onClick={deleteCategory}
            className="py-[1em] px-[1em] bg-[#AF1515] rounded-sm flex-grow w-full hover:opacity-90 transition-opacity duration-100 font-bold text-white"
          >
            Delete Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
