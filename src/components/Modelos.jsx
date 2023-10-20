import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Modelos = () => {

  const vehiculos = useSelector((state) => state.vehiculos)

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
          
          {vehiculos.map((vehiculo) => (
            <div className="col-12 col-md-4 col-lg-4 vehicles" key={vehiculo.vehiculo_id}>
              <Link className="box-items" to={`/modelos/${vehiculo.vehiculo_id}`}>
                <img src={vehiculo.imagen_principal} alt={vehiculo.nombre} />
                <div className="text">
                  <h3>{vehiculo.nombre}</h3>
                  <p>{vehiculo.descripcion}</p>
                </div>
                <div>
                  <span className="btn-custom">VER MÁS <i className="fa fa-chevron-right"></i></span>
                </div>
              </Link>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Modelos