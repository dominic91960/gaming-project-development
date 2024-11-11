import React from "react";

import ContactPageHeader from "./_components/ContactPageHeader";
import ContactForm from "./_components/ContactForm";
import SocialLinks from "./_components/SocialLinks";

const ContactPage = () => {
  return (
    <section className="bg-[#051301] font-primaryFont text-white">
      <ContactPageHeader />
      <div className="relative">
        {/* Top gradient  */}
        <div className="w-full h-[10%] absolute top-0 bg-gradient-to-b from-black to-transparent"></div>

        <div className="container mx-auto px-[36px] pt-[25px] sm:pt-[35px] md:pt-[50px] lg:pt-[65px] xl:pt-[85px] 2xl:pt-[100px]">
          <ContactForm />
          <SocialLinks />
        </div>

        {/* Bottom gradient  */}
        {/* <div className="w-full h-[10%] absolute bottom-0 bg-gradient-to-t from-black to-transparent"></div> */}
      </div>
    </section>
  );
};

export default ContactPage;
