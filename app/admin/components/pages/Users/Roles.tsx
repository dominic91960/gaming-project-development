// import React, { useEffect, useState } from "react";
import React, { useState } from "react";

import { LuPencilLine } from "react-icons/lu";
import { IoTrash } from "react-icons/io5";
// import axios from "axios";

import { useRoleContext } from "../../../../../context/RoleContext";
import AddRoleModal from "./components/AddRoleModal";
import EditRoleModal from "./components/EditRoleModal";
// import DeleteRole from "./components/DeleteRole";
import DeleteModal from "./components/DeleteModal";
import PageTitle from "../../PageTitle";
import PageTable from "../../PageTable";
import PaginationTab from "../../PaginationTab";

interface Role {
  id: string;
  name: string;
}

const RolesPage = () => {
  // const { roles, addRole, deleteRole } = useRoleContext();
  const { roles, deleteRole } = useRoleContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>();

  const handleEditClick = (role: Role) => {
    console.log(role, "role");
    setCurrentRole(role);
    setShowEditModal(true);
  };

  const handleDeleteClick = (role: Role) => {
    setCurrentRole(role);
    setShowDelete(true);
  };

  // const updateRole = (newRole: string) => {
  //   deleteRole(currentRole);
  //   addRole(newRole);
  // };

  const deleteRoleById = async () => {
    deleteRole(currentRole!.id);
    setShowDelete(false);
  };

  return (
    <div className="min-h-full font-primaryFont text-[24px] p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md">
      <PageTitle title="Roles & permissions" subtitle="Users/role" />
      <PageTable
        title="Roles & permissions"
        buttonText="Add role"
        buttonFunction={() => setShowAddModal(true)}
      >
        <ul className="my-[1.5em]">
          {roles.map((role, index) => (
            <li
              key={index}
              className="flex justify-between border-b border-b-[#606060] pb-[0.2em] pt-[1em]"
            >
              <span>{role.name}</span>
              <div className="flex items-center gap-x-[1em] text-[#A1A1AA]">
                <button
                  onClick={() => handleEditClick(role)}
                  className="hover:opacity-80 transition-opacity duration-100"
                >
                  <LuPencilLine />
                </button>
                <button
                  onClick={() => handleDeleteClick(role)}
                  className="hover:opacity-80 transition-opacity duration-100"
                >
                  <IoTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </PageTable>
      <PaginationTab
        showDeleteButtonGroup={false}
        showStatusButtonGroup={false}
        totalSelections={0}
      />

      {showAddModal && <AddRoleModal setShowModal={setShowAddModal} />}
      {showEditModal && (
        <EditRoleModal
          currentRole={currentRole}
          setShowModal={setShowEditModal}
        />
      )}
      {/* {showDelete && (
        <DeleteRole currentRole={currentRole} handleCancel={setShowDelete} />
      )} */}
      {showDelete && (
        <DeleteModal
          title="role"
          handleCancel={() => setShowDelete(false)}
          handleConfirm={() => deleteRoleById()}
        />
      )}
    </div>
  );
};

export default RolesPage;
