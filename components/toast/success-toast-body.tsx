import React from "react";

import { GoCheckCircleFill } from "react-icons/go";

const SuccessToastBody: React.FC<{ desc: string }> = ({ desc }) => {
  return (
    <div className="max-w-[40ch] flex flex-col items-center justify-center font-medium text-center text-[9px] p-[1em] sm:max-w-none sm:flex-row sm:gap-[1.8em] sm:text-[10px] sm:px-[5em] sm:py-[1.5em] md:text-[11px] lg:text-[12px] xl:text-[12.5px] 2xl:text-[13px]">
      <GoCheckCircleFill className="text-[#0BDB45] text-[2.3em]" />
      {desc}
    </div>
  );
};

export default SuccessToastBody;
