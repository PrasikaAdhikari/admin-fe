import { Button } from "react-bootstrap";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { RiHome4Fill } from "react-icons/ri";
import Login from "./pages/Login";
import { Provider } from "react-redux";

function App() {
  toast.success("vOILA!");
  return (
    <>
      <Login />

      <ToastContainer />
    </>
  );
}

export default App;
