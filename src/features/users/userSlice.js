import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    setAllUser: (state, actions) => {
      state.users = actions.payload;
    },
  },
});
const { reducer, actions } = userSlice;

export const { setUser, setAllUser } = actions;
export default reducer;
