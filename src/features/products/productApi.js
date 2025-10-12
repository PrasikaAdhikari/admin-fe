import { apiProcessor, apiUrl } from "../../utils/axiosHelper";

export const getProductsApi = () => {
  return apiProcessor({
    method: "GET",
    url: `${apiUrl}/products`,
  });
};

export const addProductApi = (form) => {
  return apiProcessor({
    method: "POST",
    url: `${apiUrl}/products`,
    data: form,
    contentType: "multipart/form-data",
  });
};

export const updateProductApi = (id, form) => {
  return apiProcessor({
    method: "PATCH",
    url: `${apiUrl}/products/${id}`,
    data: form,
    contentType: "multipart/form-data",
  });
};

export const deleteProductApi = (id) => {
  return apiProcessor({
    method: "DELETE",
    url: `${apiUrl}/products`,
    data: { id },
  });
};

export const changeProductStatusApi = (id) => {
  return apiProcessor({
    method: "POST",
    url: `${apiUrl}/products/status`,
    data: { id },
  });
};
