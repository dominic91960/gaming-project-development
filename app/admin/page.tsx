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
        <div className="flex-1 p-10 h-screen overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </RoleProvider>
  );
};

export default AdminPanel;
