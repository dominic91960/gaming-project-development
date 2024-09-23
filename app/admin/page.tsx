// pages/index.tsx
"use client";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const AdminPanel: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>("");

  // Function to update the main content
  const handleSelect = (content: string) => {
    setSelectedContent(content);
  };

  // Render the main content based on the selected item from the sidebar
  const renderContent = () => {
    switch (selectedContent) {
      case "all-users":
        return (
          <h1 className="text-2xl font-bold">
            Hello! This is the All Users page
          </h1>
        );
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
