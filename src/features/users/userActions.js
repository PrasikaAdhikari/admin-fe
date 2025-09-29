import {
  fetchAllUserDetail,
  fetchUserDetail,
  loginUser,
  registerUser,
} from "./usersApi";
import { setUser, setAllUser } from "./userSlice";
import { storeToken } from "../../utils/storageFunction.js";

export const registerUserAction = (form) => async (dispatch) => {
  try {
    const data = await registerUser(form);
    if (data.status === "success") {
      // refresh user list after adding new user
      dispatch(getAllUserAction());
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

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
