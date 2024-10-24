import React from "react";
import { StaticImageData } from "next/image";

import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

interface EditAccountInfoProps {
  profile: {
    avatar: StaticImageData;
    id: string;
    username: string | null;
    email: string;
    firstName: string;
    lastName: string;
    DOB: string | null;
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
      avatar: StaticImageData;
      id: string;
      username: string | null;
      email: string;
      firstName: string;
      lastName: string;
      DOB: string | null;
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
}

const EditAccountInfo: React.FC<EditAccountInfoProps> = ({
  profile,
  setProfile,
  onClose,
}) => {
  return (
    <aside
      className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center px-[36px] backdrop-blur-md z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-fit h-fit bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] z-10 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] overflow-auto"
        style={{
          borderImage: "linear-gradient(to bottom, #19D38E, #0D6D49) 1",
        }}
      >
        <div className="flex justify-between text-[1.125em] pb-[1em] border-b border-b-[#0D6D49]">
          {/* Order no */}
          <h4 className="font-bold">Account Details</h4>

          {/* Close button */}
          <IoClose
            className="text-[1.3em] text-[#00FFA1] cursor-pointer hover:scale-110"
            onClick={onClose}
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          {/* Username and DOB */}
          <div className="grid grid-cols-2 gap-[5em] mt-[1em]">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-[0.5em]">
                User Name
              </label>
              <input
                type="text"
                id="username"
                value={profile.username ?? ""}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                required
              />
            </div>

            {/* DOB */}
            <div>
              <label htmlFor="dob" className="block mb-[0.5em]">
                Date Of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={profile.DOB ?? ""}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    DOB: e.target.value,
                  }))
                }
                className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-[1em]">
            <label htmlFor="email" className="block mb-[0.5em]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={profile.email}
              className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
              readOnly
            />
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
                value={profile.firstName}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
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
                value={profile.lastName}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
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
              value={profile.address ?? ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
              required
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
                value={profile.city ?? ""}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                className="bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                required
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
                value={profile.state ?? ""}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
                className="bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                required
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
                value={profile.country ?? ""}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                className="bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                required
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
                value={profile.postalCode ?? ""}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    postalCode: e.target.value,
                  }))
                }
                className="bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-[1.8em]">
            <Button
              type="submit"
              variant="gaming"
              className="h-fit text-[1em] px-[1em] py-[0.5em] rounded-none"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default EditAccountInfo;
