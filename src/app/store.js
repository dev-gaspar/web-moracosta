import { configureStore } from "@reduxjs/toolkit";
import vehiculosReducer from "../features/vehiculos/vehiculosSlice";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    vehiculos: vehiculosReducer,
    user: userReducer,
    users: usersReducer,
  },
});
