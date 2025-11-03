import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaBars, FaHouseUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../features/users/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.userStore);
  const username = user?.username?.split(" ")[0];

  const handleLogout = () => {
    dispatch(setUser({}));
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <Navbar
      variant="dark"
      className="px-3"
      style={{
        backgroundColor: "#2a3877",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Button
          variant="link"
          onClick={toggleSidebar}
          className="text-white"
          style={{
            border: "none",
            boxShadow: "none",
            zIndex: 1200,
            position: "relative",
          }}
        >
          <FaBars size={22} />
        </Button>

        <Nav className="ms-auto align-items-center">
          {user && user?._id ? (
            <>
              <span className="text-white me-3 d-none d-md-inline">
                Welcome, {username}
              </span>

              {/* Logout Button for large screens */}
              <Button
                variant="outline-light"
                onClick={handleLogout}
                className="d-none d-md-inline-flex align-items-center"
              >
                <LuLogOut className="me-1" /> Logout
              </Button>

              {/* Logout Icon for small screens */}
              <Button
                variant="link"
                onClick={handleLogout}
                className="text-white d-inline-flex d-md-none"
                style={{ border: "none", boxShadow: "none" }}
              >
                <LuLogOut size={22} />
              </Button>
            </>
          ) : (
            <Nav.Link as={Link} to="/">
              <Button
                size="lg"
                bsPrefix="neo"
                className="btn-neo rounded-4 px-4 d-inline-flex align-items-center gap-2"
              >
                Login
              </Button>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
