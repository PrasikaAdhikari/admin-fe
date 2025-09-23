import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../../components/LoginForm";
const Login = () => {
  return (
    <Container>
      <Row>
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
