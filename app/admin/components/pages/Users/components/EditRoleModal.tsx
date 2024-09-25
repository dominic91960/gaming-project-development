import React, { useState } from "react";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Role</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
