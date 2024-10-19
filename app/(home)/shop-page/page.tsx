import Image from "next/image";
import coverPhoto from "@/public/images/shop/cover-photo-dark.jpg";

import Sidebar from "./components/Sidebar";
import ContentGrid from "./components/ContentGrid";

const ShopPage = () => {
  return (
    // <div className="text-black">
    //   <Image src={bg} alt="shop page cover image" className="" />
    // </div>

    // <div className="flex min-h-screen bg-[#010300]">
    //   <Sidebar />
    //   <ContentGrid />

    // </div>

    <div className="bg-[#010300]">
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

      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-2">
              <Sidebar />
            </div>

            <div className="col-span-10 flex justify-center">
              <ContentGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
