"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction, columns } from "./components/transaction-columns";
import { DataTable } from "./components/transaction-data-table";

import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import bg from "@/public/images/products/bg.png";
import samplePic from "@/public/images/sample-pic.png";
import Footer from "@/components/footer/footer";
import AccountInfo from "./components/account-info";
import SecurityInfo from "./components/security-info";
import TransactionAction from "./components/transaction-action";
import RecentActivities from "./components/recent-activities";

const profile = {
  id: "b0ijjfb4343asc4848##56",
  avatar: samplePic,
  username: "ellison342",
  email: "kavindakmanohara@gmail.com",
  city: "Kandy",
  country: "Sri Lanka",
  language: "English",
  firstName: "Ellison",
  lastName: "Smith",
  address: "270/F, Kadawatha Road Ganemulla",
  postalCode: "11020",
  region: "western",
  DOB: "2001/08/04",
  password: "ABCD1234",
  tel: "0284948483",
  trustedDevices: 2,
};

const recentActivity = [
  {
    poster: samplePic,
    name: "Greed Fall",
    desc: "Explore uncharted new lands as you set foot on a remote island seeping with magic, and filled with riches, lost secrets, and fantastic creatures.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "Cyberpunk 2077",
    desc: "An open-world RPG set in the dystopian future, where you can explore a massive city and complete missions to gain power and influence.",
    rating: 4.5,
    originalPrice: 199,
    discountPrice: 249,
  },
  {
    poster: samplePic,
    name: "Assassin's Creed Valhalla",
    desc: "Join Eivor and lead a Viking clan to glory. Build settlements, wage wars, and uncover a grand storyline in this action-packed RPG.",
    rating: 4.8,
    originalPrice: 329,
    discountPrice: 379,
  },
  {
    poster: samplePic,
    name: "FIFA 2023",
    desc: "Experience the latest iteration of the iconic soccer series with enhanced graphics and real-life player mechanics.",
    rating: 4.2,
    originalPrice: 249,
    discountPrice: 299,
  },
  {
    poster: samplePic,
    name: "NBA 2K23",
    desc: "Hit the courts with the latest in basketball simulation. Enjoy an authentic NBA experience with realistic gameplay and team management.",
    rating: 4.0,
    originalPrice: 199,
    discountPrice: 259,
  },
  {
    poster: samplePic,
    name: "Call of Duty: Modern Warfare",
    desc: "Enter the battlefield in this intense first-person shooter with advanced weapons, high-end graphics, and a gripping campaign mode.",
    rating: 4.7,
    originalPrice: 299,
    discountPrice: 349,
  },
  {
    poster: samplePic,
    name: "Red Dead Redemption 2",
    desc: "Step into the Wild West with this stunning open-world game where you can explore a vast world filled with danger and intrigue.",
    rating: 4.9,
    originalPrice: 399,
    discountPrice: 499,
  },
  {
    poster: samplePic,
    name: "Watch Dogs Legion",
    desc: "Join the resistance and hack your way through London in this thrilling open-world adventure that combines action and technology.",
    rating: 4.1,
    originalPrice: 279,
    discountPrice: 339,
  },
  {
    poster: samplePic,
    name: "Far Cry 6",
    desc: "Fight to liberate a tropical island from a ruthless dictator in this action-packed first-person shooter.",
    rating: 4.4,
    originalPrice: 259,
    discountPrice: 309,
  },
  {
    poster: samplePic,
    name: "Spider-Man: Miles Morales",
    desc: "Swing into action as Miles Morales in this follow-up to the hit Spider-Man game, featuring new powers and an exciting storyline.",
    rating: 4.9,
    originalPrice: 349,
    discountPrice: 429,
  },
  {
    poster: samplePic,
    name: "The Last of Us Part II",
    desc: "Experience the emotionally charged and action-filled sequel to the critically acclaimed The Last of Us, with a deep and engaging story.",
    rating: 5,
    originalPrice: 399,
    discountPrice: 499,
  },
  {
    poster: samplePic,
    name: "Horizon Zero Dawn",
    desc: "Explore a beautiful post-apocalyptic world filled with mechanical creatures and uncover the secrets of the past.",
    rating: 4.8,
    originalPrice: 299,
    discountPrice: 379,
  },
  {
    poster: samplePic,
    name: "God of War",
    desc: "Join Kratos on an epic journey through Norse mythology in this action-adventure game with breathtaking visuals and a gripping story.",
    rating: 4.9,
    originalPrice: 349,
    discountPrice: 449,
  },
  {
    poster: samplePic,
    name: "Halo Infinite",
    desc: "Return to the world of Halo in this thrilling installment with expansive environments, powerful weapons, and intense multiplayer action.",
    rating: 4.6,
    originalPrice: 299,
    discountPrice: 349,
  },
  {
    poster: samplePic,
    name: "Doom Eternal",
    desc: "Take on the role of the Doom Slayer in this fast-paced and brutal first-person shooter with non-stop action.",
    rating: 4.5,
    originalPrice: 249,
    discountPrice: 299,
  },
  {
    poster: samplePic,
    name: "Wolfenstein II: The New Colossus",
    desc: "Fight to liberate America from Nazi control in this alternate-history first-person shooter with high-stakes missions and gripping gameplay.",
    rating: 4.3,
    originalPrice: 229,
    discountPrice: 279,
  },
  {
    poster: samplePic,
    name: "Final Fantasy XV",
    desc: "Join Prince Noctis and his friends on an epic journey in this action-packed role-playing game with stunning visuals and engaging combat.",
    rating: 4.8,
    originalPrice: 369,
    discountPrice: 449,
  },
  {
    poster: samplePic,
    name: "Ghost of Tsushima",
    desc: "Become a samurai warrior and defend your homeland from invaders in this visually stunning open-world game.",
    rating: 4.9,
    originalPrice: 349,
    discountPrice: 429,
  },
  {
    poster: samplePic,
    name: "Resident Evil Village",
    desc: "Survive the horrors of a mysterious village in this atmospheric and terrifying entry in the Resident Evil series.",
    rating: 4.7,
    originalPrice: 299,
    discountPrice: 369,
  },
  {
    poster: samplePic,
    name: "Elden Ring",
    desc: "Explore a vast open world and take on powerful enemies in this highly anticipated action RPG from the creators of Dark Souls.",
    rating: 5,
    originalPrice: 399,
    discountPrice: 499,
  },
];

