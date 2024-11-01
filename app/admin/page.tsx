"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { RoleProvider } from "../../context/RoleContext";
import StatusBar from "./components/StatusBar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/pages/dashboard/Dashboard";
import AllProducts from "./components/pages/products/AllProducts";
import AddNew from "./components/pages/products/AddNew";
import Categories from "./components/pages/products/Categories";
import Tags from "./components/pages/products/Tags";
import Brands from "./components/pages/products/Brands";
import Platforms from "./components/pages/products/Platforms";
import Customers from "../admin/components/pages/customers/Customers";
import AllUsers from "../admin/components/pages/users/AllUsers";
import RolesPage from "../admin/components/pages/users/Roles";
import Orders from "./components/pages/orders/Orders";
import Reviews from "./components/pages/reviews/Reviews";
import Coupons from "./components/pages/coupons/Coupons";
import "./components/admin.css";
import { CategoryProvider } from "@/context/CategoryContext";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/Spinner/Spinner";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { WishlistProvider } from "@/context/WishListContext";
import axios from "axios";

const AdminPanel: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isMobileNavToggled, setIsMobileNavToggled] = useState<
    boolean | undefined
  >(undefined);

  const router = useRouter();
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     const parsedUser = JSON.parse(user);
  //     if (parsedUser.role.name === "ADMIN") {
  //       setIsAuthorized(true);
  //     } else {
  //       // toast.error("You Are Not Admin");
  //       router.push("/"); // Redirect if not admin
  //     }
  //   } else {
  //     // toast.error("You Are Not Admin");
  //     router.push("/sign-in"); // Redirect if no user found
  //   }
  // }, [router]);

  useEffect(() => {
    const verification = async () =>{
      const user = localStorage.getItem("user");
      if (user && localStorage.getItem("accessToken")) {
        try {
          console.log("Verifying session...", localStorage.getItem("accessToken"));
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
              }else{
                setIsAuthorized(true);
              }
              return;
          } else {
            console.log("Unauthorized.....................");
            router.push("/");
            throw new Error("Unauthorized");
          }
      } catch (error) {
          // console.log(error);
          localStorage.clear();
          // setIsAuthorized(true);
          router.push("/");
          return;
      }
      } else {
        localStorage.clear();
        router.push("/");
    
      }

    }

    verification();

//     const user = localStorage.getItem("user");


//     if (user) {
//       if (await verification()) {
      
//       const parsedUser = JSON.parse(user);
//       if (parsedUser.role.name === "ADMIN") {
//         router.push("/admin");
//       } else {
//         setIsAuthorized(true);
//       }
//     }else{
//       localStorage.clear();
//       router.push("/");
//     }
//   }
//  else {
//       setIsAuthorized(true);
//     }
  }, []);

  const handleSelect = (content: string) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "dashboard":
        return <Dashboard />;

      case "all-products":
        return <AllProducts />;
      case "add-new":
        return <AddNew />;
      case "categories":
        return <Categories />;
      case "tags":
        return <Tags />;
      case "brands":
        return <Brands />;
      case "platforms":
        return <Platforms />;

      case "customers":
        return <Customers />;

      case "all-users":
        return <AllUsers />;
      case "roles":
        return <RolesPage />;

      case "orders":
        return <Orders />;

      case "reviews":
        return <Reviews />;

      case "coupons":
        return <Coupons />;

      default:
        return <Dashboard />;
    }
  };

  if (!isAuthorized) {
    return <Spinner loading={!isAuthorized} />;
  }

  return (
    <AuthProvider>
      <CategoryProvider>
        <RoleProvider>
          <OrderProvider>
            <WishlistProvider>
              <SidebarProvider>
                <StatusBar
                  isMobileNavToggled={isMobileNavToggled}
                  setIsMobileNavToggled={setIsMobileNavToggled}
                />
                <div className="leaklights">
                  <Sidebar
                    onSelect={handleSelect}
                    isMobileNavToggled={isMobileNavToggled}
                    setIsMobileNavToggled={setIsMobileNavToggled}
                  />
                  <div className="hide-scrollbar flex-1 overflow-y-scroll z-10 min-h-screen font-primaryFont">
                    {renderContent()}
                  </div>
                </div>
              </SidebarProvider>
            </WishlistProvider>
          </OrderProvider>
        </RoleProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default AdminPanel;
