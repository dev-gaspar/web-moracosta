import { useDispatch, useSelector } from 'react-redux';
import Sidenav from '../layout/Sidenav'
import { MDBDataTable } from "mdbreact";
import { getUsers, getUsersError, getUsersStatus, selectAllUsers } from '../../features/users/usersSlice';
import { useEffect } from 'react';

const Usuarios = () => {

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const status = useSelector(getUsersStatus)
  const error = useSelector(getUsersError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUsers())
    }
  }, [status, dispatch])

  let contenido;

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  } else if (status === 'succeeded') {
    contenido = users.map((user) => (
      <p key={user._id}>{user.username} - {user.email}</p>
    ))
  } else if (status === 'failed') {
    contenido = <div>{error}</div>
  }

  return (
    <Sidenav
      mainContent={
        <div className="content">
          <div className="row ">
            <div className="col-xl-12">
              <div
                className="card"
                style={{ marginTop: "5rem", marginBottom: "1.5rem" }}
              >
                <div className="card-body">
                  <h4 className="page-title">Usuarios</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  {contenido}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default Usuarios