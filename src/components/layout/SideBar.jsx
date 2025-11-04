import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import brandLogo from "../../assets/logo.png";

const SideBar = ({ isOpen, toggleSidebar, isMobile }) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1049,
          }}
          onClick={toggleSidebar}
        />
      )}

      <div
        className="d-flex flex-column position-fixed"
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          width: isOpen ? "230px" : "0px",
          backgroundColor: "#2a3877",
          transition: "all 0.3s ease",
          overflowX: "hidden",
          overflowY: isOpen ? "auto" : "hidden",
          zIndex: 1050,
          paddingTop: isOpen ? "56px" : "0px",
        }}
      >
        {isOpen && (
          <>
            <Navbar.Brand
              as={Link}
              to="/"
              className="d-flex align-items-center justify-content-center mt-3"
            >
              <img
                src={brandLogo}
                alt="Brand Logo"
                style={{ height: "40px", width: "auto" }}
              />
            </Navbar.Brand>

            <Nav className="flex-column mt-4 px-2">
              <Nav.Item className="mb-2">
                <Nav.Link as={Link} to="/" className="text-white px-2 py-1">
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              {/* Products Section */}
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
                      to="/newproduct"
                      className="text-white px-2 py-1"
                    >
                      New Products
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/product"
                      className="text-white px-2 py-1"
                    >
                      Product Landing
                    </Nav.Link>
                  </Nav>
                )}
              </Nav.Item>
              {/* Category Section */}
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
                      to="/newcategory"
                      className="text-white px-2 py-1"
                    >
                      New Category
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/categories"
                      className="text-white px-2 py-1"
                    >
                      Category Landing
                    </Nav.Link>
                  </Nav>
                )}
              </Nav.Item>
              {/* Static Links */}
              {["User", "Orders", "Customer", "Reviews", "Settings"].map(
                (item) => (
                  <Nav.Item className="mb-2">
                    <Nav.Link
                      as={Link}
                      key={item}
                      to={`/${item.toLowerCase()}`}
                      className="text-white px-2 py-1"
                    >
                      {item}
                    </Nav.Link>
                  </Nav.Item>
                )
              )}
            </Nav>
          </>
        )}
      </div>
    </>
  );
};

export default SideBar;
