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
import { NuevoUsuario } from "./components/admin/NuevoUsuario";
import EditUsuario from "./components/admin/EditUsuario";
import Vehiculos from "./components/admin/Vehiculos";
import NuevoVehiculo from "./components/admin/NuevoVehiculo";
import EditVehiculo from "./components/admin/EditVehiculo";
import AdminModelos from "./components/admin/AdminModelos";
import AdminMarcas from "./components/admin/AdminMarcas";
import AdminContactos from "./components/admin/AdminContactos";
import DetalleContacto from "./components/admin/DetalleContacto";
import RutaProtegida from "./components/rutas/RutaProtegida";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import AdminPrincipal from "./components/admin/AdminPrincipal";

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
              <FloatingWhatsApp
                phoneNumber="593958622755"
                accountName="Moracosta S.A."
                avatar="/assets/wa.jpg"
                darkMode={true}
                chatMessage="Hola, en que podemos ayudarte? 🚗"
                statusMessage="en linea"
                allowClickAway={true}
                notification={true}
                messageDelay={0}
                notificationDelay={5}
                placeholder="Escribe un mensaje..."
                style={{
                  zIndex: 9999999999,
                }}
              />
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
          path="/principal"
          element={
            <RutaProtegida requiredRoles={["admin"]}>
              <AdminPrincipal />
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
          path="/usuarios/edit/:id"
          element={
            <RutaProtegida requiredRoles={["admin"]}>
              <EditUsuario />
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
          path="/vehiculos/edit/:id"
          element={
            <RutaProtegida requiredRoles={["admin", "moderator"]}>
              <EditVehiculo />
            </RutaProtegida>
          }
        />
        <Route
          path="/contactos"
          element={
            <RutaProtegida requiredRoles={["admin", "asesor"]}>
              <AdminContactos />
            </RutaProtegida>
          }
        />
        <Route
          path="/contactos/:id"
          element={
            <RutaProtegida requiredRoles={["admin", "asesor"]}>
              <DetalleContacto />
            </RutaProtegida>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
