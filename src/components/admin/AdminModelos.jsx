import { useDispatch, useSelector } from "react-redux"
import Sidenav from "../layout/Sidenav"
import { useEffect, useState } from "react"
import { deleteModelo, getModelos, getModelosError, getModelosStatus, newModelo, selectAllModelos } from '../../features/vehiculos/modelosSlice'
import { MDBDataTable } from "mdbreact"
import toast from "react-hot-toast"

const AdminModelos = () => {

  const [nombre, setNombre] = useState('');

  const dispatch = useDispatch()
  const modelos = useSelector(selectAllModelos)
  const status = useSelector(getModelosStatus)
  const error = useSelector(getModelosError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getModelos())
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

    const setModelos = () => {
      const data = {
        columns: [
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
    />
  } else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(newModelo({ nombre }));
    if (status === 'succeeded') {
      setNombre('')
      toast.success('Modelo registrado', { icon: '🚗' })
    }
  };

  const handleDelete = async (id) => {
    const res = await dispatch(deleteModelo(id))
    if (res.payload !== undefined) {
      toast.success('Modelo eliminado', { icon: '🗑️' })
    }
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
                  <h4 className="page-title">Modelos</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <div className='row'>
                    <div className='col-md-5'>
                      <h5>Registrar modelo</h5>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
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
                        {status === "failed" && <div className="alert alert-danger" role="alert">
                          {error}
                        </div>}
                        <button type="submit" className="btn btn-primary" disabled={status === "loading"}>Registrar</button>
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