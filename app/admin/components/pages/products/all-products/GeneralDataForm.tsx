import React, { useRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { FaWindows, FaXbox, FaPlaystation } from "react-icons/fa";
import { IoIosCalendar } from "react-icons/io";

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
  language: string[];
  setLanguage: (value: string[]) => void;
  date: string;
  setDate: (value: string) => void;
}

// const languageOptions = [
//   "English",
//   "Spanish (Spain)",
//   "Spanish (Latin America)",
//   "French",
//   "German",
//   "Italian",
//   "Portuguese (Portugal)",
//   "Portuguese (Brazilian)",
//   "Russian",
//   "Chinese (Simplified)",
//   "Chinese (Traditional)",
//   "Japanese",
//   "Korean",
//   "Dutch",
//   "Polish",
//   "Turkish",
//   "Arabic",
//   "Swedish",
//   "Danish",
//   "Finnish",
//   "Norwegian",
//   "Czech",
//   "Hungarian",
//   "Thai",
//   "Indonesian",
//   "Vietnamese",
//   "Greek",
// ];

const iconOptions = [
  { icon: <FaWindows />, label: "WINDOWS" },
  { icon: <FaXbox />, label: "XBOX" },
  { icon: <FaPlaystation />, label: "PLAYSTATION" },
];

const languageOptions = [
  { value: "English", label: "English" },
  {
    value: "Spanish (Spain)",
    label: "Spanish (Spain)",
  },
  {
    value: "Spanish (Latin America)",
    label: "Spanish (Latin America)",
  },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Italian", label: "Italian" },
  {
    value: "Portuguese (Portugal)",
    label: "Portuguese (Portugal)",
  },
  {
    value: "Portuguese (Brazilian)",
    label: "Portuguese (Brazilian)",
  },
  { value: "Russian", label: "Russian" },
  {
    value: "Chinese (Simplified)",
    label: "Chinese (Simplified)",
  },
  {
    value: "Chinese (Traditional)",
    label: "Chinese (Traditional)",
  },
  { value: "Japanese", label: "Japanese" },
  { value: "Korean", label: "Korean" },
  { value: "Dutch", label: "Dutch" },
  { value: "Polish", label: "Polish" },
  { value: "Turkish", label: "Turkish" },
  { value: "Arabic", label: "Arabic" },
  { value: "Swedish", label: "Swedish" },
  { value: "Danish", label: "Danish" },
  { value: "Finnish", label: "Finnish" },
  { value: "Norwegian", label: "Norwegian" },
  { value: "Czech", label: "Czech" },
  { value: "Hungarian", label: "Hungarian" },
  { value: "Thai", label: "Thai" },
  { value: "Indonesian", label: "Indonesian" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Greek", label: "Greek" },
];

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
  const datePicker = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-[2em] mb-[1.5em]">
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

      <div className="grid 2xl:grid-cols-2 gap-[1.5em] mb-[1.5em]">
        <div>
          <label className="block mb-[0.5em]">Select Icon</label>
          <Select
            value={icon}
            onValueChange={(value: string) => setIcon(value)}
            required
          >
            <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
              <SelectValue placeholder="Select Icon" />
            </SelectTrigger>
            <SelectContent className="bg-black/80 border border-[#606060] text-white backdrop-blur-sm">
              {iconOptions.map(({ icon, label }) => (
                <SelectItem
                  key={label}
                  value={label}
                  className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                >
                  <div className="flex items-center gap-x-[0.4em]">
                    {icon} <p>{label}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-[0.5em]">Release Date</label>
          <style>{`
            input[type="date"]::-webkit-calendar-picker-indicator {
              display: none;
            }

            @supports (-moz-appearance: none) {
              #date-picker {
                display: none;
              }
            }
          `}</style>
          <div className="relative">
            <input
              type="date"
              ref={datePicker}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm z-10"
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
              required
            />
            <button
              type="button"
              id="date-picker"
              className="absolute top-0 bottom-0 right-[0.2em] my-auto size-fit text-[1.5em] px-[0.2em] py-[0.2em] hover:opacity-80"
              onClick={() => datePicker.current?.showPicker()}
            >
              <IoIosCalendar />
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-[0.5em]">Select Language</label>
        <MultiSelect
          options={languageOptions}
          onValueChange={setLanguage}
          defaultValue={language}
          placeholder="Select Languages"
          variant="ghost"
          animation={1}
          maxCount={1}
        />
      </div>
    </>
  );
};

export default GeneralDataForm;
