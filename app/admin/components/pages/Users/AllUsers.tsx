import React, { useState } from "react";
import AddUserModal from "./components/AddUserModal";
import UserTable from "./components/UserTable";
import PageTitle from "../../PageTitle";
import PageTable from "../../PageTable";
import PaginationTab from "../../PaginationTab";

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
    {
      username: "test_user",
      firstName: "Test",
      lastName: "User",
      email: "test.user@example.com",
      role: "Admin",
      image: "/path-to-image",
    },
    {
      username: "test_two",
      firstName: "Test",
      lastName: "Two",
      email: "test.two@example.com",
      role: "Admin",
      image: "/path-to-image",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [totalSelections, setTotalSelections] = useState(0);

  const addUser = (newUser: any) => {
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
    <div className="min-h-full font-primaryFont text-[24px] p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md">
      <PageTitle title="All users" subtitle="Users/all users" />
      <PageTable
        title="All users"
        buttonText="Add user"
        buttonFunction={() => {
          setEditingUser(null);
          setShowModal(true);
        }}
      >
        <UserTable
          users={users}
          openEditModal={openEditModal}
          deleteUser={deleteUser}
          setTotalSelections={setTotalSelections}
        />
      </PageTable>
      <PaginationTab
        showDeleteButtonGroup
        showStatusButtonGroup={false}
        totalSelections={totalSelections}
      />
      {showModal && (
        <AddUserModal
          addUser={addUser}
          setShowModal={setShowModal}
          editingUser={editingUser}
        />
      )}
      {/* <button
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
      )} */}
    </div>
  );
};

export default UsersPage;
