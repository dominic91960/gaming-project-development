"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../../public/images/logo.png";
import { useDebounce } from "@/hooks/useDebounce";
import axiosInstance from "@/axios/axiosInstance";
import { useRouter } from "next/navigation";


// const dummyProducts = [
//   {
//     id: 1,
//     name: "Call of Duty Black Ops 2",
//     price: "$69.99",
//     image: "/images/product-search-bar/cod2.png",
//   },
//   {
//     id: 2,
//     name: "Call of Duty Modern Warfare",
//     price: "$59.99",
//     image: "/images/product-search-bar/cod-img.png",
//   },
//   {
//     id: 3,
//     name: "Assassin's Creed Valhalla",
//     price: "$49.99",
//     image: "/images/product-search-bar/assassin.png",
//   },
// ];

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

const ProductSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dummyProducts, setDummyProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [loading, setLoading] = useState(true);
  

  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = dummyProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(dummyProducts);
    }
  };

  useEffect(() => {
    // if (debouncedSeatch) {
    handleSearch();
    // }
  }, [debouncedSearch]);


  const handleSearch = async () => {
    setLoading(true);
    const res = await axiosInstance.get(
      `/games?productName=${searchTerm}&sort=latest`
    );

    const games = res.data.data.map((game: any) => {
      return {
        id: game.id,
        name: game.productName,
        price: game.sellingPrice,
        image: game.cardImage
      };
    });

    const meta = res.data.meta;

    setDummyProducts(games);
    setFilteredProducts(games);
    setLoading(false);
  };

  const router = useRouter();

  return (
    <div className="relative bg-[#0B0E13] border-b border-[#8C8C8C] font-primaryFont text-[13px] xl:text-[14px] text-white z-50">
      <div className="container h-[62px] mx-auto px-[36px] py-[1em] flex items-center justify-between sm:h-[68px] sm:py-[0.1em] xl:h-[73px] relative">
        <Link href="/" className="hidden sm:block sm:size-[3em]">
          <Image src={logo} alt="Logo" />
        </Link>

        <div className="bg-[#23262B] flex items-center w-full sm:w-[50ch] relative">
          <Input
            placeholder="Search your products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="text-[1em] rounded-none border-none px-[1em] py-[0.5em] h-fit"
          />
          <Button
            type="submit"
            variant="gaming"
            className="text-[1em] mx-[0.3em] my-[0.4em] px-[1em] py-[0.2em] h-fit"
          >
            Search
          </Button>

          {searchTerm && (
            <div className="absolute top-full mt-2 bg-[#0B0E13] w-full max-w-[50ch] text-white p-4 shadow-lg z-40">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      router.push(`/products/view/?id=${product.id}`);

                    }} 
                    className="flex items-center justify-between p-2 border-b border-[#8C8C8C] cursor-pointer"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="mr-3"
                    />
                    <span>{product.name}</span>
                    <span>{product.price}$</span>
                  </div>
                ))
              ) : (
                <p className="text-center">No products found</p>
              )}
              {filteredProducts.length > 5 && (
                <Link
                  href="/search"
                  className="text-center text-[#00BFFF] mt-2 block"
                >
                  View more
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchBar;
