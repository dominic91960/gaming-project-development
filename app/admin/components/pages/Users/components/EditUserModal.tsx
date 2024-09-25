// components/EditUserModal.tsx

import React, { useState } from "react";
import { UserProvider } from "../../../../../../context/UserContext";
interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  imageUrl: string; // Add an imageUrl field for the user's image
}

interface EditUserModalProps {
  user: User;
  setShowModal: (show: boolean) => void;
  updateUser: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  setShowModal,
  updateUser,
}) => {
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(updatedUser);
    setShowModal(false);
  };

  return (
    <UserProvider>
      {" "}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-4">Edit User</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="Username"
              required
            />
            <input
              type="text"
              name="firstName"
              value={updatedUser.firstName}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={updatedUser.lastName}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="Email"
              required
            />
            <select
              name="role"
              value={updatedUser.role}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-2"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            <input
              type="text"
              name="imageUrl"
              value={updatedUser.imageUrl}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-4"
              placeholder="Image URL"
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
    </UserProvider>
  );
};

export default EditUserModal;
