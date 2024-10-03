import Image from "next/image";
import logo from "../../public/images/home/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductSearchBar = () => {
  return (
    <div className="bg-[#0d0f10] border-b border-[#8C8C8C] font-primaryFont">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Image src={logo} alt="Main Character" height={68} width={68} />
          </div>

          <div className="col-span-4 mr-[80px] my-auto">
            <div className="flex items-center gap-[200px] ">
              <div className="flex w-full  items-center space-x-2 bg-[#23262B] h-[35px]">
                <Input
                  placeholder="Search your products..."
                  className="border-none text-white"
                />
                <div className="">
                  <Button
                    type="submit"
                    variant="gaming"
                    className="h-[25px] mr-[5px]"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchBar;
