import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API;

const initialState = {
  contacto: {},
  status: "idle", // loading, succeeded, failed
  error: null,
};

export const getContactoById = createAsyncThunk(
  "contacto/getContactoById",
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/contactos/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateIsAtendidoDetalle = createAsyncThunk(
  "contactos/updateIsAtendidoDetalle",
  async (data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/contactos/setAtendido/${data.contactoId}`,
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

export const contactoSlice = createSlice({
  name: "contacto",
  initialState,
  reducers: {
    contactoAdded(state, action) {
      state.contacto = action.payload;
    },
  },
  extraReducers(builder) {
    // getContactoById
    builder.addCase(getContactoById.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getContactoById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contacto = action.payload;
    });
    builder.addCase(getContactoById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // updateIsAtendidoDetalle
    builder.addCase(updateIsAtendidoDetalle.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateIsAtendidoDetalle.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contacto = action.payload;
    });
    builder.addCase(updateIsAtendidoDetalle.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectContacto = (state) => state.contacto.contacto;
export const getContactoStatus = (state) => state.contacto.status;
export const getContactoError = (state) => state.contacto.error;

export const { contactoAdded } = contactoSlice.actions;
export default contactoSlice.reducer;
