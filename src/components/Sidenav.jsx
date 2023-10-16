import { useEffect } from "react";
import "../Sidenav.css";
import { Link } from "react-router-dom";

function Sidenav({ mainContent }) {

  const response = {
    nombre: "Jose Gaspar",
    avatar: {
      url: "https://res.cloudinary.com/areachica-lms/image/upload/v1686582264/avatars/avatar_default.webp"
    }
  }


  useEffect(() => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", handleSidebarToggle);
      return () => {
        sidebarToggle.removeEventListener("click", handleSidebarToggle);
      };
    }
  }, []);

  const handleSidebarToggle = (event) => {
    event.preventDefault();
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  };

  return (
    <>
      <div className="top-fixed" />
      <div className="sidenav">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/*<!-- Navbar Brand-->*/}
          <a className="navbar-brand ps-3" href="#!">
            Personalizados
          </a>
          {/*<!-- Sidebar Toggle-->*/}
          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
          >
            <i className="fas fa-bars"></i>
          </button>
          {/*<!-- Navbar Margen-->*/}
          <div className="d-none d-md-inline-block ms-auto"></div>
          {/*<!-- Navbar-->*/}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={response.avatar.url}
                    alt={response.nombre}
                    className="rounded-circle"
                    width={30}
                    height={30}
                  />
                </figure>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <span className="dropdown-item ">{response.nombre}</span>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-perfil"
                  >
                    Mi perfil
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => { }}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">CENTRO</div>
                  <Link className="nav-link" to={"/dashboard"}>
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    Dashboard
                  </Link>
                  <div className="sb-sidenav-menu-heading">USUARIOS</div>
                  <a
                    className="nav-link collapsed"
                    href="#!"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fa fa-person-walking"></i>
                    </div>
                    Entrenadores
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="collapseLayouts"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" to={"/entrenadores"}>
                        Todos
                      </Link>
                      <Link className="nav-link" to={"/entrenadores/registrar"}>
                        Registrar
                      </Link>
                    </nav>
                  </div>
                  <a
                    className="nav-link collapsed"
                    href="#!"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePages"
                    aria-expanded="false"
                    aria-controls="collapsePages"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-futbol"></i>
                    </div>
                    Jugadores
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="collapsePages"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav
                      className="sb-sidenav-menu-nested nav accordion"
                      id="sidenavAccordionPages"
                    >
                      <a className="nav-link" href="#!">
                        Todos
                      </a>
                      <a className="nav-link" href="#!">
                        Registrar
                      </a>
                    </nav>
                  </div>
                  <div className="sb-sidenav-menu-heading">Personalizados</div>
                  <a className="nav-link" href="#!">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-table"></i>
                    </div>
                    Todos
                  </a>
                  <a className="nav-link" href="#!">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-file-circle-plus"></i>
                    </div>
                    Nuevo
                  </a>
                  <a className="nav-link" href="#!">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-chart-area"></i>
                    </div>
                    Informes
                  </a>
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <div className="small">Conectado como:</div>
                {"Usuario"}
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">{mainContent}</div>
            </main>
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade "
          id="modal-perfil"
          tabIndex="-1"
          aria-labelledby="modal-perfil"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modal-perfil">
                  Mi perfil
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <figure className="d-flex justify-content-center avatar avatar-nav">
                  <img
                    src={response.avatar.url}
                    alt={response.nombre}
                    className="rounded-circle"
                    width={80}
                    height={80}
                  />
                </figure>
                <h5 className="text-center mt-2 text-capitalize ">
                  Jose Gaspar
                </h5>
                <p className="text-center mt-0 text-capitalize ">
                  Dev
                </p>
                <div className="text-center">
                  <b>Email: </b>
                  dev@dev.com
                  <br />
                  <b>Registrado el: </b>
                  15-10-2023
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <a type="button" className="btn btn-secondary" href="#!">
                  Actualizar
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => { }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidenav