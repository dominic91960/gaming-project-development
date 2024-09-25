// components/UserTable.tsx
import React from "react";

interface User {
  id: number;
  image: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onDelete: (userId: number) => void;
  onEdit: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">First Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="border border-gray-300 p-2">{user.username}</td>
              <td className="border border-gray-300 p-2">{user.firstName}</td>
              <td className="border border-gray-300 p-2">{user.lastName}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-blue-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="bg-red-500 text-white p-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
