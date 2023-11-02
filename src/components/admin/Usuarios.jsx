import { useDispatch, useSelector } from 'react-redux';
import Sidenav from '../layout/Sidenav'
import { MDBDataTable } from "mdbreact";
import { getUsers, deleteUser, getUsersError, getUsersStatus, selectAllUsers } from '../../features/users/usersSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
            label: "Ciudad",
            field: "ciudad",
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
          ciudad: user.ciudad,
          roles: roles,
          creado: fecha,
          acciones: (
            <div className="d-flex justify-content-center">
              <Link
                to={`/usuarios/edit/${user._id}`}
                className="btn btn-sm btn-warning py-1 px-2 me-1"
              >
                <i className="fas fa-edit"></i>
              </Link>
              <button
                onClick={() => handleDelete(user._id)}
                className="btn btn-sm btn-danger py-1 px-2 me-1"
              >
                <i className="fas fa-trash"></i>
              </button>
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
      paging={true}
      info={false}
      noBottomColumns={true}
      paginationLabel={["<", ">"]}
      searchLabel="Buscar"
      entries={10}
    />
  } else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
  }

  const handleDelete = async (id) => {
    const res = await dispatch(deleteUser(id))
    if (res.payload !== undefined) {
      toast.success('Usuario eliminado', { icon: '🗑️' })
    }
  }

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
                  <h4 className="page-title">Usuarios</h4>
                  <Link className='btn btn-sm btn-primary'
                    to={"/usuarios/nuevo"}
                  >
                    <i className="fas fa-plus"></i> Nuevo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded">
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