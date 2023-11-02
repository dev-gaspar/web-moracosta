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

export const createVehiculo = createAsyncThunk(
  "vehiculos/createVehiculo",
  async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/vehiculos`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteVehiculo = createAsyncThunk(
  "vehiculos/deleteVehiculo",
  async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/vehiculos/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateVehiculo = createAsyncThunk(
  "vehiculos/updateVehiculo",
  async (formData) => {
    const vehiculoId = formData.get("_id");

    try {
      const response = await axios.put(
        `${BASE_URL}/api/vehiculos/${vehiculoId}`,
        formData,
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

export const updateIsDestacado = createAsyncThunk(
  "vehiculos/updateIsDestacado",
  async (data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/vehiculos/isDestacado/${data.id}`,
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

export const updateIsBanner = createAsyncThunk(
  "vehiculos/updateIsBanner",
  async (data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/vehiculos/isBanner/${data.id}`,
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

export const vehiculosSlice = createSlice({
  name: "vehiculos",
  initialState,
  reducers: {
    vehiculosAdded(state, action) {
      state.vehiculos = action.payload;
    },
  },
  extraReducers(builder) {
    // getVehiculos
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
    // Delete
    builder.addCase(deleteVehiculo.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteVehiculo.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.vehiculos = state.vehiculos.filter(
        (vehiculo) => vehiculo._id !== action.payload._id
      );
    });
    builder.addCase(deleteVehiculo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // Create
    builder.addCase(createVehiculo.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createVehiculo.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.vehiculos.push(action.payload);
    });
    builder.addCase(createVehiculo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // Update
    builder.addCase(updateVehiculo.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateVehiculo.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.vehiculos = state.vehiculos.map((vehiculo) =>
        vehiculo._id === action.payload._id ? action.payload : vehiculo
      );
    });
    builder.addCase(updateVehiculo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // Update isDestacado
    builder.addCase(updateIsDestacado.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateIsDestacado.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.vehiculos = state.vehiculos.map((vehiculo) =>
        vehiculo._id === action.payload._id ? action.payload : vehiculo
      );
    });
    builder.addCase(updateIsDestacado.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // Update isBanner
    builder.addCase(updateIsBanner.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateIsBanner.fulfilled, (state, action) => {
      state.status = "succeeded";
      const vehiculoId = action.payload.vehiculo._id;
      const anterior = action.payload.anterior?._id;

      if (anterior) {
        state.vehiculos = state.vehiculos.map((vehiculo) =>
          vehiculo._id === anterior
            ? { ...vehiculo, isBanner: false }
            : vehiculo
        );
      }

      state.vehiculos = state.vehiculos.map((vehiculo) =>
        vehiculo._id === vehiculoId ? { ...vehiculo, isBanner: true } : vehiculo
      );
    });
    builder.addCase(updateIsBanner.rejected, (state, action) => {
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
