import { useEffect, useState } from "react";
import "./Sidenav.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserStatus, selectUser, signout } from "../../features/user/userSlice";
import CollapseSidenav from "./CollapseSidenav";

function Sidenav({ mainContent }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(selectUser)

  const userRoles = user.roles.map(role => role.name);

  let fecha = new Date(user.createdAt).toLocaleDateString();

  let response = {
    avatar: {
      url: "https://res.cloudinary.com/areachica-lms/image/upload/v1686582264/avatars/avatar_default.webp"
    },
    nombre: user.username,
    email: user.email,
    createdAt: fecha,
    roles: user.roles
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

  const signoutClicked = () => {
    dispatch(signout())
  }

  return (
    <>
      <div className="sidenav">
        <nav className="sb-topnav navbar navbar-expand navbar-dark">
          {/*<!-- Navbar Brand-->*/}
          <Link className="navbar-brand ps-3" to={"/"}>
            Moracosta
          </Link>
          {/*<!-- Sidebar Toggle-->*/}
          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-3"
            id="sidebarToggle"
            href="#!"
          >
            <i className="fas fa-bars" />
          </button>
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

                  {userRoles.includes("admin") && <>
                    <div className="sb-sidenav-menu-heading">USUARIOS</div>
                    <CollapseSidenav icon="fa fa-user" name="Usuarios" links={[
                      { name: "Todos", to: "/usuarios" },
                      { name: "Nuevo", to: "/usuarios/nuevo" }
                    ]} />
                  </>}

                  {(userRoles.includes("admin") || userRoles.includes("moderator")) && <>
                    <div className="sb-sidenav-menu-heading">AUTOS</div>
                    <Link className="nav-link" to={"/vehiculos/marcas"}>
                      <div className="sb-nav-link-icon">
                        <i className="fa fa-suitcase"></i>
                      </div>
                      Marcas
                    </Link>

                    <Link className="nav-link" to={"/vehiculos/modelos"}>
                      <div className="sb-nav-link-icon">
                        <i className="fa fa-tag"></i>
                      </div>
                      Modelos
                    </Link>

                    <CollapseSidenav icon="fa fa-car" name={"Vehiculos"} links={[
                      { name: "Todos", to: "/vehiculos" },
                      { name: "Nuevo", to: "/vehiculos/nuevo" }
                    ]} />
                  </>}

                  {(userRoles.includes("admin") ||
                    userRoles.includes("asesor")
                  ) && <>
                      <div className="sb-sidenav-menu-heading">Contactos</div>
                      <Link className="nav-link" to={"/contactos"}>
                        <div className="sb-nav-link-icon">
                          <i className="fa fa-paper-plane"></i>
                        </div>
                        Todos
                      </Link>
                    </>}
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <button
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-perfil"
                >
                  <i className="fas fa-user fa-fw"></i>
                  {" "}Ver mi perfil
                </button>
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
          className="modal fade"
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
                  {response.nombre}
                </h5>
                <p className="text-center mt-0 text-capitalize ">
                  {response.roles && response.roles.map((rol) => (
                    <span key={rol._id} className="badge bg-secondary me-1">
                      {rol.name}
                    </span>
                  ))}
                </p>
                <div className="text-center">
                  <b>Email: </b>
                  {response.email}
                  <br />
                  <b>Registrado el: </b>
                  {response.createdAt}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={signoutClicked}
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