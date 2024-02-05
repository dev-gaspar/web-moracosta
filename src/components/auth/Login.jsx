import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { getUserError, getUserStatus, signin } from "../../features/user/userSlice"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/dashboard');
      setFormData({ email: "", password: "" });
    }
  }, [status, navigate]);

  return (
    <>
      <div className="row vh-100">
        <div className="col-md-5 d-flex p-5 justify-content-center flex-column bg-dark">
          <div className="text-center">
            <Link to="/">
              <img
                src="/assets/logo.webp"
                alt="Logo"
                width="50"
                height="50"
                className="mb-3"
              />
            </Link>
            <h1 className="text-center fs-3">Panel de control</h1>
          </div>
          <h2 className="mt-3">Ingresar</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i> Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={onFormChange}
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
                name="password"
                autoComplete="on"
                value={formData.password}
                onChange={onFormChange}
              />
            </div>
            {status === "failed" && <div className="alert alert-danger" role="alert">
              {error}
            </div>}
            <button
              type="submit"
              className="btn btn-solodev-red-reversed"
              disabled={status === "loading"}
            >
              Ingresar
            </button>
          </form>
        </div>
        <div className="col-md-7 d-md-block d-none p-0">
          <img
            src="/assets/concesionario2.webp"
            alt="Imagen de ingresar"
            className="img-fluid full-height-image"
          />
        </div>
      </div>
    </>
  )
}

export default Login;
