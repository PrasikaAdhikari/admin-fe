import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <ul>
                <Link to="/products">Products</Link>

                <li>
                  <Link to="/editproduct">Edit Products</Link>
                </li>
                <li>
                  <Link to="/newproduct">New Products</Link>
                </li>
                <li>
                  <Link to="/productlanding">Product Landing</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/user">User</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
