import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Auth from "../../auth/Auth";

const DefaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <Auth>
      <div
        className="d-flex flex-column"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Header toggleSidebar={toggleSidebar} />

        {/* Sidebar */}
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <main
          className="flex-grow-1 p-3 mt-5"
          style={{
            overflowY: "auto",
            transition: "all 0.3s ease",
            paddingTop: "56px",
            marginLeft: !isMobile && isSidebarOpen ? "230px" : "0px",
          }}
        >
          <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </Auth>
  );
};

export default DefaultLayout;
