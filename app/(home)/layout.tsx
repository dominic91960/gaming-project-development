"use client";
"use strict";
import Navbar from "@/components/navbar/navbar";
import ProductSearchBar from "@/components/product-search/product-search";
import { AuthProvider } from "@/context/AuthContext";
import { Montserrat, Inter, Rajdhani } from "@next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";
import { WishlistProvider } from "@/context/WishListContext";
import axios from "axios";
import { set } from "date-fns";
import { ToastProvider } from "@/context/ToastContext";

// Configure Montserrat with all required weights
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-primaryFont",
});

// Configure Inter with Regular 400 weight
const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-secondaryFont",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const verification = async () => {
      console.log("verifying customer..", isAuthorized);
      setIsAuthorized(false);
      const user = localStorage.getItem("user");
      if (user && localStorage.getItem("accessToken")) {
        try {
          const res = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-session",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          if (res.status === 200) {
            const parsedUser = JSON.parse(user);
            setIsAuthorized(true);
            if (parsedUser.role.name === "ADMIN") {
              setIsAuthorized(false);
              window.location.href='/admin'
              return;
            } else {
              setIsAuthorized(true);
              return;
            }
          } else {
            throw new Error("Unauthorized");
          }
        } catch (error) {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setIsAuthorized(true);
          return;
        }
      } else {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setIsAuthorized(true);
        return;
      }
    };

    verification();
  }, [router]);

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${rajdhani.variable}`}
    >
      <body>
        {isAuthorized? <ToastProvider>
          <AuthProvider>
            <div className="relative z-40">
              <ProductSearchBar />
            </div>
            <div>
              <Navbar />
            </div>
            <div className="relative z-10">
              <WishlistProvider>{children}</WishlistProvider>
            </div>
          </AuthProvider>
        </ToastProvider>: <Spinner loading={!isAuthorized} />}
      </body>
    </html>
  );
};

export default HomeLayout;
