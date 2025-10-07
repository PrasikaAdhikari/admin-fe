import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Auth from "../../auth/Auth";

const DefaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <Auth>
      <div
        className="d-flex flex-column"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Header toggleSidebar={toggleSidebar} />

        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className="flex-grow-1 p-3 mt-5 ms-5"
          style={{
            overflowY: "auto",
            transition: "all 0.3s ease",
            paddingTop: "56px",
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
