import React, { useState } from "react";
import AddRoleModal from "./components/AddRoleModal";
import EditRoleModal from "./components/EditRoleModal"; // Import the EditRoleModal
import { useRoleContext } from "../../../../../context/RoleContext";

const RolesPage = () => {
  const { roles, addRole, deleteRole } = useRoleContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRole, setCurrentRole] = useState<string>("");

  const handleEditClick = (role: string) => {
    setCurrentRole(role);
    setShowEditModal(true);
  };

  const updateRole = (newRole: string) => {
    deleteRole(currentRole); // Remove the current role
    addRole(newRole); // Add the updated role
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Roles</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAddModal(true)}
      >
        Add Role
      </button>
      <ul>
        {roles.map((role, index) => (
          <li key={index} className="mb-2 flex justify-between">
            <span>{role}</span>
            <div>
              <button
                className="text-blue-500 mr-2"
                onClick={() => handleEditClick(role)} // Call the edit function
              >
                Edit
              </button>
              <button className="text-red-500" onClick={() => deleteRole(role)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showAddModal && <AddRoleModal setShowModal={setShowAddModal} />}
      {showEditModal && (
        <EditRoleModal
          currentRole={currentRole}
          setShowModal={setShowEditModal}
          updateRole={updateRole} // Pass the updateRole function
        />
      )}
    </div>
  );
};

export default RolesPage;
