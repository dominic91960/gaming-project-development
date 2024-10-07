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
    <table className="min-w-full border-separate border-spacing-y-[0.8em] text-[1.2em] sm:text-[0.65em]">
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
            className="text-center *:py-[1.5em] *:px-[1ch] *:bg-white/5 mt-4 cursor-pointer hover:shadow-[0px_0px_5px_#00FFA1] rounded-sm"
          >
            <td className="relative">
              <div className="w-[3em]">
                <div className="w-[0.3em] h-full bg-[#00FFA1] absolute top-0 left-0 rounded-full"></div>
                <Image
                  src={samplePic}
                  alt="Sample"
                  className="size-[2em] rounded-full mx-auto"
                />
              </div>
            </td>
            <td className="rounded-tl-sm rounded-bl-sm max-w-[15ch] overflow-hidden text-ellipsis">
              {user.username}
            </td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td className="max-w-[15ch] overflow-hidden text-ellipsis">
              {user.email}
            </td>
            <td>{user.role}</td>

            <td className="rounded-tr-sm rounded-br-sm text-[#A1A1AA] text-[1.5em] lg:text-[1em]">
              <div className="flex items-center justify-center gap-x-[1em] w-[6ch] lg:w-fit lg:gap-x-[0.5em]">
                <button
                  className="hover:opacity-80 transition-opacity duration-100"
                  onClick={() => openEditModal(user)}
                >
                  <LuPencilLine />
                </button>
                <button
                  className="hover:opacity-80 transition-opacity duration-100"
                  onClick={() => deleteUser(user.id)}
                >
                  <IoTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
