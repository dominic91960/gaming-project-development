import React from "react";
import ContactPageHeader from "./_components/ContactPageHeader";
import { Button } from "@/components/ui/button";

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
        {/* <div className="w-full h-[10%] absolute top-0 bg-gradient-to-b from-black to-transparent"></div> */}

        <div className="container mx-auto px-[36px]"></div>

        {/* Bottom gradient  */}
        {/* <div className="w-full h-[10%] absolute bottom-0 bg-gradient-to-t from-black to-transparent"></div> */}
      </div>
    </section>
  );
};

export default ContactPage;
