import { Button, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const LoginForm = () => {
  return (
    <>
      <div className="mt-5 border border-dark border-lg p-5 rounded rounded-3 w-50 mx-auto">
        <div className="text-center h4">
          <i className="bi bi-shop"></i>
        </div>
        <div className="text-center">
          <h2>Admin Login Page</h2>
          <p>Access your dashboard</p>
        </div>
        <hr />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
            <Form.Control placeholder="Enter password" />
          </Form.Group>

          <Button type="submit">Login</Button>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
