import { toast } from "react-toastify";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoryApi,
  updateCategoryApi,
} from "./categoryApi";
import { setCategories, setSubCategories } from "./CategorySlice";

export const getCategoryAction = () => async (dispatch) => {
  const categories = await getCategoryApi();
  if (categories.status === "success") {
    dispatch(setCategories(categories.categories));
    dispatch(setSubCategories(categories.subCategories));
  }
  return { status: categories.status, message: categories.message };
};

export const handleDeleteAction = (id) => async (dispatch) => {
  const result = await deleteCategoryApi(id);
  if (result.status === "success") {
    dispatch(getCategoryAction());
    toast[result.status](result.message);
  }
  return { status: result.status, message: result.message };
};

export const addCategoryAction = (form) => async (dispatch) => {
  const result = await addCategoryApi(form);
  if (result.status === "success") {
    dispatch(getCategoryAction());
  }
  toast[result.status](result.message);
  return { status: result.status, message: result.message };
};

export const updateCategoryAction = (id, form) => async (dispatch) => {
  const result = await updateCategoryApi(id, form);
  if (result.status === "success") {
    dispatch(getCategoryAction());
  }
  toast[result.status](result.message);
  return { status: result.status, message: result.message };
};
