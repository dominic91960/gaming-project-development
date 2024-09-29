import React, { useState, useEffect } from "react";
import { useRoleContext } from "../../../../../../context/RoleContext";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";

interface AddUserModalProps {
  addUser: (newUser: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    image: string;
    password: string;
  }) => Promise<void>;
  setShowModal: (show: boolean) => void;
  editingUser: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    image: string;
    password?: string;
  } | null;
  getAllAdmins: (page: number) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  addUser,
  setShowModal,
  editingUser,
  getAllAdmins,
}) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState(""); // Add password state
  const [imageFile, setImageFile] = useState<File | null>(null); // Store file data

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

  const handleSubmit = async () => {
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      role,
      image,
      password,
    };

    try {
      let response;
      if (editingUser) {
        // Update user
        response = await axiosInstance.patch(
          `/auth/${editingUser.id}`,
          newUser
        );
      } else {
        // Create new user
        response = await axiosInstance.post("/auth/register", newUser);
      }
      toast.success(response.data.message);

      if (response.status >= 200 && response.status < 300) {
        await addUser(newUser); // Add the new or updated user
        setShowModal(false); // Close modal after success
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
      getAllAdmins(1);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      setImageFile(file); // Set the file to imageFile for potential future upload
    }
  };

  const clearFields = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
    setImage("");
    setPassword("");
    setImageFile(null); // Clear file state
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl mb-4">
          {editingUser ? "Edit User" : "Add User"}
        </h2>
        {editingUser ? (
          <div className="border p-2 mb-4 w-full">{username}</div>
        ) : (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-4 w-full"
            placeholder="Enter username"
            required
          />
        )}

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter first name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter last name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter email"
          required
        />
        {!editingUser && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 w-full"
            placeholder="Enter password"
            required={!editingUser}
          />
        )}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2 mb-4 w-full"
          accept="image/*"
        />
        {image && <img src={image} alt="Preview" className="w-20 h-20 mb-4" />}
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
