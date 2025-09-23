import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/dashboard/Dashboard";
import User from "./pages/user/User";
import Home from "./pages/home/Home";
import EditProduct from "./pages/products/EditProduct";
import NewProduct from "./pages/products/NewProduct";
import ProductLanding from "./pages/products/ProductLanding";
import Order from "./pages/orders/Order";
import Review from "./pages/reviews/Review";
import Setting from "./pages/setting/Setting";
import DefaultLayout from "./components/layout/DefaultLayout";

const App = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<AdminDashboard />} />

      <Route element={<DefaultLayout />}>
        <Route path="/user" element={<User />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/newproduct" element={<NewProduct />} />
        <Route path="/productlanding" element={<ProductLanding />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
    </Routes>
  );
};

export default App;
