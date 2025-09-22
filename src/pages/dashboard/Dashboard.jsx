import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/SideBar";

// Main Dashboard Component
const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768; // Breakpoint for mobile
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true); // Open by default on large screens
      } else {
        setIsSidebarOpen(false); // Closed by default on small screens
      }
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sidebar wrapper styles based on state (for slide animation)
  const sidebarWrapperStyle = {
    transform:
      isMobile && !isSidebarOpen ? "translateX(-100%)" : "translateX(0)",
    transition: "transform 0.3s ease-in-out",
  };

  // Overlay for mobile when sidebar is open
  const overlayStyle = {
    display: isMobile && isSidebarOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Overlay for mobile */}
      <div style={overlayStyle} onClick={toggleSidebar} />

      {/* Sidebar Wrapper for Animation */}
      <div style={sidebarWrapperStyle}>
        <Sidebar
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: !isMobile ? "200px" : 0, // Offset for sidebar on desktop (200px width)
          transition: "margin-left 0.3s ease-in-out",
          padding: "20px",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            padding: "15px 20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <h1 style={{ margin: 0, color: "#333" }}>Admin Dashboard</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Placeholder user info */}
            <div style={{ marginLeft: "20px" }}>
              <span style={{ color: "#666" }}>Welcome, Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Dashboard Overview</h2>
            <p>
              An admin dashboard with all the ins and outs of the e-commerce
              business.
            </p>
            {/* NEED TO ADD CHARTS HERE */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "8px",
                }}
              >
                <h3>Users</h3>
                <p>1,234 active</p>
              </div>
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "8px",
                }}
              >
                <h3>Revenue</h3>
                <p>$12,345</p>
              </div>
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "8px",
                }}
              >
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
