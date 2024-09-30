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
    profile_image: string;
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
    profile_image: string;
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
  const [password, setPassword] = useState(""); 
  const [newImageUrl, setNewImageUrl] = useState(""); 

  const { roles } = useRoleContext();

  useEffect(() => {
    if (editingUser) {
      setUsername(editingUser.username);
      setFirstName(editingUser.firstName);
      setLastName(editingUser.lastName);
      setEmail(editingUser.email);
      setRole(editingUser.role);
      setImage(editingUser.profile_image);
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
      profile_image: newImageUrl || image,
      password,
    };

    try {
      let response;
      if (editingUser) {

        response = await axiosInstance.patch(
          `/auth/${editingUser.id}`,
          newUser
        );
      } else {

        response = await axiosInstance.post("/auth/register", newUser);
      }
      toast.success(response.data.message);

      if (response.status >= 200 && response.status < 300) {
        await addUser(newUser);
        setShowModal(false);
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
      getAllAdmins(1);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileType = file.type;
      const data = {
        fileType: fileType,
      };
    
      const res = await axiosInstance.post(`presigned-url/generate`, data);
      const uploadUrl = res.data.uploadUrl;
      const downloadUrl = res.data.downloadUrl;
  
      try {
        const response = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": fileType,
          },
          body: file,
        });
  
        if (response.ok) {
          console.log("File uploaded successfully", downloadUrl);
          setNewImageUrl(downloadUrl);
          setImage(downloadUrl);
        } else {
          console.error("Failed to upload file", response);
        }
      } catch (error) {
        console.error("Error during file upload", error);
      }
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
    setNewImageUrl("");
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded text-black">
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

        {image && (
          <div className="mb-4">
            <img src={image} alt="Profile Preview" className="w-20 h-20 mb-2 rounded-full" />
          </div>
        )}

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
