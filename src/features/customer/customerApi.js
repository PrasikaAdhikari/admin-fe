import { apiProcessor, apiUrl } from "../../utils/axiosHelper";

export const getAllCustomersApi = () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/customer`,
    isPrivate: true,
  });
};
