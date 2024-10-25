"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdVerified } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaList } from "react-icons/fa6";
import { LiaAngleRightSolid } from "react-icons/lia";

import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import samplePic from "@/public/images/sample-pic.png";
import WishlistedGames from "./components/wishlisted-games";
import ProductCard from "@/components/product-card/product-card";

const profile = {
  profileImage: samplePic.src,
  name: "Lahiru Rathnayake",
};

const wishlist = [
  {
    poster: samplePic.src,
    name: "Greed Fall",
    desc: "Explore uncharted new lands as you set foot on a remote island seeping with magic, and filled with riches, lost secrets, and fantastic creatures.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
    releaseDate: "2019-09-10",
  },
  {
    poster: samplePic.src,
    name: "Cyberpunk 2077",
    desc: "An open-world RPG set in the dystopian future, where you can explore a massive city and complete missions to gain power and influence.",
    rating: 4.5,
    originalPrice: 199,
    discountPrice: 249,
    releaseDate: "2020-12-10",
  },
  {
    poster: samplePic.src,
    name: "Assassin's Creed Valhalla",
    desc: "Join Eivor and lead a Viking clan to glory. Build settlements, wage wars, and uncover a grand storyline in this action-packed RPG.",
    rating: 4.8,
    originalPrice: 329,
    discountPrice: 379,
    releaseDate: "2020-11-10",
  },
  {
    poster: samplePic.src,
    name: "FIFA 2023",
    desc: "Experience the latest iteration of the iconic soccer series with enhanced graphics and real-life player mechanics.",
    rating: 4.2,
    originalPrice: 249,
    discountPrice: 299,
    releaseDate: "2022-09-30",
  },
  {
    poster: samplePic.src,
    name: "NBA 2K23",
    desc: "Hit the courts with the latest in basketball simulation. Enjoy an authentic NBA experience with realistic gameplay and team management.",
    rating: 4.0,
    originalPrice: 199,
    discountPrice: 259,
    releaseDate: "2022-09-08",
  },
  {
    poster: samplePic.src,
    name: "Call of Duty: Modern Warfare",
    desc: "Enter the battlefield in this intense first-person shooter with advanced weapons, high-end graphics, and a gripping campaign mode.",
    rating: 4.7,
    originalPrice: 299,
    discountPrice: 349,
    releaseDate: "2019-10-25",
  },
  {
    poster: samplePic.src,
    name: "Red Dead Redemption 2",
    desc: "Step into the Wild West with this stunning open-world game where you can explore a vast world filled with danger and intrigue.",
    rating: 4.9,
    originalPrice: 399,
    discountPrice: 499,
    releaseDate: "2018-10-26",
  },
  {
    poster: samplePic.src,
    name: "Watch Dogs Legion",
    desc: "Join the resistance and hack your way through London in this thrilling open-world adventure that combines action and technology.",
    rating: 4.1,
    originalPrice: 279,
    discountPrice: 339,
    releaseDate: "2020-10-29",
  },
  {
    poster: samplePic.src,
    name: "Far Cry 6",
    desc: "Fight to liberate a tropical island from a ruthless dictator in this action-packed first-person shooter.",
    rating: 4.4,
    originalPrice: 259,
    discountPrice: 309,
    releaseDate: "2021-10-07",
  },
  {
    poster: samplePic.src,
    name: "Spider-Man: Miles Morales",
    desc: "Swing into action as Miles Morales in this follow-up to the hit Spider-Man game, featuring new powers and an exciting storyline.",
    rating: 4.9,
    originalPrice: 349,
    discountPrice: 429,
    releaseDate: "2020-11-12",
  },
  {
    poster: samplePic.src,
    name: "The Last of Us Part II",
    desc: "Experience the emotionally charged and action-filled sequel to the critically acclaimed The Last of Us, with a deep and engaging story.",
    rating: 5,
    originalPrice: 399,
    discountPrice: 499,
    releaseDate: "2020-06-19",
  },
  {
    poster: samplePic.src,
    name: "Horizon Zero Dawn",
    desc: "Explore a beautiful post-apocalyptic world filled with mechanical creatures and uncover the secrets of the past.",
    rating: 4.8,
    originalPrice: 299,
    discountPrice: 379,
    releaseDate: "2017-02-28",
  },
  {
    poster: samplePic.src,
    name: "God of War",
    desc: "Join Kratos on an epic journey through Norse mythology in this action-adventure game with breathtaking visuals and a gripping story.",
    rating: 4.9,
    originalPrice: 349,
    discountPrice: 449,
    releaseDate: "2018-04-20",
  },
  {
    poster: samplePic.src,
    name: "Halo Infinite",
    desc: "Return to the world of Halo in this thrilling installment with expansive environments, powerful weapons, and intense multiplayer action.",
    rating: 4.6,
    originalPrice: 299,
    discountPrice: 349,
    releaseDate: "2021-12-08",
  },
  {
    poster: samplePic.src,
    name: "Doom Eternal",
    desc: "Take on the role of the Doom Slayer in this fast-paced and brutal first-person shooter with non-stop action.",
    rating: 4.5,
    originalPrice: 249,
    discountPrice: 299,
    releaseDate: "2020-03-20",
  },
  {
    poster: samplePic.src,
    name: "Wolfenstein II: The New Colossus",
    desc: "Fight to liberate America from Nazi control in this alternate-history first-person shooter with high-stakes missions and gripping gameplay.",
    rating: 4.3,
    originalPrice: 229,
    discountPrice: 279,
    releaseDate: "2017-10-27",
  },
  {
    poster: samplePic.src,
    name: "Final Fantasy XV",
    desc: "Join Prince Noctis and his friends on an epic journey in this action-packed role-playing game with stunning visuals and engaging combat.",
    rating: 4.8,
    originalPrice: 369,
    discountPrice: 449,
    releaseDate: "2016-11-29",
  },
  {
    poster: samplePic.src,
    name: "Ghost of Tsushima",
    desc: "Become a samurai warrior and defend your homeland from invaders in this visually stunning open-world game.",
    rating: 4.9,
    originalPrice: 349,
    discountPrice: 429,
    releaseDate: "2020-07-17",
  },
  {
    poster: samplePic.src,
    name: "Resident Evil Village",
    desc: "Survive the horrors of a mysterious village in this atmospheric and terrifying entry in the Resident Evil series.",
    rating: 4.7,
    originalPrice: 299,
    discountPrice: 369,
    releaseDate: "2021-05-07",
  },
  {
    poster: samplePic.src,
    name: "Elden Ring",
    desc: "Explore a vast open world and take on powerful enemies in this highly anticipated action RPG from the creators of Dark Souls.",
    rating: 5,
    originalPrice: 399,
    discountPrice: 499,
    releaseDate: "2022-02-25",
  },
];

