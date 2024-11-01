"use client";

import React, { useContext, useEffect, useState } from "react";
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
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { LuSearchX } from "react-icons/lu";

import Footer from "@/components/footer/footer";
import samplePic from "@/public/images/sample-pic.png";
import WishlistedGames from "./components/wishlisted-games";
import ProductCard from "@/components/product-card/product-card";
import axiosInstance from "@/axios/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import { useWishlistContext } from "@/context/WishListContext";
import { useRouter } from "next/navigation";

const profile = {
  profileImage: samplePic.src,
  name: "Lahiru Rathnayake",
};

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
  id: string;
  poster: string;
  name: string;
  desc: string;
  rating: number;
  originalPrice: number;
  discountPrice: number;
  releaseDate: string;
  stockStatus: string;
}

export default function WishlistPage() {
  // Pagination states
  const [wishlistedGames, setWishlistedGames] = useState<WishlistedGame[]>([]);
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<WishlistedGame[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistedGame[]>([]);
  const [recommendedGames, setRecommendedGames] = useState<WishlistedGame[]>(
    []
  );
  const totalPages = Math.ceil(wishlistedGames.length / productsPerPage);
  const { user } = useContext(AuthContext) || {};
  const { wishListGameIds } = useWishlistContext();
  // const {user} = useContext(AuthContext) || {};
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const res = await axiosInstance.get("/wishlists/" + user.id);
        const wishlistData = res.data.items.map((item: any) => {
          return {
            id: item.game.id,
            poster: item.game.cardImage,
            name: item.game.name,
            desc: item.game.cardDescription,
            rating: item.game.rating,
            originalPrice: item.game.regularPrice,
            discountPrice: item.game.sellingPrice,
            releaseDate: item.game.releaseDate,
            stockStatus: item.game.stockStatus,
          };
        });

        // setWishlistedGames(wishlistData);
        setWishlist(wishlistData);

        const resREcommended = await axiosInstance.get(
          "/games?sort=popularity&limit=5"
        );
        console.log(resREcommended.data);

        resREcommended.data.data.map((item: any) => {
          setRecommendedGames((prev) => [
            ...prev,
            {
              id: item.id,
              poster: item.cardImage,
              name: item.displayName,
              desc: item.cardDescription,
              rating: item.averageRating,
              originalPrice: item.regularPrice,
              discountPrice: item.sellingPrice,
              releaseDate: item.releaseDate,
              stockStatus: item.stockStatus,
            },
          ]);
        });
      }
    };
    getData();
  }, [user]);

  // Set wishlist data
  useEffect(() => {
    setWishlistedGames(wishlist);
  }, [wishlist]);

  // Determines which products are displayed
  useEffect(() => {
    const removeDuplicates = (games: WishlistedGame[]) => {
      const uniqueGames: WishlistedGame[] = [];
      const gameIds = new Set();

      games.forEach((game) => {
        if (!gameIds.has(game.id)) {
          uniqueGames.push(game);
          gameIds.add(game.id);
        }
      });

      return uniqueGames;
    };

    const startIndex = (currentPage - 1) * productsPerPage;

    const uniqueWishlistedGames = removeDuplicates(wishlistedGames);

    setDisplayedProducts(
      uniqueWishlistedGames.slice(startIndex, startIndex + productsPerPage)
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

  // Filter products by name
  function filterProducts(searchString: string) {
    setCurrentPage(1);

    const filteredGames = wishlist.filter((product) =>
      product.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setWishlistedGames(filteredGames);
  }

  // Sort Products
  function sortProducts(sortValue: string) {
    setCurrentPage(1);
    let sortedGames = wishlistedGames;

    switch (sortValue) {
      case "price_asc":
        sortedGames = wishlistedGames.sort(
          (a: WishlistedGame, b: WishlistedGame) => {
            const firstPrice =
              a.discountPrice > 0 ? a.discountPrice : a.originalPrice;
            const secondPrice =
              b.discountPrice > 0 ? b.discountPrice : b.originalPrice;
            return firstPrice - secondPrice;
          }
        );
        break;

      case "price_des":
        sortedGames = wishlistedGames.sort(
          (a: WishlistedGame, b: WishlistedGame) => {
            const firstPrice =
              a.discountPrice > 0 ? a.discountPrice : a.originalPrice;
            const secondPrice =
              b.discountPrice > 0 ? b.discountPrice : b.originalPrice;
            return secondPrice - firstPrice;
          }
        );
        break;

      case "date_asc":
        sortedGames = wishlistedGames.sort(
          (a: WishlistedGame, b: WishlistedGame) => {
            const firstDate = new Date(a.releaseDate);
            const secondDate = new Date(b.releaseDate);

            return firstDate.getTime() - secondDate.getTime();
          }
        );
        break;

      case "date_des":
        sortedGames = wishlistedGames.sort(
          (a: WishlistedGame, b: WishlistedGame) => {
            const firstDate = new Date(a.releaseDate);
            const secondDate = new Date(b.releaseDate);

            return secondDate.getTime() - firstDate.getTime();
          }
        );
        break;

      case "a_z":
        sortedGames = wishlistedGames.sort(
          (a: WishlistedGame, b: WishlistedGame) => a.name.localeCompare(b.name)
        );
        break;

      case "z_a":
        sortedGames = wishlistedGames.sort(
          (a: WishlistedGame, b: WishlistedGame) => b.name.localeCompare(a.name)
        );
        break;
    }

    const startIndex = (currentPage - 1) * productsPerPage;
    const productsToDisplay = sortedGames.slice(
      startIndex,
      startIndex + productsPerPage
    );

    setDisplayedProducts(productsToDisplay);
  }

  return (
    <>
      <section className="bg-[#051301] font-primaryFont text-white">
        <div className="bg-gradient-to-b from-black to-transparent to-20%">
          {/* Container for the rest of the content */}
          <div className="container mx-auto px-[36px] pb-[20px] 2xl:pb-[80px]">
            {/* Profile details */}
            <div className="flex items-center gap-[0.5em] text-[10px] pt-[4em] mb-[2em] sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
              <div className="relative size-[25px] sm:size-[45px] md:size-[60px] lg:size-[75px] xl:size-[90px] 2xl:size-[100px]">
                <Image
                  src={user?.profile_image || profile.profileImage}
                  alt={profile.name}
                  className="w-full rounded-full"
                  fill
                />
              </div>
              <h4 className="font-bold">
                {user?.firstName.charAt(0).toUpperCase() +
                  user?.firstName.slice(1) +
                  " " +
                  user?.lastName.charAt(0).toUpperCase() +
                  user?.lastName.slice(1)}
              </h4>
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
                  placeholder="Search by name"
                  className="w-[25ch] h-fit p-0 text-[1em] border-none rounded-none placeholder:text-white/70"
                  onChange={(e) => filterProducts(e.target.value)}
                />
                <CiSearch className="text-[1.2em]" />
              </div>

              <Select onValueChange={(value) => sortProducts(value)}>
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

            <p className="text-[9px] mt-[1.2em] mb-[1.7em] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] 2xl:text-[18px]">
              Wishlist is a game key store offering top titles at unbeatable
              prices. Find and purchase game keys quickly and securely.
            </p>

            {/* Wishlisted Games */}
            {wishlist.length < 1 ? (
              <div className="h-[18em] bg-white/5 flex flex-col items-center justify-center text-[8px] pb-[1em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                <MdOutlinePlaylistRemove className="text-[4em] opacity-80 animate-pulse" />
                <p className="mt-[0.5em]">
                  Your wishlist is currently empty. Start adding games you love!
                </p>
              </div>
            ) : displayedProducts.length < 1 ? (
              <div className="h-[18em] bg-white/5 flex flex-col items-center justify-center text-[8px] pb-[1em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                <LuSearchX className="text-[4em] opacity-80 animate-pulse" />
                <p className="mt-[0.5em]">
                  Sorry, we couldn&apos;t find any results for that name.
                </p>
              </div>
            ) : (
              <WishlistedGames
                displayedProducts={displayedProducts}
                productsPerPage={productsPerPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}

            {/* Recommended Games */}
            <h4 className="font-medium text-[8px] mt-[1.6em] mb-[1em] sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
              You may also like...
            </h4>
            <div className="flex justify-between">
              {recommendedGames.map(
                (
                  {
                    id,
                    poster,
                    name,
                    desc,
                    rating,
                    discountPrice,
                    originalPrice,
                    stockStatus,
                  },
                  index
                ) =>
                  index < productsPerPage && (
                    <ProductCard
                      id={id}
                      key={index}
                      poster={poster}
                      name={name}
                      desc={desc}
                      rating={rating}
                      discountPrice={discountPrice}
                      originalPrice={originalPrice}
                      stockStatus={stockStatus}
                      wishList={false}
                    />
                  )
              )}
            </div>
            {/* View all games button */}
            <div className="flex justify-end text-[7px] pt-[2.2em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
              <Button
                variant="gaming"
                className="h-fit capitalize text-[1em] px-[2.26em] py-[0.5em]"
                onClick={() => router.push("/shop-page")}
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
