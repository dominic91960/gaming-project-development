"use client";

import { useState, useContext, useEffect } from "react";

import axios from "axios";
import axiosInstance from "@/axios/axiosInstance";

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
import CategoryMenuHeader from "./components/category-menu-header";
import CategoryMenu from "./components/category-menu";
import SubCategoryMenu from "./components/sub-category-menu";
import SuperSubCategoryMenu from "./components/super-sub-category-menu";

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
  const { cart } = useCartContext();
  const [isCategoryMenuToggled, setIsCategoryMenuToggled] = useState<
    boolean | undefined
  >(undefined);
  const [isSubCategoryMenuToggled, setIsSubCategoryMenuToggled] = useState<
    boolean | undefined
  >(undefined);
  const [isSuperSubCategoryMenuToggled, setIsSuperSubCategoryMenuToggled] =
    useState<boolean | undefined>(undefined);
  const [isMobileNavToggled, setIsMobileNavToggled] = useState(false);

  const [isContentChanged, setIsContentChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifySession, setVerifySession] = useState(false);
  const { user } = useContext(AuthContext) || {};

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
    <>
      <section className="relative bg-[#0B0E13] font-primaryFont text-[20px] sm:text-[14px] xl:text-[15px] text-[white] z-50">
        {/* Main navbar div wrapper */}
        <div className="border-b border-b-[#8C8C8C]">
          {/* Main navbar div */}
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
                <WishlistIcon handleClick={() => {}} />
                <CartIcon length={cart.length} handleClick={() => {}} />
                {authIcon}
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
            <CartIcon length={cart.length} handleClick={closeMobileNav} />
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
      </section>

      {/* Categories menu */}
      <nav
        className={`${
          isCategoryMenuToggled
            ? "animate-category-menu"
            : isCategoryMenuToggled === false
            ? "reverse-animate-category-menu"
            : "hidden"
        } origin-left fixed top-0 w-full h-full bg-[#0D0F10] font-primaryFont px-[1em] overflow-x-hidden z-[51] sm:w-[400px]`}
      >
        {/* <div className="w-full h-[70px] flex items-center justify-between text-[24px]">
          {isSuperSubCategoryMenuToggled ? (
            <button
              className="flex items-center gap-[0.2em] text-[0.8em]"
              onClick={() => setIsSuperSubCategoryMenuToggled(false)}
            >
              <IoIosArrowBack />
              <h4>Platforms</h4>
            </button>
          ) : isSubCategoryMenuToggled ? (
            <button
              className="flex items-center gap-[0.2em] text-[0.8em]"
              onClick={() => {
                setIsSubCategoryMenuToggled(false);
                setIsSuperSubCategoryMenuToggled(undefined);
              }}
            >
              <IoIosArrowBack />
              <h4>PC Games</h4>
            </button>
          ) : isCategoryMenuToggled ? (
            <Link
              href="/"
              className="flex items-center gap-[0.5em]"
              onClick={() => {
                setIsCategoryMenuToggled(false);
                setIsSubCategoryMenuToggled(undefined);
                setIsSuperSubCategoryMenuToggled(undefined);
              }}
            >
              <Link href="/" onClick={() => setIsMobileNavToggled(false)}>
                <Image src={logo} alt="VINGAME" className="w-[30px]" />
              </Link>
              <h4 className="font-semibold">VINGAME</h4>
            </Link>
          ) : (
            ""
          )}
          <button
            className="hover:opacity-80 text-[#75F94C]"
            onClick={() => {
              setIsCategoryMenuToggled(false);
              setTimeout(() => {
                setIsSubCategoryMenuToggled(undefined);
                setIsSuperSubCategoryMenuToggled(undefined);
              }, 300);
            }}
          >
            <AiOutlineClose />
          </button>
        </div> */}
        <CategoryMenuHeader
          isSuperSubCategoryMenuToggled={isSuperSubCategoryMenuToggled}
          setIsSuperSubCategoryMenuToggled={setIsSuperSubCategoryMenuToggled}
          isSubCategoryMenuToggled={isSubCategoryMenuToggled}
          setIsSubCategoryMenuToggled={setIsSubCategoryMenuToggled}
          isCategoryMenuToggled={isCategoryMenuToggled}
          setIsCategoryMenuToggled={setIsCategoryMenuToggled}
          setIsMobileNavToggled={setIsMobileNavToggled}
        />

        <CategoryMenu
          categories={categories}
          isSubCategoryMenuToggled={isSubCategoryMenuToggled}
          setIsSubCategoryMenuToggled={setIsSubCategoryMenuToggled}
        >
          <SubCategoryMenu
            isSubCategoryMenuToggled={isSubCategoryMenuToggled}
            isSuperSubCategoryMenuToggled={isSuperSubCategoryMenuToggled}
            setIsSuperSubCategoryMenuToggled={setIsSuperSubCategoryMenuToggled}
          >
            <SuperSubCategoryMenu
              isSuperSubCategoryMenuToggled={isSuperSubCategoryMenuToggled}
            />
          </SubCategoryMenu>
        </CategoryMenu>
      </nav>

      <div
        className={`${
          isCategoryMenuToggled ? "block" : "hidden"
        } fixed top-0 left-0 z-50 w-full h-full bg-black/30`}
        onClick={() => {
          setIsCategoryMenuToggled(false);
          setTimeout(() => {
            setIsSubCategoryMenuToggled(undefined);
            setIsSuperSubCategoryMenuToggled(undefined);
          }, 300);
        }}
      ></div>
    </>
  );
}