const recommendedGames = [
  {
    poster: samplePic.src,
    name: "Greed Fall",
    desc: "Explore uncharted new lands as you set foot on a remote island seeping with magic, and filled with riches, lost secrets, and fantastic creatures.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 0,
  },
  {
    poster: samplePic.src,
    name: "Cyberpunk 2077",
    desc: "An open-world RPG set in the dystopian future, where you can explore a massive city and complete missions to gain power and influence.",
    rating: 4.5,
    originalPrice: 199,
    discountPrice: 249,
  },
  {
    poster: samplePic.src,
    name: "Assassin's Creed Valhalla",
    desc: "Join Eivor and lead a Viking clan to glory. Build settlements, wage wars, and uncover a grand storyline in this action-packed RPG.",
    rating: 4.8,
    originalPrice: 329,
    discountPrice: 379,
  },
  {
    poster: samplePic.src,
    name: "FIFA 2023",
    desc: "Experience the latest iteration of the iconic soccer series with enhanced graphics and real-life player mechanics.",
    rating: 4.2,
    originalPrice: 249,
    discountPrice: 299,
  },
  {
    poster: samplePic.src,
    name: "NBA 2K23",
    desc: "Hit the courts with the latest in basketball simulation. Enjoy an authentic NBA experience with realistic gameplay and team management.",
    rating: 4.0,
    originalPrice: 199,
    discountPrice: 259,
  },
];

const selectValues = [
  {
    value: "price_asc",
    text: "Price: Low to High",
  },
  {
    value: "price_des",
    text: "Price: High to Low",
  },
  {
    value: "date_des",
    text: "Date: Newest First",
  },
  {
    value: "date_asc",
    text: "Date: Oldest First",
  },
  {
    value: "a_z",
    text: "Alphabet: A-Z",
  },
  {
    value: "z_a",
    text: "Alphabet: Z-A",
  },
];

interface WishlistedGame {
  poster: string;
  name: string;
  desc: string;
  rating: number;
  originalPrice: number;
  discountPrice: number;
  releaseDate: string;
}

