import { useState, useContext, createContext } from "react";
import { getUserDetail } from "../features/users/usersApi.js";

// Create context
const UserContext = createContext();

// Define Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const autoLogin = async () => {
    let data = await getUserDetail();

    if (data.status) {
      setUser(data.user);
    } else {
      setUser({});
    }
  };

  let sharedData = {
    user,
    setUser,
    autoLogin,
  };

  return (
    <UserContext.Provider value={sharedData}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
