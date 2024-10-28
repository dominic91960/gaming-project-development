import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import Hero from "../_components/hero";
import SwiperCarousel from "../_components/swiper-carousel";
import BestSelling from "../_components/best-selling";
import Catalog from "../_components/catalog";
import VerticalCarousel from "../_components/verticle-carousel";
import Footer from "@/components/footer/footer";

export default function Home() {
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
