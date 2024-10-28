import Image from "next/image";

import { FaDollarSign } from "react-icons/fa";
import { PiListStarFill } from "react-icons/pi";
import { TbUserFilled } from "react-icons/tb";
import { RiBox3Fill } from "react-icons/ri";

import Greeting from "./_components/Greeting";
import Summary from "./_components/Summary";
import TopCustomers from "./_components/TopCustomers";
import TopGames from "./_components/TopGames";
import samplePic from "@/public/images/sample-pic.png";
import character from "@/public/images/dashboard/character.png";

const summary = [
  {
    icon: <FaDollarSign />,
    title: "Total Earning",
    value: 2669.0,
  },
  {
    icon: <PiListStarFill />,
    title: "Total Orders",
    value: 20,
  },
  {
    icon: <TbUserFilled />,
    title: "Total Customers",
    value: 100,
  },
  {
    icon: <RiBox3Fill />,
    title: "Total Products",
    value: 200,
  },
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
    description:
      "An action-adventure RPG inspired by the classic Chinese tale, Journey to the West.",
    discountPrice: 299,
    originalPrice: 399,
    rating: 3.7,
  },
  {
    poster: samplePic.src,
    name: "Elden Ring",
    description:
      "An expansive fantasy action RPG with an open world filled with dark lore.",
    discountPrice: 249,
    originalPrice: 349,
    rating: 4.8,
  },
  {
    poster: samplePic.src,
    name: "Horizon Forbidden West",
    description:
      "A stunning open-world action RPG featuring robotic creatures and lush landscapes.",
    discountPrice: 299,
    originalPrice: 399,
    rating: 4.5,
  },
  {
    poster: samplePic.src,
    name: "God of War Ragnarök",
    description:
      "A mythological action-adventure game focusing on the relationship between Kratos and his son, Atreus.",
    discountPrice: 349,
    originalPrice: 449,
    rating: 4.9,
  },
  {
    poster: samplePic.src,
    name: "Ghost of Tsushima",
    description:
      "An action-adventure game set in feudal Japan, featuring samurai combat and stealth elements.",
    discountPrice: 199,
    originalPrice: 299,
    rating: 4.7,
  },
  {
    poster: samplePic.src,
    name: "The Last of Us Part II",
    description:
      "A gripping story of survival and revenge in a post-apocalyptic world.",
    discountPrice: 279,
    originalPrice: 379,
    rating: 4.6,
  },
  {
    poster: samplePic.src,
    name: "Cyberpunk 2077",
    description:
      "An open-world RPG set in a dystopian future, filled with high-tech and cybernetic enhancements.",
    discountPrice: 299,
    originalPrice: 399,
    rating: 3.9,
  },
  {
    poster: samplePic.src,
    name: "Final Fantasy VII Remake",
    description:
      "A reimagining of the classic RPG with stunning visuals and a revamped combat system.",
    discountPrice: 349,
    originalPrice: 449,
    rating: 4.8,
  },
  {
    poster: samplePic.src,
    name: "Ratchet & Clank: Rift Apart",
    description:
      "An action platformer that showcases the power of the PS5 with interdimensional gameplay.",
    discountPrice: 299,
    originalPrice: 399,
    rating: 4.6,
  },
  {
    poster: samplePic.src,
    name: "Resident Evil Village",
    description:
      "A survival horror game continuing the story of Ethan Winters in a mysterious village.",
    discountPrice: 249,
    originalPrice: 349,
    rating: 4.5,
  },
  {
    poster: samplePic.src,
    name: "Assassin's Creed Valhalla",
    description:
      "An action RPG set in the Viking era, where players build their own settlements.",
    discountPrice: 299,
    originalPrice: 399,
    rating: 4.4,
  },
  {
    poster: samplePic.src,
    name: "Demon's Souls",
    description:
      "A remake of the classic RPG known for its challenging gameplay and atmospheric world.",
    discountPrice: 349,
    originalPrice: 449,
    rating: 4.7,
  },
  {
    poster: samplePic.src,
    name: "Battlefield 2042",
    description:
      "A multiplayer first-person shooter set in a near-future warzone.",
    discountPrice: 199,
    originalPrice: 299,
    rating: 3.5,
  },
  {
    poster: samplePic.src,
    name: "Forza Horizon 5",
    description:
      "An open-world racing game featuring stunning visuals and diverse landscapes.",
    discountPrice: 299,
    originalPrice: 399,
    rating: 4.8,
  },
  {
    poster: samplePic.src,
    name: "Star Wars Jedi: Fallen Order",
    description:
      "An action-adventure game set in the Star Wars universe, focusing on lightsaber combat and exploration.",
    discountPrice: 249,
    originalPrice: 349,
    rating: 4.5,
  },
  {
    poster: samplePic.src,
    name: "Mortal Kombat 11",
    description:
      "A fighting game featuring iconic characters and brutal combat mechanics.",
    discountPrice: 199,
    originalPrice: 299,
    rating: 4.4,
  },
];

const Dashboard = () => {
  return (
    <section className="relative font-primaryFont text-white px-[36px]">
      <Greeting />
      <div className="md:grid md:grid-cols-2 md:gap-[16px] lg:gap-[18px] xl:gap-[22px] 2xl:gap-[24px]">
        <div>
          <Summary summary={summary} />
          <div className="w-full h-[15em] bg-black/40 my-[24px] border border-[#0D6D49] rounded-sm"></div>
        </div>
        <div>
          <TopCustomers customers={customers} />
          <TopGames games={games} />
        </div>
      </div>
      <Image
        src={character}
        alt="Dashboard character"
        className="hidden absolute bottom-0 left-0 right-0 mx-auto -translate-x-[40%] md:block md:w-[220px] lg:w-[260px] xl:w-[300px] 2xl:w-[322px]"
      />
    </section>
  );
};

export default Dashboard;
