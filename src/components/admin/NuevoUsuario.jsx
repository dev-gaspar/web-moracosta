import React, { useState } from 'react'
import Sidenav from '../layout/Sidenav'
import { getUsersError, getUsersStatus, newUser } from '../../features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const NuevoUsuario = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(getUsersStatus)
  const error = useSelector(getUsersError)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    ciudad: "",
    password: "",
    roles: [],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const updatedRoles = formData.roles.includes(value)
        ? formData.roles.filter((role) => role !== value)
        : [...formData.roles, value];
      setFormData({
        ...formData,
        roles: updatedRoles,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newUser(formData))

    if (status === 'succeeded') {
      navigate('/usuarios');
      setFormData({
        username: "",
        email: "",
        ciudad: "",
        password: "",
        roles: [],
      });
    }
  };

  return (
    <Sidenav
      mainContent={
        <div className="content">
          <div className="row ">
            <div className="col-xl-12">
              <div
                className="card shadow bg-body rounded"
                style={{ marginTop: "5rem", marginBottom: "1.5rem" }}
              >
                <div className="d-flex justify-content-between card-body">
                  <h4 className="page-title">Nuevo usuario</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Correo Electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="ciudad" className="form-label">Ciudad</label>
                      <select
                        className="form-select"
                        id="ciudad"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Asigne una ciudad</option>
                        <option value="global">Todas</option>
                        <option value="manta">Manta</option>
                        <option value="portoviejo">Portoviejo</option>
                        <option value="esmeraldas">Esmeraldas</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="on"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Roles</label>
                      <div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="roles"
                            value="admin"
                            checked={formData.roles.includes("admin")}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">Admin</label>
                        </div>

                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="roles"
                            value="moderator"
                            checked={formData.roles.includes("moderator")}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">Moderator</label>
                        </div>

                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="roles"
                            value="asesor"
                            checked={formData.roles.includes("asesor")}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">Asesor</label>
                        </div>
                      </div>
                    </div>
                    {status === "failed" && <div className="alert alert-danger" role="alert">
                      {error}
                    </div>}
                    <button type="submit" className="btn btn-primary" disabled={status === "loading"}>Registrar usuario</button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
