import React from "react";
import Image from "next/image";

interface CustomerCardProps {
  profilePic: string;
  username: string;
  name: string;
  orders: string;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  profilePic,
  username,
  name,
  orders,
}) => {
  return (
    <article
      className="relative mt-[28px] bg-white bg-opacity-[7%] border border-[#00FFA1] text-center sm:mt-[34px] md:mt-[40px] lg:mt-[46px] xl:mt-[50px] 2xl:mt-[55px]"
      style={{
        borderImage: `linear-gradient(to bottom, #00FFA1 0%, black 100%) 1`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 mx-auto -translate-y-1/2 size-[36px] flex items-center justify-center bg-[#00FFA1] rounded-full sm:size-[48px] md:size-[60px] lg:size-[72px] xl:size-[80px] 2xl:size-[90px]"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)",
        }}
      ></div>
      <Image
        src={profilePic}
        alt={username}
        className="absolute top-0 left-0 right-0 mx-auto -translate-y-1/2 rounded-full size-[32px] z-10 sm:size-[44px] md:size-[56px] lg:size-[64px] xl:size-[72px] 2xl:size-[80px]"
        width={80}
        height={80}
      />
      <div className="drop-shadow-[0px_5px_15px_#00FFA1] lg:drop-shadow-[0px_5px_20px_#00FFA1]">
        <div
          className="absolute top-0 left-0 right-0 mx-auto -translate-y-1/2 size-[32px] flex items-center justify-center bg-[#00FFA1] rounded-full -z-10 sm:size-[44px] md:size-[56px] lg:size-[64px] xl:size-[72px] 2xl:size-[80px]"
          style={{ clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)" }}
        ></div>
      </div>

      <div className="h-full bg-white bg-opacity-[7%] flex flex-col justify-between text-[7px] pt-[3em] backdrop-blur-md sm:text-[8px] sm:pt-[4em] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]">
        <p className="relative px-[0.5em] z-10">{username}</p>
        <p className="text-[8px] font-semibold px-[0.5em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
          {name}
        </p>
        <p className="bg-white font-bold text-black text-[7px] mt-[1em] px-[1em] py-[0.2em] rounded-[2px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px]">
          {orders} Orders
        </p>
      </div>
    </article>
  );
};

export default CustomerCard;
