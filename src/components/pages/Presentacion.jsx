import { Link } from "react-router-dom"

const Presentacion = () => {
  return (
    <div className="presentacion">
      <div className="container text-center">
        <h2 className="text-bold" >Bienvenidos a Grupo Moracosta</h2>
         <p>Un Legado de Excelencia: Más de Dos Décadas de Trayectoria en el Sector Automotriz, NEGOCIOS MORACOSTA S.A, es una empresa que se ha establecido rmemente en el competitivo mercado de la venta de vehículos. Durante estos 20 años, hemos acumulado una vasta experiencia y conocimiento en la industria automotriz, lo que nos ha permitido no sobrevivir en un mercado en constante evolución. Nos enorgullece ser reconocidos en el ambito comercial de vehículos, brindando a nuestros clientes una amplia gama de opciones que abarcan desde automóviles compactos tipo Sedán como el Chery Arrizo 5 Pro, elegantes como el Chery Tiggo 8 Pro, y hasta vehículos todoterreno y resistentes como la camioneta Dongfeng Rich6 4x4 Thunder a gasolina y Diesel.</p>
        <p>Llevamos 20 años en el mercado Manabita representando marcas de prestigio en automóviles. Comenzamos en 2003 con SKODA hasta 2010, luego asumimos CHERY y DONGFENG desde entonces. Nuestra misión es comprar y vender vehículos y repuestos, además de brindar servicios para el parque automotriz local.</p>
        <Link to={"sucursales"} className="cta">VISITANOS</Link>
      </div>

    </div>
  )
}

export default Presentacion
