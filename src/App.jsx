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
          element={<Dashboard />}
        />
        <Route
          path="/usuarios"
          element={<Usuarios />}
        />
        <Route
          path="/usuarios/nuevo"
          element={<NuevoUsuario />}
        />
        <Route
          path="/vehiculos/marcas"
          element={<AdminMarcas />}
        />
        <Route
          path="/vehiculos/modelos"
          element={<AdminModelos />}
        />
        <Route
          path="/vehiculos"
          element={<Vehiculos />}
        />
        <Route
          path="/vehiculos/nuevo"
          element={<NuevoVehiculo />}
        />
        <Route
          path="/contactos"
          element={<AdminContactos />}
        />
        <Route
          path="/contactos/:id"
          element={<DetalleContacto />}
        />

      </Routes>
    </Router>
  );
}

export default App;
