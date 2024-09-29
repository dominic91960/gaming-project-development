import React, { useState } from "react";

import { IoClose } from "react-icons/io5";

import { useRoleContext } from "../../../../../../context/RoleContext";

interface AddRoleModalProps {
  setShowModal: (show: boolean) => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ setShowModal }) => {
  const [role, setRole] = useState("");
  const { addRole } = useRoleContext();

  const handleSubmit = () => {
    addRole(role);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center font-medium text-[13px]">
      <div
        className="relative bg-gradient-to-tr from-black from-15% to-[#0D6D49] p-[3em] rounded-md border border-[#19D38E]"
        // style={{
        //   borderImage: `linear-gradient(to top right, #19D38E 0%, #0D6D49 100%) 1`,
        // }}
      >
        <button
          className="absolute top-[1em] right-[1em] text-[#00FFA1] text-[18px] hover:opacity-80 transition-opacity duration-100"
          onClick={() => setShowModal(false)}
        >
          <IoClose />
        </button>
        <h2 className="font-bold text-[20px] pb-[0.6em] border-b border-b-[#0D6D49]">
          Add Role
        </h2>
        <div className="my-[2.5em]">
          <p className="mb-[0.5em]">Name</p>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border text-white border-[#D9D9D9] rounded w-full bg-transparent px-[1em] py-[0.5em] outline-none"
          />
        </div>
        <div className="flex gap-x-[15%] justify-between">
          <p className="text-[10px]">
            Please review and ensure that all the details you have entered are
            correct before submitting.
          </p>
          <button
            className="text-black font-semibold text-[14px] px-[1.5em] py-[0.5em] bg-[#0BDB45] rounded hover:opacity-90 transition-opacity duration-100"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;
