import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import formBg from "@/public/images/contact-us/form-bg.png";
import formCharacter from "@/public/images/contact-us/avatar.png";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <form
      className="relative mx-auto bg-cover bg-center text-[8px] p-[1.75em] sm:w-[90%] sm:grid sm:grid-cols-2 sm:text-[10px] sm:mt-[50px] md:text-[12px] md:mt-[60px] lg:w-[80%] lg:text-[15px] lg:mt-[70px] xl:w-[75%] xl:text-[18px] xl:mt-[85px] 2xl:w-[70%] 2xl:text-[20px] 2xl:mt-[100px]"
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
          required
        />

        <label
          htmlFor="email"
          className="block font-medium mt-[1.6em] mb-[0.3em]"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full bg-white/10 text-[7px] px-[1em] py-[0.5em] placeholder:text-white/70 outline-none sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
          required
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
          required
        />

        <Button
          type="submit"
          variant="gaming"
          className="w-full h-fit text-[7px] mt-[2.5em] px-[1em] py-[0.5em] sm:w-3/5 sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
        >
          SEND
        </Button>
      </div>

      <div className="hidden absolute bottom-0 -right-[15%] w-[330px] sm:block md:-right-[13.5%] md:w-[396px] lg:-right-[10.8%] lg:w-[462px] xl:-right-[8.5%] xl:w-[528px] 2xl:-right-[8%] 2xl:w-[594px]">
        <Image src={formCharacter} alt="Contact-Us" className="w-full" />
      </div>
    </form>
  );
};

export default ContactForm;
