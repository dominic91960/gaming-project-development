import React, { useState } from "react";
import AddRoleModal from "./components/AddRoleModal";
import { useRoleContext } from "../../../../../context/RoleContext";

const RolesPage = () => {
  const { roles, addRole } = useRoleContext(); // Use global context for roles
  const [showModal, setShowModal] = useState(false);

  const deleteRole = (role: string) => {
    // To implement deleting a role from the global state if needed
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Roles</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        Add Role
      </button>
      <ul>
        {roles.map((role, index) => (
          <li key={index} className="mb-2 flex justify-between">
            <span>{role}</span>
            <div>
              <button className="text-blue-500 mr-2">Edit</button>
              <button className="text-red-500" onClick={() => deleteRole(role)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && <AddRoleModal setShowModal={setShowModal} />}
    </div>
  );
};

export default RolesPage;
