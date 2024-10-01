import "../_components/catalog.css";
import Image from "next/image";
import mainCharacterImage from "../../../public/images/home/catalog/character.webp";
import { Button } from "@/components/ui/button";
const Catalog = () => {
  return (
    <div className="catalog-section-background relative">
      <div className="absolute top-0 left-[-380px]">
        <Image
          src={mainCharacterImage}
          alt="Main Character"
          width={1724}
          className=""
        />
      </div>

      <div className="flex items-center justify-end absolute top-[300px] right-[200px]">
        <div>
          <p className="font-primaryFont text-[100px] font-extrabold italic text-white text-end leading-none mb-2">
            EXPLORE OUR
          </p>
          <p className="font-primaryFont text-[100px] font-extrabold italic text-white text-end leading-none mb-[50px]">
            CATALOGUE
          </p>

          <div className="h-[3px] bg-white mb-[60px]"></div>
          <div className="w-full flex items-center justify-end   mb-[60px]">
            <p className="font-primaryFont text-[28px] font-light  text-white text-end w-[370px]">
              THERE ARE THOUSANDS OF GAMES WAITING FOR YOU TO EXPLORE. BROWSE BY
              GENRE, FEATURES,PRICE, AND MORE TO FIND YOUR NEXT FAVORITE GAME.
            </p>
          </div>

          <div className="flex flex-col items-end justify-end">
            <div className="w-full flex items-center justify-end mb-8">
              <p className="w-[600px] font-primaryFont text-[28px] font-light  text-white text-end">
                THERE ARE THOUSANDS OF GAMES WAITING FOR YOU TO EXPLORE. BROWSE
                BY GENRE, FEATURES,PRICE, AND MORE TO FIND YOUR NEXT FAVORITE
                GAME.
              </p>
            </div>

            <Button
              variant="gaming"
              className="text-[24px] py-7 px-10 hover:bg-primary/90 hover:text-white"
            >
              View All Games
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
