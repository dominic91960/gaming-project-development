import React from "react";
import { MdDeleteForever } from "react-icons/md";

interface DeleteModalProps {
  title: string;
  handleCancel: () => void;
  handleConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  handleCancel,
  handleConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center text-[11px] text-center">
      <div className="relative bg-gradient-to-br from-black/40 from-50% to-[#00a76966] backdrop-blur-sm p-[4em] rounded-md border border-t-[1em] border-[#0D6D49]">
        <div className="size-[6.5em] absolute top-0 left-0 right-0 mx-auto -translate-y-[60%] bg-[#0D6D49] flex items-center justify-center rounded-full">
          <MdDeleteForever className="text-[5em]" />
        </div>
        <h2 className="text-[20px] font-semibold capitalize">
          Delete {title}?
        </h2>
        <p className="text-[11px] mt-[2em] mb-[2.5em] w-[40ch]">
          Deleting this {title} will remove it from the system permanently. This
          cannot be undone.
        </p>
        <div className="flex gap-x-[3em] justify-center font-bold">
          <button
            className="py-[1em] px-[1em] border border-[#00FFA1] rounded-sm flex-grow w-full hover:opacity-90 transition-opacity duration-100"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="py-[1em] px-[1em] bg-[#AF1515] rounded-sm flex-grow w-full hover:opacity-90 transition-opacity duration-100 capitalize"
            onClick={handleConfirm}
          >
            Delete {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
