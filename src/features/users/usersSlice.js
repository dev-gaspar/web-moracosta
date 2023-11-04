import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API;

const initialState = {
  users: [],
  status: "idle", // loading, succeeded, failed
  error: null,
  user: {},
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const newUser = createAsyncThunk("users/newUser", async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users`, user, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateIsActivo = createAsyncThunk(
  "users/updateIsActivo",
  async (data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/isActivo/${data.id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "users/updatePassword",
  async (data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/pass/${data.id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersAdded(state, action) {
      state.users.push(action.payload);
    },
    getUserById(state, action) {
      state.user = state.users.find((user) => user._id === action.payload);
    },
    resetStatus(state, action) {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    //getUsers
    builder.addCase(getUsers.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //newUser
    builder.addCase(newUser.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(newUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users.push(action.payload);
    });
    builder.addCase(newUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //updatePassword
    builder.addCase(updatePassword.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //updateIsActivo
    builder.addCase(updateIsActivo.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateIsActivo.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    });
    builder.addCase(updateIsActivo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUser = (state) => state.users.user;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export const { usersAdded, getUserById, resetStatus } = usersSlice.actions;
export default usersSlice.reducer;
