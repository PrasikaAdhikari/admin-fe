import { apiProcessor, apiUrl } from "../../utils/axiosHelper";

export const getProductsApi = () => {
  return apiProcessor({
    method: "GET",
    url: `${apiUrl}/products`,
  });
};
