import React, { useState } from "react";
// import AddUserModal from "./components/AddUserModal";
// import UserTable from "./components/UserTable";

import AddUserModal from "../users/components/AddUserModal";
import UserTable from "../users/components/UserTable";

const UsersPage = () => {
  const [users, setUsers] = useState([
    {
      username: "john_doe",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "Admin",
      image: "/path-to-image",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const addUser = async (newUser: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    image: string;
  }): Promise<void> => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.username === editingUser.username ? newUser : user
        )
      );
      setEditingUser(null);
    } else {
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  const deleteUser = (username: string) => {
    setUsers(users.filter((u) => u.username !== username));
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setEditingUser(null);
          setShowModal(true);
        }}
      >
        Add User
      </button>
      <UserTable
        users={users}
        deleteUser={deleteUser}
        openEditModal={openEditModal}
      />
      {showModal && (
        <AddUserModal
          addUser={addUser}
          setShowModal={setShowModal}
          editingUser={editingUser}
        />
      )}
    </div>
  );
};

export default UsersPage;
