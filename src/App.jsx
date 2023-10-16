import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import './App.css';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Sucursales from "./components/Sucursales";
import Contacto from "./components/Contacto";
import Modelos from "./components/Modelos";
import { DetalleModelo } from "./components/DetalleModelo";
import Nosotros from "./components/Nosotros";
import Cotizador from "./components/Cotizador";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

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
