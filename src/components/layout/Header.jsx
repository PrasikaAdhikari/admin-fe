import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaHouseUser } from "react-icons/fa";
import { LuNotebookPen, LuLogOut } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../features/users/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.userStore); // fixed store name

  const handleLogout = () => {
    dispatch(setUser({})); // remove user from store
    sessionStorage.removeItem("accessToken"); // remove token
    navigate("/");
  };

  return (
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: "#2a3877ff" }}>
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          Electronic
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user && user?._id ? (
              <>
                <span className="text-white me-3">
                  Welcome, {user?.username}
                </span>
                <Button variant="outline-light" onClick={handleLogout}>
                  <LuLogOut className="me-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  <FaHouseUser className="me-1" />
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
