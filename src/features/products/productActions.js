import { getProductsApi } from "./productApi";
import { setProducts } from "./productSlice";

export const getProdcutsAction = () => async (dispatch) => {
  const products = await getProductsApi();
  if (products.status === "success") {
    dispatch(setProducts(products.products));
  }
  return { status: products.status, message: products.message };
};
