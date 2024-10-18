import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { FaWindows, FaXbox, FaPlaystation } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";

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
  { icon: <FaWindows />, label: "Windows" },
  { icon: <FaXbox />, label: "Xbox" },
  { icon: <FaPlaystation />, label: "Playstation" },
];

const languageOptions = [
  { value: "English", label: "English", icon: IoLanguageOutline },
  {
    value: "Spanish (Spain)",
    label: "Spanish (Spain)",
    icon: IoLanguageOutline,
  },
  {
    value: "Spanish (Latin America)",
    label: "Spanish (Latin America)",
    icon: IoLanguageOutline,
  },
  { value: "French", label: "French", icon: IoLanguageOutline },
  { value: "German", label: "German", icon: IoLanguageOutline },
  { value: "Italian", label: "Italian", icon: IoLanguageOutline },
  {
    value: "Portuguese (Portugal)",
    label: "Portuguese (Portugal)",
    icon: IoLanguageOutline,
  },
  {
    value: "Portuguese (Brazilian)",
    label: "Portuguese (Brazilian)",
    icon: IoLanguageOutline,
  },
  { value: "Russian", label: "Russian", icon: IoLanguageOutline },
  {
    value: "Chinese (Simplified)",
    label: "Chinese (Simplified)",
    icon: IoLanguageOutline,
  },
  {
    value: "Chinese (Traditional)",
    label: "Chinese (Traditional)",
    icon: IoLanguageOutline,
  },
  { value: "Japanese", label: "Japanese", icon: IoLanguageOutline },
  { value: "Korean", label: "Korean", icon: IoLanguageOutline },
  { value: "Dutch", label: "Dutch", icon: IoLanguageOutline },
  { value: "Polish", label: "Polish", icon: IoLanguageOutline },
  { value: "Turkish", label: "Turkish", icon: IoLanguageOutline },
  { value: "Arabic", label: "Arabic", icon: IoLanguageOutline },
  { value: "Swedish", label: "Swedish", icon: IoLanguageOutline },
  { value: "Danish", label: "Danish", icon: IoLanguageOutline },
  { value: "Finnish", label: "Finnish", icon: IoLanguageOutline },
  { value: "Norwegian", label: "Norwegian", icon: IoLanguageOutline },
  { value: "Czech", label: "Czech", icon: IoLanguageOutline },
  { value: "Hungarian", label: "Hungarian", icon: IoLanguageOutline },
  { value: "Thai", label: "Thai", icon: IoLanguageOutline },
  { value: "Indonesian", label: "Indonesian", icon: IoLanguageOutline },
  { value: "Vietnamese", label: "Vietnamese", icon: IoLanguageOutline },
  { value: "Greek", label: "Greek", icon: IoLanguageOutline },
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

      <div className="grid 2xl:grid-cols-3 gap-[1.5em]">
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
            <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-md">
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
          <label className="block mb-[0.5em]">Select Language</label>
          <MultiSelect
            options={languageOptions}
            onValueChange={setLanguage}
            defaultValue={language}
            placeholder="Select Languages"
            variant="secondary"
            animation={2}
            maxCount={3}
          />
          {/* <Select
            value={language}
            onValueChange={(value: string) => setLanguage(value)}
            required
          >
            <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-md">
              {languageOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>

        <div>
          <label className="block mb-[0.5em]">Release Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="relative w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm z-10 after:content-[''] after:w-[5ch] after:h-full after:bg-[#00FFA1]/20 after:absolute after:top-0 after:right-0 after:-z-10"
            required
          />
        </div>
      </div>
    </>
  );
};

export default GeneralDataForm;
