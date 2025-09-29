import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Auth = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((store) => store.userStore);

  return (
    <>
      {user && user?._id ? (
        children
      ) : (
        //navigate to login
        <Navigate to="/" replace state={{ from: location }} />
      )}
    </>
  );
};

export default Auth;
