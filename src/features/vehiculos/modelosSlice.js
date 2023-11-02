import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API;

const initialState = {
  modelos: [],
  status: "idle", // loading, succeeded, failed
  error: null,
};

export const getModelos = createAsyncThunk("modelos/getModelos", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/modelos`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const newModelo = createAsyncThunk(
  "modelos/newModelo",
  async (modelo) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/modelos`, modelo, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteModelo = createAsyncThunk(
  "modelos/deleteModelo",
  async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/modelos/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const modelosSlice = createSlice({
  name: "modelos",
  initialState,
  reducers: {
    modelosAdded(state, action) {
      state.modelos = action.payload;
    },
  },
  extraReducers(builder) {
    //getModelos
    builder.addCase(getModelos.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getModelos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.modelos = action.payload;
    });
    builder.addCase(getModelos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //newModelo
    builder.addCase(newModelo.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(newModelo.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.modelos.push(action.payload);
    });
    builder.addCase(newModelo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //deleteModelo
    builder.addCase(deleteModelo.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteModelo.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.modelos = state.modelos.filter(
        (modelo) => modelo._id !== action.payload._id
      );
    });
    builder.addCase(deleteModelo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllModelos = (state) => state.modelos.modelos;
export const getModelosStatus = (state) => state.modelos.status;
export const getModelosError = (state) => state.modelos.error;

export const { modelosAdded } = modelosSlice.actions;
export default modelosSlice.reducer;
