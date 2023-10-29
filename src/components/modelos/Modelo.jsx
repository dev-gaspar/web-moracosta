import React from 'react'
import { Link } from 'react-router-dom'

const Modelo = ({ vehiculo }) => {
  return (
    <div className="col-12 col-md-4 col-lg-4 vehicles">
      <Link className="box-items" to={`/modelos/${vehiculo._id}`}>
        <img src={vehiculo.imagen_principal.url} alt={vehiculo.nombre} />
        <div className="text">
          <h3>{vehiculo.nombre}</h3>
          <p>{vehiculo.descripcion}</p>
        </div>
        <div>
          <span className="btn-custom">VER MÁS <i className="fa fa-chevron-right"></i></span>
        </div>
      </Link>
    </div>
  )
}

export default Modelo