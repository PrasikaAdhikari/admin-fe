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
import Category from "./pages/categories/CategoryLanding";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserDetailAction } from "./features/users/userActions";
import { useEffect } from "react";
import CategoryLanding from "./pages/categories/CategoryLanding";
import EditCategory from "./pages/categories/EditCategory";
import NewCategory from "./pages/categories/NewCategory";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetailAction());
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

          <Route path="/categories" element={<CategoryLanding />} />
          <Route path="/editcategory" element={<EditCategory />} />
          <Route path="/newcategory" element={<NewCategory />} />

          <Route path="/orders" element={<Order />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/settings" element={<Setting />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" theme="light" />
    </>
  );
};

export default App;
