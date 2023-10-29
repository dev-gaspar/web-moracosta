import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API;

const initialState = {
  marcas: [],
  status: "idle", // loading, succeeded, failed
  error: null,
};

export const getMarcas = createAsyncThunk("marcas/getMarcas", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/marcas`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const newMarca = createAsyncThunk("marcas/newMarca", async (marca) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/marcas`, marca, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteMarca = createAsyncThunk(
  "marcas/deleteMarca",
  async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/marcas/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const marcasSlice = createSlice({
  name: "marcas",
  initialState,
  reducers: {
    marcasAdded(state, action) {
      state.marcas.push(action.payload);
    },
  },
  extraReducers(builder) {
    //getMarcas
    builder.addCase(getMarcas.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getMarcas.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.marcas = action.payload;
    });
    builder.addCase(getMarcas.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //newMarca
    builder.addCase(newMarca.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(newMarca.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.marcas.push(action.payload);
    });
    builder.addCase(newMarca.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //deleteMarca
    builder.addCase(deleteMarca.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteMarca.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.marcas = state.marcas.filter(
        (marca) => marca._id !== action.payload._id
      );
    });
    builder.addCase(deleteMarca.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllMarcas = (state) => state.marcas.marcas;
export const getMarcasStatus = (state) => state.marcas.status;
export const getMarcasError = (state) => state.marcas.error;

export const { marcasAdded } = marcasSlice.actions;
export default marcasSlice.reducer;
