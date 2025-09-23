import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/SideBar";
import admin from "../../assets/admin.avif";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarWrapperStyle = {
    transform:
      isMobile && !isSidebarOpen ? "translateX(-100%)" : "translateX(0)",
    transition: "transform 0.3s ease-in-out",
  };

  const overlayStyle = {
    display: isMobile && isSidebarOpen ? "block" : "none",
  };

  return (
    <div className="dashboard-container">
      {/* Overlay for mobile */}
      <div
        className="dashboard-overlay"
        style={overlayStyle}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div style={sidebarWrapperStyle}>
        <Sidebar
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Main content */}
      <div
        className="dashboard-main"
        style={{ marginLeft: !isMobile ? "200px" : 0 }}
      >
        <header className="dashboard-header">
          <h1>Welcome, {"name from redux will be here"}</h1>
          <div className="dashboard-user">
            <img src={admin} alt="Admin" />
          </div>
        </header>

        <main>
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            <p>
              An admin dashboard with all the ins and outs of the e-commerce
              business.
            </p>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Users</h3>
                <p>1,234 active</p>
              </div>
              <div className="dashboard-card">
                <h3>Revenue</h3>
                <p>$12,345</p>
              </div>
              <div className="dashboard-card">
                <h3>Orders</h3>
                <p>567</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
