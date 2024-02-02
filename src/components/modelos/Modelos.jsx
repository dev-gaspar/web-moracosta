import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { selectAllVehiculos, getVehiculosStatus, getVehiculosError, getVehiculos } from "../../features/vehiculos/vehiculosSlice"
import Modelo from "./Modelo"
import Banner from "../layout/Banner"

const Modelos = () => {
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
  } else if (status === 'succeeded') {
    if (vehiculos.length > 0) {
      contenido = vehiculos.map((vehiculo) => (
        <Modelo key={vehiculo._id} vehiculo={vehiculo} />
      ))
    } else {
      contenido = <div className="alert alert-warning" role="alert">
        No hay vehículos registrados
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
      <Banner text={"MODELOS EN MORACOSTA"} />
      <div className="container">
        <div className="row">
          {contenido}
        </div>
      </div>
    </div>
  )
}

export default Modelos