import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

export const loginUser = async (obj) => {
  return apiProcessor({
    method: "POST",
    url: `${apiUrl}/auth/login`,
    data: obj,
  });
};

export const fetchUserDetail = async () => {
  return apiProcessor({
    method: "GET",
    url: `${apiUrl}/user/setting`,
    isPrivate: true,
  });
};

export const fetchAllUserDetail = async () => {
  return apiProcessor({
    method: "GET",
    url: `${apiUrl}/user`,
    isPrivate: true,
  });
};
