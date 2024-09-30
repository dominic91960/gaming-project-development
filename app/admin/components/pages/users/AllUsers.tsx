import React, { useEffect, useState } from "react";
import AddUserModal from "../users/components/AddUserModal";
import UserTable from "../users/components/UserTable";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner/Spinner";

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
  const getUsers = async (page: number, search: string = "", role: string = "") => {
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
    image: string;
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
          className={`cursor-pointer p-2 rounded-full ${
            i === currentPage ? "bg-blue-700" : "bg-blue-500"
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
        >
          Add User
        </button>
        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by username or email"
          className="border p-2 mb-4 w-3/4"
        />
        {/* Role Selector */}
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="border p-2 mb-4 text-black"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>
      </div>

      <UserTable
        users={allAdmins}
        deleteUser={deleteUser}
        openEditModal={openEditModal}
      />
      {showModal && (
        <AddUserModal
          addUser={addUser}
          setShowModal={setShowModal}
          editingUser={editingUser}
          getUsers={getUsers}
        />
      )}

      {/* Pagination */}
      <div className="flex w-full justify-center mt-4">
        <div className="flex text-white text-center space-x-4">
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

