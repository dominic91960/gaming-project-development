import React from "react";

import { Button } from "@/components/ui/button";

import ContactPageHeader from "./_components/ContactPageHeader";
import formBg from "@/public/images/contact-us/form-bg.png";
import formCharacter from "@/public/images/contact-us/avatar.png";
import Image from "next/image";

// input:-webkit-autofill,
// input:-webkit-autofill:hover,
// input:-webkit-autofill:focus,
// input:-webkit-autofill:active {
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: #ffffff;
//   transition: background-color 5000s ease-in-out 0s;
//   box-shadow: inset 0 0 20px 20px #0b0e1300;
// }

const ContactPage = () => {
  return (
    <section className="bg-[#051301] font-primaryFont text-white">
      <ContactPageHeader />
      <div className="relative">
        {/* Top gradient  */}
        <div className="w-full h-[10%] absolute top-0 bg-gradient-to-b from-black to-transparent"></div>

        <div className="container mx-auto px-[36px] pt-[25px] sm:pt-[35px] md:pt-[50px] lg:pt-[65px] xl:pt-[85px] 2xl:pt-[100px]">
          <form
            className="relative mx-auto bg-cover bg-center text-[8px] p-[1.75em] sm:w-[90%] sm:grid sm:grid-cols-2 sm:text-[10px] sm:my-[50px] md:text-[12px] md:my-[60px] lg:w-[80%] lg:text-[15px] lg:my-[70px] xl:w-[75%] xl:text-[18px] xl:my-[85px] 2xl:w-[70%] 2xl:text-[20px] 2xl:my-[100px]"
            style={{ backgroundImage: `url(${formBg.src})` }}
          >
            <div>
              <p className="font-semibold text-[7px] text-[#0BDB45] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px]">
                Need Some Help ?
              </p>
              <h4 className="font-bold text-[13px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[27px] 2xl:text-[30px]">
                Get In Touch
              </h4>
              <p className="font-medium text-[7px] mt-[0.3em] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px]">
                Whatever your questions we are here to help.
              </p>

              <label
                htmlFor="name"
                className="block font-medium mt-[1.6em] mb-[0.3em]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="w-full bg-white/10 text-[7px] px-[1em] py-[0.5em] placeholder:text-white/70 outline-none sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
              />

              <label
                htmlFor="email"
                className="block font-medium mt-[1.6em] mb-[0.3em]"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="w-full bg-white/10 text-[7px] px-[1em] py-[0.5em] placeholder:text-white/70 outline-none sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
              />

              <label
                htmlFor="message"
                className="block font-medium mt-[1.6em] mb-[0.3em]"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Message"
                className="w-full bg-white/10 text-[7px] px-[1em] py-[0.5em] placeholder:text-white/70 outline-none sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                rows={5}
              />

              <Button
                type="submit"
                variant="gaming"
                className="w-full h-fit text-[7px] mt-[2.5em] px-[1em] py-[0.5em] sm:w-3/5 sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
              >
                SEND
              </Button>
            </div>

            <div className="hidden absolute bottom-0 -right-[60px] w-[330px] sm:block md:w-[396px] lg:w-[462px] xl:w-[528px] 2xl:w-[594px]">
              <Image src={formCharacter} alt="Contact-Us" className="w-full" />
            </div>
          </form>
        </div>

        {/* Bottom gradient  */}
        {/* <div className="w-full h-[10%] absolute bottom-0 bg-gradient-to-t from-black to-transparent"></div> */}
      </div>
    </section>
  );
};

export default ContactPage;
