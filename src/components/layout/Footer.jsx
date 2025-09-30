import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className="p-2 text-white"
      style={{ backgroundColor: "#2a3877ff" }}
    >
      <Row className="text-center">
        <Col>Copyright @ 2025</Col>
      </Row>
    </Container>
  );
};

export default Footer;