const transactions = [
  // {
  //   orderId: "#112Htk",
  //   date: "2023/11/10",
  //   username: "Ethan Clark",
  //   total: 89.99,
  //   products: [
  //     {
  //       productId: "#prd101",
  //       poster: samplePic,
  //       name: "Cyberpunk 2077",
  //       price: 29.99,
  //       quantity: 2,
  //     },
  //     {
  //       productId: "#prd102",
  //       poster: samplePic,
  //       name: "Assassin's Creed Valhalla",
  //       price: 34.99,
  //       quantity: 1,
  //     },
  //     {
  //       productId: "#prd103",
  //       poster: samplePic,
  //       name: "Far Cry 6",
  //       price: 23.49,
  //       quantity: 1,
  //     },
  //     {
  //       productId: "#prd104",
  //       poster: samplePic,
  //       name: "Watch Dogs Legion",
  //       price: 24.99,
  //       quantity: 1,
  //     },
  //     {
  //       productId: "#prd105",
  //       poster: samplePic,
  //       name: "Red Dead Redemption 2",
  //       price: 40.0,
  //     },
  //     {
  //       productId: "#prd106",
  //       poster: samplePic,
  //       name: "Spider-Man Miles Morales",
  //       price: 29.5,
  //     },
  //     {
  //       productId: "#prd107",
  //       poster: samplePic,
  //       name: "The Last of Us Part II",
  //       price: 35.5,
  //     },
  //     {
  //       productId: "#prd108",
  //       poster: samplePic,
  //       name: "Ghost of Tsushima",
  //       price: 21.5,
  //     },
  //     {
  //       productId: "#prd109",
  //       poster: samplePic,
  //       name: "Halo Infinite",
  //       price: 13.0,
  //     },
  //     {
  //       productId: "#prd110",
  //       poster: samplePic,
  //       name: "FIFA 2023",
  //       price: 15.99,
  //     },
  //     {
  //       productId: "#prd111",
  //       poster: samplePic,
  //       name: "NBA 2K23",
  //       price: 18.5,
  //     },
  //     {
  //       productId: "#prd112",
  //       poster: samplePic,
  //       name: "Call of Duty: Modern Warfare",
  //       price: 19.99,
  //     },
  //   ],
  //   coupon: 40.0,
  // },
  {
    orderId: "#546FGd",
    date: "2023/08/04",
    username: "Dominic Brian",
    total: 9.25,
    products: [
      {
        productId: "#rid294",
        poster: samplePic,
        name: "Greed Fall",
        price: 12.5,
        quantity: 2,
      },
      {
        productId: "#ri6s94",
        poster: samplePic,
        name: "Sample game",
        price: 11.5,
        quantity: 3,
      },
    ],
    coupon: 5.99,
  },
  // {
  //   orderId: "#324TYb",
  //   date: "2023/08/12",
  //   username: "Sarah Connor",
  //   total: 19.35,
  //   products: [
  //     {
  //       productId: "#pmk876",
  //       poster: samplePic,
  //       name: "Cyberpunk 2077",
  //       price: 29.99,
  //     },
  //     {
  //       productId: "#ptr567",
  //       poster: samplePic,
  //       name: "The Witcher 3",
  //       price: 24.5,
  //     },
  //   ],
  //   coupon: 10.99,
  // },
  // {
  //   orderId: "#872HFk",
  //   date: "2023/09/02",
  //   username: "John Doe",
  //   total: 8.75,
  //   products: [
  //     {
  //       productId: "#otg123",
  //       poster: samplePic,
  //       name: "Assassin's Creed Valhalla",
  //       price: 14.5,
  //     },
  //     {
  //       productId: "#kjl994",
  //       poster: samplePic,
  //       name: "Halo Infinite",
  //       price: 13.0,
  //     },
  //   ],
  //   coupon: 7.99,
  // },
  // {
  //   orderId: "#672Ghf",
  //   date: "2023/09/15",
  //   username: "Alice Smith",
  //   total: 6.49,
  //   products: [
  //     {
  //       productId: "#nmw879",
  //       poster: samplePic,
  //       name: "FIFA 2023",
  //       price: 15.99,
  //     },
  //     {
  //       productId: "#bgt560",
  //       poster: samplePic,
  //       name: "NBA 2K23",
  //       price: 18.5,
  //     },
  //   ],
  //   coupon: 12.99,
  // },
  // {
  //   orderId: "#214Kmn",
  //   date: "2023/09/25",
  //   username: "Michael Johnson",
  //   total: 4.99,
  //   products: [
  //     {
  //       productId: "#qwe938",
  //       poster: samplePic,
  //       name: "Resident Evil Village",
  //       price: 17.5,
  //     },
  //     {
  //       productId: "#vbn543",
  //       poster: samplePic,
  //       name: "Call of Duty",
  //       price: 19.5,
  //     },
  //   ],
  //   coupon: 15.99,
  // },
  // {
  //   orderId: "#874Wkm",
  //   date: "2023/10/01",
  //   username: "Emma Taylor",
  //   total: 13.45,
  //   products: [
  //     {
  //       productId: "#rgh295",
  //       poster: samplePic,
  //       name: "Far Cry 6",
  //       price: 23.99,
  //     },
  //     {
  //       productId: "#tyu883",
  //       poster: samplePic,
  //       name: "Watch Dogs",
  //       price: 20.5,
  //     },
  //   ],
  //   coupon: 11.99,
  // },
  // {
  //   orderId: "#913Zkv",
  //   date: "2023/10/08",
  //   username: "Sophia Brown",
  //   total: 7.89,
  //   products: [
  //     {
  //       productId: "#plr937",
  //       poster: samplePic,
  //       name: "Horizon Zero Dawn",
  //       price: 22.99,
  //     },
  //     {
  //       productId: "#lkj283",
  //       poster: samplePic,
  //       name: "Ghost of Tsushima",
  //       price: 21.5,
  //     },
  //   ],
  //   coupon: 15.99,
  // },
  // {
  //   orderId: "#526Qlp",
  //   date: "2023/10/12",
  //   username: "Daniel White",
  //   total: 5.75,
  //   products: [
  //     {
  //       productId: "#osd945",
  //       poster: samplePic,
  //       name: "Elden Ring",
  //       price: 27.5,
  //     },
  //     {
  //       productId: "#gth356",
  //       poster: samplePic,
  //       name: "Dark Souls 3",
  //       price: 25.0,
  //     },
  //   ],
  //   coupon: 20.99,
  // },
  // {
  //   orderId: "#245Yks",
  //   date: "2023/10/20",
  //   username: "Olivia Harris",
  //   total: 11.59,
  //   products: [
  //     {
  //       productId: "#poj953",
  //       poster: samplePic,
  //       name: "Spider-Man Miles Morales",
  //       price: 29.5,
  //     },
  //     {
  //       productId: "#nty829",
  //       poster: samplePic,
  //       name: "God of War",
  //       price: 30.0,
  //     },
  //   ],
  //   coupon: 25.99,
  // },
  // {
  //   orderId: "#731Jwe",
  //   date: "2023/10/25",
  //   username: "Liam Thompson",
  //   total: 16.25,
  //   products: [
  //     {
  //       productId: "#zxk273",
  //       poster: samplePic,
  //       name: "Red Dead Redemption 2",
  //       price: 40.0,
  //     },
  //     {
  //       productId: "#fdp763",
  //       poster: samplePic,
  //       name: "Final Fantasy XV",
  //       price: 38.0,
  //     },
  //   ],
  //   coupon: 30.99,
  // },
  // {
  //   orderId: "#128Pmg",
  //   date: "2023/10/28",
  //   username: "James Lee",
  //   total: 14.99,
  //   products: [
  //     {
  //       productId: "#tyu372",
  //       poster: samplePic,
  //       name: "Doom Eternal",
  //       price: 32.5,
  //     },
  //     {
  //       productId: "#iru938",
  //       poster: samplePic,
  //       name: "Wolfenstein 2",
  //       price: 30.0,
  //     },
  //   ],
  //   coupon: 25.99,
  // },
  // {
  //   orderId: "#349Klm",
  //   date: "2023/11/01",
  //   username: "Charlotte Martinez",
  //   total: 18.49,
  //   products: [
  //     {
  //       productId: "#plo583",
  //       poster: samplePic,
  //       name: "The Last of Us Part II",
  //       price: 35.5,
  //     },
  //     {
  //       productId: "#zxc764",
  //       poster: samplePic,
  //       name: "Uncharted 4",
  //       price: 33.5,
  //     },
  //   ],
  //   coupon: 28.99,
  // },
];

