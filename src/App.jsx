import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/user/Login";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/ProductLanding";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
