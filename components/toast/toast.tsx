import React, { useEffect } from "react";

import { AiFillInfoCircle, AiFillCloseCircle } from "react-icons/ai";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import "./toast.css";

interface ToastProps {
  message: string;
  type: "default" | "success" | "error";
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  let icon = <AiFillInfoCircle className="size-[2.3em] text-white/50" />;
  if (type === "success")
    icon = <IoCheckmarkCircleSharp className="size-[2.3em] text-[#0BDB45]" />;
  if (type === "error")
    icon = <AiFillCloseCircle className="size-[2.3em] text-[#FF374E]" />;

  let border = "border-white/50";
  if (type === "success") border = "border-[#0D6D49]/50";
  if (type === "error") border = "border-[#FF374E]/50";

  return (
    <div
      className={`toast fixed top-[155px] left-0 right-0 w-fit mx-auto px-[1em] py-[0.5em] flex items-center justify-center gap-[1.5em] bg-[#111111] font-primaryFont text-white text-[9px] border ${border} z-[100] sm:top-[148px] sm:px-[5em] sm:py-[1.5em] sm:text-[10px] md:top-[140px] md:text-[11px] lg:text-[12px] xl:top-[148px] xl:text-[12.5px] 2xl:text-[13px]`}
    >
      {icon}
      <p className="w-fit max-w-[30ch]">{message}</p>
    </div>
  );
};

export default Toast;
