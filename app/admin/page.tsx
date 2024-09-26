"use client";
import { useState } from "react";
// import type { AppProps } from "next/app";

import { RoleProvider } from "../../context/RoleContext"; // Import RoleProvider
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/pages/dashboard/Dashboard";
import AllProducts from "./components/pages/products/AllProducts";
import AddNew from "./components/pages/products/AddNew";
import Categories from "./components/pages/products/Categories";
import Tags from "./components/pages/products/Tags";
import Brands from "./components/pages/products/Brands";
import Platforms from "./components/pages/products/Platforms";
import Customers from "./components/pages/customers/Customers";
import AllUsers from "./components/pages/users/AllUsers";
import RolesPage from "./components/pages/users/Roles";
import Orders from "./components/pages/orders/Orders";
import Reviews from "./components/pages/reviews/Reviews";

const AdminPanel: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>("");

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

      default:
        return <Dashboard />;
    }
  };

  return (
    <RoleProvider>
      <div className="flex bg-slate-[#0A0A0B]">
        <Sidebar onSelect={handleSelect} />
        <div className="relative flex-1 overflow-hidden h-screen before:w-[500px] before:h-[500px] before:absolute before:-z-10 before:left-[150px] before:-bottom-[150px] before:bg-[#00FFA1] before:opacity-20 before:rounded-full before:blur-[100px] after:w-[500px] after:h-[500px] after:absolute after:-z-10 after:-right-[150px] after:-top-[150px] after:bg-[#00FFA1] after:opacity-20 after:rounded-full after:blur-[100px]">
          {renderContent()}
        </div>
      </div>
    </RoleProvider>
  );
};

export default AdminPanel;
