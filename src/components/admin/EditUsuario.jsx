import React, { useEffect, useState } from 'react'
import Sidenav from '../layout/Sidenav'
import { getUserById, getUsers, getUsersError, getUsersStatus, newUser, selectUser, updatePassword } from '../../features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const EditUsuario = () => {

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const status = useSelector(getUsersStatus)
  const error = useSelector(getUsersError)

  const userId = params.id

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    ciudad: "",
    password: "",
  });

  const user = useSelector(selectUser)

  useEffect(() => {
    if (status === "idle") {
      dispatch(getUsers())
    }

    if (status === "succeeded") {
      dispatch(getUserById(userId))
      if (Object.keys(user).length !== 0) {
        setFormData({
          id: user._id,
          username: user.username,
          email: user.email,
          ciudad: user.ciudad,
          password: "",
        })
      }
    }

  }, [status, dispatch, userId, user])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(formData))

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
                  <h4 className="page-title">Reestablecer contraseña</h4>
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
                        required
                        disabled
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
                        disabled
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
                        disabled
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
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        autoComplete="on"
                        required
                      />
                    </div>

                    {status === "failed" && <div className="alert alert-danger" role="alert">
                      {error}
                    </div>}
                    <button type="submit" className="btn btn-primary" disabled={status === "loading"}>Actualizar contraseña</button>
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

export default EditUsuario