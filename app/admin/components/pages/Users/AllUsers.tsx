// const AllUsers = () => {
//   return (
//     <div>
//       <h1>Hello! This is All Users page dd ds</h1>
//     </div>
//   );
// };

// export default AllUsers;

import React, { useState } from "react";
import AddUserModal from "./components/AddUserModal";

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

  const addUser = (newUser: any) => {
    setUsers([...users, newUser]);
  };

  const deleteUser = (username: string) => {
    setUsers(users.filter((u) => u.username !== username));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-t">
              <td>
                <img src={user.image} alt={user.username} className="w-8 h-8" />
              </td>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="text-blue-500 mr-2">Edit</button>
                <button
                  className="text-red-500"
                  onClick={() => deleteUser(user.username)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddUserModal addUser={addUser} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default UsersPage;
