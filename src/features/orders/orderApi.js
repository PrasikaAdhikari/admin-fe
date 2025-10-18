import { apiProcessor, apiUrl } from "../../utils/axiosHelper";

export const getOrdersApi = () => {
  return apiProcessor({
    method: "get",
    isPrivate: true,
    url: `${apiUrl}/orders`,
  });
};
