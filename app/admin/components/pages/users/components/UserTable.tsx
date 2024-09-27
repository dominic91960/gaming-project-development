import React from "react";

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
}

interface UserTableProps {
  users: User[];
  deleteUser: (username: string) => void;
  openEditModal: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  deleteUser,
  openEditModal,
}) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-200 px-4 py-2">Username</th>
          <th className="border border-gray-200 px-4 py-2">First Name</th>
          <th className="border border-gray-200 px-4 py-2">Last Name</th>
          <th className="border border-gray-200 px-4 py-2">Email</th>
          <th className="border border-gray-200 px-4 py-2">Role</th>
          <th className="border border-gray-200 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.username}>
            <td className="border border-gray-200 px-4 py-2">
              {user.username}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {user.firstName}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {user.lastName}
            </td>
            <td className="border border-gray-200 px-4 py-2">{user.email}</td>
            <td className="border border-gray-200 px-4 py-2">{user.role}</td>
            <td className="border border-gray-200 px-4 py-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => openEditModal(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteUser(user.username)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
