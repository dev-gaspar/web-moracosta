import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer className="pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img src="../assets/moracosta-manabi.png" alt="logo" height="150" />
            </div>
            <div className="col-md-3">
              <h3><strong>Servicio al cliente</strong></h3>
              <p><strong>Teléfono: (123) 456-7890</strong></p>
              <p><strong>Email: info@example.com</strong></p>
              <ul className="list-unstyled text-xs">
                <li><Link to={"/sucursales"}> <i className="fa fa-map-pin" /> Encuentranos en maps</Link></li>
                <li><Link to={"/contacto"}> <i className="fa fa-envelope" /> Contactenos</Link></li>
                <li><a href="#"> <i className="fa fa-book" /> Lee nuestros terminos</a></li>
              </ul>
              <div className="social">
                <a href="#"><i className="fab fa-facebook" /> </a>
                <a href="#"><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="col-md-3">
              <h3>Modelos</h3>
              <ul className="list-unstyled">
                <li><a href="#">Arrizo 5 Pro</a></li>
                <li><a href="#">Tiggo 2 Pro</a></li>
                <li><a href="#">Tiggo 7 Pro Mild Hybrid</a></li>
                <li><a href="#">Tiggo 7 Pro MT</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Herramientas</h3>
              <ul className="list-unstyled">
                <li><a href="#">Test Drive</a></li>
                <li><Link to={"/cotizador"}>Cotizador Online</Link></li>
                <li><Link to={"/login"}>Panel de control</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <small>2023 © Todos los derechos reservados.</small>
        </div>
      </footer>

    </>
  )
}

export default Footer