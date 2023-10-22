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

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
