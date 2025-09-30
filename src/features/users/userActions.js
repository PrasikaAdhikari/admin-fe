import { fetchAllUserDetail, fetchUserDetail, loginUser, updateUserDetail } from "./usersApi";
import { setUser, setAllUser } from "./userSlice";
import { storeToken } from "../../utils/storageFunction.js";

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

export const getAllUserAction = () => async (dispatch) => {
  let data = await fetchAllUserDetail();

  if (data.status === "success") {
    //update the store
    dispatch(setAllUser(data?.users || []));
  }
};

export const updateUserDetailAction = (form) => async (dispatch) => {
  const data = await updateUserDetail(form);
  if (data.status === "success") {
    // update the store
    dispatch(setUser(data.user));
  }
  return { status: data.status, message: data.message };
};