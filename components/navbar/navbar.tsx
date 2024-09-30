"use client";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { IoIosArrowForward, IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import favorite from "@/public/images/navbar/favorite.png";
import cart from "@/public/images/navbar/cart.png";
import profile from "@/public/images/navbar/profile.png";
import ProfileDefault from "@/public/images/navbar/profile_default.jpg";
import "./navbar.css";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/axios/axiosInstance";

const categories = [
  {
    categoryName: "PC Games",
    platforms: ["Steam", "Ubisoft", "Origin", "Epic", "GOG"],
    genres: [
      "Action",
      "Adventure",
      "Role-playing",
      "Singleplayer",
      "Strategy",
      "Sports",
      "Multiplayer",
      "Fighting",
      "Racing",
      "Shooter",
    ],
  },
  {
    categoryName: "Xbox",
    platforms: [
      "Steam Xbox",
      "Ubisoft Xbox",
      "Origin Xbox",
      "Epic Xbox",
      "GOG Xbox",
    ],
    genres: [
      "Action Xbox",
      "Adventure Xbox",
      "Role-playing Xbox",
      "Singleplayer Xbox",
      "Strategy Xbox",
      "Sports Xbox",
      "Multiplayer Xbox",
      "Fighting Xbox",
      "Racing Xbox",
      "Shooter Xbox",
    ],
  },
  {
    categoryName: "PSN",
    platforms: [
      "Steam PSN",
      "Ubisoft PSN",
      "Origin PSN",
      "Epic PSN",
      "GOG PSN",
    ],
    genres: [
      "Action PSN",
      "Adventure PSN",
      "Role-playing PSN",
      "Singleplayer PSN",
      "Strategy PSN",
      "Sports PSN",
      "Multiplayer PSN",
      "Fighting PSN",
      "Racing PSN",
      "Shooter PSN",
    ],
  },
];

export default function Navbar() {
  const path = usePathname();
  const [isCategoryMenuToggled, setIsCategoryMenuToggled] = useState(false);
  const [isMobileNavToggled, setIsMobileNavToggled] = useState(false);

  const [isMenuOneVisible, setIsMenuOneVisible] = useState(true);
  const [isMenuTwoVisible, setIsMenuTwoVisible] = useState(false);
  const [isMenuThreeVisible, setIsMenuThreeVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const [subMenuData, setSubMenuData] = useState<string[]>([]);
  const { user } = useContext(AuthContext);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsMenuOneVisible(false);
    setIsMenuTwoVisible(true);
  };
  const handleCategorySubMenuSelect = (category: string, subMenu: string) => {
    setSelectedSubMenu(subMenu);
    setIsMenuTwoVisible(false);
    setIsMenuThreeVisible(true);
    const categoryData = categories.find((c) => c.categoryName === category);
    if (categoryData && subMenu in categoryData) {
      setSubMenuData(categoryData[subMenu as keyof typeof categoryData] as string[]);
    }
  };

  useEffect(() => {
    if (user) {
      // setIsMobileNavToggled(false);
      console.log("User:", user);
    }
  }
  , [user]);

  return (
    <section className="bg-[#0D0F10] font-primaryFont text-white sm:border-b-[#8C8C8C] sm:border-b relative">
      <div className="container mx-auto flex border-b-[#8C8C8C] border-b justify-between sm:border-none sm:pe-[4%]">
        {/* Categories button */}
        <button
          className="font-semibold text-[15px] capitalize bg-[#23262B] flex items-center gap-[0.4em] px-[0.8em] py-[0.4em] my-[0.5em]"
          onClick={() => setIsCategoryMenuToggled((prev) => !prev)}
        >
          <div className="space-y-[0.2em] pe-[0.1em]">
            <div className="w-[1.2em] h-0.5 bg-white"></div>
            <div className="w-[0.8em] h-0.5 bg-white"></div>
            <div className="w-[1.2em] h-0.5 bg-white"></div>
          </div>
          <h4>All categories</h4>
        </button>
        <div className="flex items-center font-semibold text-[15px] gap-x-[50px] md:gap-x-[96px] lg:gap-x-[115px] xl:gap-x-[130px] 2xl:gap-x-[144px]">
          {/* Desktop Navbar */}
          <nav className="hidden sm:flex uppercase gap-x-[20px] md:gap-x-[45px] lg:gap-x-[55px] xl:gap-x-[62px] 2xl:gap-x-[68px]">
            <Link
              href="/products"
              className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
            >
              Store
            </Link>
            <Link
              href="/about"
              className={path.startsWith("/about") ? "text-[#0BDB45]" : ""}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={path.startsWith("/contact") ? "text-[#0BDB45]" : ""}
            >
              Contact
            </Link>
          </nav>
          {/* Icons */}
          <div className="flex gap-x-[15px] md:gap-x-[27px]">
            <Link href="/">
              <Image src={favorite} alt="Favorites" />
            </Link>
            <Link href="/">
              <Image src={cart} alt="Cart" />
            </Link>
            <Link href="/sign-in">
              {user?.profile_image? <img
                src={user?.profile_image ? user?.profile_image : ProfileDefault}
                alt="Profile"
                className="rounded-full w-[25px] h-[25px] ring-1 ring-white"
                />: <Image src={profile} alt="Profile" />}
            </Link>
            <div 
            onClick={() => {
              axiosInstance.patch("/auth/logout");
              localStorage.clear();
              window.location.href = "/sign-in";
            }}
            className=" cursor-pointer">
              <IoIosLogOut className="text-[25px]" />
            </div>
          </div>
          {/* Toggle button */}
          <button
            className={`${
              isMobileNavToggled ? "animate-toggle-button" : ""
            } relative h-4 w-6 transition-opacity duration-300 sm:hidden`}
            onClick={() => setIsMobileNavToggled((prev) => !prev)}
          >
            <div className="absolute -mt-[0.5px] h-[1px] w-full rounded bg-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out before:absolute before:left-0 before:h-[1px] before:w-full before:-translate-y-[6px] before:rounded before:bg-white before:transition-transform before:duration-700 before:ease-in-out after:absolute after:left-0 after:h-[1px] after:w-full after:translate-y-[6px] after:rounded after:bg-white after:transition-transform after:duration-700 after:ease-in-out"></div>
          </button>
        </div>
      </div>
      {/* Mobile Navbar */}
      <nav
        className={`${
          isMobileNavToggled ? "flex flex-col gap-y-[2em] sm:hidden" : "hidden"
        } bg-[#0D0F10] origin-top animate-open-menu container mx-auto font-semibold text-[15px] uppercase py-[2em]`}
      >
        <Link
          href="/products"
          className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
        >
          Store
        </Link>
        <Link
          href="/about"
          className={path.startsWith("/about") ? "text-[#0BDB45]" : ""}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={path.startsWith("/contact") ? "text-[#0BDB45]" : ""}
        >
          Contact
        </Link>
      </nav>
      {/* Categories Menu */}
      <nav
        className={`${
          isCategoryMenuToggled
            ? "animate-category-menu"
            : "reverse-animate-category-menu"
        } origin-left absolute z-10 w-full sm:w-[400px] min-h-[80vh] bg-[#0D0F10] border border-[#75F94C] font-semibold text-[18px] p-[2em]`}
      >
        {/* Main category menu */}
        <div className={isMenuOneVisible ? "block" : "hidden"}>
          <div className="flex justify-between items-center text-[22px] mb-[2em]">
            <h3 className="font-medium">Gamespire</h3>
            <button
              className="text-[#0BDB45] hover:scale-105"
              onClick={() => setIsCategoryMenuToggled((prev) => !prev)}
            >
              &#10006;
            </button>
          </div>
          <div className="flex flex-col gap-y-[1em]">
            <Link
              href="/products"
              className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
            >
              All offers
            </Link>
            <Link
              href="/about"
              className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
            >
              Popular games
            </Link>
            <Link
              href="/contact"
              className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
            >
              Latest games
            </Link>
            {categories.map(({ categoryName }) => (
              <button
                key={categoryName}
                className="flex items-center justify-between"
                onClick={() => handleCategorySelect(categoryName)}
              >
                <p>{categoryName}</p>
                <IoIosArrowForward className="text-[22px]" />
              </button>
            ))}
          </div>
        </div>
        {/* Sub category menu */}
        <div className={isMenuTwoVisible ? "block" : "hidden"}>
          <div className="flex justify-between items-center text-[22px] mb-[2em]">
            <button
              className="flex items-center -translate-x-2"
              onClick={() => {
                setIsMenuOneVisible(true);
                setIsMenuTwoVisible(false);
              }}
            >
              <IoIosArrowBack className="text-[24px]" />
              <h3 className="font-medium">{selectedCategory}</h3>
            </button>
            <button
              className="text-[#0BDB45] hover:scale-105"
              onClick={() => setIsCategoryMenuToggled((prev) => !prev)}
            >
              &#10006;
            </button>
          </div>
          <div className="flex flex-col gap-y-[1em]">
            <Link
              href="/products"
              className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
            >
              All offers
            </Link>
            <Link
              href="/about"
              className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
            >
              Popular games
            </Link>
            <Link
              href="/contact"
              className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
            >
              Latest games
            </Link>
            <button
              className="flex items-center justify-between"
              onClick={() =>
                handleCategorySubMenuSelect(selectedCategory, "platforms")
              }
            >
              <p>Platforms</p>
              <IoIosArrowForward className="text-[22px]" />
            </button>
            <button
              className="flex items-center justify-between"
              onClick={() =>
                handleCategorySubMenuSelect(selectedCategory, "genres")
              }
            >
              <p>Genres</p>
              <IoIosArrowForward className="text-[22px]" />
            </button>
          </div>
        </div>
        {/* Platform/Genre Menu */}
        <div className={isMenuThreeVisible ? "block" : "hidden"}>
          <div className="flex justify-between items-center text-[22px] mb-[2em]">
            <button
              className="flex items-center -translate-x-2"
              onClick={() => {
                setIsMenuTwoVisible(true);
                setIsMenuThreeVisible(false);
              }}
            >
              <IoIosArrowBack className="text-[24px]" />
              <h3 className="font-medium capitalize">{selectedSubMenu}</h3>
            </button>
            <button
              className="text-[#0BDB45] hover:scale-105"
              onClick={() => setIsCategoryMenuToggled((prev) => !prev)}
            >
              &#10006;
            </button>
          </div>
          <div className="flex flex-col gap-y-[1em]">
            {subMenuData &&
              subMenuData.map((item) => (
                <Link
                  key={item}
                  href="/products"
                  className={
                    path.startsWith("/products") ? "text-[#0BDB45]" : ""
                  }
                >
                  {item}
                </Link>
              ))}
          </div>
        </div>
      </nav>
    </section>
  );
}
