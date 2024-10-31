"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import axios from "axios";
import axiosInstance from "@/axios/axiosInstance";
import { IoIosArrowForward, IoIosArrowBack, IoMdHeartEmpty, IoMdCart, IoMdPerson } from "react-icons/io";

import { AuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";
import NavBarSpinner from "../Spinner/NavBarSpinner";

import "./navbar.css";
import DesktopCategoryToggle from "./components/desktop-category-toggle";
import DesktopNavLinks from "./components/desktop-nav-links";
import ProfileDropdown from "./components/profile-dropdown";
import WishlistIcon from "./components/wishlist-icon";
import CartIcon from "./components/cart-icon";
import ProfileIcon from "./components/profile-icon";
import MobileLogo from "./components/mobile-logo";
import MobileNavToggle from "./components/mobile-nav-toggle";
import MobileNavLinks from "./components/mobile-nav-links";
import MobileCategoryToggle from "./components/mobile-category-toggle";
import AccessDeniedModal from "../access-denied-modal/AccessDeniedModal";
import { useRouter } from "next/navigation";
import CartSidebar from "@/app/(home)/_components/shopping-cart-sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import Image from "next/image";

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
  const { cart, totalItems } = useCartContext();
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
  const { user } = useContext(AuthContext) || {};

  const router = useRouter();

  // const verifySession = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(
  //       process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-session",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       }
  //     );
  //     if (res.status === 200) {
  //       setVerifySession(true);
  //       return res.data;
  //     } else {
  //       setVerifySession(false);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
  const [accessDenidedPopupOpen, setAccessDeniedPopupOpen] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-session",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (res.status === 200) {
          setVerifySession(true);
          return res.data;
        } else {
          setVerifySession(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    // setLoading(true)
    verifySession();
    if (user) {
      // setIsMobileNavToggled(false);
      console.log("User:", user);
    }
    setTimeout(() => setIsContentChanged(true), 3000);
  }, [user]);

  const closeMobileNav = () => {
    if (isMobileNavToggled) setIsMobileNavToggled(false);
  };

  let authIcon = <ProfileIcon />;
  if (loading && !verifySession) authIcon = <NavBarSpinner loading={loading} />;
  if (verifySession)
    authIcon = (
      <ProfileDropdown
        user={user}
        handleClick={closeMobileNav}
        handleLogout={() => {
          axiosInstance.patch("/auth/logout");
          localStorage.clear();
          window.location.href = "/sign-in";
        }}
      />
    );

  return (
    <section className="relative bg-[#0B0E13] font-primaryFont text-[20px] sm:text-[14px] xl:text-[15px] text-[white] z-50">
      <div className="border-b border-b-[#8C8C8C]">
        <div className="container mx-auto h-[68px] flex justify-between items-center py-[0.2em] sm:h-[55px] sm:py-[1.2em] px-[36px] md:h-[47px] md:py-[0.5em] xl:h-[50px]">
          {/* Desktop categories toggle*/}
          <DesktopCategoryToggle
            isCategoryMenuToggled={isCategoryMenuToggled}
            setIsCategoryMenuToggled={setIsCategoryMenuToggled}
          />

          {/* Desktop navigation links & icons*/}
          <div className="hidden sm:flex sm:items-center sm:justify-between sm:w-full md:justify-end md:gap-x-[11.5%]">
            {/* Desktop navigation links */}
            <DesktopNavLinks />

            {/* Desktop navigation icons */}
            <div className="flex text-[1.8em] gap-x-[0.7em] lg:gap-x-[1em] justify-around items-center">
              {/* <Link
                href="/wishlist"
                className={`hover:scale-110 ${
                  path.startsWith("/wishlist") ? "text-[#0BDB45]" : ""
                }`}
              >
                <IoMdHeartEmpty />
              </Link> */}
              <div                 className={`hover:scale-110 ${
                  path.startsWith("/wishlist") ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => verifySession ? router.push("/wishlist") : setAccessDeniedPopupOpen(true)}
                >

                  <IoMdHeartEmpty />
        
              </div>

              <div className="relative">
                {cart.length > 0 && (
                  <span className="absolute  bottom-[16px] right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {cart.length}
                  </span>
                )}
                <CartSidebar>
                  <IoMdCart />
                </CartSidebar>
              </div>

              {loading ? (
                <NavBarSpinner loading={loading} />
              ) : verifySession ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="hidden cursor-pointer rounded-full sm:block">
                    <Image
                      src={user?.profile_image}
                      width={20}
                      height={20}
                      alt="Avatar"
                      className="size-[1em] rounded-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="hidden bg-[#111111] font-primaryFont text-[0.8em] text-white rounded-none border-none sm:block">
                    <DropdownMenuLabel className="font-semibold text-center text-[1.3em]">
                      {user.firstName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/40 mx-[0.2em]" />
                    <DropdownMenuItem
                      className="bg-transparent text-[1em] focus:bg-transparent focus:text-white"
                      onClick={() => {
                        router.push("/profile?id=" + user.id);
                      }}
                    >
                      <button className="w-full h-fit flex items-center gap-[0.5em] px-[1em] py-[0.3em] rounded-none font-primaryFont uppercase hover:opacity-80">
                        <FaUser className="text-[1.3em] text-[#0BDB45]" />
                        Profile
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/40 mx-[0.2em]" />
                    <DropdownMenuItem
                      className="bg-transparent text-[1em] focus:bg-transparent focus:text-white"
                      onClick={() => {
                        axiosInstance.patch("/auth/logout");
                        localStorage.clear();
                        window.location.href = "/sign-in";
                      }}
                    >
                      <button className="w-full h-fit flex items-center gap-[0.5em] px-[1em] py-[0.3em] rounded-none font-primaryFont uppercase hover:opacity-80">
                        <IoLogOut className="text-[1.6em] text-[#0BDB45]" />
                        Logout
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/40 mx-[0.2em]" />
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href="/sign-in"
                  className={`hover:scale-110 ${
                    path.startsWith("/sign") ? "text-[#0BDB45]" : ""
                  }`}
                >
                  <IoMdPerson />
                  {/* <FaUserPlus /> */}
                </Link>
              )}

              {/* <div
                onClick={() => {
                  axiosInstance.patch("/auth/logout");
                  localStorage.clear();
                  window.location.href = "/sign-in";
                }}
                className="cursor-pointer hover:scale-110"
              >
                <IoLogOut />
              </div> */}
            </div>
          </div>

          {/* Mobile logo  */}
          <MobileLogo setIsMobileNavToggled={setIsMobileNavToggled} />

          {/* Mobile navbar toggle  */}
          <MobileNavToggle
            isMobileNavToggled={isMobileNavToggled}
            isCategoryMenuToggled={isCategoryMenuToggled}
            setIsCategoryMenuToggled={setIsCategoryMenuToggled}
            setIsMobileNavToggled={setIsMobileNavToggled}
          />
        </div>
      </div>

      {/* Mobile navigation links & icons */}
      <nav
        className={`${
          isMobileNavToggled ? "flex flex-col sm:hidden" : "hidden"
        } container mx-auto bg-[#0D0F10] absolute origin-top animate-open-menu px-[1.8em] font-semibold text-center uppercase pt-[1.5em] pb-[2.4em]`}
      >
        {/* Mobile navigation links */}
        <MobileNavLinks setIsMobileNavToggled={setIsMobileNavToggled} />

        {/* Mobile navigation icons */}
        <div className="flex text-[1.5em] justify-around mt-[1.6em]">
          <WishlistIcon handleClick={closeMobileNav} />
          <CartIcon length={totalItems} handleClick={closeMobileNav} />
          {authIcon}
        </div>
      </nav>

      {/* Mobile categories toggle */}
      <MobileCategoryToggle
        isContentChanged={isContentChanged}
        isMobileNavToggled={isMobileNavToggled}
        setIsMobileNavToggled={setIsMobileNavToggled}
        isCategoryMenuToggled={isCategoryMenuToggled}
        setIsCategoryMenuToggled={setIsCategoryMenuToggled}
      />

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

      { accessDenidedPopupOpen && (
        <AccessDeniedModal open={accessDenidedPopupOpen} setIsOpen={setAccessDeniedPopupOpen}/>
      )
      }
    </section>
  );
}
