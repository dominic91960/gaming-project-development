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
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      {/* Title */}
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          Roles & Permissions
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">Users / Role</p>
      </div>

      {/* Mobile search bar and add menu */}
      <div className="flex items-center justify-center px-[36px] mb-[2em] gap-x-[1em] md:hidden">
        <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em]">
          <CiSearch className="text-[1.6em] text-white" />
          <input
            type="search"
            placeholder="Search"
            className="bg-transparent outline-none border-s px-[1em] w-[38ch] text-white"
          />
        </div>
        <button
          className="bg-[#00FFA1] font-bold text-black text-[0.95em] px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100 flex-shrink-0"
          onClick={() => setShowAddModal(true)}
        >
          Add Role
        </button>
      </div>

      <div className="flex-grow bg-black/40 border border-[#0D6D49] px-[2em] py-[1.2em] rounded-3xl md:rounded-md text-white">
        <div className="hidden pb-[1.2em] border-b border-b-[#0D6D49] md:flex md:justify-between md:items-center">
          {/* Title */}
          <h2 className="font-semibold text-white">Role & Permissions</h2>

          {/* Search bar and add menu */}
          <div className="flex items-center text-[0.5em] gap-x-[1em]">
            <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em]">
              <CiSearch className="text-[1.6em] text-white" />
              <input
                type="search"
                placeholder="Search"
                className="bg-transparent outline-none border-s px-[1em] w-[38ch] text-white"
              />
            </div>
            <button
              className="bg-[#00FFA1] font-bold text-black px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100"
              onClick={() => setShowAddModal(true)}
            >
              Add Role
            </button>
          </div>
        </div>

        {/* Roles list */}
        <ul className="my-[1.5em] text-[1.6em] sm:text-[1.2em] md:text-[1em]">
          {roles.map((role, index) => (
            <li
              key={index}
              className="flex justify-between border-b border-b-[#606060] pb-[0.2em] pt-[1em]"
            >
              <span className="font-medium text-white">{role.name}</span>
              <div className="flex items-center gap-x-[1.5em] lg:gap-x-[1em]">
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

      {/* Pagination */}
      <Pagination className="flex justify-start text-[1em] md:text-[0.8em] lg:text-[0.6em] px-[4em] mt-[2em]">
        <PaginationContent>
          {["Prev", "1", "2", "3", "Next"].map((link) => (
            <PaginationItem key={link}>
              <PaginationLink className="w-fit bg-white text-black px-[1em] py-[0.5em] mx-[0.2em] h-fit cursor-pointer font-semibold hover:bg-[#00FFA1] text-[1em]">
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
