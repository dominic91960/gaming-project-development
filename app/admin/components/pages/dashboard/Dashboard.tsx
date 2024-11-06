import Image from "next/image";
import Greeting from "./_components/Greeting";
import Summary from "./_components/Summary";
import DashboardText from "./_components/DashboardText";
import MonthlyEarnings from "./_components/MonthlyEarnings";
import TopCustomers from "./_components/TopCustomers";
import TopGames from "./_components/TopGames";
import samplePic from "@/public/images/sample-pic.png";
import character from "@/public/images/dashboard/character.png";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosInstance";

const totalEarning = 1832768;

const chartData = [
  { month: "January", totalIncome: 183 },
  { month: "February", totalIncome: 305 },
  { month: "March", totalIncome: 237 },
  { month: "April", totalIncome: 73 },
  { month: "May", totalIncome: 209 },
  { month: "June", totalIncome: 214 },
  { month: "July", totalIncome: 184 },
  { month: "August", totalIncome: 314 },
  { month: "September", totalIncome: 223 },
  { month: "October", totalIncome: 269 },
  { month: "November", totalIncome: 176 },
  { month: "December", totalIncome: 265 },
];

interface Customers {
  profilePic: string;
  username: string;
  name: string;
  orders: number;
}

interface Games {
  poster: string;
  name: string;
  discountPrice: number;
  originalPrice: number;
  rating: number;
}

const Dashboard = () => {
  const [customers, setCustomers] = useState<Customers[] | null>(null);
  const [games, setGames] = useState<Games[] | null>(null);

  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [totalCustomer, setTotalCustomer] = useState<number>(0);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    getTopData();
  }, []);

  const getTopData = async () => {
    try {
      const response = await axiosInstance.get("/orders/top-users?limit=6");
      const { topUsers, topGames, totalOrders, totalCustomers, totalProducts } =
        response.data;

      // Set state based on the API response
      setCustomers(topUsers);
      setGames(topGames);
      setTotalOrder(totalOrders);
      setTotalCustomer(totalCustomers);
      setTotalProduct(totalProducts);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  if (loading) {
    return (
      <section className="relative container mx-auto font-primaryFont text-white px-[36px] xl:mx-0">
        <div>Loading...</div> {/* Add a loading state UI */}
      </section>
    );
  }

  return (
    <section className="relative container mx-auto font-primaryFont text-white px-[36px] xl:mx-0">
      <Greeting />
      <div className="md:grid md:grid-cols-2 md:gap-[16px] md:pb-[40px] lg:gap-[18px] lg:pb-[48px] xl:gap-[22px] xl:pb-[56px] 2xl:gap-[24px] 2xl:pb-[60px]">
        <div className="md:flex md:flex-col md:justify-between">
          <Summary
            totalEarning={totalEarning}
            totalOrders={totalOrder}
            totalCustomers={totalCustomer}
            totalProducts={totalProduct}
          />
          <DashboardText />
          <MonthlyEarnings chartData={chartData} />
        </div>
        <div className="md:flex md:flex-col md:justify-between">
          <TopCustomers customers={customers} />
          <TopGames games={games} />
        </div>
      </div>
      <Image
        src={character}
        alt="Dashboard character"
        className="hidden absolute bottom-[40px] left-0 right-0 mx-auto -translate-x-[40%] lg:block lg:w-[24%] xl:w-[270px] 2xl:w-[300px]"
        style={{
          clipPath:
            "polygon(0% 0%, 0% 30%, 12% 40%, 12% 93%, 0% 93%, 0% 100%, 100% 100%, 100% 0%)",
        }}
      />
    </section>
  );
};

export default Dashboard;
