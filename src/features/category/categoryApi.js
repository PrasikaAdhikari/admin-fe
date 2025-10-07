import { apiProcessor, apiUrl } from "../../utils/axiosHelper";

export const getCategoryApi = () => {
  return apiProcessor({
    method: "GET",
    url: `${apiUrl}/category`,
  });
};

export const deleteCategoryApi = (id) => {
  return apiProcessor({
    method: "DELETE",
    url: `${apiUrl}/category`,
    data: { id },
  });
};
