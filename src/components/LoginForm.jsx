import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { loginUserAction } from "../features/users/userActions";

const LoginForm = () => {
  // --- Redux + Navigation ---
  const { user } = useSelector((store) => store.userStore || {}); // safe access
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // --- Local form state ---
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // --- Handle form input changes ---
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // --- Handle form submit ---
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let data = await dispatch(loginUserAction(form));

    console.log(data);
    toast[data.status](data.message);
  };

  // --- Redirect after login ---
  const lastLocation =
    location?.state?.from?.location?.pathname || "/dashboard";

  useEffect(() => {
    if (user?._id) {
      navigate(lastLocation);
    }
  }, [user?._id, navigate, lastLocation]);

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
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={form.email}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={form.password}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Button type="submit">Login</Button>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
