import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";

interface EditAccountInfoProps {
  profile: {
    avatar: string | null;
    id: string;
    username: string | null;
    email: string;
    firstName: string;
    lastName: string;
    // DOB: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postalCode: string | null;
    password: string;
    tel: string;
    trustedDevices: number;
  };
  setProfile: React.Dispatch<
    React.SetStateAction<{
      avatar: string | null;
      id: string;
      username: string | null;
      email: string;
      firstName: string;
      lastName: string;
      // DOB: string | null;
      address: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
      postalCode: string | null;
      password: string;
      tel: string;
      trustedDevices: number;
    }>
  >;
  onClose: () => void;
  setReloadProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

type EditProfile = {
  firstName: string;
  lastName: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
};

const EditAccountInfo: React.FC<EditAccountInfoProps> = ({
  profile,
  setProfile,
  onClose,
  setReloadProfile,
}) => {
  const [updatedProfile, setUpdatedProfile] = useState<EditProfile>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    address: profile.address,
    city: profile.city,
    state: profile.state,
    country: profile.country,
    postalCode: profile.postalCode,
  });
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  return (
    <aside
      className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center px-[36px] backdrop-blur-md z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Form to general data*/}
      {!isEditingEmail && (
        <div
          className="w-full h-fit bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] overflow-auto z-10 sm:text-[10px] md:text-[12px] lg:w-fit lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
          style={{
            borderImage: "linear-gradient(to bottom, #19D38E, #0D6D49) 1",
          }}
        >
          <div className="flex justify-between text-[1.125em] pb-[1em] border-b border-b-[#0D6D49]">
            <h4 className="font-bold">Account Details</h4>

            {/* Close button */}
            <IoClose
              className="text-[1.3em] text-[#00FFA1] cursor-pointer hover:scale-110"
              onClick={onClose}
            />
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              // setProfile((prev) => ({ ...prev, ...updatedProfile }));
              try {
                const res = await axiosInstance.patch(
                  `/user/${profile.id}`,
                  updatedProfile
                );
                if (res.status === 200) {
                  // setProfile((prev) => ({ ...prev, ...updatedProfile }));
                  // toast.success("Profile updated successfully");
                } else {
                  throw new Error("Error updating profile");
                }
              } catch (err) {
                toast.error("Error updating profile");
              } finally {
                setReloadProfile((prev) => !prev);
                onClose();
              }
              // onClose();
            }}
          >
            {/* Username and DOB */}
            <div className="grid grid-cols-2 gap-[5em] mt-[1em]">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block mb-[0.5em]">
                  User Name
                </label>
                <label className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 cursor-not-allowed outline-none">
                  {profile.username ?? ""}
                </label>
              </div>

              {/* DOB */}
              {/* <div>
                <label htmlFor="dob" className="block mb-[0.5em]">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  value={updatedProfile.DOB ?? ""}
                  onChange={(e) =>
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      DOB: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                  required
                />
              </div> */}
            </div>

            {/* Email */}
            <div className="mt-[1em]">
              <label htmlFor="email" className="block mb-[0.5em]">
                Email
              </label>

              <div className="flex items-center mt-[1em]">
                <label
                  // type="email"
                  // id="email"
                  // value={updatedProfile.email}
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 cursor-not-allowed outline-none"
                  // readOnly
                >
                  {profile.email}
                </label>

                {/* <button
                  type="button"
                  className="flex items-center text-[0.8em] uppercase px-[1em] py-[0.6em] hover:opacity-80"
                  onClick={() => setIsEditingEmail(true)}
                >
                  Edit&nbsp;&nbsp;
                  <FaPencilAlt />
                </button> */}
              </div>
            </div>

            {/* First name and last name */}
            <div className="grid grid-cols-2 gap-[5em] mt-[1em]">
              {/* First name */}
              <div>
                <label htmlFor="first-name" className="block mb-[0.5em]">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  value={updatedProfile.firstName}
                  onChange={(e) =>
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                  required
                />
              </div>

              {/* Last name */}
              <div>
                <label htmlFor="last-name" className="block mb-[0.5em]">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  value={updatedProfile.lastName}
                  onChange={(e) =>
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                  required
                />
              </div>
            </div>

            {/* address */}
            <div className="mt-[1em]">
              <label htmlFor="address" className="block mb-[0.5em]">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={updatedProfile.address ?? ""}
                onChange={(e) =>
                  setUpdatedProfile((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none lg:w-[87ch]"
                // required
              />
            </div>

            {/* City and state */}
            <div className="grid grid-cols-2 gap-[5em] mt-[1em]">
              {/* City */}
              <div>
                <label htmlFor="city" className="block mb-[0.5em]">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={updatedProfile.city ?? ""}
                  onChange={(e) =>
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                  // required
                />
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block mb-[0.5em]">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={updatedProfile.state ?? ""}
                  onChange={(e) =>
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                  // required
                />
              </div>
            </div>

            {/* Country and postal code */}
            <div className="grid grid-cols-2 gap-[5em] mt-[1em]">
              {/* Country */}
              <div>
                <label htmlFor="country" className="block mb-[0.5em]">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  value={updatedProfile.country ?? ""}
                  onChange={(e) =>
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                  // required
                />
              </div>

              {/* Postal code */}
              <div>
                <label htmlFor="postal-code" className="block mb-[0.5em]">
                  Postal Code
                </label>
                <input
                  type="number"
                  id="postal-code"
                  value={updatedProfile.postalCode ?? ""}
                  onChange={(e) =>
                    setUpdatedProfile((prev) => ({
                      ...prev,
                      postalCode: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                  // required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-[1.8em]">
              <Button
                type="submit"
                variant="gaming"
                className="h-fit text-[8px] px-[2em] py-[0.2em] rounded-none sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Form to edit email */}
      {isEditingEmail && (
        <div
          className="w-fit h-fit bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] z-10 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] overflow-auto"
          style={{
            borderImage: "linear-gradient(to bottom, #19D38E, #0D6D49) 1",
          }}
        >
          <div className="flex justify-between text-[1.125em] pb-[1em] border-b border-b-[#0D6D49]">
            <h4 className="font-bold">Change Your Email</h4>

            {/* Close button */}
            <IoClose
              className="text-[1.3em] text-[#00FFA1] cursor-pointer hover:scale-110"
              onClick={() => setIsEditingEmail(false)}
            />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditingEmail(false);
            }}
          >
            {/* Email */}
            <div className="mt-[1em]">
              <label htmlFor="email" className="block mb-[0.5em]">
                New Email Address
              </label>
              <input
                type="email"
                id="email"
                value={profile.email}
                onChange={(e) =>
                  setUpdatedProfile((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-[30ch] bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                required
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between gap-[12.8em] mt-[1.8em]">
              <p className="w-[55ch] text-[7px] sm:text-[8px] md:text-[9px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px]">
                Once this change is confirmed, you will not be able to update
                your email address for the next 90 days.
              </p>
              <Button
                type="submit"
                variant="gaming"
                className="h-fit text-[8px] px-[2em] py-[0.2em] rounded-none sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
};

export default EditAccountInfo;
