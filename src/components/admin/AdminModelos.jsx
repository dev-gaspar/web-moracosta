import { useDispatch, useSelector } from "react-redux"
import Sidenav from "../layout/Sidenav"
import { useEffect, useState } from "react"
import { deleteModelo, getModelos, getModelosError, getModelosStatus, newModelo, selectAllModelos } from '../../features/vehiculos/modelosSlice'
import { MDBDataTable } from "mdbreact"
import toast from "react-hot-toast"
import { getMarcas, getMarcasError, getMarcasStatus, selectAllMarcas } from "../../features/vehiculos/marcasSlice"
import Select from "react-select"
import { Link } from "react-router-dom"
import { getVehiculos, getVehiculosStatus, selectAllVehiculos, vehiculosAdded } from "../../features/vehiculos/vehiculosSlice"

const AdminModelos = () => {
  const dispatch = useDispatch()

  const [nombre, setNombre] = useState('');
  const [marcaId, setMarcaId] = useState('');

  const marcas = useSelector(selectAllMarcas)
  const statusMarcas = useSelector(getMarcasStatus)
  const errorMarcas = useSelector(getMarcasError)

  const modelos = useSelector(selectAllModelos)
  const statusModelos = useSelector(getModelosStatus)
  const errorModelos = useSelector(getModelosError)

  const vehiculos = useSelector(selectAllVehiculos)
  const statusVehiculos = useSelector(getVehiculosStatus)


  useEffect(() => {
    if (statusMarcas === 'idle') {
      dispatch(getMarcas())
    }

    if (statusModelos === 'idle') {
      dispatch(getModelos())
    }

    if (statusVehiculos === 'idle') {
      dispatch(getVehiculos())
    }

  }, [statusMarcas, statusModelos, dispatch])

  const CustomMenu = ({ innerRef, innerProps, isDisabled, children }) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps}>
        {children}
        <Link
          className="btn btn-primary btn-sm w-100"
          style={{ zIndex: 1000 }}
          to={"/vehiculos/marcas"}
        >
          <i className="fa fa-plus" />
          {" "}
          Nueva marca
        </Link>
      </div>
    ) : null;

  let contenido;

  if (statusModelos === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  } else if (statusModelos === 'succeeded') {

    const setModelos = () => {
      const data = {
        columns: [
          {
            label: "Marca",
            field: "marca",
            sort: "asc",
          },
          {
            label: "Modelo",
            field: "modelo",
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

      modelos.forEach((model) => {
        data.rows.push({
          marca: model.marca.nombre,
          modelo: model.nombre,
          acciones: (
            <div className="d-flex justify-content-center">
              <button
                onClick={() => handleDelete(model._id)}
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
      data={setModelos()}
      bordered
      striped
      hover
      displayEntries={false}
      info={false}
      noBottomColumns={true}
      paginationLabel={["<", ">"]}
      searchLabel="Buscar"
      paging={modelos.length > 5 ? true : false}
      entries={5}
      noRecordsFoundLabel="No hay modelos registrados"
    />
  } else if (statusModelos === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {errorModelos}
      </div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(newModelo({ marcaId, nombre }));
    if (statusModelos === 'succeeded') {
      setNombre('')
      toast.success('Modelo registrado', { icon: '🚗' })
    }
  };

  const handleDelete = async (id) => {
    const res = await dispatch(deleteModelo(id))
    if (res.payload !== undefined) {
      toast.success('Modelo eliminado', { icon: '🗑️' })

      //Elimina los vehículos asociados al modelo eliminado
      const vehiculosUpdated = vehiculos.filter((vehiculo) => vehiculo.modelo?._id !== id);

      dispatch(vehiculosAdded(vehiculosUpdated));
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
                  <h4 className="page-title">Modelos</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded">
                <div className="card-body">
                  <div className='row'>
                    <div className='col-md-5 pb-3'>
                      <h5>Registrar modelo</h5>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="marca" className="form-label">Marca</label>
                          <Select
                            aria-label='marca'
                            placeholder='Seleccionar'
                            options={marcas.map((marca) => ({
                              value: marca._id,
                              label: marca.nombre
                            }))
                            }
                            isLoading={statusMarcas === 'loading'}
                            components={{ Menu: CustomMenu }}
                            onChange={(e) => setMarcaId(e.value)}
                            required
                          />

                          <label htmlFor="modelo" className="form-label">Modelo</label>
                          <input
                            type="text"
                            className="form-control"
                            id="modelo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                          />
                        </div>
                        {statusModelos === "failed" && <div className="alert alert-danger" role="alert">
                          {errorModelos}
                        </div>}
                        {statusMarcas === "failed" && <div className="alert alert-danger" role="alert">
                          {errorMarcas}
                        </div>}
                        <button type="submit" className="btn btn-primary" disabled={statusModelos === "loading"}>Registrar</button>
                      </form>
                    </div>
                    <div className='col-md-7'>
                      <h5>Lista modelos</h5>
                      {contenido}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default AdminModelos