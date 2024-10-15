import { useState } from "react";
import Image from "next/image";

import { IoClose } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";

import { AllCustomersNew } from "./columns";
import samplePic from "@/public/images/sample-pic.png";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      <div className="relative bg-gradient-to-tr from-black/40 from-15% to-[#00a76966] backdrop-blur-[2px] p-[3em] rounded-md border border-[#19D38E]">
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
                // src={image ? image : samplePic}
                src={samplePic}
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
                {/* {firstName !== "" || lastName !== ""
                  ? `${firstName} ${lastName}`
                  : "Your Name"} */}
                Customer Name
              </p>
              <p className="font-light text-[0.6em]">
                {/* {email ? email : "sample@sample-domain.com"} */}
                sample@sample-domain.com
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mb-6 p-4 border rounded-md text-white"
          >
            <div className="mb-4">
              <label className="block mb-1">Customer Name</label>
              <input
                type="text"
                value={customer_name}
                onChange={(e) => setCustomer_name(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-white">Customer ID</label>
              <input
                type="text"
                value={customer_id}
                onChange={(e) => setCustomer_id(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Customer Username</label>
              <input
                type="text"
                value={customer_username}
                onChange={(e) => setCustomer_username(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Country</label>
              <input
                type="text"
                value={customer_country}
                onChange={(e) => setCustomer_country(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone</label>
              <input
                type="text"
                value={customer_phone}
                onChange={(e) => setCustomer_phone(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
