import React, { useEffect, useState } from "react";
import AddUserModal from "../users/components/AddUserModal";
import UserTable from "../users/components/UserTable";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";

const UsersPage = () => {
  const [users, setUsers] = useState([]); // Store all users
  const [allAdmins, setAllAdmins] = useState([]); // Store filtered admins
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced search term
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce searchTerm
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Update debounced search term after delay
    }, 500); // 500ms delay before executing search

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
  }, [searchTerm]);

  useEffect(() => {
    getAllAdmins(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm]);

  // Fetch all admins with pagination and optional search term
  const getAllAdmins = async (page: number, search: string = "") => {
    try {
      const response = await axiosInstance.get(
        `/user?page=${page}&search=${search}&roleName=ADMIN`
      );
      setAllAdmins(response.data.data);
      setTotalPages(response.data.totalPages); // Assuming the API returns total pages
    } catch (error: any) {
      toast.error(error.response.data.message);
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
      getAllAdmins(currentPage, debouncedSearchTerm);
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
          getAllAdmins={getAllAdmins}
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
