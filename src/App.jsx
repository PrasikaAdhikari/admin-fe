import { Button } from "react-bootstrap";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Login from "./pages/Login";
import { Provider } from "react-redux";
import Dashboard from "./pages/Dashboard";

function App() {
  toast.success("vOILA!");
  return (
    <>
      <div>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
