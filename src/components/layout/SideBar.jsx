import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Sidebar = ({ isOpen }) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  return (
    <div
      className={`d-flex flex-column position-fixed ${
        isOpen ? "px-3" : "px-1"
      }`}
      style={{
        top: 0,
        left: 0,
        bottom: 0, // ensures full height
        width: isOpen ? "230px" : "50px",
        backgroundColor: "#2a3877",
        transition: "width 0.3s ease, padding 0.3s ease",
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      {/* Sidebar Links */}
      <Nav className="flex-column mt-3">
        <h1 className="text-white p-3">LOGO</h1>

        {/* Products with dropdown */}
        <Nav.Item className="mb-2">
          <div
            className="d-flex align-items-center justify-content-between text-white px-2 py-1 rounded hover-bg"
            onClick={() => setShowProducts(!showProducts)}
            style={{ cursor: "pointer" }}
          >
            Products
            <IoIosArrowDropdownCircle />
          </div>
          {showProducts && (
            <Nav className="flex-column ms-3 mt-1">
              <Nav.Link
                as={Link}
                to="/editproduct"
                className="text-white px-2 py-1 rounded hover-bg"
              >
                Edit Products
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/newproduct"
                className="text-white px-2 py-1 rounded hover-bg"
              >
                New Products
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/product"
                className="text-white px-2 py-1 rounded hover-bg"
              >
                Product Landing
              </Nav.Link>
            </Nav>
          )}
        </Nav.Item>
        <Nav.Item className="mb-2">
          <div
            className="d-flex align-items-center justify-content-between text-white px-2 py-1 rounded hover-bg"
            onClick={() => setShowCategory(!showCategory)}
            style={{ cursor: "pointer" }}
          >
            Category
            <IoIosArrowDropdownCircle />
          </div>
          {showCategory && (
            <Nav className="flex-column ms-3 mt-1">
              <Nav.Link
                as={Link}
                to="/editcategory"
                className="text-white px-2 py-1 rounded hover-bg"
              >
                Edit Category
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/newcategory"
                className="text-white px-2 py-1 rounded hover-bg"
              >
                New Category
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/category"
                className="text-white px-2 py-1 rounded hover-bg"
              >
                Category Landing
              </Nav.Link>
            </Nav>
          )}
        </Nav.Item>
        {/* Other Links */}
        {["User", "Orders", "Reviews", "Settings"].map((item) => (
          <Nav.Link
            as={Link}
            key={item}
            to={`/${item.toLowerCase()}`}
            className="text-white px-2 py-1 rounded hover-bg mb-1"
          >
            {item}
          </Nav.Link>
        ))}
      </Nav>

      {/* Hover effect style */}
      <style>
        {`
          .hover-bg:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
