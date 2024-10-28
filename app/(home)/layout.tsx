'use client';
import Navbar from "@/components/navbar/navbar";
import ProductSearchBar from "@/components/product-search/product-search";
import { AuthProvider } from "@/context/AuthContext";
import { Montserrat, Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";

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

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role.name === "ADMIN") {
        router.push("/admin");
      } else {
        setIsAuthorized(true);
      }
    } else {
      setIsAuthorized(true);
      router.push("/");
    }
  }, [router]);
  if (!isAuthorized) {
    return <Spinner loading={!isAuthorized} />;
  }
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
        <ProductSearchBar />
        <Navbar />
        {children}
        </AuthProvider>
        </body>
    </html>
  );
};

export default HomeLayout;
