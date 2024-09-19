import "../_components/catalog.css";
import Image from "next/image";
import mainCharacterImage from "../../../public/images/home/catalog/character.webp";
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

      <div>
        <p className="font-primaryFont text-[100px] font-bold italic text-white text-end">
          EXPLORE OUR
        </p>

        <p className="font-primaryFont text-[100px] font-bold italic text-white text-end">
          CATALOGUE
        </p>

        <div className="w-[370px]">
          <p className="font-primaryFont text-[28px] font-light  text-white text-end">
            THERE ARE THOUSANDS OF GAMES WAITING FOR YOU TO EXPLORE. BROWSE BY
            GENRE, FEATURES,PRICE, AND MORE TO FIND YOUR NEXT FAVORITE GAME.
          </p>
        </div>

        <div className="w-[600px]">
          <p className="font-primaryFont text-[28px] font-light  text-white text-end">
            THERE ARE THOUSANDS OF GAMES WAITING FOR YOU TO EXPLORE. BROWSE BY
            GENRE, FEATURES,PRICE, AND MORE TO FIND YOUR NEXT FAVORITE GAME.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
