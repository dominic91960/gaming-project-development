"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import logo from "@/public/images/navbar/logo.png";
import { useCartContext } from "@/context/CartContext";

import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosLogOut,
  IoMdHeartEmpty,
  IoIosCart,
  IoMdPerson,
} from "react-icons/io";

import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/axios/axiosInstance";
import ProfileDefault from "@/public/images/navbar/profile_default.jpg";
import "./navbar.css";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import samplePic from "@/public/images/sample-pic.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa6";
import NavBarSpinner from "../Spinner/NavBarSpinner";
import { set } from "date-fns";
import axios from "axios";

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

export default function AuthNavbar() {
  const { cart } = useCartContext();
  const path = usePathname();
  const [isCategoryMenuToggled, setIsCategoryMenuToggled] = useState<
    boolean | undefined
  >(undefined);
  const [isMobileNavToggled, setIsMobileNavToggled] = useState(false);

  const [isMenuOneVisible, setIsMenuOneVisible] = useState(true);
  const [isMenuTwoVisible, setIsMenuTwoVisible] = useState(false);
  const [isMenuThreeVisible, setIsMenuThreeVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const [subMenuData, setSubMenuData] = useState<string[]>([]);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifySession, setVerifySession] = useState(false);
  // const { user } = useContext(AuthContext);
  const { user } = useContext(AuthContext) || {};

  const router = useRouter();

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
      setSubMenuData(
        categoryData[subMenu as keyof typeof categoryData] as string[]
      );
    }
  };

  useEffect(() => {
    // const verifySession = async () => {
    //   setLoading(true)
    //   try {
    //     const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL+"/auth/verify-session", {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       },
    //     });
    //     if (res.status === 200) {
    //       setVerifySession(true)
    //       return res.data
    //     }else {
    //       setVerifySession(false)
    //     }
    //     setLoading(false)
    //   } catch (error) {
    //     console.log(error)
    //   }finally {
    //     setLoading(false)
    //   }
    // }
    // // setLoading(true)
    // verifySession()
    // if (user) {
    //   // setIsMobileNavToggled(false);
    //   console.log("User:", user);
    // }
  },[]);

  // useEffect(() => {
  //   setTimeout(() => setIsContentChanged(true), 3000);
  // }, [isContentChanged]);

  return (
    <section className="relative bg-[#0B0E13] font-primaryFont text-[20px] sm:text-[14px] xl:text-[15px] text-[white] z-50">
      <div className="border-b border-b-[#8C8C8C]">
        <div className="container mx-auto h-[68px] flex justify-between items-center py-[0.2em] sm:h-[55px] sm:py-[1.2em] px-[36px] md:h-[47px] md:py-[0.5em] xl:h-[50px]">
          {/* Desktop categories toggle*/}
          <button
            className="font-semibold capitalize bg-[#23262B] hidden flex-shrink-0 md:flex md:items-center md:gap-[0.4em] px-[0.8em] py-[0.4em] hover:scale-[102%]"
            onClick={() => {
              if (isCategoryMenuToggled === undefined) {
                return setIsCategoryMenuToggled(true);
              }
              setIsCategoryMenuToggled((prev) => !prev);
            }}
          >
            <div className="space-y-[0.2em] pe-[0.1em]">
              <div className="w-[1.2em] h-0.5 bg-white"></div>
              <div className="w-[0.8em] h-0.5 bg-white"></div>
              <div className="w-[1.2em] h-0.5 bg-white"></div>
            </div>
            <h4>All categories</h4>
          </button>

          {/* Desktop navigation links & icons*/}
          <div className="hidden sm:flex sm:justify-between sm:w-full md:justify-end md:gap-x-[11.5%]">
            {/* Desktop navigation links */}
            <nav className="hidden sm:flex sm:gap-x-[1.5em] lg:gap-x-[2.5em] xl:gap-x-[3.5em] font-semibold uppercase">
              <Link
                href="/"
                className={`hover:opacity-80 ${
                  path === "/" ? "text-[#0BDB45]" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/shop-page"
                className={`hover:opacity-80 ${
                  path.startsWith("/shop-page") ? "text-[#0BDB45]" : ""
                }`}
              >
                Store
              </Link>
              <Link
                href="/about"
                className={`hover:opacity-80 ${
                  path.startsWith("/about") ? "text-[#0BDB45]" : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/contact-us"
                className={`hover:opacity-80 ${
                  path.startsWith("/contact-us") ? "text-[#0BDB45]" : ""
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop navigation icons */}
            <div className="flex text-[1.5em] gap-x-[0.7em] lg:gap-x-[1em] justify-around">
              <Link href="/wishlist" className="hover:scale-110">
                <IoMdHeartEmpty />
              </Link>

              <Link href="/cart" className="relative hover:scale-110">
                {cart.length > 0 && (
                  <span className="absolute  bottom-[16px] right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {cart.length}
                  </span>
                )}
                <div className="relative">
                  <IoIosCart className="text-2xl" />
                </div>
              </Link>

                            <Link
                              href="/sign-in"
                              className={`hover:scale-110 ${
                                path.startsWith("/sign") ? "text-[#0BDB45]" : ""
                              }`}
                            >
                              {/* <IoMdPerson /> */}
                              <FaUserPlus />
                            </Link>

              {/* <div
                onClick={() => {
                  axiosInstance.patch("/auth/logout");
                  localStorage.clear();
                  window.location.href = "/sign-in";
                }}
                className="cursor-pointer hover:scale-110"
              >
                <IoIosLogOut />
              </div> */}
            </div>
          </div>

          {/* Mobile logo  */}
          <Link href="/" className="sm:hidden">
            <Image src={logo} alt="Logo" className="size-[3em]" />
          </Link>

          {/* Mobile navbar toggle  */}
          <button
            className={`${
              isMobileNavToggled ? "animate-toggle-button" : ""
            } relative h-4 w-6 transition-opacity duration-300 sm:hidden`}
            onClick={() => {
              if (isCategoryMenuToggled) {
                setIsCategoryMenuToggled(false);
                setTimeout(() => setIsMobileNavToggled((prev) => !prev), 1100);
                return;
              }
              setIsMobileNavToggled((prev) => !prev);
            }}
          >
            <div className="absolute -mt-[0.5px] h-[1px] w-full rounded bg-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out before:absolute before:left-0 before:h-[1px] before:w-full before:-translate-y-[6px] before:rounded before:bg-white before:transition-transform before:duration-700 before:ease-in-out after:absolute after:left-0 after:h-[1px] after:w-full after:translate-y-[6px] after:rounded after:bg-white after:transition-transform after:duration-700 after:ease-in-out"></div>
          </button>
        </div>
      </div>

      {/* Mobile navigation links & icons */}
      <nav
        className={`${
          isMobileNavToggled ? "flex flex-col sm:hidden" : "hidden"
        } container mx-auto bg-[#0D0F10] absolute origin-top animate-open-menu px-[1.8em] font-semibold text-center uppercase pt-[1.5em] pb-[2.4em]`}
      >
        {/* Mobile navigation links */}
        <Link
          href="/"
          className={`hover:opacity-80 py-[1.1em] border-b border-b-[#8C8C8C] ${
            path === "/" ? "text-[#0BDB45]" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/shop-page"
          className={`hover:opacity-80 py-[1.1em] border-b border-b-[#8C8C8C] ${
            path.startsWith("/shop-page") ? "text-[#0BDB45]" : ""
          }`}
        >
          Store
        </Link>
        <Link
          href="/about"
          className={`hover:opacity-80 py-[1.1em] border-b border-b-[#8C8C8C] ${
            path.startsWith("/about") ? "text-[#0BDB45]" : ""
          }`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`hover:opacity-80 py-[1.1em] border-b border-b-[#8C8C8C] ${
            path.startsWith("/contact-us") ? "text-[#0BDB45]" : ""
          }`}
        >
          Contact
        </Link>
        {/* Mobile navigation icons */}
        <div className="flex text-[1.5em] justify-around mt-[1.6em]">
          <Link href="/wishlist" className="hover:scale-110">
            <IoMdHeartEmpty />
          </Link>

          <Link href="/" className="hover:scale-110">
            <IoIosCart />
          </Link>

          <Link href="/sign-in" className="hover:scale-110">
            {user?.profile_image ? (
              <Image
                src={user?.profile_image ? user?.profile_image : ProfileDefault}
                alt="Profile"
                className="rounded-full w-[25px] h-[25px] ring-1 ring-white"
                width={25}
                height={25}
              />
            ) : (
              <IoMdPerson />
            )}
          </Link>

          <div
            onClick={() => {
              axiosInstance.patch("/auth/logout");
              localStorage.clear();
              window.location.href = "/sign-in";
            }}
            className="cursor-pointer hover:scale-110"
          >
            <IoIosLogOut />
          </div>
        </div>
      </nav>

      {/* Mobile categories toggle */}
      <button
        className={`md:hidden absolute bottom-0 left-0 translate-y-[130%] bg-[#0BDB45] flex items-center justify-center transition-all duration-700 text-[0.8em] sm:text-[0.9em] ease-in-out capitalize px-[1em] py-[0.5em] z-40 ${
          isContentChanged ? "w-[1ch]" : "w-[14ch]"
        }`}
        onClick={() => {
          if (isMobileNavToggled) {
            setIsMobileNavToggled(false);
            setTimeout(() => {
              isCategoryMenuToggled === undefined
                ? setIsCategoryMenuToggled(true)
                : setIsCategoryMenuToggled((prev) => !prev);
            }, 500);
            return;
          }
          isCategoryMenuToggled === undefined
            ? setIsCategoryMenuToggled(true)
            : setIsCategoryMenuToggled((prev) => !prev);
        }}
      >
        <p className={isContentChanged ? "hidden" : "block"}>All categories</p>
        <p className={!isContentChanged ? "hidden" : "block"}>&#8942;</p>
      </button>

      {/* Categories menu */}
      <nav
        className={`${
          isCategoryMenuToggled
            ? "animate-category-menu"
            : isCategoryMenuToggled === false
            ? "reverse-animate-category-menu"
            : "hidden"
        } origin-left absolute top-[calc(100%-1px)] w-full sm:w-[400px] sm:min-h-[80vh] bg-[#0D0F10] border border-[#75F94C] p-[2em] z-50`}
      >
        {/* Main category menu */}
        <div className={isMenuOneVisible ? "block" : "hidden"}>
          {/* Main category menu title */}
          <div className="flex justify-between items-center mb-[2em]">
            <h3 className="font-medium">Gamespire</h3>
            <button
              className="text-[#0BDB45] hover:scale-105"
              onClick={() => setIsCategoryMenuToggled((prev) => !prev)}
            >
              &#10006;
            </button>
          </div>

          {/* Main category menu links */}
          <div className="flex flex-col gap-y-[1em]">
            <Link
              href="/products"
              className={`hover:opacity-80 ${
                path.startsWith("/products") ? "text-[#0BDB45]" : ""
              }`}
            >
              All offers
            </Link>
            <Link
              href="/about"
              className={`hover:opacity-80 ${
                path.startsWith("/products") ? "text-[#0BDB45]" : ""
              }`}
            >
              Popular games
            </Link>
            <Link
              href="/contact"
              className={`hover:opacity-80 ${
                path.startsWith("/products") ? "text-[#0BDB45]" : ""
              }`}
            >
              Latest games
            </Link>
            {categories.map(({ categoryName }) => (
              <button
                key={categoryName}
                className="flex items-center justify-between hover:opacity-80"
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
          <div className="flex justify-between items-center mb-[2em]">
            {/* Sub category menu title */}
            <button
              className="flex items-center -translate-x-2 hover:opacity-80"
              onClick={() => {
                setIsMenuOneVisible(true);
                setIsMenuTwoVisible(false);
              }}
            >
              <IoIosArrowBack className="text-[1.1em]" />
              <h3 className="font-medium">{selectedCategory}</h3>
            </button>
            <button
              className="text-[#0BDB45] hover:scale-105"
              onClick={() => setIsCategoryMenuToggled((prev) => !prev)}
            >
              &#10006;
            </button>
          </div>

          {/* Sub category menu links */}
          <div className="flex flex-col gap-y-[1em]">
            <Link
              href="/products"
              className={`hover:opacity-80 ${
                path.startsWith("/products") ? "text-[#0BDB45]" : ""
              }`}
            >
              All offers
            </Link>
            <Link
              href="/about"
              className={`hover:opacity-80 ${
                path.startsWith("/products") ? "text-[#0BDB45]" : ""
              }`}
            >
              Popular games
            </Link>
            <Link
              href="/contact"
              className={`hover:opacity-80 ${
                path.startsWith("/products") ? "text-[#0BDB45]" : ""
              }`}
            >
              Latest games
            </Link>
            <button
              className="flex items-center justify-between hover:opacity-80"
              onClick={() =>
                handleCategorySubMenuSelect(selectedCategory, "platforms")
              }
            >
              <p>Platforms</p>
              <IoIosArrowForward className="text-[22px]" />
            </button>
            <button
              className="flex items-center justify-between hover:opacity-80"
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
          <div className="flex justify-between items-center mb-[2em]">
            {/* Platform/Genre menu title */}
            <button
              className="flex items-center -translate-x-2 hover:opacity-80"
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

          {/* Platform/Genre menu links */}
          <div className="flex flex-col gap-y-[1em]">
            {subMenuData &&
              subMenuData.map((item) => (
                <Link
                  key={item}
                  href="/products"
                  className={`hover:opacity-80 ${
                    path.startsWith("/products") ? "text-[#0BDB45]" : ""
                  }`}
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
