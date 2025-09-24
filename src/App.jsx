import { Routes, Route, Navigate } from "react-router-dom";
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
import Category from "./pages/categories/Category";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

        <Route element={<DefaultLayout />}>
          <Route path="/user" element={<User />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/product" element={<ProductLanding />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
