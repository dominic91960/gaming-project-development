import React, { useState, useEffect } from "react";
import Image from "next/image";

import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

import { useRoleContext } from "../../../../../../context/RoleContext";
import samplePic from "@/public/images/sample-pic.png";

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
    <div className="fixed h-screen inset-0 bg-black/80 flex justify-center items-center font-medium text-[13px]">
      <div className="relative bg-gradient-to-tr from-black/40 from-15% to-[#00a76966] backdrop-blur-sm p-[3em] rounded-md border border-[#19D38E]">
        <div className="font-bold text-[20px] pb-[0.6em] border-b border-b-[#0D6D49] flex justify-between">
          <h2>{editingUser ? "Edit User" : "Add User"}</h2>
          <button
            className="text-[#00FFA1] text-[18px] hover:opacity-80 transition-opacity duration-100"
            onClick={() => setShowModal(false)}
          >
            <IoClose />
          </button>
        </div>
        <div className="flex gap-x-[2em] my-[2em] *:bg-black/40 *:p-[2.8em] *:rounded-sm *:border *:border-[#0D6D49]">
          {/* Image area */}
          <div className="flex flex-col items-center text-center mb-[15%]">
            <div className="relative">
              <Image
                src={image ? image : samplePic}
                alt="Sample pic"
                className="size-[8em] rounded-full"
                width={104}
                height={104}
              />
              <label
                htmlFor="profile-image"
                className="text-[2em] text-[#0BDB45] absolute bottom-0 right-0 cursor-pointer"
              >
                <FaCirclePlus />
              </label>
            </div>
            <div className="py-[1em] border-b border-[#0D6D49] font-secondaryFont text-[1.2em] font-bold">
              <p>
                {firstName !== "" || lastName !== ""
                  ? `${firstName} ${lastName}`
                  : "Your Name"}
              </p>
              <p className="font-light text-[0.6em]">
                {email ? email : "sample@sample-domain.com"}
              </p>
            </div>
          </div>
          {/* Form area */}
          <div>
            <h2 className="font-bold text-[1.4em] uppercase mb-[0.5em]">
              Personal details
            </h2>

            {/* First name and last name */}
            <div className="grid grid-cols-2 gap-x-[4.8em] mt-[1.4em] font-medium">
              <div>
                <p className="capitalize">First Name</p>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-[1em] px-[1em] py-[0.6em] h-fit"
                  required
                />
              </div>
              <div>
                <p className="capitalize">Last Name</p>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="text-[1em] px-[1em] py-[0.6em] h-fit"
                  required
                />
              </div>
            </div>

            {/* Username and role */}
            <div className="grid grid-cols-2 gap-x-[4.8em] mt-[1.4em] font-medium">
              <div>
                <p className="capitalize">Username</p>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-[1em] px-[1em] py-[0.6em] h-fit"
                  readOnly={editingUser ? true : false}
                  required
                />
              </div>
              <div>
                <p className="capitalize">Role</p>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-transparent w-full h-fit text-[1em] px-[1em] py-[0.65em] border rounded-sm"
                  required
                >
                  <option value="" className="bg-black text-white">
                    Select Role
                  </option>
                  {roles.map((role) => (
                    <option
                      key={role.id}
                      value={role.name}
                      className="bg-black text-white"
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div className=" mt-[1.4em]">
              <p className="capitalize">E-mail</p>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[72ch] text-[1em] px-[1em] py-[0.6em] h-fit"
                required
              />
            </div>

            {/* Password */}
            {!editingUser && (
              <div className=" mt-[1.4em]">
                <p className="capitalize">Password</p>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[72ch] text-[1em] px-[1em] py-[0.6em] h-fit"
                  required={!editingUser}
                />
              </div>
            )}

            {/* Avatar */}
            <Input
              id="profile-image"
              type="file"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />

            {/* Submit */}
            <div className="flex justify-between items-center mt-[18em]">
              <p className="text-[10px] max-w-[65ch]">
                Please review and ensure that all the details you have entered
                are correct before submitting.
              </p>
              <button
                className="text-black font-semibold text-[14px] px-[1.5em] py-[0.5em] bg-[#00FFA1] rounded hover:opacity-90 transition-opacity duration-100"
                onClick={handleSubmit}
              >
                {editingUser ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    //   <div className="bg-white p-8 rounded text-black">
    //     <h2 className="text-xl mb-4">
    //       {editingUser ? "Edit User" : "Add User"}
    //     </h2>
    //     {editingUser ? (
    //       <div className="border p-2 mb-4 w-full">{username}</div>
    //     ) : (
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         className="border p-2 mb-4 w-full"
    //         placeholder="Enter username"
    //         required
    //       />
    //     )}

    //     <input
    //       type="text"
    //       value={firstName}
    //       onChange={(e) => setFirstName(e.target.value)}
    //       className="border p-2 mb-4 w-full"
    //       placeholder="Enter first name"
    //       required
    //     />
    //     <input
    //       type="text"
    //       value={lastName}
    //       onChange={(e) => setLastName(e.target.value)}
    //       className="border p-2 mb-4 w-full"
    //       placeholder="Enter last name"
    //       required
    //     />
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       className="border p-2 mb-4 w-full"
    //       placeholder="Enter email"
    //       required
    //     />
    //     {!editingUser && (
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="border p-2 mb-4 w-full"
    //         placeholder="Enter password"
    //         required={!editingUser}
    //       />
    //     )}
    //     <select
    //       value={role}
    //       onChange={(e) => setRole(e.target.value)}
    //       className="border p-2 mb-4 w-full"
    //       required
    //     >
    //       <option value="">Select Role</option>
    //       {roles.map((role) => (
    //         <option key={role.id} value={role.name}>
    //           {role.name}
    //         </option>
    //       ))}
    //     </select>

    //     <input
    //       type="file"
    //       onChange={handleImageChange}
    //       className="border p-2 mb-4 w-full"
    //       accept="image/*"
    //     />

    //     {image && (
    //       <div className="mb-4">
    //         <img src={image} alt="Profile Preview" className="w-20 h-20 mb-2 rounded-full" />
    //       </div>
    //     )}

    //     <div className="flex justify-end">
    //       <button
    //         className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
    //         onClick={() => setShowModal(false)}
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         className="bg-blue-500 text-white px-4 py-2 rounded"
    //         onClick={handleSubmit}
    //       >
    //         {editingUser ? "Update" : "Save"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AddUserModal;
