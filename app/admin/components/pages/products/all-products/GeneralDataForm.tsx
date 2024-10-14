import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface GeneralDataFormProps {
  name: string;
  setName: (value: string) => void;
  displayName: string;
  setDisplayName: (value: string) => void;
  about: string;
  setAbout: (value: string) => void;
  cardDescription: string;
  setCardDescription: (value: string) => void;
  icon: string;
  setIcon: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
}

const GeneralDataForm: React.FC<GeneralDataFormProps> = ({
  name,
  setName,
  displayName,
  setDisplayName,
  about,
  setAbout,
  cardDescription,
  setCardDescription,
  icon,
  setIcon,
  language,
  setLanguage,
  date,
  setDate,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-[7.4em] mb-[1.5em]">
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
        <div>
          <label className="block mb-[0.5em]">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>
      </div>

      <div className="mb-[1.5em]">
        <label className="block mb-[0.5em]">About This Game</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          rows={4}
          required
        />
      </div>

      <div className="mb-[1.5em]">
        <label className="block mb-[0.5em]">Card Description</label>
        <input
          type="text"
          value={cardDescription}
          onChange={(e) => setCardDescription(e.target.value)}
          className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-x-[7.4em]">
        {/* <div>
          <label className="block mb-[0.5em]">Select Icon</label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          >
            <option value="">Select an option</option>
            <option value="Windows">Windows</option>
            <option value="Playstation">Playstation</option>
            <option value="Xbox">Xbox</option>
          </select>
        </div> */}

        {/* <div>
              <Select>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select Icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Windows</SelectItem>
                  <SelectItem value="dark">Playstation</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

        <div>
        <label className="block mb-[0.5em]">Select Icon</label>
        <Select
          value={icon}
          onValueChange={(value: string) => setIcon(value)}
          required
        >
          <SelectTrigger className="text-[15px] border-[#606060]">
            <SelectValue placeholder="Select Icon" />
          </SelectTrigger>
          <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
            {["Windows", "Playstation", "Xbox"].map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="h-fit ps-[3.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[15px]"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

        <div>
          <label className="block mb-[0.5em]">Select Language</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>

        <div>
          <label className="block mb-[0.5em]">Release Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="relative w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            required
          />
        </div>
      </div>
    </>
  );
};

export default GeneralDataForm;
