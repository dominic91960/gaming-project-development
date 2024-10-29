import "./globals.css";

import { Montserrat, Inter, Rajdhani } from "@next/font/google";
import Providers from "../providers";
import { CartProvider } from "@/context/CartContext";

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
  variable: "--font-rajdhaniFont",
});

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${rajdhani.variable}`}
    >
      <Providers>
        <CartProvider>
          <body>{children}</body>
        </CartProvider>
      </Providers>
    </html>
  );
};

export default HomeLayout;
