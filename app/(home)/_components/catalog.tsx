import "../_components/catalog.css";
import Image from "next/image";
import mainCharacterImage from "../../../public/images/home/catalog/character.webp";
import { Button } from "@/components/ui/button";
const Catalog = () => {
  return (
    <div className="catalog-section-background relative">
      <div className="absolute top-0 left-[-380px]">
        {/* <Image
          src={mainCharacterImage}
          alt="Main Character"
          width={1724}
          className=""
        /> */}
      </div>

      <div className="bg-[#eeaac1] flex items-center justify-end">
        <div>
          <p className="font-primaryFont text-[100px] font-bold italic text-white text-end">
            EXPLORE OUR
          </p>
          <p className="font-primaryFont text-[100px] font-bold italic text-white text-end">
            CATALOGUE
          </p>

          <div className="h-[1.5px] bg-white"></div>
          <div className="w-full flex items-center justify-end  bg-fuchsia-400 mb-[80px]">
            <p className="font-primaryFont text-[28px] font-light  text-white text-end w-[370px]">
              THERE ARE THOUSANDS OF GAMES WAITING FOR YOU TO EXPLORE. BROWSE BY
              GENRE, FEATURES,PRICE, AND MORE TO FIND YOUR NEXT FAVORITE GAME.
            </p>
          </div>

          <div className="w-full flex items-center justify-end  bg-fuchsia-400">
            <p className="w-[600px] font-primaryFont text-[28px] font-light  text-white text-end">
              THERE ARE THOUSANDS OF GAMES WAITING FOR YOU TO EXPLORE. BROWSE BY
              GENRE, FEATURES,PRICE, AND MORE TO FIND YOUR NEXT FAVORITE GAME.
            </p>
          </div>

          <Button>View All Games</Button>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
