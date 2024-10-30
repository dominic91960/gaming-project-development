import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EmailVerification = () => {
  return (
    <menu
      className="bg-gradient-to-b from-transparent to-white/30 text-[8px] px-[4em] py-[2em] border border-t-0 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
      style={{
        borderImage: "linear-gradient(to bottom, transparent, #75F94C) 1",
      }}
    >
      {/* Header */}
      <p className="sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[20px] font-bold">
        Verify your email.
      </p>
      <p className="my-[0.6em]">
        Hi Lahiru! Use the link below to verify your email and start enjoying
        VindGame
      </p>

      {/* Verify email */}
      <Button
        variant="gaming"
        className="w-full h-fit text-[1em] px-[1em] py-[0.5em]"
      >
        Verify email
      </Button>

      <p className="text-[12px] my-[0.5em]">
        Questions ? Email us at&nbsp;
        <Link
          href="mailto:vingameinfo@gmail.com"
          className="text-[#0BDB45] hover:opacity-80"
        >
          vingameinfo@gmail.com
        </Link>
      </p>

      <hr className="border-t-[#BCBCBC] my-[1em]" />

      <p className="text-[12px] my-[0.5em]">
        If you haven&apos;t received the email, click to resend.
      </p>

      {/* Resend email */}
      <Button
        variant="gaming"
        className="w-full h-fit text-[1em] px-[1em] py-[0.5em]"
      >
        Resend email
      </Button>
    </menu>
  );
};

export default EmailVerification;
