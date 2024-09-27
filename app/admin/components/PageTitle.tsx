import React from "react";

interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="pb-[2em] capitalize">
      <h1 className="font-bold text-[36px] leading-none">{title}</h1>
      <p className="text-[12px]">{subtitle}</p>
    </div>
  );
};

export default PageTitle;
