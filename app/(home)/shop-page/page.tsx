"use client";
import Image from "next/image";
import coverPhoto from "@/public/images/shop/cover-photo-dark.jpg";

import Sidebar from "./components/Sidebar";
import ContentGrid from "./components/ContentGrid";
import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

import mobileSidebarIcon from "../../../public/images/shop/sidebarToggleIcon.png";

type FilterParams = {
  rating: number;
  price: number;
  genres: string[];
  platforms: string[];
  brands: string[];
  operatingSystems: string[];
};

const ShopPage = () => {
  const initialFilterParams = {
    rating: 0,
    price: 0,
    genres: [],
    platforms: [],
    brands: [],
    operatingSystems: [],
  };

  const [filterParams, setFilterParams] =
    useState<FilterParams>(initialFilterParams);
  const [clearFilters, setClearFilters] = useState(false);
  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <Spinner loading={loading} />;
  // }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // <div className="text-black">
    //   <Image src={bg} alt="shop page cover image" className="" />
    // </div>

    // <div className="flex min-h-screen bg-[#010300]">
    //   <Sidebar />
    //   <ContentGrid />

    // </div>

    <div className="bg-[#010300]">
      {/* <ProductSearchBar />
      <Navbar /> */}
      {/* Title */}

      <div className="relative">
        <Image src={coverPhoto} alt="shop page cover image" className="" />

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
          <div className="text-[18px] uppercase font-medium w-fit mx-auto mb-[2.3em] text-center sm:text-[22px] md:text-[26px] lg:text-[29px] xl:text-[31px] 2xl:text-[33px] ">
            <p className="text-[#0BDB45] translate-y-[55%] font-primaryFont">
              Home / Product
            </p>
            <p
              className="font-primaryFont font-bold text-[1.2em] text-white border-[#0BDB45] border-[0.1em] px-[3em] py-[0.5em]"
              style={{
                clipPath:
                  "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
              }}
            >
              SHOP PAGE
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#678] relative">
        {" "}
        <div className="absolute top-0 left-0 z-50 block lg:hidden">
          <button
            // className="z-50 bg-blue-500 text-white px-4 py-2 rounded"
            className="z-50  px-2 pb-6 text-white rounded"
            onClick={toggleSidebar}
          >
            {/* <TbLayoutSidebarLeftExpandFilled /> */}

            <Image
              src={mobileSidebarIcon}
              alt="mobile sidebar toggle icon"
              className="w-[26px] h-[26px]"
            />
          </button>

          {/* Sidebar for mobile */}
          <div
            className={`h-full w-64 transform bg-[#0D0F10] ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <Sidebar
              setFilters={setFilterParams}
              setClearFilters={setClearFilters}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto relative">
        <div className="flex items-center justify-center 2xl:px-0 xl:px-4">
          <div className="grid grid-cols-12 2xl:gap-4 xl:gap-4">
            <div className="2xl:col-span-2 xl:col-span-3 lg:col-span-3 md:col-span-3 2xl:pr-0 xl:pr-6 hidden lg:block 2xl:mr-0 xl:mr-8">
              <Sidebar
                setFilters={setFilterParams}
                setClearFilters={setClearFilters}
              />
            </div>

            <div className="2xl:col-span-10 xl:col-span-9 lg:col-span-9 md:col-span-12 sm:col-span-12 col-span-12  justify-self-end">
              <ContentGrid
                filterParams={filterParams}
                clearFilters={clearFilters}
                // setLoading={setLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;
