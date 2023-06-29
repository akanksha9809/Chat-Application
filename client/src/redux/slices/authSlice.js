import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [], // initial user state is null or an empty object
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // update the user state with the payload data
      //console.log(state.user);
    },
  },
});

export default authSlice.reducer;

export const { setUser } = authSlice.actions;
