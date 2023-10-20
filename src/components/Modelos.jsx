import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { selectAllVehiculos, getVehiculosStatus, getVehiculosError, getVehiculos } from "../features/vehiculos/vehiculosSlice"
import Modelo from "./Modelo"

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
    contenido = <div className="w-100 my-6 text-center">
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
      <div className="section_banner">
        <div className="container">
          <h1 className="text-center text-uppercase text-white">
            MODELOS EN MORACOSTA
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {contenido}
        </div>
      </div>
    </div>
  )
}

export default Modelos