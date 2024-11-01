'use client'
import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import Hero from "../_components/hero";
import SwiperCarousel from "../_components/swiper-carousel";
import BestSelling from "../_components/best-selling";
import Catalog from "../_components/catalog";
import VerticalCarousel from "../_components/verticle-carousel";
import Footer from "@/components/footer/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";
import { set } from "date-fns";

export default function Home() {
  // const router = useRouter();
  // const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     const parsedUser = JSON.parse(user);
  //     if (parsedUser.role.name === "ADMIN") {
  //       router.push("/admin");
  //     } else {
  //       setIsAuthorized(true);
  //     }
  //   } else {
  //     setIsAuthorized(true);
  //     router.push("/");
  //   }
  // }, [router]);
  // if (!isAuthorized) {
  //   return <Spinner loading={!isAuthorized} />;
  // }
  
  return (
    <>
      {/* <ProductSearchBar />
      <Navbar /> */}
      <Hero />
      <SwiperCarousel />
      <BestSelling />
      <Catalog />
      <VerticalCarousel />
      <Footer />
    </>
  );
}
