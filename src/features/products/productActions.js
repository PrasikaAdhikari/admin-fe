import { toast } from "react-toastify";
import {
  addProductApi,
  changeProductStatusApi,
  deleteProductApi,
  getProductsApi,
  updateProductApi,
} from "./productApi";
import { setProducts } from "./productSlice";

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

export const updateProductAction = (id, form) => async (dispatch) => {
  const result = await updateProductApi(id, form);
  if (result.status === "success") {
    dispatch(getProdcutsAction());
  }
  toast[result.status](result.message);
};

export const handleDeleteAction = (id) => async (dispatch) => {
  const result = await deleteProductApi(id);
  if (result.status === "success") {
    dispatch(getProdcutsAction());
  }
  toast[result.status](result.message);
};

export const handleActiveStatusAction = (id) => async (dispatch) => {
  const result = await changeProductStatusApi(id);
  if (result.status === "success") {
    dispatch(getProdcutsAction());
  }
  toast[result.status](result.message);
};
