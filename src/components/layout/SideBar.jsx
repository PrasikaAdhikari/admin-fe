import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = ({ isOpen, isMobile, onToggle, showHamburger }) => {
  return (
    <div className="flex">
      {/* Hamburger for mobile, always visible when showHamburger is true */}
      {showHamburger && (
        <GiHamburgerMenu
          size={30}
          style={{ margin: "10px", cursor: "pointer" }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar content, hidden when closed on mobile */}
      {(!isMobile || isOpen) && (
        <div
          style={{
            width: "200px",
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
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
            <li>Users</li>
            <li>Orders</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
