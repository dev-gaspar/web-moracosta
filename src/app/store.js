import { configureStore } from "@reduxjs/toolkit";
import vehiculosReducer from "../features/vehiculos/vehiculosSlice";
import vehiculoReducer from "../features/vehiculos/vehiculoSlice";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/users/usersSlice";
import modelosReducer from "../features/vehiculos/modelosSlice";
import marcasReducer from "../features/vehiculos/marcasSlice";
import contactosReducer from "../features/contactos/contactosSlice";
import constactoReducer from "../features/contactos/contactoSlice";

export const store = configureStore({
  reducer: {
    vehiculos: vehiculosReducer,
    vehiculo: vehiculoReducer,
    user: userReducer,
    users: usersReducer,
    modelos: modelosReducer,
    marcas: marcasReducer,
    contactos: contactosReducer,
    contacto: constactoReducer,
  },
});
