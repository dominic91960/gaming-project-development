import React, { useEffect, useState } from "react";

import { LuPencilLine } from "react-icons/lu";
import { IoTrash } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

// import AddRoleModal from "./components/AddRoleModal";
import AddRoleModal from "../users/components/AddRoleModal";
// import EditRoleModal from "./components/EditRoleModal";
import EditRoleModal from "../users/components/EditRoleModal";
import { useRoleContext } from "../../../../../context/RoleContext";
// import DeleteRole from "./components/DeleteRole";
import DeleteRole from "../users/components/DeleteRole";
import axios from "axios";
import Spinner from "@/components/Spinner/Spinner";

interface Role {
  id: string;
  name: string;
}

const RolesPage = () => {
  const { roles, addRole, deleteRole, loading } = useRoleContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>();

  const handleEditClick = (role: Role) => {
    setCurrentRole(role);
    setShowEditModal(true);
  };

  const handleDeleteClick = (role: Role) => {
    setCurrentRole(role);
    setShowDelete(true);
  };  

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="min-h-full font-primaryFont text-[24px] p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md">
      <div className="pb-[2em]">
        <h1 className="font-bold text-[36px] leading-none text-white">
          Roles & Permissions
        </h1>
        <p className="text-[12px] text-white">Users / Role</p>
      </div>
      <div className="flex-grow bg-black/40 border border-[#0D6D49] px-[2em] py-[1.2em] rounded-md">
        <div className="flex justify-between items-center pb-[1.2em] border-b border-b-[#0D6D49]">
          <h2 className="font-semibold text-[24px] text-white">
            Role & Permissions
          </h2>
          <div className="flex items-center text-[12px] gap-x-[1em]">
            <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em]">
              <CiSearch className="text-[1.6em] text-white" />
              <input
                type="search"
                placeholder="Search"
                className="bg-transparent outline-none border-s px-[1em] w-[38ch] text-white"
              />
            </div>
            <button
              className="bg-[#00FFA1] font-bold text-black text-[11px] px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100"
              onClick={() => setShowAddModal(true)}
            >
              Add Role
            </button>
          </div>
        </div>
        <ul className="my-[1.5em]">
          {roles.map((role, index) => (
            <li
              key={index}
              className="flex justify-between border-b border-b-[#606060] pb-[0.2em] pt-[1em]"
            >
              <span className="font-medium text-white text-[24px]">
                {role.name}
              </span>
              <div className="flex items-center gap-x-[1em]">
                <button
                  onClick={() => handleEditClick(role)}
                  className="hover:opacity-80 transition-opacity duration-100"
                >
                  <LuPencilLine className="text-[#96969f]" />
                </button>
                {/* <button onClick={() => deleteRole(role)}> */}
                <button
                  onClick={() => handleDeleteClick(role)}
                  className="hover:opacity-80 transition-opacity duration-100"
                >
                  <IoTrash className="text-[#96969f]" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Pagination className="flex justify-start text-[15px] px-[4em] mt-[2em]">
        <PaginationContent>
          {["Prev", "1", "2", "3", "Next"].map((link) => (
            <PaginationItem key={link}>
              <PaginationLink className="w-fit bg-white text-black px-[1em] py-[0.5em] mx-[0.2em] cursor-pointer font-semibold hover:bg-[#00FFA1]">
                {link}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>

      {showAddModal && <AddRoleModal setShowModal={setShowAddModal} />}
      {showEditModal && (
        <EditRoleModal
          currentRole={currentRole}
          setShowModal={setShowEditModal}
        />
      )}
      {showDelete && (
        <DeleteRole currentRole={currentRole} handleCancel={setShowDelete} />
      )}
    </div>
  );
};

export default RolesPage;
