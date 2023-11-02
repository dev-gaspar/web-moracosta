import { useDispatch, useSelector } from "react-redux"
import Sidenav from "../layout/Sidenav"
import { useEffect, useState } from "react"
import { deleteMarca, getMarcas, getMarcasError, getMarcasStatus, newMarca, selectAllMarcas } from '../../features/vehiculos/marcasSlice'
import { MDBDataTable } from "mdbreact"
import toast from "react-hot-toast"
import { getModelos, getModelosStatus, modelosAdded, selectAllModelos } from "../../features/vehiculos/modelosSlice"
import { getVehiculos, getVehiculosStatus, selectAllVehiculos, vehiculosAdded } from "../../features/vehiculos/vehiculosSlice"

const AdminMarcas = () => {

  const [nombre, setNombre] = useState('');

  const dispatch = useDispatch();
  const marcas = useSelector(selectAllMarcas);
  const status = useSelector(getMarcasStatus)
  const error = useSelector(getMarcasError)

  const modelos = useSelector(selectAllModelos);
  const modelosStatus = useSelector(getModelosStatus)
  const vehiculo = useSelector(selectAllVehiculos);
  const vehiculoStatus = useSelector(getVehiculosStatus)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getMarcas())
    }

    if (modelosStatus === 'idle') {
      dispatch(getModelos())
    }

    if (vehiculoStatus === 'idle') {
      dispatch(getVehiculos())
    }

  }, [vehiculoStatus, modelosStatus, status, dispatch])

  let contenido;

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  } else if (status === 'succeeded') {

    const setMarcas = () => {
      const data = {
        columns: [
          {
            label: "Marca",
            field: "marca",
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

      marcas.forEach((model) => {
        data.rows.push({
          marca: model.nombre,
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
      data={setMarcas()}
      bordered
      striped
      hover
      displayEntries={false}
      info={false}
      noBottomColumns={true}
      paginationLabel={["<", ">"]}
      searchLabel="Buscar"
      paging={marcas.length > 5 ? true : false}
      entries={5}
      noRecordsFoundLabel="No hay marcas registradas"
    />
  } else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(newMarca({ nombre }));
    if (status === 'succeeded') {
      setNombre('')
      toast.success('Marca registrada', { icon: '💼' })
    }
  };

  const handleDelete = async (id) => {
    const res = await dispatch(deleteMarca(id))
    if (res.payload !== undefined) {
      toast.success('Marca eliminada', { icon: '🗑️' })

      // Elimina los modelos y vehículos asociados a la marca eliminada
      const marcaToDelete = marcas.find((marca) => marca._id === id);

      // Elimina modelos asociados
      const modelosToDelete = modelos.filter((modelo) => modelo.marca._id === marcaToDelete._id);

      // Elimina vehículos asociados
      const vehiculosToDelete = vehiculo.filter((vehiculo) => vehiculo.modelo._id && modelosToDelete.some(modelo => modelo._id === vehiculo.modelo._id));

      // Actualiza los estados de modelos y vehículos
      let modelosdd = modelos.filter((modelo) => !modelosToDelete.some(delModelo => delModelo._id === modelo._id));
      let vehiculosdd = vehiculo.filter((vehiculo) => !vehiculosToDelete.some(delVehiculo => delVehiculo._id === vehiculo._id));

      dispatch(modelosAdded(modelosdd));
      dispatch(vehiculosAdded(vehiculosdd));
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
                  <h4 className="page-title">Marcas</h4>
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
                      <h5>Registrar marca</h5>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="marca" className="form-label">Marca</label>
                          <input
                            type="text"
                            className="form-control"
                            id="marca"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                          />
                        </div>
                        {status === "failed" && <div className="alert alert-danger" role="alert">
                          {error}
                        </div>}
                        <button type="submit" className="btn btn-primary" disabled={status === "loading"}>Registrar</button>
                      </form>
                    </div>
                    <div className='col-md-7'>
                      <h5>Lista marcas</h5>
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

export default AdminMarcas