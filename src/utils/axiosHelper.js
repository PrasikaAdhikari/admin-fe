import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  storeAccesstoken,
} from "./storageFunction";
import { refreshTokenApi } from "../features/users/usersApi";

export const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

export const apiProcessor = async ({
  method,
  url,
  data,
  isPrivate = false,
  isRefresh = false,
  contentType = "application/json",
}) => {
  try {
    const headers = {};

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = contentType;
    }
    let response = await axios({
      method: method,
      url: url,
      data: data,
      headers: isPrivate
        ? {
<<<<<<< HEAD
            Authorization: `Bearer ${
              isRefresh ? getRefreshToken() : getAccessToken()
            }`,
=======
            Authorization: isRefresh ? getRefreshToken() : getAccessToken(),
>>>>>>> 59b47621cb73813ddc98a60e8a8824764da16e8c
            "Content-type": contentType,
          }
        : {},
    });

    return response.data;
  } catch (err) {
    if (err?.response?.data?.message.includes("jwt expire")) {
      // renew access token and call refresh token api
      let data = await refreshTokenApi();

      if (data?.accessToken) {
        storeAccesstoken(data.accessToken);

        return apiProcessor({
          method,
          data,
          url,
          isPrivate,
          isRefresh,
        });
      }
    } else {
      return {
        status: "error",
        message:
          err?.response?.data?.message ||
          "An error occurred while processing your request.",
      };
    }
  }
};
