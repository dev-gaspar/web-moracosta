import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Nav from "./components/Nav";
import Home from "./components/Home";
import Footer from "./components/Footer";
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
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sucursales" element={<Sucursales />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/modelos" element={<Modelos />} />
        <Route path="/modelos/:id" element={<DetalleModelo />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/cotizador" element={<Cotizador />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<div>
          <div className="top-fixed" />
          <h1>404 Not Found</h1>
        </div>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
