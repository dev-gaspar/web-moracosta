import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API;

const initialState = {
  vehiculo: {},
  status: "idle", // loading, succeeded, failed
  error: null,
};

export const getVehiculoById = createAsyncThunk(
  "vehiculo/getVehiculoById",
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/vehiculos/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const vehiculoSlice = createSlice({
  name: "vehiculo",
  initialState,
  reducers: {
    vehiculoAdded(state, action) {
      state.vehiculo = action.payload;
    },
  },
  extraReducers(builder) {
    // getVehiculoById
    builder.addCase(getVehiculoById.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getVehiculoById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.vehiculo = action.payload;
    });
    builder.addCase(getVehiculoById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectVehiculo = (state) => state.vehiculo.vehiculo;
export const getVehiculoStatus = (state) => state.vehiculo.status;
export const getVehiculoError = (state) => state.vehiculo.error;

export const { vehiculoAdded } = vehiculoSlice.actions;
export default vehiculoSlice.reducer;
