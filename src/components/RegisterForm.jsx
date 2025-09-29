import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../features/users/userActions";

const RegisterUserForm = ({ onHide }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    // dispatch Redux action to register user
    const res = await dispatch(registerUserAction(form));
    if (res?.status === "success") {
      // reset form
      setForm({
        username: "",
        email: "",
        password: "",
      });
      // close modal
      onHide();
    } else {
      alert(res?.message || "Something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter full name"
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

      <Button variant="primary" type="submit">
        Add User
      </Button>
    </Form>
  );
};

export default RegisterUserForm;
