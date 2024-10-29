import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import ProductSearchBar from "@/components/product-search/product-search";
import cardBgOne from "@/public/images/404/bg.png";
import Image from "next/image";
import ShoppingCartSidebar from "./(home)/_components/shopping-cart-sidebar";

function NotFound() {
  return (
    <section
      className={`relative bg-cover bg-center transition-all duration-1000 ease-in-out font-primaryFont font-semibold text-white`}
    >
      <ProductSearchBar />
      {/* <Navbar /> */}
      <div className="relative w-full h-[1080px] lg:h-[560px] xl:h-[560px] 2xl:h-[560px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 z-10"></div>

        <Image
          src={cardBgOne}
          alt="Not found background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full z-0"
        />

        <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:gap-x-8 z-20">
          <h1 className="text-[96px] md:text-[145px] lg:text-[80px] xl:text-[94px] 2xl:text-[94px] leading-none">
            404
          </h1>
          <p className="text-[55px] md:text-[80px] lg:text-[80px] xl:text-[94px] 2xl:text-[94px] leading-none">
            <span className="text-[#FF0000]">ERR</span>
            <span className="text-[#75F94C]">O</span>R
          </p>
        </div>
      </div>
      <Footer />
    </section>

    //<div>
    //<ShoppingCartSidebar />
    //</div>
  );
}

export default NotFound;
