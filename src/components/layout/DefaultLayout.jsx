import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Auth from "../../auth/Auth";
import Sidebar from "./SideBar";

const DefaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Auth>
      <div className="d-flex flex-column" style={{ height: "100vh" }}>
        {/* Header with dynamic margin */}
        <div
          style={{
            marginLeft: isSidebarOpen ? 230 : 50, // match sidebar width
            transition: "margin-left 0.3s ease",
            zIndex: 1000,
          }}
        >
          <Header />
        </div>

        {/* Main layout */}
        <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          <main
            className="flex-grow-1 d-flex justify-content-center align-items-start p-3"
            style={{
              overflowY: "auto",
              marginLeft: isSidebarOpen ? 230 : 50,
              transition: "margin-left 0.3s ease",
            }}
          >
            {/* Centered container for Outlet */}
            <div style={{ width: "100%", maxWidth: "1200px" }}>
              <Outlet />
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </Auth>
  );
};

export default DefaultLayout;
