import React, { SetStateAction } from "react";

interface GeneralDataFormProps {
  name: string;
  setName: (value: SetStateAction<string>) => void;
  date: string;
  setDate: (value: SetStateAction<string>) => void;
}

const GeneralDataForm: React.FC<GeneralDataFormProps> = ({
  name,
  setName,
  date,
  setDate,
}) => {
  return (
    <>
      {/* Product name and display name */}
      <div className="grid grid-cols-2 gap-x-[7.4em] mb-[1.5em]">
        {/* Product name */}
        <div>
          <label className="block mb-[0.5em]">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>
        {/* Display name */}
        <div>
          <label className="block mb-[0.5em]">Display Name</label>
          <input
            type="text"
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>
      </div>

      {/* About this game */}
      <div className="mb-[1.5em]">
        <label className="block mb-[0.5em]">About This Game</label>
        <textarea
          className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          rows={4}
          required
        />
      </div>

      {/* Card description */}
      <div className="mb-[1.5em]">
        <label className="block mb-[0.5em]">Card Description</label>
        <input
          type="text"
          className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          required
        />
      </div>

      {/* Icon, language and release date */}
      <div className="grid grid-cols-3 gap-x-[7.4em]">
        {/* Icon */}
        <div>
          <label className="block mb-[0.5em]">Select Icon</label>
          <input
            type="text"
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>

        {/* Language */}
        <div>
          <label className="block mb-[0.5em]">Select Language</label>
          <input
            type="text"
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>

        {/* Release date */}
        <div>
          <label className="block mb-[0.5em]">Release Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="relative w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm z-10 after:content-[''] after:w-[13.5%] after:h-full after:bg-white after:absolute after:top-0 after:right-0 after:-z-10"
            required
          />
        </div>
      </div>
    </>
  );
};

export default GeneralDataForm;
