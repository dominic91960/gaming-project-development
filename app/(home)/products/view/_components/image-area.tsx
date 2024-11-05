import React from "react";

const ImageArea: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  return (
    <div
      className="relative h-[160px] bg-[length:640px_360px] bg-fixed sm:h-[220px] sm:bg-contain md:h-[280px] lg:h-[340px] lg:bg-[0px_-115px] 2xl:h-[480px]"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundPositionX: "center",
      }}
    >
      {/* Bottom gradient */}
      <div className="absolute bottom-0 w-full h-1/2 translate-y-px bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default ImageArea;
