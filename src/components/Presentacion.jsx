import { Link } from "react-router-dom"

const Presentacion = () => {
  return (
    <div className="presentacion">
      <div className="container text-center">
        <h2 className="text-bold" >Bienvenidos a Grupo Moracosta</h2>
        <p>Llevamos 20 años en el mercado Manabita representando marcas de prestigio en automóviles. Comenzamos en 2003 con SKODA hasta 2010, luego asumimos CHERY y DONGFENG desde entonces. Nuestra misión es comprar y vender vehículos y repuestos, además de brindar servicios para el parque automotriz local.</p>
        <Link to={"sucursales"} className="cta">VISITANOS</Link>
      </div>

    </div>
  )
}

export default Presentacion