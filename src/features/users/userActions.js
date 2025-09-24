import { fetchUserDetail, loginUser } from "./usersApi";
import { setUser } from "./userSlice";
import { storeToken } from "../../utils/storageFunction.js";
import { toast } from "react-toastify";

export const getUserDetail = () => async (dispatch) => {
  let data = await fetchUserDetail();
  if (data.status === "success") {
    // update the store
    dispatch(setUser(data.user));
  }

  return { status: data.status, message: data.message };
};

export const loginUserAction = (form) => async (dispatch) => {
  let data = await loginUser(form);
  // if success
  if (data.status === "success") {
    // accessToken
    storeToken(data.accessToken, "access");
    // refreshToken
    storeToken(data.refreshToken, "refresh");
    // get user detail
    dispatch(getUserDetail());
  }
  return {
    status: data.status,
    message: data.message,
  };
};
