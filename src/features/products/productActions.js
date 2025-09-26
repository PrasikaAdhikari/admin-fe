import { addProductApi, deleteProductApi, getProductsApi } from "./productApi";
import { setProducts } from "./productSlice";
import { toast } from "react-toastify";

export const getProdcutsAction = () => async (dispatch) => {
  const products = await getProductsApi();
  if (products.status === "success") {
    dispatch(setProducts(products.products));
  }
  return { status: products.status, message: products.message };
};

export const addProductAction = (form) => async (dispatch) => {
  const result = await addProductApi(form);
  if (result.status === "success") {
    dispatch(getProdcutsAction());
  }
  toast[result.status](result.message);
};

export const handleDeleteAction = (id) => async (dispatch) => {
  const result = await deleteProductApi(id);
  console.log(result);
  if (result.status === "success") {
    dispatch(getProdcutsAction());
  }
  toast.success(result.message);
};
