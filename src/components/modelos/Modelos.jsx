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
    contenido = vehiculos.map((vehiculo) => (
      <Modelo key={vehiculo.vehiculo_id} vehiculo={vehiculo} />
    ))
  } else if (status === 'failed') {
    contenido = <div>{error}</div>
  }

  return (
    <div>
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