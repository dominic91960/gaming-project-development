import Image from "next/image";
import IconBarBackground from "../../../public/images/home/icon-bar/icon-bar-background.png";

import Games from "../../../public/images/home/icon-bar/PSController.png";
import GiftCards from "../../../public/images/home/icon-bar/GiftCard.png";
import EMoney from "../../../public/images/home/icon-bar/E-commerce.png";
import PreOrders from "../../../public/images/home/icon-bar/OrderCompleted.png";
import Steam from "../../../public/images/home/icon-bar/Steam.png";

const cards = [
  { title: "Games", icon: Games },
  { title: "Gift cards", icon: GiftCards },
  { title: "E-money", icon: EMoney },
  { title: "Pre-orders", icon: PreOrders },
  { title: "Steam", icon: Steam },
];

const IconBar = () => {
  return (
    <div className="relative container mx-auto px-[36px] z-10">
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
              <div key={title} className="flex flex-col items-center group">
                <Image
                  src={icon}
                  alt={title}
                  className="size-[14px] min-[530px]:size-[19px] sm:size-[24px] md:size-[36px] lg:size-[48px] xl:size-[54px] 2xl:size-[60px] group-hover:-translate-y-[2px] transition-transform duration-200"
                />
                <p className="text-[7px] sm:font-medium min-[530px]:text-[8px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] group-hover:scale-110 transition-transform duration-200">
                  {title}
                </p>
              </div>
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