export default function WishlistPage() {
  // Pagination states
  const [wishlistedGames, setWishlistedGames] = useState<WishlistedGame[]>([]);
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<WishlistedGame[]>(
    []
  );
  const totalPages = Math.ceil(wishlistedGames.length / productsPerPage);

  // Product search state
  const [searchName, setSearchName] = useState("");

  // Sort states
  const [sortState, setSortState] = useState("none");

  // Set wishlist data
  useEffect(() => {
    setWishlistedGames(wishlist);
    const date = new Date(wishlist[0].releaseDate);
    console.log(date.getTime());
  }, []);

  // Determines which products are displayed
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;

    setDisplayedProducts(
      wishlistedGames.slice(startIndex, startIndex + productsPerPage)
    );
  }, [currentPage, productsPerPage, wishlistedGames]);

  // Calculates productsPerPage according to screen size
  useEffect(() => {
    const handleResize = () => {
      setCurrentPage(1);
      const screenWidth = window.innerWidth;

      switch (true) {
        case screenWidth < 550:
          setProductsPerPage(3);
          break;
        case screenWidth >= 550 && screenWidth < 1280:
          setProductsPerPage(4);
          break;
        case screenWidth >= 1280:
          setProductsPerPage(5);
          break;
        default:
          setProductsPerPage(3);
          break;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const filteredGames = wishlist.filter((product) =>
      product.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setWishlistedGames(filteredGames);
  }, [searchName]);

  useEffect(() => {
    const sortMethods = {
      none: { method: () => null },
      price_asc: {
        method: (a: WishlistedGame, b: WishlistedGame) =>
          a.discountPrice - b.discountPrice,
      },
      price_des: {
        method: (a: WishlistedGame, b: WishlistedGame) =>
          b.discountPrice - a.discountPrice,
      },
      date_asc: {
        method: (a: WishlistedGame, b: WishlistedGame) => {
          const firstDate = new Date(a.releaseDate);
          const secondDate = new Date(b.releaseDate);

          return firstDate.getTime() - secondDate.getTime();
        },
      },
      date_des: {
        method: (a: WishlistedGame, b: WishlistedGame) => {
          const firstDate = new Date(a.releaseDate);
          const secondDate = new Date(b.releaseDate);

          return secondDate.getTime() - firstDate.getTime();
        },
      },
      a_z: {
        method: (a: WishlistedGame, b: WishlistedGame) =>
          a.name.localeCompare(b.name),
      },
      z_a: {
        method: (a: WishlistedGame, b: WishlistedGame) =>
          b.name.localeCompare(a.name),
      },
    };

    const sortedGames = wishlistedGames.sort(sortMethods[sortState].method);

    const startIndex = (currentPage - 1) * productsPerPage;

    setDisplayedProducts(
      sortedGames.slice(startIndex, startIndex + productsPerPage)
    );
  }, [currentPage, productsPerPage, sortState, wishlistedGames]);

  return (
    <>
      <ProductSearchBar />
      <Navbar />
      <section className="bg-[#051301] font-primaryFont text-white">
        <div className="bg-gradient-to-b from-black to-transparent to-20%">
          {/* Container for the rest of the content */}
          <div className="container mx-auto px-[36px] pb-[20px] 2xl:pb-[80px]">
            {/* Profile details */}
            <div className="flex items-center gap-[0.5em] text-[10px] pt-[4em] mb-[2em] sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
              <div className="relative size-[25px] sm:size-[45px] md:size-[60px] lg:size-[75px] xl:size-[90px] 2xl:size-[100px]">
                <Image
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full rounded-full"
                  fill
                />
              </div>
              <h4 className="font-bold">{profile.name}</h4>
              <MdVerified className="text-[#0BDB45]" />
            </div>

            <div className="flex items-center gap-[0.3em] font-medium text-[12px] mb-[0.8em] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px]">
              <FaRegHeart />
              <p>Your Wishlist &#40;{wishlist.length}&#41;</p>
            </div>

            <div className="flex justify-between bg-white/5 text-[7px] p-[0.625em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
              <div className="w-fit flex items-center gap-[0.5em] bg-white/20 px-[1em] py-[0.5em]">
                <Input
                  type="text"
                  value={searchName}
                  placeholder="Search by name"
                  className="w-[25ch] h-fit p-0 text-[1em] border-none rounded-none placeholder:text-white/70"
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <CiSearch className="text-[1.2em]" />
              </div>

              <Select onValueChange={(value) => setSortState(value)}>
                <SelectTrigger className="w-[22ch] h-fit bg-white/20 border-none rounded-none text-[7px] px-[1em] py-[0.3em] sm:text-[10px] sm:py-[0.5em] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
                  <FaList className="-translate-y-[0.15em] sm:-translate-y-0" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#4B4B4B] text-white border-none rounded-none">
                  {selectValues.map(({ value, text }, index) => (
                    <SelectItem
                      key={index}
                      value={value}
                      className="h-fit text-[7px] ps-[6ch] pe-[1em] py-[1em] rounded-none sm:text-[8px] sm:ps-[4ch] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
                    >
                      {text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-[9px] 2xl:text-[18px] mt-[1.2em] mb-[1.7em]">
              Wishlist is a game key store offering top titles at unbeatable
              prices. Find and purchase game keys quickly and securely.
            </p>

            {/* Wishlisted Games */}
            {displayedProducts.length > 0 ? (
              <WishlistedGames
                displayedProducts={displayedProducts}
                productsPerPage={productsPerPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            ) : (
              <div className="h-[18em] flex items-center justify-center pt-[4em]">
                <p>no products</p>
              </div>
            )}

            {/* Recommended Games */}
            <h4 className="font-medium text-[8px] mt-[1.6em] mb-[1em] sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
              You may also like...
            </h4>
            <div className="flex justify-between">
              {recommendedGames.map(
                (
                  { poster, name, desc, rating, discountPrice, originalPrice },
                  index
                ) =>
                  index < productsPerPage && (
                    <ProductCard
                      key={index}
                      poster={poster}
                      name={name}
                      desc={desc}
                      rating={rating}
                      discountPrice={discountPrice}
                      originalPrice={originalPrice}
                    />
                  )
              )}
            </div>
            {/* View all games button */}
            <div className="flex justify-end text-[7px] pt-[2.2em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
              <Button
                variant="gaming"
                className="h-fit capitalize text-[1em] px-[2.26em] py-[0.5em]"
              >
                See more <LiaAngleRightSolid />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
