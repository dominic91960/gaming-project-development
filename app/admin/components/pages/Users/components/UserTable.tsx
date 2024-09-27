import React, { useState } from "react";

import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { IoTrash } from "react-icons/io5";

import DeleteModal from "./DeleteModal";
import samplePic from "@/public/images/sample-pic.png";
import Image from "next/image";

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
  openEditModal: (user: User) => void;
  deleteUser: (username: string) => void;
  setTotalSelections: React.Dispatch<React.SetStateAction<number>>;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  deleteUser,
  openEditModal,
  setTotalSelections,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const isUserSelected = (username: string) => {
    const data = selectedUsers.find(
      (savedUsername) => savedUsername === username
    );
    return data ? true : false;
  };

  const handleRowClick = (username: string) => {
    if (isUserSelected(username)) return;
    setSelectedUsers((prev) => [...prev, username]);
    setTotalSelections(selectedUsers.length + 1);
  };

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
            className="text-base text-center *:py-[1.5em] *:px-[1ch] *:bg-white/5 mt-4 cursor-pointer hover:scale-[101%]"
            onClick={() => handleRowClick(user.username)}
          >
            <td className="relative">
              {isUserSelected(user.username) && (
                <div className="w-2 h-[5em] bg-[#00FFA1] absolute top-0 left-0 rounded-sm"></div>
              )}
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
                className="hover:opacity-80 transition-opacity duration-100"
                onClick={() => openEditModal(user)}
              >
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
                // onClick={() => deleteUser(user.username)}
                onClick={() => {
                  setUsername(user.username);
                  setShowDelete(true);
                }}
              >
                <IoTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {showDelete && (
        <DeleteModal
          title="user"
          handleCancel={() => setShowDelete(false)}
          handleConfirm={() => {
            deleteUser(username);
            setShowDelete(false);
          }}
        />
      )}
    </table>
  );
};

export default UserTable;
