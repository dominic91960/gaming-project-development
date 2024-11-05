import React from "react";

import RequirementsCard from "./requirements-card";

interface SystemRequirementsProps {
  title: string;
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
  };
}

const SystemRequirements: React.FC<SystemRequirementsProps> = ({
  title,
  requirements,
}) => {
  return (
    <div className="text-[8px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] pt-[4em]">
      <h3 className="font-semibold text-[1.2em] capitalize">
        System Requirements for {title}
      </h3>
      <RequirementsCard requirements={requirements} />
    </div>
  );
};

export default SystemRequirements;
