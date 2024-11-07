"use client";
"use strict";
import React, { use, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { CiSearch } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/axios/axiosInstance";
import { set } from "date-fns";
import Spinner from "@/components/Spinner/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useContext } from "react";
import { useWishlistContext } from "@/context/WishListContext";
import axios from "axios";

type FilterParams = {
  rating: number;
  price: number;
  genres: string[];
  platforms: string[];
  brands: string[];
  operatingSystems: string[];
};

interface ContentGridProps {
  filterParams: FilterParams;
  clearFilters: boolean;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  filterParams,
  clearFilters,
}) => {
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const { addToWishlist } = useWishlistContext();

  interface Game {
    id: string;
    title: string;
    price: number;
    sellingPrice: number;
    rating: number;
    soldOut: boolean;
    cardImage: string;
    wishList: boolean;
  }

  const [games, setGames] = useState<Game[]>([]);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSeatch = useDebounce(search, 500);
  const [sortTerm, setSortTerm] = useState("latest");
  const debouncedSortTerm = useDebounce(sortTerm, 500);
  const [loading, setLoading] = useState(true);
  const [verifySession, setVerifySession] = useState<boolean>(false);

  const { wishListGameIds } = useWishlistContext();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosInstance.get(
        `/games?page=${currentPage}&sort=latest`
      );
      (res.data.data);

      const games = res.data.data.map((game: any) => {
        return {
          id: game.id,
          title: game.productName,
          price: game.regularPrice,
          sellingPrice: game.sellingPrice,
          rating: Math.round(game.averageRating),
          soldOut: game.stockStatus === "OUT_OF_STOCK",
          cardImage: game.cardImage,
          wishList: wishListGameIds.includes(game.id),
        };
      });

      const meta = res.data.meta;

      setTotalPages(meta.totalPages);
      setStartIndex(meta.startIndex);
      setProductsPerPage(meta.productsPerPage);
      setCurrentPage(meta.currentPage);
      setTotal(meta.totalProducts);

      setGames(games);
      setLoading(false);
    };

    if (wishListGameIds) {
    }
    getData();
  }, [currentPage, clearFilters]);

  useEffect(() => {

    setLoading(true);

    const buildQueryParams = () => {
      const params = new URLSearchParams();

      if (search) params.append("productName", search);
      if (filterParams.rating)
        params.append("rating", filterParams.rating.toString());
      if (filterParams.price)
        params.append("price", filterParams.price.toString());
      if (filterParams.genres.length)
        params.append("tags", filterParams.genres.join(","));
      if (filterParams.platforms.length)
        params.append("platforms", filterParams.platforms.join(","));
      if (filterParams.brands.length)
        params.append("brands", filterParams.brands.join(","));
      if (filterParams.operatingSystems.length)
        params.append("systems", filterParams.operatingSystems.join(","));

      params.append("page", currentPage.toString());

      return params.toString();
    };

    const getData = async () => {
      const res = await axiosInstance.get(
        `/games?${buildQueryParams()}&sort=latest`
      );
      (res.data.data);

      const games = res.data.data.map((game: any) => {
        return {
          id: game.id,
          title: game.productName,
          price: game.regularPrice,
          sellingPrice: game.sellingPrice,
          rating: Math.round(game.averageRating),
          soldOut: game.stockStatus === "OUT_OF_STOCK",
          cardImage: game.cardImage,
          wishList: wishListGameIds.includes(game.id),
        };
      });

      const meta = res.data.meta;

      setTotalPages(meta.totalPages);
      setStartIndex(meta.startIndex);
      setProductsPerPage(meta.productsPerPage);
      setCurrentPage(meta.currentPage);
      setTotal(meta.totalProducts);

      setGames(games);
      setLoading(false);
    };

    getData();
  }, [filterParams, clearFilters, currentPage]);

  useEffect(() => {
    // if (debouncedSeatch) {
    handleSearch();
    // }
  }, [debouncedSeatch]);

  useEffect(() => {
    // if (debouncedSortTerm) {
    handleSort();
    // }
  }, [debouncedSortTerm]);

  useEffect(() => {
    const verifySession = async () => {
      // setLoading(true);
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
        // setLoading(false);
      } catch (error) {
        (error);
      } finally {
        // setLoading(false);
      }
    };

    verifySession();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const res = await axiosInstance.get(
      `/games?productName=${search}&page=${currentPage}&sort=latest`
    );
    (res.data.data);

    const games = res.data.data.map((game: any) => {
      return {
        id: game.id,
        title: game.productName,
        price: game.regularPrice,
        sellingPrice: game.sellingPrice,
        rating: Math.round(game.averageRating),
        soldOut: game.stockStatus === "OUT_OF_STOCK",
        cardImage: game.cardImage,
        wishList: wishListGameIds.includes(game.id),
      };
    });

    const meta = res.data.meta;

    setTotalPages(meta.totalPages);
    setStartIndex(meta.startIndex);
    setProductsPerPage(meta.productsPerPage);
    setCurrentPage(meta.currentPage);
    setTotal(meta.totalProducts);

    setGames(games);
    setLoading(false);
  };

  const handleSort = async () => {
    setLoading(true);
    const res = await axiosInstance.get(
      `/games?sort=${sortTerm}&page=${currentPage}`
    );
    (res.data.data);

    const games = res.data.data.map((game: any) => {
      return {
        id: game.id,
        title: game.productName,
        price: game.regularPrice,
        sellingPrice: game.sellingPrice,
        rating: Math.round(game.averageRating),
        soldOut: game.stockStatus === "OUT_OF_STOCK",
        cardImage: game.cardImage,
        wishList: wishListGameIds.includes(game.id),
      };
    });

    const meta = res.data.meta;

    setTotalPages(meta.totalPages);
    setStartIndex(meta.startIndex);
    setProductsPerPage(meta.productsPerPage);
    setCurrentPage(meta.currentPage);
    setTotal(meta.totalProducts);

    setGames(games);
    setLoading(false);
  };

  // if (loading) {
  //   return <Spinner loading={loading}/>
  // }

  return (
    <div className="min-w-full px-4 pb-4">
      <div className="flex items-start justify-between mb-6 2xl:w-[1125px] xl:w-[935px]  lg:w-full md:w-full sm:w-full w-[270px]">
        <div className="hidden xl:block">
          <p className="text-[15px] font-normal font-primaryFont text-white leading-none">
            {total} result found:
          </p>
        </div>

        <div className="flex items-center gap-4 w-full xl:w-max">
          <div className="border border-[#666a65] p-2 rounded-none flex items-center gap-x-[0.75em] w-full ">
            <CiSearch
              onClick={handleSearch}
              className="text-[20px] text-white cursor-pointer"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by token name"
              className="bg-transparent outline-none border-y-0 border-e-0 border-s rounded-none px-[1em] w-full text-white "
            />
          </div>

          <div className="bg-[#474747]">
            <Select onValueChange={setSortTerm}>
              <SelectTrigger className="sm:w-[180px] w-[140px]  rounded-none border-none text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className=" text-white bg-[#666666] rounded-none">
                <SelectGroup>
                  <SelectLabel>Default Sorting</SelectLabel>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rating">Average Rating</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="pricel2h">Price: low to high</SelectItem>
                  <SelectItem value="priceh2l">Price: high to low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 2xl:gap-4 xl:gap-16 lg:gap-12 md:gap-4 sm:gap-2 gap-2 justify-items-center">
          {games.map((game, index) => (
            <ProductCard
              key={index}
              id={game.id}
              title={game.title}
              sellingPrice={game.sellingPrice}
              price={game.price}
              rating={game.rating}
              soldOut={game.soldOut}
              cardImage={game.cardImage}
              wishList={game.wishList}
              verifySession={verifySession}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-16 mb-16">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-white rounded disabled:opacity-50"
        >
          <GrPrevious />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === i + 1
                ? " text-[#45F882] font-primaryFont font-semibold"
                : "text-white font-primaryFont font-semibold"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 text-white rounded disabled:opacity-50"
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default ContentGrid;
