import React, { useState, useEffect } from "react";

import { IoClose } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoleContext } from "../../../../../../context/RoleContext";
import samplePic from "@/public/images/sample-pic.png";
import Image from "next/image";

interface AddUserModalProps {
  addUser: (newUser: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    image: string;
  }) => Promise<void>; // Change to Promise<void> for async operation
  setShowModal: (show: boolean) => void;
  editingUser: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    image: string;
  } | null; // Specify editingUser type
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

  const handleSubmit = async () => {
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      role,
      image,
    };

    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/register"; // Define your API endpoint
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser), // Send the new user data
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`); // Handle non-200 responses
      }

      await addUser(newUser); // Call addUser function after successful registration
      setShowModal(false); // Close the modal after successful addition
    } catch (error) {
      console.error("User save failed:", error);
    }
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
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center font-medium text-[13px]">
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
          {/* Image section */}
          <div className="flex flex-col items-center text-center mb-[15%]">
            <div className="relative">
              <Image
                src={samplePic}
                alt="Sample pic"
                className="size-[8em] rounded-full"
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
          {/* Form section */}
          <div>
            <h2 className="font-bold text-[1.4em] uppercase mb-[0.5em]">
              Personal details
            </h2>
            <div className="grid grid-cols-2 gap-x-[4.8em] mt-[1.4em] font-medium">
              <div>
                <p className="capitalize">First Name</p>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border border-[#D9D9D9] px-[1em] py-[0.5em]"
                  required
                />
              </div>
              <div>
                <p className="capitalize">Last Name</p>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-[4.8em] mt-[1.4em] font-medium">
              <div>
                <p className="capitalize">Username</p>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <p className="capitalize">Role</p>
                <Select onValueChange={(value: string) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-transparent text-white backdrop-blur-sm">
                    <SelectGroup className="bg-black/40">
                      <SelectLabel>Roles</SelectLabel>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className=" mt-[1.4em]">
              <p className="capitalize">E-mail</p>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[72ch]"
                required
              />
            </div>
            <div className=" mt-[1.4em]">
              <p className="capitalize">Password</p>
              <Input type="password" className="w-[72ch]" required />
            </div>
            <Input
              id="profile-image"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(URL.createObjectURL(e.target.files[0])); // Handle image upload
                }
              }}
              className="hidden"
              accept="image/*" // Limit file selection to images
            />
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
  );
};

export default AddUserModal;

//<input
//          type="text"
//          value={username}
//          onChange={(e) => setUsername(e.target.value)}
//          className="border p-2 mb-4 w-full"
//          placeholder="Enter username"
//          required
//        />
//        <input
//          type="text"
//          value={firstName}
//          onChange={(e) => setFirstName(e.target.value)}
//          className="border p-2 mb-4 w-full"
//          placeholder="Enter first name"
//          required
//        />
//        <input
//          type="text"
//          value={lastName}
//          onChange={(e) => setLastName(e.target.value)}
//          className="border p-2 mb-4 w-full"
//          placeholder="Enter last name"
//          required
//        />
//        <input
//          type="email"
//          value={email}
//          onChange={(e) => setEmail(e.target.value)}
//          className="border p-2 mb-4 w-full"
//          placeholder="Enter email"
//          required
//        />
//        <select
//          value={role}
//          onChange={(e) => setRole(e.target.value)}
//          className="border p-2 mb-4 w-full"
//          required
//        >
//          <option value="">Select Role</option>
//          {roles.map((role) => (
//            <option key={role.id} value={role.id}>
//              {" "}
//              {/* Assuming roles have an id property */}
//              {role.name} {/* Assuming roles have a name property */}
//            </option>
//          ))}
//        </select>
//        <input
//          type="file"
//          onChange={(e) => {
//            if (e.target.files && e.target.files.length > 0) {
//              setImage(URL.createObjectURL(e.target.files[0])); // Handle image upload
//            }
//          }}
//          className="border p-2 mb-4 w-full"
//          accept="image/*" // Limit file selection to images
//        />
//        <div className="flex justify-end">
//          <button
//            className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
//            onClick={() => setShowModal(false)}
//          >
//            Cancel
//          </button>
//          <button
//            className="bg-blue-500 text-white px-4 py-2 rounded"
//            onClick={handleSubmit}
//          >
//            {editingUser ? "Update" : "Save"}
//          </button>
//        </div>
