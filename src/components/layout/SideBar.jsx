import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../features/users/userActions";

import { Link } from "react-router-dom";


const Sidebar = ({ isOpen, isMobile, onToggle, showHamburger }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userStore);
  useEffect(() => {
    dispatch(getUserDetail());
  }, []);
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
          <h1 style={{ margin: 0, color: "#f1f1f1ff" }}>Dashboard</h1>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "20px",
              font: "white",
            }}
          >

            <li>{`Welcome, ${user?.email}`}</li>
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
            <li>Users</li>
            <li>Orders</li>

            <li>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </Link>
            </li>

            <li>
              Products
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
                    to="/productlanding"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Product Landing
                  </Link>
                </li>
              </ul>
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

              <Link
                to="/settings"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Settings
              </Link>
            </li>

          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
