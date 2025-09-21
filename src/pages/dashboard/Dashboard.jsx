import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/SideBar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Logout
          </button>
        </header>

        {/* Main dashboard content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet /> {/* nested route content */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
