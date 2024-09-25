import React, { useState } from "react";
import { useRoleContext } from "../../../../../../context/RoleContext";

interface AddRoleModalProps {
  setShowModal: (show: boolean) => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ setShowModal }) => {
  const [role, setRole] = useState("");
  const { addRole } = useRoleContext(); // Use the global addRole function

  const handleSubmit = () => {
    addRole(role);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl mb-4">Add Role</h2>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter role name"
        />
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
