// components/MainContent.tsx
import React from "react";

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 p-10 bg-gray-100 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>This is where the main content will be displayed.</p>
    </div>
  );
};

export default MainContent;
