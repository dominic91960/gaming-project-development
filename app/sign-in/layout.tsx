"use client";

import React, { ReactNode } from "react";

import { ToastProvider } from "@/context/ToastContext";

const SignInLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default SignInLayout;
