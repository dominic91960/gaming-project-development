import { useState, ChangeEvent } from "react";
import Image from "next/image";

import { IoClose } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";

import { AllCustomersNew } from "./columns";
import samplePic from "@/public/images/sample-pic.png";
import { Input } from "@/components/ui/input";

interface AddCustomersProps {
  onClose: () => void;
  onAddCustomer: (newCustomer: AllCustomersNew) => void;
}

export default function AddCustomers({
  onClose,
  onAddCustomer,
}: AddCustomersProps) {
  const [customer_name, setCustomer_name] = useState("");
  const [customer_id, setCustomer_id] = useState("");
  const [customer_username, setCustomer_username] = useState("");
  const [customer_country, setCustomer_country] = useState("");
  const [customer_phone, setCustomer_phone] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();

    const newCustomer: AllCustomersNew = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl,
      customer_name,
      customer_id,
      customer_username,
      customer_country: customer_country,
      customer_phone: customer_phone,
    };

    onAddCustomer(newCustomer);

    setCustomer_name("");
    setCustomer_id("");
    setCustomer_username("");
    setCustomer_country("");
    setCustomer_phone("");
    setImageUrl("");
  };

  return (
    <div className="fixed h-full inset-0 bg-black/80 flex justify-center items-center font-medium text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] z-10">
      <div className="relative bg-gradient-to-tr from-black/40 from-15% to-[#00a76966] backdrop-blur-[2px] p-[3em] rounded-md border border-[#19D38E] mx-[2em] sm:mx-0">
        <div className="font-bold text-[1.5em] pb-[0.6em] border-b border-b-[#0D6D49] flex justify-between">
          <h2>Add Customer</h2>
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
                src={imageUrl && imageUrl !== "" ? imageUrl : samplePic}
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
                {customer_name && customer_name !== ""
                  ? customer_name
                  : "Customer Name"}
              </p>
              <p className="font-light text-[0.6em]">
                sample@sample-domain.com
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h2 className="font-bold text-[1.4em] uppercase mb-[0.5em]">
              Personal details
            </h2>

            {/* Full name and ID */}
            <div className="grid grid-cols-2 gap-x-[0.7em] mt-[1.4em] font-medium xl:gap-x-[2em] 2xl:gap-x-[4.8em]">
              <div>
                <label className="block capitalize">Full Name</label>
                <Input
                  type="text"
                  value={customer_name}
                  onChange={(e) => setCustomer_name(e.target.value)}
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm "
                  required
                />
              </div>
              <div>
                <label className="block capitalize">Customer ID</label>
                <Input
                  type="text"
                  value={customer_id}
                  onChange={(e) => setCustomer_id(e.target.value)}
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
                  value={customer_username}
                  onChange={(e) => setCustomer_username(e.target.value)}
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
                  value={customer_country}
                  onChange={(e) => setCustomer_country(e.target.value)}
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  required
                />
              </div>
              <div>
                <label className="block capitalize">Phone</label>
                <Input
                  type="text"
                  value={customer_phone}
                  onChange={(e) => setCustomer_phone(e.target.value)}
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
              <label className="block capitalize">Password</label>
              <Input
                type="text"
                className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
              />
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

            {/* Submit */}
            <div className="flex justify-between items-center mt-[2em]">
              <p className="text-[0.76em] max-w-[40ch] md:max-w-[44ch] 2xl:max-w-[65ch]">
                Please review and ensure that all the details you have entered
                are correct before submitting.
              </p>
              <button
                type="submit"
                className="text-black font-semibold text-[1.1em] px-[1.5em] py-[0.5em] bg-[#00FFA1] rounded hover:opacity-90 transition-opacity duration-100"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
