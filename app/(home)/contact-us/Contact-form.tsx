import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import avatar from "@/public/images/contact-us/avatar.png";

const ContactForm = () => {
  return (
    <div className="flex items-center justify-center">
      {" "}
      <div className="relative bg-[#FFFFFF0F] w-[1036px] p-16">
        <p className="font-primaryFont text-[16px] font-semibold  text-[#0BDB45] text-left">
          Need Some Help ?
        </p>

        <p className="font-primaryFont text-[30px] font-bold  text-[#fff] text-left mb-2">
          Get In Touch
        </p>

        <p className="font-primaryFont text-[17px] font-medium  text-[#fff] text-left mb-6">
          Whatever your question we are here to help
        </p>

        <div className="grid w-full max-w-sm items-center gap-1.5 ">
          <Label
            htmlFor="email"
            className="font-primaryFont text-[20px] font-medium text-[#fff] text-left"
          >
            Name
          </Label>
          <Input
            type="tex"
            id="text"
            placeholder="Name"
            className="rounded-none mb-4"
          />

          <Label
            htmlFor="email"
            className="font-primaryFont text-[20px] font-medium text-[#fff] text-left"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className="rounded-none mb-4"
          />

          <Label
            htmlFor="email"
            className="font-primaryFont text-[20px] font-medium text-[#fff] text-left"
          >
            Message
          </Label>
          <Textarea placeholder="Message" className="rounded-none mb-8" />

          <Button
            variant="gaming"
            className="h-fit text-[15px] text-black px-[1em] py-[0.5em] uppercase w-[200px]"
          >
            SEND
          </Button>
        </div>

        <div className="absolute bottom-0 right-0">
          <Image
            src={avatar}
            alt="avatar img"
            className="w-[594px] h-[756px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
