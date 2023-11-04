import React from 'react'
import Sidenav from '../layout/Sidenav'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getVehiculos, getVehiculosError, getVehiculosStatus, selectAllVehiculos, updateIsBanner, updateIsDestacado } from '../../features/vehiculos/vehiculosSlice'
import { MDBDataTable } from 'mdbreact'

const AdminPrincipal = () => {

  const dispatch = useDispatch()
  const vehiculos = useSelector(selectAllVehiculos)
  const status = useSelector(getVehiculosStatus)
  const error = useSelector(getVehiculosError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getVehiculos())
    }
  }, [status, dispatch])

  let contenido;

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  }
  else if (status === 'succeeded') {
    const setVehiculos = () => {
      const data = {
        columns: [
          {
            label: "Imagen",
            field: "imagen",
            sort: "asc",
          },
          {
            label: "Nombre",
            field: "nombre",
            sort: "asc",
          },
          {
            label: "Descripcion",
            field: "descripcion",
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

      vehiculos.forEach((vehiculo) => {
        data.rows.push({
          imagen: <img src={vehiculo.imagen_principal.url} alt={vehiculo.nombre} className='img-fluid' width={100} />,
          nombre: vehiculo.nombre,
          descripcion: vehiculo.descripcion,
          acciones: (
            <div className="d-flex justify-content-center">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(updateIsDestacado({
                    id: vehiculo._id,
                    isDestacado: !vehiculo.isDestacado
                  }))
                }}
                className={`btn btn-sm py-1 px-2 me-1 btn-${(!vehiculo.isDestacado ? "outline-" : "")}warning`}
              >
                <i className="fa fa-star"></i>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(updateIsBanner({
                    id: vehiculo._id,
                    isBanner: (vehiculo.isBanner ? true : true)
                  }))

                }}
                className={`btn btn-sm py-1 px-2 me-1 btn-${(!vehiculo.isBanner ? "outline-" : "")}secondary`}
              >
                <i className="fa fa-home"></i>
              </button>
            </div>
          ),
        });
      });
      return data;
    };

    contenido = <MDBDataTable
      responsive
      data={setVehiculos()}
      bordered
      striped
      hover
      displayEntries={false}
      info={false}
      noBottomColumns={true}
      paginationLabel={["<", ">"]}
      searchLabel="Buscar"
      paging={vehiculos.length > 5 ? true : false}
      entries={5}
      noRecordsFoundLabel="No hay vehiculos registrados"
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
                  <h4 className="page-title">Pagina principal</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded" style={{marginBottom: "1.5rem"}}>
                <div className="card-body">
                  <h5>Vehiculos</h5>
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

export default AdminPrincipal