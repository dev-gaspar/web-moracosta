import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API;

const initialState = {
  user: {},
  status: "idle", // loading, succeeded, failed
  error: null,
  isAuth: false,
};

export const signin = createAsyncThunk("user/signin", async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const signout = createAsyncThunk("user/signout", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/signout`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/yo`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
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
    //signin
    builder.addCase(signin.pending, (state, action) => {
      state.status = "loading";
      state.user = {};
      state.isAuth = false;
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //signout
    builder.addCase(signout.fulfilled, (state, action) => {
      state.status = "idle";
      state.user = {};
      state.isAuth = false;
    });
    builder.addCase(signout.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    });
    //loaduser
    builder.addCase(loadUser.pending, (state, action) => {
      state.status = "loading";
      state.user = {};
      state.isAuth = false;
      state.error = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
    });
  },
});

export const selectUser = (state) => state.user.user;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;
export const isAuth = (state) => state.user.isAuth;

export const { userAdded } = userSlice.actions;
export default userSlice.reducer;
