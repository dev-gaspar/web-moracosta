import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

const Header = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" >
        <div className="container py-sm-3">

          <Link className="navbar-brand" to={"/"}>
            <img src="../assets/logo-letras.png" alt="logo" height="30" />
          </Link>


          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="collapse navbar-collapse justify-content-end text-uppercase" id="navbarNav">
            <ul className="navbar-nav text-center">
              <li className="nav-item gap-3">
                <Link className="nav-link" to={"/"}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/modelos"}>Modelos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sucursales"}>Surcursales</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Cotizador</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/contacto"}>Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/nosotros"}>Nosotros</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header