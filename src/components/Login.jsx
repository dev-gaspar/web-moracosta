import { Link, useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="top-fixed" />
      <div className="row vh-100" >
        <div className="col-md-5 d-flex p-5 justify-content-center flex-column">
          <div className="text-center">
            <Link to="/">
              <img
                src="../assets/logo.png"
                alt="Logo"
                width="50"
                height="50"
                className="mb-3"
              />
            </Link>
            <h1 className="text-center fs-3">Panel de control</h1>
          </div>
          <h2 className="mt-3">Ingresar</h2>
          <form>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i> Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value=""
                onChange={() => { }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock"></i> Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value=""
                onChange={() => { }}
              />
            </div>
            <div className="mb-3 ">
              <a href="#null" className="text-secondary">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button onClick={() => {navigate("/dashboard")}} type="submit" className="btn btn-solodev-red-reversed">
              Ingresar
            </button>
          </form>
          <div className="mt-3">
            Las 'Cookies' deben estar habilitadas en su navegador.
          </div>
        </div>
        <div className="col-md-7 d-md-block d-none p-0">
          <img
            src="../assets/concesionario2.png"
            alt="Imagen de ingresar"
            className="img-fluid full-height-image"
          />
        </div>
      </div >
    </>
  )
}

export default Login