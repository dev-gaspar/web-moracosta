import { useDispatch, useSelector } from 'react-redux';
import Sidenav from '../layout/Sidenav'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getContactoById, getContactoError, getContactoStatus, selectContacto, updateIsAtendidoDetalle } from '../../features/contactos/contactoSlice';
import { selectUser } from '../../features/user/userSlice';
import { updateIsAtendido, updateIsAtendidoTable } from '../../features/contactos/contactosSlice';

const DetalleContacto = () => {

  const contactoId = useParams().id;

  const dispatch = useDispatch()
  const contacto = useSelector(selectContacto)
  const status = useSelector(getContactoStatus)
  const error = useSelector(getContactoError)

  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(getContactoById(contactoId))
  }, [dispatch, contactoId, user])

  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  let contenido;

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  } else if (status === 'succeeded') {
    let precio = f.format(contacto.modelo.precio);
    contenido = (
      <div className="row">
        <div className='col-md-6' >
          <h5 className="card-title">Información de Contacto</h5>
          <div className='table-responsive'>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <th>Nombre</th>
                  <td>{contacto.nombre} {contacto.apellido}</td>
                </tr>
                <tr>
                  <th>Tipo de Documento</th>
                  <td>{contacto.tipoDocumento}</td>
                </tr>
                <tr>
                  <th>Número de Documento</th>
                  <td>{contacto.numeroDocumento}</td>
                </tr>
                <tr>
                  <th>Correo</th>
                  <td>{contacto.correo}</td>
                </tr>
                <tr>
                  <th>Teléfono</th>
                  <td>{contacto.telefono}</td>
                </tr>
                <tr>
                  <th>Preferencia</th>
                  <td>
                    {contacto.check.whatsapp && (<i className='fab fa-whatsapp' />)}
                    {" - "}
                    {contacto.check.llamada && (<i className='fas fa-phone' />)}
                  </td>
                </tr>
                <tr>
                  <th>Ciudad</th>
                  <td>{contacto.ciudad}</td>
                </tr>
                <tr>
                  <th>Dirección</th>
                  <td>{contacto.direccion}</td>
                </tr>
                <tr>
                  <th>Agencia</th>
                  <td>{contacto.agencia}</td>
                </tr>

                <tr>
                  <th>Atendido</th>
                  <td>{contacto.isAtendido ? "Sí ✅" : "No ❌"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {contacto.isAtendido ? (
            <button
              onClick={() => {
                dispatch(updateIsAtendidoDetalle({
                  contactoId: contacto._id,
                  userId: user._id,
                  isAtendido: false
                }))
                dispatch(updateIsAtendidoTable({ id: contacto._id, isAtendido: false }))
              }}
              className="btn btn-sm btn-warning py-1 px-2"
            >
              <i className="fas fa-times"></i>
              {" "}
              Marcar como no atendido
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(updateIsAtendidoDetalle({
                  contactoId: contacto._id,
                  userId: user._id,
                  isAtendido: true
                }))
                dispatch(updateIsAtendidoTable({ id: contacto._id, isAtendido: true }))
              }}
              className="btn btn-sm btn-success py-1 px-2"
            >
              <i className="fas fa-check"></i>
              {" "}
              Marcar como atendido
            </button>
          )}
        </div>
        <div className='col-md-6' >
          <h5 className="card-title">Modelo de interes</h5>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <img src={contacto.modelo.imagen_principal.url} className="img-fluid card-img-top" alt="imagen" />
            <div className='table-responsive w-100'>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <th>Marca</th>
                    <td>{contacto.modelo.modelo.marca.nombre}</td>
                  </tr>
                  <tr>
                    <th>Modelo</th>
                    <td>{contacto.modelo.modelo.nombre}</td>
                  </tr>
                  <tr>
                    <th>Nombre</th>
                    <td>{contacto.modelo.nombre}</td>
                  </tr>
                  <tr>
                    <th>Precio</th>
                    <td>{precio}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {contacto.isAtendido && (
            <>
              <h5 className="card-title">Conversion atendida por</h5>
              <div className='table-responsive'>
                <table className="table table-striped table-hover">
                  <tbody>
                    <tr>
                      <th>Nombre</th>
                      <td>{contacto.user.username}</td>
                    </tr>
                    <tr>
                      <th>Ciudad</th>
                      <td>{contacto.user.ciudad}</td>
                    </tr>
                    <tr>
                      <th>Correo</th>
                      <td>{contacto.user.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>
      </div>
    )
  } else if (status === 'failed') {
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
                  <h4 className="page-title">Contacto # {contactoId}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded" style={{ marginBottom: "1.5rem" }}>
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

export default DetalleContacto