"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import axiosInstance from "@/axios/axiosInstance";

import { AuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";
import NavBarSpinner from "../Spinner/NavBarSpinner";

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

import CategoryMenuHeader from "./components/category-menu-header";
import CategoryMenu from "./components/category-menu";
import SubCategoryMenu from "./components/sub-category-menu";
import SuperSubCategoryMenu from "./components/super-sub-category-menu";
import CategoryMenuBg from "./components/category-menu-bg";
import "./navbar.css";

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

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

export default function Navbar() {
  const { totalItems } = useCartContext();

  const [categoryMenuStates, setCategoryMenuStates] =
    useState<CategoryMenuState>({
      isCategoryMenuOpen: undefined,
      isSubCategoryMenuOpen: undefined,
      isSuperSubCategoryMenuOpen: undefined,
    });
  const [selectedContent, setSelectedContent] = useState({
    selectedSubCategory: "",
    selectedSuperSubCategory: "",
  });
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [isMobileNavToggled, setIsMobileNavToggled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [verifySession, setVerifySession] = useState(false);
  const { user } = useContext(AuthContext) || {};

  const router = useRouter();

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
          // localStorage.clear();
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/sign-in";
        }}
      />
    );

  return (
    <>
      <section className="relative bg-[#0B0E13] font-primaryFont text-[20px] sm:text-[14px] xl:text-[15px] text-[white] z-20">
        {/* Main navbar div wrapper */}
        <div className="border-b border-b-[#8C8C8C]">
          {/* Main navbar div */}
          <div className="container mx-auto h-[68px] flex justify-between items-center py-[0.2em] sm:h-[55px] sm:py-[1.2em] px-[36px] md:h-[47px] md:py-[0.5em] xl:h-[50px]">
            {/* Desktop categories toggle*/}
            <DesktopCategoryToggle
              categoryMenuStates={categoryMenuStates}
              setCategoryMenuStates={setCategoryMenuStates}
            />

            {/* Desktop navigation links & icons*/}
            <div className="hidden sm:flex sm:items-center sm:justify-between sm:w-full md:justify-end md:gap-x-[11.5%]">
              {/* Desktop navigation links */}
              <DesktopNavLinks />

              {/* Desktop navigation icons */}
              <div className="flex text-[1.8em] gap-x-[0.7em] lg:gap-x-[1em] justify-around items-center">
                <WishlistIcon
                  handleClick={() =>
                    verifySession
                      ? router.push("/wishlist")
                      : setAccessDeniedPopupOpen(true)
                  }
                />
                <CartIcon length={totalItems} handleClick={() => {}} />
                {authIcon}
              </div>
            </div>

            {/* Mobile logo  */}
            <MobileLogo setIsMobileNavToggled={setIsMobileNavToggled} />

            {/* Mobile navbar toggle  */}
            <MobileNavToggle
              isMobileNavToggled={isMobileNavToggled}
              categoryMenuStates={categoryMenuStates}
              setCategoryMenuStates={setCategoryMenuStates}
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
            <WishlistIcon
              handleClick={() => {
                if (!verifySession) {
                  setAccessDeniedPopupOpen(true);
                  closeMobileNav();
                  return;
                }
                closeMobileNav();
                router.push("/wishlist");
              }}
            />
            <CartIcon length={totalItems} handleClick={closeMobileNav} />
            {authIcon}
          </div>
        </nav>

        {/* Mobile categories toggle */}
        <MobileCategoryToggle
          isContentChanged={isContentChanged}
          isMobileNavToggled={isMobileNavToggled}
          setIsMobileNavToggled={setIsMobileNavToggled}
          categoryMenuStates={categoryMenuStates}
          setCategoryMenuStates={setCategoryMenuStates}
        />
      </section>

      {/* Categories menu */}
      <nav
        className={`${
          categoryMenuStates.isCategoryMenuOpen
            ? "animate-category-menu"
            : categoryMenuStates.isCategoryMenuOpen === false
            ? "reverse-animate-category-menu"
            : "hidden"
        } origin-left fixed top-0 left-0 w-full h-full bg-[#0D0F10] font-primaryFont px-[1.5em] overflow-hidden z-[51] sm:w-[250px] md:w-[275px] lg:w-[300px] xl:w-[325px] 2xl:w-[350px]`}
      >
        <CategoryMenuHeader
          selectedContent={selectedContent}
          categoryMenuStates={categoryMenuStates}
          setCategoryMenuStates={setCategoryMenuStates}
        />

        <CategoryMenu
          categories={categories}
          categoryMenuStates={categoryMenuStates}
          setCategoryMenuStates={setCategoryMenuStates}
          setSelectedContent={setSelectedContent}
        >
          <SubCategoryMenu
            categoryMenuStates={categoryMenuStates}
            setCategoryMenuStates={setCategoryMenuStates}
            setSelectedContent={setSelectedContent}
          >
            <SuperSubCategoryMenu
              categories={categories}
              selectedContent={selectedContent}
              categoryMenuStates={categoryMenuStates}
            />
          </SubCategoryMenu>
        </CategoryMenu>
      </nav>

      <CategoryMenuBg
        categoryMenuStates={categoryMenuStates}
        setCategoryMenuStates={setCategoryMenuStates}
      />

      {accessDenidedPopupOpen && (
        <AccessDeniedModal
          open={accessDenidedPopupOpen}
          setIsOpen={setAccessDeniedPopupOpen}
        />
      )}
    </>
  );
}
