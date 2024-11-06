import React, { useEffect, useState } from "react";
import Link from "next/link";

import axiosInstance from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";

import { useAuthContext } from "@/context/AuthContext";

const EmailVerification = () => {
  const { user } = useAuthContext();
  const [timer, setTimer] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);

  // Start countdown effect
  useEffect(() => {
    if (isResendDisabled && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      setTimer(60); // Reset timer for next resend cycle
    }
  }, [isResendDisabled, timer]);

  const sendEmailVerificationLink = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-otp-again`;
      await axiosInstance.post(url, { email: user?.email });
      setIsResendDisabled(true); // Disable resend button and start timer
      setTimer(60); // Reset timer
    } catch (error: any) {}
  };

  let message = (
    <div className="w-full flex items-center justify-center border border-[#0BDB45]">
      <p className="text-[1em] px-[1em] py-[0.5em]">
        Please check your email&nbsp;
        <span className="md:hidden xl:inline">to verify your account</span>
      </p>
    </div>
  );

  if (user.isVerify)
    message = (
      <div className="w-full flex items-center justify-center border border-[#0BDB45]">
        <p className="text-[1em] px-[1em] py-[0.5em]">Your email is verified</p>
      </div>
    );

  return (
    <menu
      className="bg-gradient-to-b from-transparent to-white/30 text-[8px] px-[2em] py-[2em] border border-t-0 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
      style={{
        borderImage: "linear-gradient(to bottom, transparent, #75F94C) 1",
      }}
    >
      {/* Header */}
      <p className="sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[20px] font-bold">
        Verify your email.
      </p>
      <p className="my-[0.6em]">
        Hi {user.firstName ?? "User"}!&nbsp;
        {!user.isVerify
          ? "Verify your email and start enjoying VinGame."
          : "Your account is verified. Start enjoying VinGame!"}
      </p>

      {/* Verify email */}
      {message}

      <p className="text-[12px] my-[0.5em]">
        Questions? Email us at&nbsp;
        <span>
          <Link
            href={`mailto:support@sphiria.com`}
            className="text-[#0BDB45] hover:opacity-80"
          >
            support@sphiria.com
          </Link>
        </span>
      </p>

      {!user.isVerify && <hr className="border-t-[#BCBCBC] my-[1em]" />}

      {!user.isVerify && (
        <p className="text-[12px] my-[0.5em]">
          If you haven&apos;t received the email, click to resend.
        </p>
      )}

      {/* Resend email */}
      {!user.isVerify && isResendDisabled && <p>Resend Code in {timer}s</p>}

      {!user.isVerify && !isResendDisabled && (
        <Button
          variant="gaming"
          className="w-full h-fit text-[1em] px-[1em] py-[0.5em]"
          onClick={sendEmailVerificationLink}
        >
          Resend email
        </Button>
      )}
    </menu>
  );
};

export default EmailVerification;
