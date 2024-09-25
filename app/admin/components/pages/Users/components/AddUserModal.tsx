import React, { useState, useEffect } from "react";
import { useRoleContext } from "../../../../../../context/RoleContext";

interface AddUserModalProps {
  addUser: (newUser: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    image: string;
  }) => void;
  setShowModal: (show: boolean) => void;
  editingUser: any;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  addUser,
  setShowModal,
  editingUser,
}) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");

  const { roles } = useRoleContext();

  useEffect(() => {
    if (editingUser) {
      setUsername(editingUser.username);
      setFirstName(editingUser.firstName);
      setLastName(editingUser.lastName);
      setEmail(editingUser.email);
      setRole(editingUser.role);
      setImage(editingUser.image);
    } else {
      clearFields();
    }
  }, [editingUser]);

  const handleSubmit = () => {
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      role,
      image,
    };
    addUser(newUser);
    setShowModal(false);
  };

  const clearFields = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
    setImage("");
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl mb-4">
          {editingUser ? "Edit User" : "Add User"}
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter username"
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter first name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter last name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter email"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="">Select Role</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files![0]))} // Handle image upload
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {editingUser ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
