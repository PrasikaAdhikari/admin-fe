import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = ({ isOpen, isMobile, onToggle }) => {
  return (
    <div className="flex">
      {/* Hamburger visible on mobile */}
      {isMobile && (
        <GiHamburgerMenu
          size={30}
          style={{ margin: "10px", cursor: "pointer" }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar content */}
      {(!isMobile || isOpen) && (
        <div
          style={{
            width: "230px",
            height: "100vh",
            background: "#2a3877ff",
            color: "#fff",
            padding: "20px",
            position: isMobile ? "absolute" : "relative",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h1 style={{ margin: 0, color: "#f1f1f1ff" }}>Dashboard</h1>
            <br />
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Users</li>
            <li>Orders</li>
            <li>Reviews</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
