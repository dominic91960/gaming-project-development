import Image from "next/image";

import Footer from "@/components/footer/footer";
import bg from "@/public/images/products/bg.png";

export default function ProductsPage() {
  return (
    <>
      <section className="relative font-primaryFont">
        <Image src={bg} alt="Product header background" className="w-full" />
        <div className="text-[40px] uppercase font-medium absolute w-fit left-0 right-0 mx-auto bottom-[117px] text-center">
          <p className="text-[20px] text-[#0BDB45] translate-y-[55%]">
            Home / Product
          </p>
          <p
            className="font-bold border-[#0BDB45] border-[3px] px-[38px] py-[20px]"
            style={{
              clipPath:
                "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
            }}
          >
            Product page
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
