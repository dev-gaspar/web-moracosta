import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API;

const initialState = {
  vehiculos: [],
  status: "idle", // loading, succeeded, failed
  error: null,
};

export const getVehiculos = createAsyncThunk(
  "vehiculos/getVehiculos",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/vehiculos`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const vehiculosSlice = createSlice({
  name: "vehiculos",
  initialState,
  reducers: {
    vehiculosAdded(state, action) {
      state.vehiculos.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getVehiculos.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getVehiculos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.vehiculos = action.payload;
    });
    builder.addCase(getVehiculos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllVehiculos = (state) => state.vehiculos.vehiculos;
export const getVehiculosStatus = (state) => state.vehiculos.status;
export const getVehiculosError = (state) => state.vehiculos.error;

export const { vehiculosAdded } = vehiculosSlice.actions;
export default vehiculosSlice.reducer;
