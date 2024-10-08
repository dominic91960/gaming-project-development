"use client";
import { useState } from "react";

interface RequirementsCardProps {
  requirements: {
    minimum: {
      os: string;
      cpu: string;
      graphics: string;
      ram: string;
      storage: string;
      resolution: string;
    };
    recommended: {
      os: string;
      cpu: string;
      graphics: string;
      ram: string;
      storage: string;
      resolution: string;
    };
    high: {
      os: string;
      cpu: string;
      graphics: string;
      ram: string;
      storage: string;
      resolution: string;
    };
  };
}

const RequirementsCard: React.FC<RequirementsCardProps> = ({
  requirements,
}) => {
  const [activeSection, setActiveSection] = useState({
    sectionName: "minimum",
    sectionData: requirements.minimum,
  });

  return (
    <div className="mt-[1.8em]">
      <div className="flex justify-around border-b leading-loose text-[1.2em] font-medium">
        <button
          className={` translate-y-[0.2em]  ${
            activeSection.sectionName === "minimum"
              ? "border-[#0BDB45] font-bold border-b-[0.4em]"
              : ""
          }`}
          onClick={() =>
            setActiveSection({
              sectionName: "minimum",
              sectionData: requirements.minimum,
            })
          }
        >
          Minimum
        </button>
        <button
          className={` translate-y-[0.2em]  ${
            activeSection.sectionName === "recommended"
              ? "border-[#0BDB45] font-bold border-b-[0.4em]"
              : ""
          }`}
          onClick={() =>
            setActiveSection({
              sectionName: "recommended",
              sectionData: requirements.recommended,
            })
          }
        >
          Recommended
        </button>
        <button
          className={` translate-y-[0.2em]  ${
            activeSection.sectionName === "high"
              ? "border-[#0BDB45] font-bold border-b-[0.4em]"
              : ""
          }`}
          onClick={() =>
            setActiveSection({
              sectionName: "high",
              sectionData: requirements.high,
            })
          }
        >
          High
        </button>
      </div>
      <div className="py-[5em] px-[10%]">
        <div className="grid grid-cols-2 pb-[3em]">
          <p className="font-bold">Operating System</p>
          <p className="font-medium">{activeSection.sectionData.os}</p>
        </div>
        <div className="grid grid-cols-2 pb-[3em]">
          <p className="font-bold">CPU</p>
          <p className="font-medium">{activeSection.sectionData.cpu}</p>
        </div>
        <div className="grid grid-cols-2 pb-[3em] items-center">
          <p className="font-bold">Graphics</p>
          <p className="font-medium">{activeSection.sectionData.graphics}</p>
        </div>
        <div className="grid grid-cols-2 pb-[3em]">
          <p className="font-bold">RAM Memory</p>
          <p className="font-medium">{activeSection.sectionData.ram}</p>
        </div>
        <div className="grid grid-cols-2 pb-[3em]">
          <p className="font-bold">Storage</p>
          <p className="font-medium">{activeSection.sectionData.storage}</p>
        </div>
        <div className="grid grid-cols-2 pb-[3em]">
          <p className="font-bold">Resolution</p>
          <p className="font-medium">{activeSection.sectionData.resolution}</p>
        </div>
      </div>
    </div>
  );
};

export default RequirementsCard;
