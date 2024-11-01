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
import { verifySession } from "@/hooks/useVerifySession";
import axios from "axios";
import { set } from "date-fns";

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

  console.log("HomeLayout............");

  useEffect(() => {
    const verification = async () => {
      console.log(
        "Verifying session...2222",
        localStorage.getItem("accessToken")
      );
      const user = localStorage.getItem("user");
      if (user && localStorage.getItem("accessToken")) {
        try {
          console.log(
            "Verifying session...",
            localStorage.getItem("accessToken")
          );
          const res = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-session",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          console.log("res....................", res);
          if (res.status === 200) {
            console.log("Authorized");
            // return true;
            const parsedUser = JSON.parse(user);
            setIsAuthorized(true);
            if (parsedUser.role.name === "ADMIN") {
              router.push("/admin");
            } else {
              setIsAuthorized(true);
            }
            return;
          } else {
            console.log("Unauthorized.....................");
            setIsAuthorized(true);
            // router.push("/");
            throw new Error("Unauthorized");
          }
        } catch (error) {
          // console.log(error);
          // localStorage.clear();
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setIsAuthorized(true);
          // router.push("/");
          return;
        }
      } else {
        // localStorage.clear();
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        // router.push("/");
        setIsAuthorized(true);
      }
    };

    verification();
  }, [router]);

  if (!isAuthorized) {
    return <Spinner loading={!isAuthorized} />;
  }
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${rajdhani.variable}`}
    >
      <body>
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
      </body>
    </html>
  );
};

export default HomeLayout;
