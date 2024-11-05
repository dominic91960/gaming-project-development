import Image from "next/image";

import Greeting from "./_components/Greeting";
import Summary from "./_components/Summary";
import DashboardText from "./_components/DashboardText";
import MonthlyEarnings from "./_components/MonthlyEarnings";
import TopCustomers from "./_components/TopCustomers";
import TopGames from "./_components/TopGames";
import samplePic from "@/public/images/sample-pic.png";
import character from "@/public/images/dashboard/character.png";

const summary = {
  totalEarning: 1832768,
  totalOrders: 2450,
  totalCustomers: 146327,
  totalProducts: 200,
};

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
  { month: "September", totalIncome: 134 },
  { month: "November", totalIncome: 176 },
  { month: "December", totalIncome: 265 },
];

const customers = [
  {
    profilePic: samplePic.src,
    username: "Apex67",
    name: "Dominic Brian",
    orders: "3",
  },
  {
    profilePic: samplePic.src,
    username: "PixelPirate",
    name: "Samantha Chen",
    orders: "5",
  },
  {
    profilePic: samplePic.src,
    username: "RetroRider",
    name: "Carlos Rivera",
    orders: "2",
  },
  {
    profilePic: samplePic.src,
    username: "CyberKnight",
    name: "Elena Gomez",
    orders: "8",
  },
  {
    profilePic: samplePic.src,
    username: "LootLord",
    name: "Michael Jordan",
    orders: "1",
  },
  {
    profilePic: samplePic.src,
    username: "QuestMaster",
    name: "Natalie Brooks",
    orders: "4",
  },
];

const games = [
  {
    poster: samplePic.src,
    name: "Black Myth: Wukong",
    discountPrice: 299,
    originalPrice: 399,
    rating: 3.7,
  },
  {
    poster: samplePic.src,
    name: "Elden Ring",
    discountPrice: 249,
    originalPrice: 349,
    rating: 4.8,
  },
  {
    poster: samplePic.src,
    name: "Horizon Forbidden West",
    discountPrice: 299,
    originalPrice: 399,
    rating: 4.5,
  },
  {
    poster: samplePic.src,
    name: "God of War Ragnarök",
    discountPrice: 349,
    originalPrice: 449,
    rating: 4.9,
  },
  {
    poster: samplePic.src,
    name: "Ghost of Tsushima",
    discountPrice: 199,
    originalPrice: 299,
    rating: 4.7,
  },
  {
    poster: samplePic.src,
    name: "The Last of Us Part II",
    discountPrice: 279,
    originalPrice: 379,
    rating: 4.6,
  },
  {
    poster: samplePic.src,
    name: "Cyberpunk 2077",
    discountPrice: 299,
    originalPrice: 399,
    rating: 3.9,
  },
  {
    poster: samplePic.src,
    name: "Final Fantasy VII Remake",
    discountPrice: 349,
    originalPrice: 449,
    rating: 4.8,
  },
  {
    poster: samplePic.src,
    name: "Ratchet & Clank: Rift Apart",
    discountPrice: 299,
    originalPrice: 399,
    rating: 4.6,
  },
  {
    poster: samplePic.src,
    name: "Resident Evil Village",
    discountPrice: 249,
    originalPrice: 349,
    rating: 4.5,
  },
  {
    poster: samplePic.src,
    name: "Assassin's Creed Valhalla",
    discountPrice: 299,
    originalPrice: 399,
    rating: 0,
  },
  {
    poster: samplePic.src,
    name: "Demon's Souls",
    discountPrice: 349,
    originalPrice: 449,
    rating: 4.7,
  },
  {
    poster: samplePic.src,
    name: "Battlefield 2042",
    discountPrice: 199,
    originalPrice: 299,
    rating: 0,
  },
  {
    poster: samplePic.src,
    name: "Forza Horizon 5",
    discountPrice: 299,
    originalPrice: 399,
    rating: 4.8,
  },
  {
    poster: samplePic.src,
    name: "Star Wars Jedi: Fallen Order",
    discountPrice: 249,
    originalPrice: 349,
    rating: 4.5,
  },
  {
    poster: samplePic.src,
    name: "Mortal Kombat 11",
    discountPrice: 199,
    originalPrice: 299,
    rating: 4.4,
  },
];

const Dashboard = () => {
  return (
    <section className="relative font-primaryFont text-white px-[36px]">
      <Greeting />
      <div className="md:grid md:grid-cols-2 md:gap-[16px] md:pb-[40px] lg:gap-[18px] lg:pb-[48px] xl:gap-[22px] xl:pb-[56px] 2xl:gap-[24px] 2xl:pb-[60px]">
        <div className="md:flex md:flex-col md:justify-between">
          <Summary summary={summary} />
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
        className="hidden absolute bottom-0 left-0 right-0 mx-auto -translate-x-[40%] lg:block lg:w-[24%] xl:w-[270px] 2xl:w-[300px]"
        style={{
          clipPath:
            "polygon(0% 0%, 0% 30%, 12% 40%, 12% 93%, 0% 93%, 0% 100%, 100% 100%, 100% 0%)",
        }}
      />
    </section>
  );
};

export default Dashboard;
