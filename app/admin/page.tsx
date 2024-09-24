"use client";
import AllUsers from "./components/pages/AllUsers";
import Customers from "./components/pages/Customers/Customers";
import DashboardItem1 from "./components/pages/dashboard/DashboardItem1";
import UserDetails from "./components/pages/dashboard/UserDetails";
import AddNew from "./components/pages/products/AddNew";
import AllProducts from "./components/pages/products/AllProducts";
import Brands from "./components/pages/products/Brands";
import Categories from "./components/pages/products/Categories";
import Tags from "./components/pages/products/Tags";
import Profile from "./components/pages/Profile";
import Role from "./components/pages/Role";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const AdminPanel: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>("");

  const handleSelect = (content: string) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "dashboard-item1":
        return <DashboardItem1 />;
      case "user-details":
        return <UserDetails />;

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

      case "customers":
        return <Customers />;

      case "all-users":
        return <AllUsers />;
      case "role":
        return <Role />;
      case "profile":
        return <Profile />;
      default:
        return (
          <h1 className="text-2xl font-bold">Welcome to the Admin Panel</h1>
        );
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={handleSelect} />
      <div className="flex-1 p-10 bg-gray-100 h-screen overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
