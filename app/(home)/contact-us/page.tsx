import ProductSearchBar from "@/components/product-search/product-search";
import Image from "next/image";
import cardBgOne from "@/public/images/contact-us/bg.png";
import facebookIcon from "@/public/images/contact-page/Gmail Logo.png";
import xIcon from "@/public/images/contact-page/Gmail Logo.png";
import instagramIcon from "@/public/images/contact-page/Gmail Logo.png";
import TiktokIcon from "@/public/images/contact-page/Gmail Logo.png";
import Gmail from "@/public/images/contact-us/Gmail Logo.png";
import iPhone from "@/public/images/contact-us/iPhone SE.png";
import Region from "@/public/images/contact-us/Region.png";
import Footer from "@/components/footer/footer";
// import { montserrat } from "../../fonts/Montserrat-SemiBold.ttf";
import ContactForm from "./Contact-form";
import Link from "next/link";

import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

import Navbar from "@/components/navbar/navbar";

const cards = [
  { title: "Phone", icon: iPhone, body: "+94 765463214" },
  {
    title: "Address",
    icon: Region,
    body: `132, My Street, Kingston, 
New York 12401.`,
  },
  { title: "Web", icon: Gmail, body: "gamespire@gmaio.com" },
];

function ContactPage() {
  return (
    // <div className={montserrat.className}>
    <div>
      <ProductSearchBar />
      {/* <Navbar /> */}
      <div className="relative w-full h-[162px] lg:h-[420px] xl:h-[420px] 2xl:h-[420px] px-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 z-10"></div>

        <Image
          src={cardBgOne}
          alt="Not found background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full z-0"
        />
        {/* Title */}
        <div className="container mx-auto px-[32px] absolute items-center justify-center inset-0 pt-[75px] md:pt-[50px] lg:pt-52 z-20">
          <div className="text-[18px] uppercase font-medium w-fit mx-auto mb-[2.3em] text-center sm:text-[22px] md:text-[26px] lg:text-[29px] xl:text-[31px] 2xl:text-[33px]">
            <p className="text-[#0BDB45] translate-y-[55%] text-[11px] sm:lg:text-[15px] md:text-[15px] lg:text-[20px]">
              Home / Contact
            </p>
            <p
              className="font-bold text-[1.2em] border-[#0BDB45] border-[0.1em] px-[1em] py-[0.5em] text-white"
              style={{
                clipPath:
                  "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
              }}
            >
              Contact Page
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-[#051301]">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent opacity-100"></div>
        <div className="container mx-auto w-full h-full items-start  text-center pt-2 lg:pt-8">
          <div className="items-center justify-center text-center relative z-50">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[10px]  md:text-[15px] lg:text-[20px]  xl:text-[28px] text-white">
                Get in touch with us !
              </p>
              <div className="flex items-center justify-center p-8 gap-x-[20px] md:gap-x-10 lg:gap-x-15 xl:gap-x-20 text-center w-fit">
                {cards.map(({ title, icon, body }, i) => (
                  <>
                    <div
                      key={title}
                      className="flex flex-col items-center group space-y-1"
                    >
                      <Image
                        src={icon}
                        alt={title}
                        className="size-[14px] font-bold min-[530px]:size-[19px] sm:size-[24px] md:size-[36px] lg:size-[40px] xl:size-[54px] 2xl:size-[60px] group-hover:-translate-y-[2px] transition-transform duration-200"
                      />
                      <p className="text-white text-[8px] font-medium min-[530px]:text-[8px] sm:text-[9px] md:text-[11px] lg:text-[24px] group-hover:scale-110 transition-transform duration-200">
                        {title}
                      </p>
                      <p className="whitespace-pre-line text-[7px] lg:text-[18px] text-white">
                        {body}
                      </p>
                    </div>
                    {i !== 2 && (
                      <div className="w-px lg:w-2px h-[40px] bg-white opacity-50 -translate-y-[25%] lg:h-[90px]"></div>
                    )}
                  </>
                ))}
              </div>
            </div>

            <div className="z-50 flex-1 w-full px-8  lg:mt-24 xl:mt-36 2xl:mt-36">
              <ContactForm />
            </div>

            <div className="flex flex-col items-center m-[1em] lg:m-[2em] xl:m-[2em]">
              <ul className="flex gap-x-[2em] mt-[0.8em]">
                <li className="w-fit hover:scale-110">
                  <Link href="/">
                    <FaFacebook className="size-[1.4em] lg:size-[2em] text-white" />
                  </Link>
                </li>
                <li className="w-fit hover:scale-110">
                  <Link href="/">
                    <FaXTwitter className="size-[1.4em] lg:size-[2em] text-white" />
                  </Link>
                </li>
                <li className="w-fit hover:scale-110">
                  <Link href="/">
                    <IoLogoInstagram className="size-[1.45em] lg:size-[2em] text-white" />
                  </Link>
                </li>
                <li className="w-fit hover:scale-110">
                  <Link href="/">
                    <FaTiktok className="size-[1.4em] lg:size-[2em] text-white" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full h-[158px] lg:h-[365px] z-50 pb-[2em] px-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093795!2d144.95373541547944!3d-37.81627944202161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2slk!4v1602773587239!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                aria-hidden="false"
              ></iframe>
            </div>
          </div>

          {/* Bottom gradient */}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-100"></div>
      </div>

      {/* Form */}
      <Footer />
    </div>
  );
}

export default ContactPage;
