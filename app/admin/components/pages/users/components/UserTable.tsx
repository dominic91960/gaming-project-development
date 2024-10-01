import React from "react";
import Image from "next/image";

import samplePic from "@/public/images/sample-pic.png";
import { LuPencilLine } from "react-icons/lu";
import { IoTrash } from "react-icons/io5";

interface User {
  id: string;
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
    <table className="min-w-full text-[18px] border-separate border-spacing-y-[0.8em]">
      <thead>
        <tr className="font-primaryFont *:font-medium *:pt-[2em] *:pb-[1.2em]">
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
            className="text-base text-center *:py-[1.5em] *:px-[1ch] *:bg-white/5 mt-4 cursor-pointer hover:scale-[101%]"
          >
            <td className="relative">
              <div className="w-2 h-[5em] bg-[#00FFA1] absolute top-0 left-0 rounded-sm"></div>
              <Image
                src={samplePic}
                alt="Sample"
                className="size-[2em] rounded-full mx-auto"
              />
            </td>
            <td className="rounded-tl-sm rounded-bl-sm">{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td className="rounded-tr-sm rounded-br-sm text-[#A1A1AA] space-x-[0.5em]">
              <button
                className="hover:opacity-80 transition-opacity duration-100 translate-y-[0.2em]"
                onClick={() => openEditModal(user)}
              >
                <LuPencilLine />
              </button>
              <button
                className="hover:opacity-80 transition-opacity duration-100 translate-y-[0.2em]"
                onClick={() => deleteUser(user.id)}
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
