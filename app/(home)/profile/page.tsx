"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction, columns } from "./components/transaction-columns";
import { DataTable } from "./components/transaction-data-table";
import { Button } from "@/components/ui/button";
import { FaEye, FaPencilAlt, FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import bg from "@/public/images/products/bg.png";
import samplePic from "@/public/images/sample-pic.png";
import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import AccountInfo from "./components/account-info";
import SecurityInfo from "./components/security-info";
import RecentActivities from "./components/recent-activities";
import Footer from "@/components/footer/footer";
import EditAccountInfo from "./components/edit-account-info";
import EditPassword from "./components/edit-password";
import EditTel from "./components/edit-tel";
import TransactionAction from "./components/transaction-action";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import { set } from "date-fns";
import toast from "react-hot-toast";
import axios from "axios";

const recentActivity = [
  {
    poster: samplePic.src,
    name: "Greed Fall",
    desc: "Explore uncharted new lands as you set foot on a remote island seeping with magic, and filled with riches, lost secrets, and fantastic creatures.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic.src,
    name: "Cyberpunk 2077",
    desc: "An open-world RPG set in the dystopian future, where you can explore a massive city and complete missions to gain power and influence.",
    rating: 4.5,
    originalPrice: 199,
    discountPrice: 249,
  },
  {
    poster: samplePic.src,
    name: "Assassin's Creed Valhalla",
    desc: "Join Eivor and lead a Viking clan to glory. Build settlements, wage wars, and uncover a grand storyline in this action-packed RPG.",
    rating: 4.8,
    originalPrice: 329,
    discountPrice: 379,
  },
  {
    poster: samplePic.src,
    name: "FIFA 2023",
    desc: "Experience the latest iteration of the iconic soccer series with enhanced graphics and real-life player mechanics.",
    rating: 4.2,
    originalPrice: 249,
    discountPrice: 299,
  },
  {
    poster: samplePic.src,
    name: "NBA 2K23",
    desc: "Hit the courts with the latest in basketball simulation. Enjoy an authentic NBA experience with realistic gameplay and team management.",
    rating: 4.0,
    originalPrice: 199,
    discountPrice: 259,
  },
  {
    poster: samplePic.src,
    name: "Call of Duty: Modern Warfare",
    desc: "Enter the battlefield in this intense first-person shooter with advanced weapons, high-end graphics, and a gripping campaign mode.",
    rating: 4.7,
    originalPrice: 299,
    discountPrice: 349,
  },
  {
    poster: samplePic.src,
    name: "Red Dead Redemption 2",
    desc: "Step into the Wild West with this stunning open-world game where you can explore a vast world filled with danger and intrigue.",
    rating: 4.9,
    originalPrice: 399,
    discountPrice: 499,
  },
  {
    poster: samplePic.src,
    name: "Watch Dogs Legion",
    desc: "Join the resistance and hack your way through London in this thrilling open-world adventure that combines action and technology.",
    rating: 4.1,
    originalPrice: 279,
    discountPrice: 339,
  },
  {
    poster: samplePic.src,
    name: "Far Cry 6",
    desc: "Fight to liberate a tropical island from a ruthless dictator in this action-packed first-person shooter.",
    rating: 4.4,
    originalPrice: 259,
    discountPrice: 309,
  },
  {
    poster: samplePic.src,
    name: "Spider-Man: Miles Morales",
    desc: "Swing into action as Miles Morales in this follow-up to the hit Spider-Man game, featuring new powers and an exciting storyline.",
    rating: 4.9,
    originalPrice: 349,
    discountPrice: 429,
  },
  {
    poster: samplePic.src,
    name: "The Last of Us Part II",
    desc: "Experience the emotionally charged and action-filled sequel to the critically acclaimed The Last of Us, with a deep and engaging story.",
    rating: 5,
    originalPrice: 399,
    discountPrice: 499,
  },
  {
    poster: samplePic.src,
    name: "Horizon Zero Dawn",
    desc: "Explore a beautiful post-apocalyptic world filled with mechanical creatures and uncover the secrets of the past.",
    rating: 4.8,
    originalPrice: 299,
    discountPrice: 379,
  },
  {
    poster: samplePic.src,
    name: "God of War",
    desc: "Join Kratos on an epic journey through Norse mythology in this action-adventure game with breathtaking visuals and a gripping story.",
    rating: 4.9,
    originalPrice: 349,
    discountPrice: 449,
  },
  {
    poster: samplePic.src,
    name: "Halo Infinite",
    desc: "Return to the world of Halo in this thrilling installment with expansive environments, powerful weapons, and intense multiplayer action.",
    rating: 4.6,
    originalPrice: 299,
    discountPrice: 349,
  },
  {
    poster: samplePic.src,
    name: "Doom Eternal",
    desc: "Take on the role of the Doom Slayer in this fast-paced and brutal first-person shooter with non-stop action.",
    rating: 4.5,
    originalPrice: 249,
    discountPrice: 299,
  },
  {
    poster: samplePic.src,
    name: "Wolfenstein II: The New Colossus",
    desc: "Fight to liberate America from Nazi control in this alternate-history first-person shooter with high-stakes missions and gripping gameplay.",
    rating: 4.3,
    originalPrice: 229,
    discountPrice: 279,
  },
  {
    poster: samplePic.src,
    name: "Final Fantasy XV",
    desc: "Join Prince Noctis and his friends on an epic journey in this action-packed role-playing game with stunning visuals and engaging combat.",
    rating: 4.8,
    originalPrice: 369,
    discountPrice: 449,
  },
  {
    poster: samplePic.src,
    name: "Ghost of Tsushima",
    desc: "Become a samurai warrior and defend your homeland from invaders in this visually stunning open-world game.",
    rating: 4.9,
    originalPrice: 349,
    discountPrice: 429,
  },
  {
    poster: samplePic.src,
    name: "Resident Evil Village",
    desc: "Survive the horrors of a mysterious village in this atmospheric and terrifying entry in the Resident Evil series.",
    rating: 4.7,
    originalPrice: 299,
    discountPrice: 369,
  },
  {
    poster: samplePic.src,
    name: "Elden Ring",
    desc: "Explore a vast open world and take on powerful enemies in this highly anticipated action RPG from the creators of Dark Souls.",
    rating: 5,
    originalPrice: 399,
    discountPrice: 499,
  },
];

const transactions = [
  {
    orderId: "#112Htk",
    date: "2023/11/10",
    username: "Ethan Clark",
    total: 398.93,
    products: [
      {
        productId: "#prd101",
        poster: samplePic.src,
        name: "Cyberpunk 2077",
        price: 29.99,
        quantity: 2,
      },
      {
        productId: "#prd102",
        poster: samplePic.src,
        name: "Assassin's Creed Valhalla",
        price: 34.99,
        quantity: 1,
      },
      {
        productId: "#prd103",
        poster: samplePic.src,
        name: "Far Cry 6",
        price: 23.49,
        quantity: 1,
      },
      {
        productId: "#prd104",
        poster: samplePic.src,
        name: "Watch Dogs Legion",
        price: 24.99,
        quantity: 1,
      },
      {
        productId: "#prd105",
        poster: samplePic.src,
        name: "Red Dead Redemption 2",
        price: 40.0,
        quantity: 3,
      },
      {
        productId: "#prd106",
        poster: samplePic.src,
        name: "Spider-Man Miles Morales",
        price: 29.5,
        quantity: 1,
      },
      {
        productId: "#prd107",
        poster: samplePic.src,
        name: "The Last of Us Part II",
        price: 35.5,
        quantity: 1,
      },
      {
        productId: "#prd108",
        poster: samplePic.src,
        name: "Ghost of Tsushima",
        price: 21.5,
        quantity: 2,
      },
      {
        productId: "#prd109",
        poster: samplePic.src,
        name: "Halo Infinite",
        price: 13.0,
        quantity: 1,
      },
      {
        productId: "#prd110",
        poster: samplePic.src,
        name: "FIFA 2023",
        price: 15.99,
        quantity: 1,
      },
      {
        productId: "#prd111",
        poster: samplePic.src,
        name: "NBA 2K23",
        price: 18.5,
        quantity: 1,
      },
      {
        productId: "#prd112",
        poster: samplePic.src,
        name: "Call of Duty: Modern Warfare",
        price: 19.99,
        quantity: 1,
      },
    ],
    coupon: 40.0,
  },
  {
    orderId: "#546FGd",
    date: "2023/08/04",
    username: "Dominic Brian",
    total: 53.51,
    products: [
      {
        productId: "#rid294",
        poster: samplePic.src,
        name: "Greed Fall",
        price: 12.5,
        quantity: 2,
      },
      {
        productId: "#ri6s94",
        poster: samplePic.src,
        name: "Sample game",
        price: 11.5,
        quantity: 3,
      },
    ],
    coupon: 5.99,
  },
  {
    orderId: "#324TYb",
    date: "2023/08/12",
    username: "Sarah Connor",
    total: 97.99,
    products: [
      {
        productId: "#pmk876",
        poster: samplePic.src,
        name: "Cyberpunk 2077",
        price: 29.99,
        quantity: 2,
      },
      {
        productId: "#ptr567",
        poster: samplePic.src,
        name: "The Witcher 3",
        price: 24.5,
        quantity: 2,
      },
    ],
    coupon: 10.99,
  },
  {
    orderId: "#872HFk",
    date: "2023/09/02",
    username: "John Doe",
    total: 19.51,
    products: [
      {
        productId: "#otg123",
        poster: samplePic.src,
        name: "Assassin's Creed Valhalla",
        price: 14.5,
        quantity: 1,
      },
      {
        productId: "#kjl994",
        poster: samplePic.src,
        name: "Halo Infinite",
        price: 13.0,
        quantity: 1,
      },
    ],
    coupon: 7.99,
  },
  {
    orderId: "#672Ghf",
    date: "2023/09/15",
    username: "Alice Smith",
    total: 21.5,
    products: [
      {
        productId: "#nmw879",
        poster: samplePic.src,
        name: "FIFA 2023",
        price: 15.99,
        quantity: 1,
      },
      {
        productId: "#bgt560",
        poster: samplePic.src,
        name: "NBA 2K23",
        price: 18.5,
        quantity: 1,
      },
    ],
    coupon: 12.99,
  },
  {
    orderId: "#214Kmn",
    date: "2023/09/25",
    username: "Michael Johnson",
    total: 38.51,
    products: [
      {
        productId: "#qwe938",
        poster: samplePic.src,
        name: "Resident Evil Village",
        price: 17.5,
        quantity: 2,
      },
      {
        productId: "#vbn543",
        poster: samplePic.src,
        name: "Call of Duty",
        price: 19.5,
        quantity: 1,
      },
    ],
    coupon: 15.99,
  },
  {
    orderId: "#874Wkm",
    date: "2023/10/01",
    username: "Emma Taylor",
    total: 53,
    products: [
      {
        productId: "#rgh295",
        poster: samplePic.src,
        name: "Far Cry 6",
        price: 23.99,
        quantity: 1,
      },
      {
        productId: "#tyu883",
        poster: samplePic.src,
        name: "Watch Dogs",
        price: 20.5,
        quantity: 2,
      },
    ],
    coupon: 11.99,
  },
  {
    orderId: "#913Zkv",
    date: "2023/10/08",
    username: "Sophia Brown",
    total: 71.5,
    products: [
      {
        productId: "#plr937",
        poster: samplePic.src,
        name: "Horizon Zero Dawn",
        price: 22.99,
        quantity: 1,
      },
      {
        productId: "#lkj283",
        poster: samplePic.src,
        name: "Ghost of Tsushima",
        price: 21.5,
        quantity: 3,
      },
    ],
    coupon: 15.99,
  },
  {
    orderId: "#526Qlp",
    date: "2023/10/12",
    username: "Daniel White",
    total: 31.51,
    products: [
      {
        productId: "#osd945",
        poster: samplePic.src,
        name: "Elden Ring",
        price: 27.5,
        quantity: 1,
      },
      {
        productId: "#gth356",
        poster: samplePic.src,
        name: "Dark Souls 3",
        price: 25.0,
        quantity: 1,
      },
    ],
    coupon: 20.99,
  },
  {
    orderId: "#245Yks",
    date: "2023/10/20",
    username: "Olivia Harris",
    total: 63.51,
    products: [
      {
        productId: "#poj953",
        poster: samplePic.src,
        name: "Spider-Man Miles Morales",
        price: 29.5,
        quantity: 1,
      },
      {
        productId: "#nty829",
        poster: samplePic.src,
        name: "God of War",
        price: 30.0,
        quantity: 2,
      },
    ],
    coupon: 25.99,
  },
  {
    orderId: "#731Jwe",
    date: "2023/10/25",
    username: "Liam Thompson",
    total: 167.01,
    products: [
      {
        productId: "#zxk273",
        poster: samplePic.src,
        name: "Red Dead Redemption 2",
        price: 40.0,
        quantity: 4,
      },
      {
        productId: "#fdp763",
        poster: samplePic.src,
        name: "Final Fantasy XV",
        price: 38.0,
        quantity: 1,
      },
    ],
    coupon: 30.99,
  },
  {
    orderId: "#128Pmg",
    date: "2023/10/28",
    username: "James Lee",
    total: 194.01,
    products: [
      {
        productId: "#tyu372",
        poster: samplePic.src,
        name: "Doom Eternal",
        price: 32.5,
        quantity: 4,
      },
      {
        productId: "#iru938",
        poster: samplePic.src,
        name: "Wolfenstein 2",
        price: 30.0,
        quantity: 3,
      },
    ],
    coupon: 25.99,
  },
  {
    orderId: "#349Klm",
    date: "2023/11/01",
    username: "Charlotte Martinez",
    total: 75.51,
    products: [
      {
        productId: "#plo583",
        poster: samplePic.src,
        name: "The Last of Us Part II",
        price: 35.5,
        quantity: 2,
      },
      {
        productId: "#zxc764",
        poster: samplePic.src,
        name: "Uncharted 4",
        price: 33.5,
        quantity: 1,
      },
    ],
    coupon: 28.99,
  },
];

interface RecentActivity {
  poster: string;
  name: string;
  desc: string;
  rating: number;
  originalPrice: number;
  discountPrice: number;
}

interface Profile {
  avatar: string | null;
  id: string;
  username: string | null;
  email: string;
  firstName: string;
  lastName: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  password: string;
  tel: string;
  trustedDevices: number;
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [profile, setProfile] = useState<Profile>({
    avatar: null,
    id: "b0ijjfb4343asc4848##56",
    username: null,
    email: "kavindakmanohara@gmail.com",
    firstName: "Ellison",
    lastName: "Smith",
    address: null,
    city: null,
    state: null,
    country: null,
    postalCode: null,
    password: "ABCD1234",
    tel: "0284948483",
    trustedDevices: 2,
  });

  const [reloadProfile, setReloadProfile] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const res = await axiosInstance.get(`/user/profile/`);
      console.log(res.data);
      setProfile({
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        address: res.data.address,
        city: res.data.city,
        state: res.data.state,
        country: res.data.country,
        postalCode: res.data.postalCode,
        password: res.data.password,
        tel: res.data.tel,
        trustedDevices: res.data.trustedDevices,
        avatar: res.data.profile_image,
      });
    }
    if (id) {
      getUserData();
    }
  }, [id, reloadProfile]);

  // Pagination states
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<RecentActivity[]>(
    []
  );
  const totalPages = Math.ceil(recentActivity.length / productsPerPage);

  // Image upload state
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Account info state
  const [isEditAccountInfoPopupOpen, setIsEditAccountInfoPopupOpen] =
    useState(false);

  // Security info states
  const [isEditPasswordPopupOpen, setIsEditPasswordPopupOpen] = useState(false);
  const [isEditTelPopupOpen, setIsEditTelPopupOpen] = useState(false);

  // Transaction states
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isActionPopupOpen, setIsActionPopupOpen] = useState(false);

  // Determines which products are displayed
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;

    setDisplayedProducts(
      recentActivity.slice(startIndex, startIndex + productsPerPage)
    );
  }, [currentPage, productsPerPage]);

  // Calculates productsPerPage according to screen size
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

  // Handles profile picture changes
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      const formData = new FormData();
      formData.append('image', file);

      try {
          const response = await axios('https://store.thevingame.com/upload', {
              method: 'POST',
              data: formData,
          });
          if (response.status === 201) {
              const url = response.data.fileUrl;
                  setImageUrl(url);
          } else {
              throw new Error(response.data.fileUrl);
          }
      } catch (error) {
          toast.error('Error uploading file: ' + (error as Error).message);
      }
    }
  };

  // Helper function to find selected transaction id
  const getTransaction = () =>
    transactions.filter(({ orderId }) => orderId === selectedOrderId)[0];

  // Helper function to find subtotal for selected transaction
  const getTransactionSubTotal = () => {
    const products = getTransaction().products;
    let subTotal = 0;

    products.forEach((product) => {
      subTotal += product.price * product.quantity;
    });
    return subTotal.toFixed(2);
  };

  // An action column for transaction table
  const viewColumn: ColumnDef<Transaction> = {
    id: "view",
    header: "Action",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        className="h-fit text-[8px] px-[0.6em] py-[0.6em] rounded-sm sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
        onClick={() => {
          setSelectedOrderId(row.original.orderId);
          setIsActionPopupOpen(true);
        }}
      >
        <FaEye />
      </Button>
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
              <div className="relative size-[46px] sm:size-[70px] md:size-[94px] lg:size-[118px] xl:size-[135px] 2xl:size-[152px]">
                <Image
                  src={profile.avatar || samplePic.src}
                  alt={profile.id}
                  className="w-full rounded-full"
                  fill
                />
                {imageUrl ? (
                  <div className="absolute bottom-0 right-0 flex flex-col items-end">
                    <button
                      className="bg-black flex items-center text-[8px] uppercase px-[0.5em] py-[0.5em] mb-[0.2em] cursor-pointer rounded-sm hover:bg-white hover:text-black sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]"
                      onClick={async() => {
                        setProfile((prev) => ({ ...prev, avatar: imageUrl }));
                        setImageUrl(null);
                        try{
                          const res = await axiosInstance.patch(`/user/${profile.id}/profile-image`, 
                          { profile_image: imageUrl });
                          console.log(res);
                          if(res.status === 200) {
                            toast.success('Profile picture updated successfully');
                            const user = localStorage.getItem('user');
                            localStorage.setItem('user', JSON.stringify({ ...JSON.parse(user || '{}'), profile_image: imageUrl }));
                          }else{
                            // toast.error('Error updating profile picture');
                            throw new Error('Error updating profile picture');
                          }
                        } catch (error) {
                          console.log(error);
                          toast.error('Error updating profile picture');
                        }
                      }}
                    >
                      Save&nbsp;&nbsp;
                      <FaCheck />
                    </button>
                    <button
                      className="bg-black flex items-center text-[8px] uppercase px-[0.5em] py-[0.5em] cursor-pointer rounded-sm hover:bg-white hover:text-black sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]"
                      onClick={() => setImageUrl(null)}
                    >
                      Cancel&nbsp;&nbsp;
                      <IoMdClose />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-[5%] right-0 bg-black flex items-center text-[8px] uppercase px-[0.5em] py-[0.5em] cursor-pointer rounded-sm hover:bg-white hover:text-black sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]"
                  >
                    Edit&nbsp;&nbsp;
                    <FaPencilAlt />
                  </label>
                )}

                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <h3 className="font-bold text-[16px] mb-[0.1em] sm:text-[22px] md:text-[28px] lg:text-[34px] xl:text-[37px] 2xl:text-[40px]">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p>
                  {profile.email}
                  <span className="text-[#BCBCBC]">&nbsp;|&nbsp;</span>
                  {profile.city && profile.country ? (
                    `${profile.city} ${profile.country}`
                  ) : (
                    <span className="opacity-70 italic text-[0.8em]">
                      location unknown
                    </span>
                  )}
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
                username={profile.username}
                email={profile.email}
                firstName={profile.firstName}
                lastName={profile.lastName}
                // DOB={profile.DOB}
                address={profile.address}
                city={profile.city}
                state={profile.state}
                country={profile.country}
                postalCode={profile.postalCode}
                handleClick={() => setIsEditAccountInfoPopupOpen(true)}
                setReloadProfile={setReloadProfile}
              />

              {/* Security details */}
              <SecurityInfo
                password={profile.password}
                tel={profile.tel}
                trustedDevices={profile.trustedDevices}
                handlePasswordEditClick={() => setIsEditPasswordPopupOpen(true)}
                handleTelEditClick={() => setIsEditTelPopupOpen(true)}
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

        {isEditAccountInfoPopupOpen && (
          <EditAccountInfo
            profile={profile}
            setProfile={setProfile}
            setReloadProfile={setReloadProfile}
            onClose={() => setIsEditAccountInfoPopupOpen(false)}
          />
        )}

        {isEditPasswordPopupOpen && (
          <EditPassword
            password={profile.password}
            setProfile={setProfile}
            onClose={() => setIsEditPasswordPopupOpen(false)}
          />
        )}

        {isEditTelPopupOpen && (
          <EditTel
            setProfile={setProfile}
            onClose={() => setIsEditTelPopupOpen(false)}
          />
        )}

        {isActionPopupOpen && selectedOrderId && (
          <TransactionAction
            orderId={selectedOrderId}
            products={getTransaction().products}
            subTotal={+getTransactionSubTotal()}
            coupon={getTransaction().coupon}
            orderTotal={
              +(+getTransactionSubTotal() - getTransaction().coupon).toFixed(2)
            }
            onClose={() => setIsActionPopupOpen(false)}
          />
        )}
      </section>
      <Footer />
    </>
  );
}
