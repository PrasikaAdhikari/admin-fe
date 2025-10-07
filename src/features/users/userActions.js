import {
  fetchAllUserDetail,
  fetchUserDetail,
  loginUser,
  registerUser,
  updateUserDetail,
} from "./usersApi";
import { setUser, setAllUser } from "./userSlice";
import { storeToken } from "../../utils/storageFunction.js";
import { toast } from "react-toastify";

export const registerUserAction = (form) => async (dispatch) => {
  try {
    const data = await registerUser(form);
    if (data.status === "success") {
      dispatch(getAllUserAction());
      toast[data.status](data.message);
    } else {
      toast[data.status](data.message || "Registration failed");
    }
    return data;
  } catch (error) {
    toast.error(error?.message || "Something went wrong")
    return {
      status: "error",
      message: error?.message || "Something went wrong",
    };
  }
};

export const getUserDetailAction = () => async (dispatch) => {
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
    await dispatch(getUserDetailAction());
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
