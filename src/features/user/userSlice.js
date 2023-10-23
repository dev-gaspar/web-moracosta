import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API;

const initialState = {
  user: {},
  status: "idle", // loading, succeeded, failed
  error: null,
};

export const signin = createAsyncThunk("user/signin", async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAdded(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signin.pending, (state, action) => {
      state.status = "loading";
      state.user = {};
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectUser = (state) => state.user.user;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;

export const { userAdded } = userSlice.actions;
export default userSlice.reducer;
