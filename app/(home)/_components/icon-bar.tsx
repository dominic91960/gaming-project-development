import Image from "next/image";
import IconBarBackground from "../../../public/images/home/icon-bar/icon-bar-background.png";

import Games from "../../../public/images/home/icon-bar/controller.png";
import XBox from "../../../public/images/home/icon-bar/xbox.png";
import Windows from "../../../public/images/home/icon-bar/windows.png";
import Steam from "../../../public/images/home/icon-bar/Steam.png";
import Ubisoft from "../../../public/images/home/icon-bar/ubisoft.png";
import "./icon-bar.css";

const cards = [
  { title: "Playstation", icon: Games },
  { title: "X Box", icon: XBox },
  { title: "Windows", icon: Windows },
  { title: "Steam", icon: Steam },
  { title: "Ubisoft", icon: Ubisoft },
];

const IconBar = () => {
  return (
    <div className="relative container mx-auto font-primaryFont px-[36px] z-10">
      <div className="relative">
        {/* Icon bar background */}
        <Image
          src={IconBarBackground}
          alt="Icon bar background"
          className="w-full"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 m-auto px-[12px] flex items-center justify-around min-[530px]:px-[24px] sm:px-[36px] md:px-[72px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px]">
          {/* Icon bar cards */}
          {cards.map(({ title, icon }, i) => (
            <>
              <article key={title} className="flex flex-col items-center group">
                <Image
                  src={icon}
                  alt={title}
                  className="size-[14px] min-[530px]:size-[19px] sm:size-[24px] md:size-[36px] lg:size-[48px] xl:size-[54px] 2xl:size-[60px] group-hover:-translate-y-[2px] transition-transform duration-200"
                />
                <p className="animate-text-bg text-[7px] capitalize min-[530px]:text-[8px] sm:font-medium sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] group-hover:scale-110 transition-transform duration-200">
                  {title}
                </p>
              </article>
              {i !== 4 && (
                <div className="w-px h-[10px] bg-white opacity-50 -translate-y-[25%] min-[530px]:h-[13px] sm:h-[16px] md:h-[22px] lg:h-[30px] xl:h-[40px] 2xl:h-[46px]"></div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconBar;
