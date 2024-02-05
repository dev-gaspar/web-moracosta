import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { selectAllVehiculos, getVehiculosStatus, getVehiculosError, getVehiculos } from "../../features/vehiculos/vehiculosSlice"
import Modelo from "./Modelo"
import Banner from "../layout/Banner"
import { useLocation, useParams } from "react-router-dom"
import { getMarcas, getMarcasStatus, selectAllMarcas } from "../../features/vehiculos/marcasSlice"

const Modelos = () => {

  const marcaId = useParams().marcaId;
  const [marca, setMarca] = useState("")
  const [filterVehiculos, setFilterVehiculos] = useState([])
  const { pathname } = useLocation();

  const dispatch = useDispatch()
  const vehiculos = useSelector(selectAllVehiculos)
  const status = useSelector(getVehiculosStatus)
  const error = useSelector(getVehiculosError)

  const marcas = useSelector(selectAllMarcas)
  const marcasStatus = useSelector(getMarcasStatus)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getVehiculos())
    }

    if (marcasStatus === 'idle') {
      dispatch(getMarcas())
    }

    if (marcasStatus === 'succeeded') {
      setMarca(marcas.find(marca => marca._id === marcaId).nombre)
    }
  }, [status, marcasStatus, dispatch, pathname])

  useEffect(() => {
    if (status === 'succeeded') {
      setFilterVehiculos(vehiculos.filter(vehiculo => vehiculo.modelo.marca._id === marcaId))
    }
  }, [status, marcaId, vehiculos])

  let contenido;

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  } else if (status === 'succeeded') {
    if (filterVehiculos.length > 0) {
      contenido = filterVehiculos.map((vehiculo) => (
        <Modelo key={vehiculo._id} vehiculo={vehiculo} />
      ))
    } else {
      contenido = <div className="alert alert-warning my-4" role="alert">
        No hay vehículos registrados para la marca {marca}
      </div>
    }
  } else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
  }

  return (
    <div className="bg-dark">
      <div className="top-fixed" />
      <Banner text={`MODELOS ${marca} EN MORACOSTA`} />
      <div className="container mt-2">
        <div className="row">
          {contenido}
        </div>
      </div>
    </div>
  )
}

export default Modelos