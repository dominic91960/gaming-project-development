"use client";
import React, { useEffect, useState } from "react";
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

  interface Game {
    id: number;
    title: string;
    price: number;
    sellingPrice: number;
    rating: number;
    soldOut: boolean;
    cardImage: string;
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

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosInstance.get(`/games?page=${currentPage}`);
      console.log(res.data.data);

      const games = res.data.data.map((game: any) => {
        return {
          id: game.id,
          title: game.productName,
          price: game.regularPrice,
          sellingPrice: game.sellingPrice,
          rating: Math.round(game.averageRating),
          soldOut: game.stockStatus === "OUT_OF_STOCK",
          cardImage: game.cardImage,
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
  }, [currentPage, clearFilters]);

  useEffect(() => {
    console.log("Filter Params", filterParams);
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

    console.log("Query Params", buildQueryParams());

    const getData = async () => {
      const res = await axiosInstance.get(`/games?${buildQueryParams()}`);
      console.log(res.data.data);

      const games = res.data.data.map((game: any) => {
        return {
          id: game.id,
          title: game.productName,
          price: game.regularPrice,
          sellingPrice: game.sellingPrice,
          rating: Math.round(game.averageRating),
          soldOut: game.stockStatus === "OUT_OF_STOCK",
          cardImage: game.cardImage,
        };
      });

      console.log("Games", games);

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

  const handleSearch = async () => {
    setLoading(true);
    const res = await axiosInstance.get(
      `/games?productName=${search}&page=${currentPage}`
    );
    console.log(res.data.data);

    const games = res.data.data.map((game: any) => {
      return {
        id: game.id,
        title: game.productName,
        price: game.regularPrice,
        sellingPrice: game.sellingPrice,
        rating: Math.round(game.averageRating),
        soldOut: game.stockStatus === "OUT_OF_STOCK",
        cardImage: game.cardImage,
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
    console.log(res.data.data);

    const games = res.data.data.map((game: any) => {
      return {
        id: game.id,
        title: game.productName,
        price: game.regularPrice,
        sellingPrice: game.sellingPrice,
        rating: Math.round(game.averageRating),
        soldOut: game.stockStatus === "OUT_OF_STOCK",
        cardImage: game.cardImage,
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
      <div className="flex items-start justify-between mb-6">
        <p className="text-[15px] font-normal font-primaryFont text-white leading-none">
          {total} result found:
        </p>

        <div className="flex items-center gap-4">
          <div className="border p-2 rounded-none flex items-center gap-x-[0.75em] w-full">
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

          <div className="bg-[#666666]">
            <Select onValueChange={setSortTerm}>
              <SelectTrigger className="w-[180px] rounded-none border-none text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#666666] text-white">
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
        <div className="grid grid-cols-4 gap-4">
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
