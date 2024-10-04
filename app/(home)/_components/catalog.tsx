import Image from "next/image";

import { Button } from "@/components/ui/button";
import { LiaAngleRightSolid } from "react-icons/lia";

import mainCharacterImage from "../../../public/images/home/catalog/character.webp";
import "../_components/catalog.css";

const Catalog = () => {
  return (
    <section className="relative catalog-section-background font-primaryFont text-[9px] sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[26px] 2xl:text-[32px]] text-white">
      {/* Top gradient */}
      <div className="absolute top-0 w-full h-2/5 bg-gradient-to-b from-black to-transparent"></div>

      <div className="container mx-auto px-[36px] text-right">
        <div className="character-image-position h-full absolute bottom-0 left-0 flex items-end">
          <Image
            src={mainCharacterImage}
            alt="Main Character"
            className="h-full max-h-[1070px] w-fit origin-bottom-left"
          />
        </div>

        <div className="relative z-10 h-full py-[3em]">
          <p className="font-extrabold italic text-[3.3em] text-white leading-none my-[0.3em]">
            EXPLORE OUR <br /> CATALOGUE
          </p>

          <hr className="w-[22.5em] ms-auto mb-[2.5em]" />
          <p className="font-light text-white w-[20ch] ms-auto mb-[2.5em]">
            THERE ARE THOUSANDS OF GAMES WAITING FOR YOU TO EXPLORE. BROWSE BY
            GENRE, FEATURES,PRICE, AND MORE TO FIND YOUR NEXT FAVORITE GAME.
          </p>

          {/* <p className="font-light text-white w-[22ch] ms-auto mb-[2.5em]"> */}
          <p className="font-light text-white w-[34ch] ms-auto mb-[2.5em]">
            THERE ARE THOUSANDS OF GAMES WAITING FOR YOU TO EXPLORE. BROWSE BY
            GENRE, FEATURES,PRICE, AND MORE TO FIND YOUR NEXT FAVORITE GAME.
          </p>

          <Button
            variant="gaming"
            className="text-[1em] px-[1em] py-[0.5em] h-fit"
          >
            View All Games <LiaAngleRightSolid />
          </Button>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Catalog;
