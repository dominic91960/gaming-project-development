import Image from "next/image";
import "../_components/home.css";
import mainCharacterImage from "../../../public/images/home/home-page-main-character.png";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="background-home-div relative bg-black h-max">
      <div className="mx-auto container">
        <div className="absolute ">
          <Image src={mainCharacterImage} alt="Main Character" height={1070} />
        </div>

        <div className="pt-[125px] pl-[65px]">
          <p className="font-primaryFont text-[130px] font-medium text-white leading-none">
            GBLACK MYTH
          </p>
          <p className="font-primaryFont  text-[149px] font-bold text-white leading-none">
            WUKONG
          </p>
          <div className="h-1 w-[1000px] bg-white mt-8"></div>
          <p className="text-white font-semibold text-[17px] w-[600px] leading-tight mt-6 mb-8">
            Black Myth: Wukong is an action RPG rooted in Chinese mythology. You
            shall set out as the Destined One to venture into the challenges and
            marvels ahead, to uncover the obscured truth beneath the veil of a
            glorious legend from the past.
          </p>

          <Button className="bg-[#FB5A00] px-10">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}
