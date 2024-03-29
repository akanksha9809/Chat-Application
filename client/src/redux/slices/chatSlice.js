import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyChat = createAsyncThunk("chat/", async () => {
  try {
    const response = await axiosClient.get("/chat/");
    // console.log(response.result);
    return response.result;
  } catch (e) {
    return Promise.reject(e);
  }
});

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    myChatData: [],
    selectedChat: null,
    fetchAgain: false,
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setMyChatData: (state, action) => {
      state.myChatData = action.payload;
    },
    setFetchAgain: (state, action) => {
      state.fetchAgain = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyChat.fulfilled, (state, action) => {
      state.myChatData = action.payload;
    });
  },
});

export default chatSlice.reducer;

export const { setSelectedChat, setMyChatData, setFetchAgain } =
  chatSlice.actions;
