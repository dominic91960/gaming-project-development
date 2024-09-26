import React, { useState } from "react";

import { IoClose } from "react-icons/io5";

interface EditRoleModalProps {
  currentRole: string;
  setShowModal: (show: boolean) => void;
  updateRole: (newRole: string) => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  currentRole,
  setShowModal,
  updateRole,
}) => {
  const [newRole, setNewRole] = useState(currentRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRole.trim() !== "") {
      updateRole(newRole);
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center font-medium text-[13px]">
      <div className="relative bg-gradient-to-tr from-black from-15% to-[#0D6D49] p-[3em] rounded-md border border-[#19D38E]">
        <button
          className="absolute top-[1em] right-[1em] text-[#00FFA1] text-[18px] hover:opacity-80 transition-opacity duration-100"
          onClick={() => setShowModal(false)}
        >
          <IoClose />
        </button>
        <h2 className="font-bold text-[20px] pb-[0.6em] border-b border-b-[#0D6D49]">
          Edit Role
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="my-[2.5em]">
            <p className="mb-[0.5em]">Name</p>
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border border-[#D9D9D9] rounded w-full bg-transparent px-[1em] py-[0.5em] outline-none"
              required
            />
          </div>
          <div className="flex gap-x-[15%] justify-between">
            <p className="text-[10px]">
              Please review and ensure that all the details you have entered are
              correct before submitting.
            </p>
            <button className="text-black font-semibold text-[14px] px-[1.5em] py-[0.5em] bg-[#0BDB45] rounded hover:opacity-90 transition-opacity duration-100">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
