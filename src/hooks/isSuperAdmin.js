import { useSelector } from "react-redux";

export const isSuperAdmin = () => {
  const { user } = useSelector((store) => store.userStore);
  return user?.role === "superadmin";
};
