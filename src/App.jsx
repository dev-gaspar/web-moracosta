import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import './App.css';
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Sucursales from "./components/pages/Sucursales";
import Contacto from "./components/pages/Contacto";
import Modelos from "./components/modelos/Modelos";
import { DetalleModelo } from "./components/modelos/DetalleModelo";
import Nosotros from "./components/pages/Nosotros";
import Cotizador from "./components/pages/Cotizador";
import Login from "./components/auth/Login";
import Dashboard from "./components/admin/Dashboard";
import Usuarios from "./components/admin/Usuarios";
import { loadUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { NuevoUsuario } from "./components/admin/NuevoUsuario";
import Vehiculos from "./components/admin/Vehiculos";
import NuevoVehiculo from "./components/admin/NuevoVehiculo";
import AdminModelos from "./components/admin/AdminModelos";
import AdminMarcas from "./components/admin/AdminMarcas";
import AdminContactos from "./components/admin/AdminContactos";
import DetalleContacto from "./components/admin/DetalleContacto";
import RutaProtegida from "./components/rutas/RutaProtegida";

function App() {
  const dispatch = useDispatch()
  dispatch(loadUser())

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Nav />
              <Outlet />
              <Footer />
            </div>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/modelos" element={<Modelos />} />
          <Route path="/modelos/:id" element={<DetalleModelo />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/cotizador" element={<Cotizador />} />
        </Route>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/dashboard"
          element={
            <RutaProtegida requiredRoles={["admin", "asesor", "moderator"]}>
              <Dashboard />
            </RutaProtegida>
          }
        />
        <Route
          path="/usuarios"
          element={
            <RutaProtegida requiredRoles={["admin"]}>
              <Usuarios />
            </RutaProtegida>
          }
        />
        <Route
          path="/usuarios/nuevo"
          element={
            <RutaProtegida requiredRoles={["admin"]}>
              <NuevoUsuario />
            </RutaProtegida>
          }
        />
        <Route
          path="/vehiculos/marcas"
          element={
            <RutaProtegida requiredRoles={["admin", "moderator"]}>
              <AdminMarcas />
            </RutaProtegida>
          }
        />
        <Route
          path="/vehiculos/modelos"
          element={
            <RutaProtegida requiredRoles={["admin", "moderator"]}>
              <AdminModelos />
            </RutaProtegida>
          }
        />
        <Route

          path="/vehiculos"
          element={
            <RutaProtegida requiredRoles={["admin", "moderator"]}>
              <Vehiculos />
            </RutaProtegida>
          }
        />
        <Route
          path="/vehiculos/nuevo"
          element={
            <RutaProtegida requiredRoles={["admin", "moderator"]}>
              <NuevoVehiculo />
            </RutaProtegida>
          }
        />
        <Route
          path="/contactos"
          element={
            <RutaProtegida requiredRoles={["admin", "moderator", "asesor"]}>
              <AdminContactos />
            </RutaProtegida>
          }
        />
        <Route
          path="/contactos/:id"
          element={
            <RutaProtegida requiredRoles={["admin", "moderator", "asesor"]}>
              <DetalleContacto />
            </RutaProtegida>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
