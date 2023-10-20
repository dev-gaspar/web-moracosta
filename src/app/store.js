import { configureStore } from "@reduxjs/toolkit";
import vehiculosReducer from "../features/vehiculos/vehiculosSlice";

export const store = configureStore({
  reducer: {
    vehiculos: vehiculosReducer,
  },
});
