import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getLoggedUser = createAsyncThunk("user/", async () => {
  try {
    const response = await axiosClient.get("/user/getLoggedUser");
    return response.result;
  } catch (e) {
    return Promise.reject(e);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedUser: {}, // initial user state is null or an empty object
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedUser.fulfilled, (state, action) => {
      state.loggedUser = action.payload;
    });
  },
});

export default authSlice.reducer;
