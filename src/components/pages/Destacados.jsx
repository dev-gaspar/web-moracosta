import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getVehiculosError, getVehiculosStatus, selectAllVehiculos } from "../../features/vehiculos/vehiculosSlice"

const Destacados = () => {

  const vehiculos = useSelector(selectAllVehiculos)
  const status = useSelector(getVehiculosStatus)
  const error = useSelector(getVehiculosError)

  let contenido;

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  } else if (status === 'succeeded') {

    //obtener los ultimos vehiculos registrados
    let vehiculosDestacados = [...vehiculos].reverse().slice(0, 3)

    contenido =
      vehiculosDestacados.map(vehiculo => (
        <div key={vehiculo._id} className="col-12 col-lg-4">
          <div className="box-car">
            <img src={vehiculo.imagen_principal.url} />
            <h2>{vehiculo.nombre}</h2>
            <div className="box-text">
              <p>
                {vehiculo.descripcion}
              </p>
              <Link to={`/modelos/${vehiculo._id}`} className="cta">CONÓCELO</Link>
            </div>
          </div>
        </div>
      ))
  } else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
  }

  return (
    <div className="destacados p-5 mt-3">
      <div className="container text-center">
        <h1 className="text-bold" >CARROS Y CAMIONETAS NUEVOS</h1>
        <h2>Vehículos destacados</h2>
        <br />
        <div className="row">
          {contenido}
        </div>
      </div>
    </div>
  )
}

export default Destacados