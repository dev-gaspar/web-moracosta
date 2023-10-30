import Sidenav from '../layout/Sidenav'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContacto, getContactos, getContactosError, getContactosStatus, selectAllContactos, updateIsAtendido } from '../../features/contactos/contactosSlice'
import { useEffect } from 'react'
import { MDBDataTable } from "mdbreact"
import { selectUser } from '../../features/user/userSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast';

const AdminContactos = () => {

  const dispatch = useDispatch()
  const contactos = useSelector(selectAllContactos)
  const status = useSelector(getContactosStatus)
  const error = useSelector(getContactosError)

  const user = useSelector(selectUser)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getContactos())
    }
  }, [status, dispatch, user])

  const handleDelete = async (id) => {
    const res = await dispatch(deleteContacto(id))
    if (res.payload !== undefined) {
      toast.success('Contacto eliminado', { icon: '🗑️' })
    }
  }

  let contenido;

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  } else if (status === 'succeeded') {
    const setContactos = () => {
      const data = {
        columns: [
          {
            label: "Nombre",
            field: "nombre",
            sort: "asc",
          },
          {
            label: "Telefono",
            field: "telefono",
            sort: "asc",
          },
          {
            label: "Correo",
            field: "correo",
            sort: "asc",
          },
          {
            label: "Ciudad",
            field: "ciudad",
            sort: "asc",
          },
          {
            label: "Antendido",
            field: "atendido",
            sort: "asc",
          },
          {
            label: "Acciones",
            field: "acciones",
            sort: "asc",

          }
        ],
        rows: [],
      };

      const admin = user.roles?.some((rol) => rol.name === 'admin');

      contactos.forEach((contacto) => {

        if (admin || contacto.ciudad === user.ciudad) {

          let atendido = contacto.isAtendido ? 'Si ✅' : 'No ❌'
          data.rows.push({
            nombre: contacto.nombre,
            telefono: contacto.telefono,
            correo: contacto.correo,
            ciudad: contacto.ciudad,
            atendido: atendido,
            acciones: (
              <div className="d-flex justify-content-center">
                <button
                  onClick={() => handleDelete(contacto._id)}
                  className="btn btn-sm btn-danger py-1 px-2 me-1"
                >
                  <i className="fas fa-trash"></i>
                </button>
                {contacto.isAtendido ? (
                  <button
                    onClick={() => {
                      dispatch(updateIsAtendido({
                        contactoId: contacto._id,
                        userId: user._id,
                        isAtendido: false
                      }))
                    }}
                    className="btn btn-sm btn-warning py-1 px-2"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      dispatch(updateIsAtendido({
                        contactoId: contacto._id,
                        userId: user._id,
                        isAtendido: true
                      }))
                    }}
                    className="btn btn-sm btn-success py-1 px-2"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                )}
                <Link
                  to={`/contactos/${contacto._id}`}
                  className="btn btn-sm btn-primary py-1 px-2 ms-1"
                >
                  <i className="fas fa-eye"></i>
                </Link>
              </div>
            ),
          });
        }
      });
      return data;
    };

    contenido = <MDBDataTable
      responsive
      data={setContactos()}
      bordered
      striped
      hover
      displayEntries={false}
      info={false}
      noBottomColumns={true}
      paginationLabel={["<", ">"]}
      searchLabel="Buscar"
      noRecordsFoundLabel="No contactos registrados"
    />
  }
  else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
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
                  <h4 className="page-title">Contactos</h4>
                  <h4 className="page-title"><span className="badge bg-secondary">{user.ciudad}</span></h4>
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

export default AdminContactos