interface RecentActivity {
  poster: StaticImageData;
  name: string;
  desc: string;
  rating: number;
  originalPrice: number;
  discountPrice: number;
}

export default function ProfilePage() {
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<RecentActivity[]>(
    []
  );
  const totalPages = Math.ceil(recentActivity.length / productsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;

    setDisplayedProducts(
      recentActivity.slice(startIndex, startIndex + productsPerPage)
    );
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      setCurrentPage(1);
      const screenWidth = window.innerWidth;

      switch (true) {
        case screenWidth < 550:
          setProductsPerPage(3);
          break;
        case screenWidth >= 550 && screenWidth < 1280:
          setProductsPerPage(4);
          break;
        case screenWidth >= 1280:
          setProductsPerPage(5);
          break;
        default:
          setProductsPerPage(3);
          break;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getTransaction = (selectedOrderId: string) =>
    transactions.filter(({ orderId }) => orderId === selectedOrderId)[0];

  const viewColumn: ColumnDef<Transaction> = {
    id: "view",
    header: "Action",
    cell: ({ row }) => (
      <TransactionAction
        row={row}
        products={getTransaction(row.original.orderId).products}
        subTotal={
          +getTransaction(row.original.orderId)
            .products.reduce((sum, product) => sum + product.price, 0)
            .toFixed(2)
        }
        coupon={getTransaction(row.original.orderId).coupon}
        orderTotal={
          +(
            getTransaction(row.original.orderId).products.reduce(
              (sum, product) => sum + product.price,
              0
            ) - getTransaction(row.original.orderId).coupon
          ).toFixed(2)
        }
      />
    ),
  };

  const updatedColumns: ColumnDef<Transaction>[] = [...columns, viewColumn];

  return (
    <>
      <ProductSearchBar />
      <Navbar />
      <section className="bg-[#051301] font-primaryFont text-white">
        {/* Header */}
        <div
          className="relative font-normal leading-tight bg-cover bg-center"
          style={{ backgroundImage: `url('${bg.src}')` }}
        >
          {/* Header text container */}
          <div className="relative container mx-auto px-[36px] text-[7px] z-10 sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]">
            <div className="flex items-center gap-x-[15px] pt-[64px] sm:gap-x-[25px] md:gap-x-[35px] lg:gap-x-[45px] xl:gap-x-[50px] 2xl:gap-x-[56px] pb-[55px] sm:pt-[74px] md:pt-[86px] lg:pt-[98px] xl:pt-[107px] 2xl:pt-[116px]">
              <div className="size-[46px] sm:size-[70px] md:size-[94px] lg:size-[118px] xl:size-[135px] 2xl:size-[152px]">
                <Image
                  src={profile.avatar}
                  alt={profile.id}
                  className="w-full rounded-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-[16px] mb-[0.1em] sm:text-[22px] md:text-[28px] lg:text-[34px] xl:text-[37px] 2xl:text-[40px]">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p>
                  {profile.email}
                  <span className="text-[#BCBCBC]">&nbsp;|&nbsp;</span>
                  {profile.city} {profile.country}
                </p>
                <hr className="border-t-[#0BDB45] my-[0.2em]" />
                <p className="capitalize sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[10.5px] 2xl:text-[11px]">
                  your private information is
                  <span className="font-bold"> not visible to others.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom gradient  */}
          <div className="w-full h-1/2 absolute bottom-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="bg-gradient-to-b from-black to-transparent">
          {/* Container for the rest of the content */}
          <div className="container mx-auto px-[36px] pb-[20px] 2xl:pb-[80px]">
            {/* Container for account details and security details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[20px] sm:gap-[16px] md:gap-[20px] lg:gap-[26px] xl:gap-[32px] 2xl:gap-[38px]">
              {/* Account details */}
              <AccountInfo
                id={profile.id}
                avatar={profile.avatar}
                username={profile.username}
                email={profile.email}
                city={profile.city}
                country={profile.country}
                language={profile.language}
                firstName={profile.firstName}
                lastName={profile.lastName}
                address={profile.address}
                postalCode={profile.postalCode}
                region={profile.region}
                DOB={profile.DOB}
              />

              {/* Security details */}
              <SecurityInfo
                password={profile.password}
                tel={profile.password}
                trustedDevices={profile.trustedDevices}
              />
            </div>

            {/* Recent activity */}
            <h3 className="font-semibold text-[15px] mt-[1.2em] mb-[0.7em] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px]">
              Recent Activity
            </h3>
            <RecentActivities
              displayedProducts={displayedProducts}
              productsPerPage={productsPerPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />

            {/* Transaction history */}
            <h3 className="font-semibold text-[15px] mt-[1.2em] mb-[0.7em] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px]">
              Transaction History
            </h3>
            <div
              className="bg-gradient-to-b from-transparent to-white/30 border border-t-0 text-[8px] p-[12px] 2xl:p-[50px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
              style={{
                borderImage:
                  "linear-gradient(to bottom, transparent, #75F94C) 1",
              }}
            >
              <DataTable columns={updatedColumns} data={transactions} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
