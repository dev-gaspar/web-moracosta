import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API;

const initialState = {
  contactos: [],
  status: "idle", // loading, succeeded, failed
  error: null,
};

export const getContactos = createAsyncThunk(
  "contactos/getContactos",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/contactos`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const newContacto = createAsyncThunk(
  "contactos/newContacto",
  async (contacto) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/contactos`, contacto, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContacto = createAsyncThunk(
  "contactos/deleteContacto",
  async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/contactos/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateIsAtendido = createAsyncThunk(
  "contactos/updateIsAtendido",
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

export const contactosSlice = createSlice({
  name: "contactos",
  initialState,
  reducers: {
    contactosAdded(state, action) {
      state.contactos.push(action.payload);
    },
    updateIsAtendidoTable(state, action) {
      state.contactos = state.contactos.map((contacto) =>
        contacto._id === action.payload.id
          ? { ...contacto, isAtendido: action.payload.isAtendido }
          : contacto
      );
    },
    resetContactos(state) {
      state.contactos = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    //getContactos
    builder.addCase(getContactos.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getContactos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contactos = action.payload;
    });
    builder.addCase(getContactos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //newContacto
    builder.addCase(newContacto.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(newContacto.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contactos.push(action.payload);
    });
    builder.addCase(newContacto.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //deleteContacto
    builder.addCase(deleteContacto.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteContacto.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contactos = state.contactos.filter(
        (contacto) => contacto._id !== action.payload._id
      );
    });
    builder.addCase(deleteContacto.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //updateIsAtendido
    builder.addCase(updateIsAtendido.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateIsAtendido.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contactos = state.contactos.map((contacto) =>
        contacto._id === action.payload._id ? action.payload : contacto
      );
    });
    builder.addCase(updateIsAtendido.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllContactos = (state) => state.contactos.contactos;
export const getContactosStatus = (state) => state.contactos.status;
export const getContactosError = (state) => state.contactos.error;

export const { contactosAdded, updateIsAtendidoTable, resetContactos } =
  contactosSlice.actions;
export default contactosSlice.reducer;
