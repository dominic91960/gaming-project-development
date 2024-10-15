import React, { ChangeEvent } from "react";
import Image from "next/image";

import { IoClose } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { FaCirclePlus } from "react-icons/fa6";

import { AllCustomersNew } from "./columns";
import samplePic from "@/public/images/sample-pic.png";

interface EditAllCustomersPopupProps {
  customer: AllCustomersNew | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedcustomer: AllCustomersNew) => void;
}

const EditAllCustomersPopup: React.FC<EditAllCustomersPopupProps> = ({
  customer,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedcustomer, setEditedcustomer] =
    React.useState<AllCustomersNew | null>(customer);

  React.useEffect(() => {
    setEditedcustomer(customer);
  }, [customer]);

  if (!isOpen || !editedcustomer) {
    return null;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedcustomer({
      ...editedcustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedcustomer({
          ...editedcustomer,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editedcustomer) {
      onSave(editedcustomer);
    }
  };

  return (
    <div className="fixed h-full inset-0 bg-black/80 flex justify-center items-center font-primaryFont font-medium text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] z-10">
      <div className="relative bg-gradient-to-tr from-black/40 from-15% to-[#00a76966] backdrop-blur-[2px] p-[3em] rounded-md border border-[#19D38E] mx-[2em] sm:mx-0">
        <div className="font-bold text-[1.5em] pb-[0.6em] border-b border-b-[#0D6D49] flex justify-between">
          <h2>Edit Customer</h2>
          <button
            className="text-[#00FFA1] text-[1.4em] hover:opacity-80 transition-opacity duration-100"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>

        <div className="flex flex-col gap-y-[2em] my-[2em] md:flex-row md:gap-y-0 md:gap-x-[2em] *:md:bg-black/40 *:md:p-[2.8em] *:md:rounded-sm *:md:border *:md:border-[#0D6D49]">
          {/* Image area */}
          <div className="flex items-center justify-center gap-x-[2em] md:flex-col md:justify-start md:text-center md:mb-[15%]">
            <div className="relative">
              <Image
                src={
                  editedcustomer.imageUrl && editedcustomer.imageUrl !== ""
                    ? editedcustomer.imageUrl
                    : samplePic
                }
                // src={samplePic}
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
            <div className="py-[1em] border-b border-[#0D6D49] font-secondaryFont text-[1.5em] font-bold md:text-[1.2em]">
              <p>
                {editedcustomer.customer_name &&
                editedcustomer.customer_name !== ""
                  ? editedcustomer.customer_name
                  : "Customer Name"}
              </p>
              <p className="font-light text-[0.6em]">
                sample@sample-domain.com
              </p>
            </div>
          </div>

          <form>
            <h2 className="font-bold text-[1.4em] uppercase mb-[0.5em]">
              Personal details
            </h2>

            {/* Full name and ID */}
            <div className="grid grid-cols-2 gap-x-[0.7em] mt-[1.4em] font-medium xl:gap-x-[2em] 2xl:gap-x-[4.8em]">
              <div>
                <label className="block capitalize">Full Name</label>
                <Input
                  type="text"
                  name="customer_name"
                  value={editedcustomer.customer_name}
                  onChange={handleInputChange}
                  placeholder="customer Name"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm "
                  required
                />
              </div>
              <div>
                <label className="block capitalize">Customer ID</label>
                <Input
                  type="text"
                  name="customer_id"
                  value={editedcustomer.customer_id}
                  onChange={handleInputChange}
                  placeholder="customer_id"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  required
                />
              </div>
            </div>

            {/* Customer username and DOB */}
            <div className="grid grid-cols-2 gap-x-[0.7em] mt-[1.4em] font-medium xl:gap-x-[2em] 2xl:gap-x-[4.8em]">
              <div>
                <label className="block capitalize">Username</label>
                <Input
                  type="text"
                  name="customer_username"
                  value={editedcustomer.customer_username}
                  onChange={handleInputChange}
                  placeholder="Customer_username"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  required
                />
              </div>
              <div>
                <label className="block capitalize">Date of birth</label>
                <Input
                  type="date"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mt-[1.4em]">
              <label className="block capitalize">Address</label>
              <Input
                type="text"
                className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
              />
            </div>

            {/* State, city and zip code */}
            <div className="grid grid-cols-3 gap-x-[0.7em] mt-[1.4em] font-medium xl:gap-x-[2em] 2xl:gap-x-[4.8em]">
              <div>
                <label className="block capitalize">State</label>
                <Input
                  type="text"
                  className="text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                />
              </div>
              <div>
                <label className="block capitalize">City</label>
                <Input
                  type="text"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                />
              </div>
              <div>
                <label className="block capitalize">ZIP Code</label>
                <Input
                  type="text"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                />
              </div>
            </div>

            {/* Country and phone */}
            <div className="grid grid-cols-2 gap-x-[0.7em] mt-[1.4em] font-medium xl:gap-x-[2em] 2xl:gap-x-[4.8em]">
              <div>
                <label className="block capitalize">Country</label>
                <Input
                  type="text"
                  name="customer_country"
                  value={editedcustomer.customer_country}
                  onChange={handleInputChange}
                  placeholder="Customer Country"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  required
                />
              </div>
              <div>
                <label className="block capitalize">Phone</label>
                <Input
                  type="text"
                  name="customer_phone"
                  value={editedcustomer.customer_phone}
                  onChange={handleInputChange}
                  placeholder="Customer Phone"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-[1.4em]">
              <label className="block capitalize">Email</label>
              <Input
                type="text"
                className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
              />
            </div>

            {/* Password */}
            <div className="mt-[1.4em]">
              <button
                type="button"
                className="text-black font-semibold text-[1.1em] px-[1.5em] py-[0.5em] bg-[#00FFA1] rounded hover:opacity-90 transition-opacity duration-100 uppercase"
              >
                Change Password
              </button>
            </div>

            {/* Image URL */}
            <div className="mt-[1.4em]">
              <Input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                required
              />
            </div>

            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
            />

            {/* Submit */}
            <div className="flex justify-between items-center mt-[2em]">
              <p className="text-[0.76em] max-w-[40ch] md:max-w-[44ch] 2xl:max-w-[65ch]">
                Please review and ensure that all the details you have entered
                are correct before submitting.
              </p>
              <button
                type="button"
                className="text-black font-semibold text-[1.1em] px-[1.5em] py-[0.5em] bg-[#00FFA1] rounded hover:opacity-90 transition-opacity duration-100"
                onClick={handleSave}
              >
                Save
              </button>
            </div>

            {/* <input
              type="text"
              name="customer_name"
              value={editedcustomer.customer_name}
              onChange={handleInputChange}
              placeholder="customer Name"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              name="customer_id"
              value={editedcustomer.customer_id}
              onChange={handleInputChange}
              placeholder="customer_id"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              name="customer_username"
              value={editedcustomer.customer_username}
              onChange={handleInputChange}
              placeholder="Customer_username"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              name="customer_country"
              value={editedcustomer.customer_country}
              onChange={handleInputChange}
              placeholder="Customer Country"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              name="customer_phone"
              value={editedcustomer.customer_phone}
              onChange={handleInputChange}
              placeholder="Customer Phone"
              className="w-full mb-2 p-2 border rounded"
            /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAllCustomersPopup;
