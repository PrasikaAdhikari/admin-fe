import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/Dashboard";
import User from "./pages/user/User";
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
import { useDispatch } from "react-redux";
import { getUserDetailAction } from "./features/users/userActions";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const autoLogin = async () => {
    let data = await dispatch(getUserDetailAction());
  };
  useEffect(() => {
    autoLogin();
  }, []);
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* private route */}
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
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
      <ToastContainer position="top-center" theme="light" />
    </>
  );
};

export default App;
