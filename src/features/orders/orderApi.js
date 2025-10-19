import { apiProcessor, apiUrl } from "../../utils/axiosHelper";

export const getOrdersApi = () => {
  return apiProcessor({
    method: "get",
    isPrivate: true,
    url: `${apiUrl}/orders`,
  });
};

export const changeStatusApi = (id, status) => {
  return apiProcessor({
    method: "patch",
    isPrivate: true,
    url: `${apiUrl}/orders`,
    data: { id, status },
  });
};
