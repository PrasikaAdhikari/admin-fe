import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../features/users/userActions";
import { toast } from "react-toastify";

const RegisterUserForm = ({ onHide }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(registerUserAction(form));
    if (res?.status === "success") {
      setForm({
        username: "",
        email: "",
        password: "",
        role: "",
      });

      onHide();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter username"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select
          name="role"
          value={form.role || ""}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Role --</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add User
      </Button>
    </Form>
  );
};

export default RegisterUserForm;
