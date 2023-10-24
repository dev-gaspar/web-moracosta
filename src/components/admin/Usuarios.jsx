import { useDispatch, useSelector } from 'react-redux';
import Sidenav from '../layout/Sidenav'
import { MDBDataTable } from "mdbreact";
import { getUsers, getUsersError, getUsersStatus, selectAllUsers } from '../../features/users/usersSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    const setUsers = () => {
      const data = {
        columns: [
          {
            label: "Username",
            field: "username",
            sort: "asc",
          },
          {
            label: "Email",
            field: "email",
            sort: "asc",
          },
          {
            label: "Roles",
            field: "roles",
            sort: "asc",
          },
          {
            label: "Creado",
            field: "creado",
            sort: "asc",
          },
          {
            label: "Acciones",
            field: "acciones",
            sort: "asc",
          },
        ],
        rows: [],
      };

      users.forEach((user) => {
        let fecha = new Date(user.createdAt).toLocaleDateString();

        let roles = user.roles.map((rol) => {
          return <span key={rol._id} className="badge bg-secondary me-1">
            {rol.name}
          </span>
        });

        data.rows.push({
          username: user.username,
          email: user.email,
          roles: roles,
          creado: fecha,
          acciones: (
            <div className="d-flex justify-content-center">
              <Link
                to={"#"}
                className="btn btn-sm btn-danger py-1 px-2 me-1"
              >
                <i className="fas fa-trash"></i>
              </Link>
            </div>
          ),
        });
      });
      return data;
    };

    contenido = <MDBDataTable
      responsive
      data={setUsers()}
      bordered
      striped
      hover
      displayEntries={false}
      paging={false}
      info={false}
      noBottomColumns={true}
    />
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
                <div className="d-flex justify-content-between card-body">
                  <h4 className="page-title">Usuarios</h4>
                  <Link className='btn btn-sm btn-primary'
                    to={"/usuarios/nuevo"}
                  >
                    <i className="fas fa-plus"></i> Nuevo usuario
                  </Link>
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