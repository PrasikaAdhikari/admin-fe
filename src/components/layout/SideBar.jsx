import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div
      style={{
        width: isOpen ? "230px" : "50px", // keep small width when closed
        height: "100vh",
        background: "#2a3877",
        color: "#fff",
        padding: isOpen ? "20px" : "10px 5px",
        overflowX: "hidden",
        transition: "width 0.3s ease, padding 0.3s ease",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: isOpen ? "flex-start" : "center",
      }}
    >
      {/* Hamburger always visible to toggle sidebar */}
      <GiHamburgerMenu
        size={28}
        style={{ cursor: "pointer", marginBottom: isOpen ? "15px" : "0" }}
        onClick={toggleSidebar}
      />

      {/* Sidebar menu items, only visible when open */}
      {isOpen && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <li>
            <div
              onClick={() => setShowProducts(!showProducts)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              Products {showProducts ? <AiOutlineDown /> : <AiOutlineRight />}
            </div>
            {showProducts && (
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: "15px",
                  marginTop: "5px",
                }}
              >
                <li>
                  <Link
                    to="/editproduct"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Edit Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/newproduct"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    New Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Product Landing
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/user"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              User
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Category
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/reviews"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Reviews
            </Link>
          </li>
          <li>
            <Link
              to="/setting"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Settings
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
