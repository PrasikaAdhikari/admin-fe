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

export const addCategoryApi = (data) => {
  return apiProcessor({
    method: "POST",
    url: `${apiUrl}/category`,
    data: data,
  });
};

export const updateCategoryApi = (id, form) => {
  return apiProcessor({
    method: "PATCH",
    url: `${apiUrl}/category/${id}`,
    data: form,
  });
};
