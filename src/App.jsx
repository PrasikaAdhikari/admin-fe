import { Button } from "react-bootstrap";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { RiHome4Fill } from "react-icons/ri";
import Login from "./pages/Login";

function App() {
  toast.success("vOILA!");
  return (
    <>
      {/* <Button>
        {" "}
        Click here
        <RiHome4Fill />
      </Button>
      <h1> Hello world</h1> */}
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
