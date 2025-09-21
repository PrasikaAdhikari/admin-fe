import React, { useState, useEffect } from "react";
//use state : react hook to manage the component which tracks if the side bar is open or not.
//useEffect: Another hook to perform the side effects, in this case checks or listens to the window resize.
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
  //isOpen is a state which checks if the sidebar is visible or not.
  const [isOpen, setIsOpen] = useState(true);
  //isMobile: state which checks if the screenwidth is less than 768px
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      {/* Hamburger for mobile */}
      {isMobile && !isOpen && (
        <GiHamburgerMenu
          size={30}
          style={{ margin: "10px", cursor: "pointer" }}
          onClick={() => setIsOpen(true)}
        />
      )}

      {/* Sidebar */}
      {isOpen && (
        <div
          style={{
            width: "200px",
            height: "100vh",
            background: "#333",
            color: "#fff",
            padding: "20px",
            position: isMobile ? "absolute" : "relative",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          {isMobile && (
            <GiHamburgerMenu
              size={30}
              style={{ cursor: "pointer", marginBottom: "20px" }}
              onClick={() => setIsOpen(false)}
            />
          )}
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
