import React, { useEffect, useState } from "react";

import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner/Spinner";
import { CiSearch } from "react-icons/ci";

import AddUserModal from "../users/components/AddUserModal";
import UserTable from "../users/components/UserTable";

const UsersPage = () => {
  const [users, setUsers] = useState([]); // Store all users
  const [allAdmins, setAllAdmins] = useState([]); // Store filtered users
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced search term
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); // Role filter

  // Debounce searchTerm
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Update debounced search term after delay
    }, 500); // 500ms delay before executing search

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
  }, [searchTerm]);

  useEffect(() => {
    getUsers(currentPage, debouncedSearchTerm, selectedRole);
  }, [currentPage, debouncedSearchTerm, selectedRole]);

  // Fetch all users with pagination and optional search term and role filter
  const getUsers = async (
    page: number,
    search: string = "",
    role: string = ""
  ) => {
    setLoading(true);
    try {
      const roleFilter = role ? `&roleName=${role}` : ""; // Add role filter if selected
      const response = await axiosInstance.get(
        `/user?page=${page}&search=${search}${roleFilter}`
      );
      setAllAdmins(response.data.data);
      setTotalPages(response.data.totalPages); // Assuming the API returns total pages
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profile_image: string;
  }): Promise<void> => {
    setShowModal(false);
  };

  const deleteUser = async (id: string) => {
    try {
      let response = await axiosInstance.delete(`/auth/${id}`);
      toast.success(response.data.message);
      getUsers(currentPage, debouncedSearchTerm, selectedRole);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle role change
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  // Render pagination buttons dynamically
  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <div
          key={i}
          className={`cursor-pointer font-medium px-[1em] py-[0.5em] rounded-sm ${
            i === currentPage ? "bg-[#00FFA1]" : "bg-white"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </div>
      );
    }
    return buttons;
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      {/* Title */}
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Users
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">
          Users / All Users
        </p>
      </div>

      {/* Mobile search bar and add menu */}
      <div className="px-[36px] mb-[2em] gap-x-[1em] md:hidden">
        {/* Search bar */}
        <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em] mb-[1.2em]">
          <CiSearch className="text-[1.6em] text-white" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by username or email"
            className="w-full bg-transparent outline-none border-s px-[1em] text-white"
          />
        </div>

        {/* Select and add button */}
        <div className="flex items-center gap-x-[0.75em]">
          {/* Select */}
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="w-full px-[1.6em] py-[0.8em] bg-transparent border rounded-sm"
          >
            <option value="" className="bg-white text-black">
              All Roles
            </option>
            <option value="ADMIN" className="bg-white text-black">
              Admin
            </option>
            <option value="USER" className="bg-white text-black">
              User
            </option>
            <option value="SUPER_ADMIN" className="bg-white text-black">
              Super Admin
            </option>
          </select>

          {/* Add button */}
          <button
            className="bg-[#00FFA1] font-bold text-black text-[0.95em] px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100 flex-shrink-0"
            onClick={() => {
              setEditingUser(null);
              setShowModal(true);
            }}
          >
            Add User
          </button>
        </div>
      </div>

      <div className="flex-grow bg-black/40 border border-[#0D6D49] px-[2em] py-[1.2em] rounded-3xl md:rounded-md text-white">
        {/* Desktop search bar and add menu */}
        <div className="hidden pb-[1.2em] border-b border-b-[#0D6D49] text-[0.5em] md:flex md:justify-between md:items-center">
          {/* Search bar */}
          <div className="border p-[0.75em] rounded-sm flex items-center gap-x-[0.75em] mb-[1em]">
            <CiSearch className="text-[1.6em] text-white" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by username or email"
              className="bg-transparent outline-none border-s px-[1em] w-[50ch] text-white"
            />
          </div>

          {/* Select and add button */}
          <div className="flex items-center gap-x-[0.75em]">
            {/* Select */}
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="flex-grow px-[1.6em] py-[0.9em] bg-transparent border rounded-sm"
            >
              <option value="" className="bg-white text-black">
                All Roles
              </option>
              <option value="ADMIN" className="bg-white text-black">
                Admin
              </option>
              <option value="USER" className="bg-white text-black">
                User
              </option>
              <option value="SUPER_ADMIN" className="bg-white text-black">
                Super Admin
              </option>
            </select>

            {/* Add button */}
            <button
              className="bg-[#00FFA1] font-bold text-black px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100"
              onClick={() => {
                setEditingUser(null);
                setShowModal(true);
              }}
            >
              Add user
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <UserTable
            users={allAdmins}
            deleteUser={deleteUser}
            openEditModal={openEditModal}
          />
        </div>
      </div>

      {showModal && (
        <AddUserModal
          addUser={addUser}
          setShowModal={setShowModal}
          editingUser={editingUser}
          getAllAdmins={getUsers}
        />
      )}

      {/* Pagination */}
      <div className="px-[4em] mt-[2em] flex items-center justify-between md:text-[0.65em]">
        <div className="flex text-black gap-x-[1em]">{renderPagination()}</div>

        {/* Group select */}
        {/* <div className="flex gap-x-[1em]">
          <p className="font-medium px-[1em] py-[0.5em] bg-white text-black rounded-sm min-w-[12ch] flex items-center justify-center h-fit">
            Selected: 0
          </p>
          <Button
            variant="secondary"
            className="font-medium w-[12ch] text-[1em] px-[1em] py-[0.5em] h-fit rounded-sm"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="font-medium w-[12ch] text-[1em] px-[1em] py-[0.5em] h-fit rounded-sm"
          >
            Delete
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default UsersPage;
