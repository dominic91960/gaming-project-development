import React from "react";

import { MdDeleteForever } from "react-icons/md";

interface DeleteRoleProps {
  currentRole: string;
  handleCancel: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: (role: string) => void;
}

const DeleteRole: React.FC<DeleteRoleProps> = ({
  currentRole,
  handleCancel,
  handleConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center text-[11px] text-center">
      <div className="relative bg-gradient-to-br from-black from-15% to-[#0d6d4a65] p-[4em] rounded-md border border-t-[1em] border-[#0D6D49]">
        <div className="size-[6.5em] absolute top-0 left-0 right-0 mx-auto -translate-y-[60%] bg-[#0D6D49] flex items-center justify-center rounded-full">
          <MdDeleteForever className="text-[5em]" />
        </div>
        <h2 className="text-[20px] font-semibold">Delete Account</h2>
        <p className="text-[11px] mt-[2em] mb-[2.5em] w-[40ch]">
          Deleting account will remove all of your information from our
          database.this cannot be undone
        </p>
        <div className="flex gap-x-[3em] justify-center font-bold">
          <button
            onClick={() => handleCancel(false)}
            className="py-[1em] px-[1em] border border-[#00FFA1] rounded-sm flex-grow w-full"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleConfirm(currentRole);
              handleCancel(false);
            }}
            className="py-[1em] px-[1em] bg-[#AF1515] rounded-sm flex-grow w-full"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRole;
