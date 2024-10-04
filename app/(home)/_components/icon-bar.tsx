import Image from "next/image";
import IconBarBackground from "../../../public/images/home/icon-bar/icon-bar-background.png";

import Games from "../../../public/images/home/icon-bar/PSController.png";
import GiftCards from "../../../public/images/home/icon-bar/GiftCard.png";
import EMoeny from "../../../public/images/home/icon-bar/E-commerce.png";
import PreOders from "../../../public/images/home/icon-bar/OrderCompleted.png";
import Steam from "../../../public/images/home/icon-bar/Steam.png";

const IconBar = () => {
  return (
    <div className="relative flex items-center justify-center mt-[40px] z-40">
      <Image src={IconBarBackground} alt="Main Character" className="px-8 h-[32px] md:h-20 lg:h-24 xl:h-28 2xl:h-[136px] w-full xl:max-w-full 2xl:max-w-[80%]" />

      {/* Center the absolute div and justify-between for icons */}
      <div className="flex items-center justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[60%] text-[7px] md:text-xs lg:text-lg xl:text-xl">
        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={Games}
            alt="Games icon"
            className="xl:xl:mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150 w-[14.21px] h-[14.21px] md:w-7 md:h-7 lg:w-10 lg:h-10 2xl:h-14 2xl:w-14"
          />
          <p className="text-white font-primaryFont font-semibold">
            Games
          </p>
        </div>
        <div className="h-[10.89px] md:h-6 xl:h-16 2xl:h-20 w-[1px] bg-white"></div>

        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={GiftCards}
            alt="Gift cards icon"
            className="xl:mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150 w-[14.21px] h-[14.21px] md:w-7 md:h-7 lg:w-10 lg:h-10 2xl:h-14 2xl:w-14"
          />
          <p className="text-white font-primaryFont font-semibold">
            Gift Cards
          </p>
        </div>

        <div className="h-[10.89px] md:h-6 xl:h-16 2xl:h-20 w-[1px] bg-white"></div>

        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={EMoeny}
            alt="E-money icon"
            className="xl:mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150 w-[14.21px] h-[14.21px] md:w-7 md:h-7 lg:w-10 lg:h-10 2xl:h-14 2xl:w-14"
          />
          <p className="text-white font-primaryFont font-semibold">
            E-Money
          </p>
        </div>

        <div className="h-[10.89px] md:h-6 xl:h-16 2xl:h-20 w-[1px] bg-white"></div>

        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={PreOders}
            alt="Pre-orders icon"
            className="xl:mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150 w-[14.21px] h-[14.21px] md:w-7 md:h-7 lg:w-10 lg:h-10 2xl:h-14 2xl:w-14"
          />
          <p className="text-white font-primaryFont font-semibold">
            Pre-Orders
          </p>
        </div>

        <div className="h-[10.89px] md:h-6 xl:h-16 2xl:h-20 w-[1px] bg-white"></div>

        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={Steam}
            alt="Steam icon"
            className="xl:mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150 w-[14.21px] h-[14.21px] md:w-7 md:h-7 lg:w-10 lg:h-10 2xl:h-14 2xl:w-14"
          />
          <p className="text-white font-primaryFont font-semibold">
            Steam
          </p>
        </div>
      </div>
    </div>
  );
};

export default IconBar;