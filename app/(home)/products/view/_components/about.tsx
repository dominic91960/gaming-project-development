import React from "react";

const About: React.FC<{ about: string; releaseDate: string }> = ({
  about,
  releaseDate,
}) => {
  return (
    <div className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] pt-[4em]">
      <h3 className="font-semibold text-[1.2em] capitalize">About this game</h3>
      <div className="bg-white/5 p-[2em] mt-[2em]">
        <p className="pb-[2em] text-justify opacity-70">{about}</p>
        <p className="flex justify-between items-center text-[1.1em] font-medium ">
          Release Date: {releaseDate}
        </p>
      </div>
    </div>
  );
};

export default About;
