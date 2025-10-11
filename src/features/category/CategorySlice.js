import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  subCategories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, actions) => {
      state.categories = actions.payload;
    },
    setSubCategories: (state, actions) => {
      state.subCategories = actions.payload;
    },
  },
});
const { reducer, actions } = categorySlice;

export const { setCategories, setSubCategories } = actions;
export default reducer;
