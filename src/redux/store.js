import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice.js";
import productReducer from "../features/products/productSlice.js";

export default configureStore({
  reducer: {
    userStore: userReducer,
    productStore: productReducer,
  },
});
