import React from "react";

import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { IoTrash } from "react-icons/io5";

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
    <table className="min-w-full table-auto text-[18px] border-separate border-spacing-y-[0.8em]">
      <thead>
        <tr className="font-primaryFont *:font-medium *:pt-[2em] *:pb-[1.2em]">
          <th></th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.username}
            className="text-base text-center *:py-[1.5em] *:px-[1ch] *:bg-white/5 mt-4"
          >
            <td>
              <div className="size-[2em] bg-slate-50 rounded-full mx-auto"></div>
            </td>
            <td className="rounded-tl-sm rounded-bl-sm">{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td className="rounded-tr-sm rounded-br-sm text-[#A1A1AA] space-x-[0.5em]">
              <button>
                <IoEyeOutline className="hover:opacity-80 transition-opacity duration-100" />
              </button>
              <button
                className="hover:opacity-80 transition-opacity duration-100"
                onClick={() => openEditModal(user)}
              >
                <LuPencilLine />
              </button>
              <button
                className="hover:opacity-80 transition-opacity duration-100"
                onClick={() => deleteUser(user.username)}
              >
                <IoTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
