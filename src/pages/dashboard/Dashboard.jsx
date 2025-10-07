import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../../components/layout/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailAction } from "../../features/users/userActions";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userStore);

  useEffect(() => {
    dispatch(getUserDetailAction());
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <Container
        fluid
        className={`p-4`}
        style={{
          marginLeft: !isMobile ? (isSidebarOpen ? "230px" : "50px") : 0,
          transition: "margin-left 0.3s",
        }}
      >
        <h2 className="mb-3">Dashboard Overview</h2>
        <p>
          An admin dashboard with all the ins and outs of the e-commerce
          business.
        </p>

        <Row className="mt-4 g-4">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-lg h-100">
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>1,234 active</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-lg h-100">
              <Card.Body>
                <Card.Title>Revenue</Card.Title>
                <Card.Text>$12,345</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-lg h-100">
              <Card.Body>
                <Card.Title>Orders</Card.Title>
                <Card.Text>567</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
