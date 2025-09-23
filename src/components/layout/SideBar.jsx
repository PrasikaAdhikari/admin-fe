import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../features/users/userActions";

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
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <li>{`Welcome, ${user?.email}`}</li>
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
