import Image from "next/image";
import bg from "@/public/images/shop/cover-photo.png";

import Sidebar from "./components/Sidebar";
import ContentGrid from "./components/ContentGrid";

const ShopPage = () => {
  return (
    // <div className="text-black">
    //   <Image src={bg} alt="shop page cover image" className="" />
    // </div>

    <div className="flex min-h-screen bg-[#010300]">
      <Sidebar />
      <ContentGrid />
    </div>
  );
};

export default ShopPage;
