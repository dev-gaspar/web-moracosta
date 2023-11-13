import { Link } from "react-router-dom"

const Presentacion = () => {
  return (
    <div className="presentacion">
      <div className="container text-center">
        <h2 className="text-bold" >Bienvenidos a Grupo Moracosta</h2>
         <p>Un Legado de Excelencia: Más de Dos Décadas de Trayectoria en el Sector Automotriz, NEGOCIOS MORACOSTA S.A, es una empresa que se ha establecido firmemente en el competitivo mercado de la venta de vehículos. Durante estos 20 años, hemos acumulado una vasta experiencia y conocimiento en la industria automotriz, lo que nos ha permitido no sobrevivir en un mercado en constante evolución. Nos enorgullece ser reconocidos en el ambito comercial de vehículos, brindando a nuestros clientes una amplia gama de opciones que abarcan desde automóviles compactos tipo Sedán como el Chery Arrizo 5 Pro, elegantes como el Chery Tiggo 8 Pro, y hasta vehículos todoterreno y resistentes como la camioneta Dongfeng Rich6 4x4 Thunder a gasolina y Diesel.</p>
        <p>Nuestra empresa se distingue por su compromiso inquebrantable con la calidad, la innovación y la satisfacción del cliente. A lo largo de los años, hemos forjado relaciones sólidas con los principales distribuidores de la industria, lo que nos permite ofrecer a nuestros clientes acceso a los vehículos sofsticados tecnológicamente, seguros y efcientes en términos de consumo de combustible.</p>
        <Link to={"sucursales"} className="cta">VISITANOS</Link>
      </div>

    </div>
  )
}

export default Presentacion
