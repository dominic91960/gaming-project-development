import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import ContactForm from "./Contact-form";
import cardBgOne from "@/public/images/contact-us/bg.png";
import iPhone from "@/public/images/contact-us/iPhone SE.png";
import Region from "@/public/images/contact-us/Region.png";
import Gmail from "@/public/images/contact-us/Gmail Logo.png";

const cards = [
  { title: "Phone", icon: iPhone, body: "+94 765463214" },
  {
    title: "Address",
    icon: Region,
    body: `132, My Street, Kingston,New York 12401.`,
  },
  { title: "Web", icon: Gmail, body: "gamespire@gmaio.com" },
];

export default function ContactPage() {
  return (
    <div>
      <div className="bg-[#051301]">
        <div className="container mx-auto pt-8 text-center">
          {/* <h2 className="text-white text-sm md:text-lg lg:text-2xl">
            Get in touch with us!
          </h2> */}
          {/* <div className="flex justify-between  gap-10 p-8 bg-slate-500">
            {cards.map(({ title, icon, body }, i) => (
              <div
                key={title}
                className="flex flex-col items-center space-y-1 group"
              >
                <Image
                  src={icon}
                  alt={title}
                  className="w-8 md:w-12 lg:w-14 group-hover:-translate-y-1 transition-transform duration-200"
                />
                <p className="font-primaryFont text-[20px] font-medium  text-white md:text-sm lg:text-lg group-hover:scale-110 transition-transform duration-200">
                  {title}
                </p>
                <p className="font-primaryFont text-[18px] font-normal  text-white  lg:text-base whitespace-pre-line">
                  {body}
                </p>
              </div>
            ))}
          </div> */}

          <ContactForm />

          <ul className="flex justify-center gap-8 mt-4">
            {[FaFacebook, FaXTwitter, IoLogoInstagram, FaTiktok].map(
              (Icon, index) => (
                <li key={index} className="hover:scale-110">
                  <Link href="/">
                    <Icon className="text-white w-6 lg:w-8" />
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Map Embed */}
        <div className="w-full h-[158px] lg:h-[365px] pb-8 px-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093795!2d144.95373541547944!3d-37.81627944202161!2m3!1f..."
            className="w-full h-full"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
