import React from "react";
import SummaryCard from "./SummaryCard";

interface SummaryProps {
  summary: {
    icon: JSX.Element;
    title: string;
    value: number;
  }[];
}

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 gap-[10px]">
      {summary.map(({ icon, title, value }, index) => (
        <SummaryCard key={index} icon={icon} title={title} value={value} />
      ))}
    </div>
  );
};

export default Summary;
