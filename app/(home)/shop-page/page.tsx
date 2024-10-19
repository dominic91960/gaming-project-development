import Image from "next/image";
import bg from "@/public/images/shop/cover-photo.png";

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
      <div className="mx-auto container">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <Sidebar />
          </div>

          <div className="col-span-10 ">
            <ContentGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
