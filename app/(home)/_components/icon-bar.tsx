import Image from "next/image";
import IconBarBackground from "../../../public/images/home/icon-bar/icon-bar-background.png";

import Games from "../../../public/images/home/icon-bar/PSController.png";
import GiftCards from "../../../public/images/home/icon-bar/GiftCard.png";
import EMoeny from "../../../public/images/home/icon-bar/E-commerce.png";
import PreOders from "../../../public/images/home/icon-bar/OrderCompleted.png";
import Steam from "../../../public/images/home/icon-bar/Steam.png";

const IconBar = () => {
  return (
    <div className="relative flex items-center justify-center mt-[40px]">
      <Image src={IconBarBackground} alt="Main Character" />

      {/* Center the absolute div and justify-between for icons */}
      <div className="flex items-center justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[60%]">
        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={Games}
            alt="Games icon"
            className="mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150"
          />
          <p className="text-white font-primaryFont font-semibold text-[20px]">
            Games
          </p>
        </div>
        <div className="h-[80px] w-[1px] bg-white"></div>

        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={GiftCards}
            alt="Gift cards icon"
            className="mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150"
          />
          <p className="text-white font-primaryFont font-semibold text-[20px]">
            Gift Cards
          </p>
        </div>

        <div className="h-[80px] w-[1px] bg-white"></div>

        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={EMoeny}
            alt="E-money icon"
            className="mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150"
          />
          <p className="text-white font-primaryFont font-semibold text-[20px]">
            E-Money
          </p>
        </div>

        <div className="h-[80px] w-[1px] bg-white"></div>

        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={PreOders}
            alt="Pre-orders icon"
            className="mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150"
          />
          <p className="text-white font-primaryFont font-semibold text-[20px]">
            Pre-Orders
          </p>
        </div>

        <div className="h-[80px] w-[1px] bg-white"></div>

        <div className="text-center flex flex-col justify-center items-center group">
          <Image
            src={Steam}
            alt="Steam icon"
            className="mb-1 group-hover:-translate-y-[5%] group-hover:transition-transform group-hover:duration-150"
          />
          <p className="text-white font-primaryFont font-semibold text-[20px]">
            Steam
          </p>
        </div>
      </div>
    </div>
  );
};

export default IconBar;
