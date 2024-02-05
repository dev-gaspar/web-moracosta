import { Link } from "react-router-dom"

const Presentacion = () => {
  return (
    <div className="presentacion">
      <div className="container text-center">
        <h2 className="text-bold" >Bienvenidos a Grupo Moracosta</h2>
        <p>
          Un legado de excelencia: más de dos décadas de trayectoria. En NEGOCIOS MORACOSTA S.A, nos enorgullecemos de ser parte de tu viaje hacia el vehículo perfecto. Hemos dedicado nuestro compromiso a ofrecer servicios excepcionales y vehículos de alta calidad a nuestros valiosos clientes.
        </p>
        <p>
          Nosotros entendemos que la compra de un automóvil es una decisión significativa. Es por eso que nos esforzamos por brindar un servicio personalizado, asesoramiento experto y opciones de financiamiento flexibles. Nuestra misión es hacerte sentir seguro y satisfecho en cada paso del proceso.
        </p>
        <p>
          Gracias por visitarnos en línea. Te invitamos a explorar nuestro sitio web y descubrir una amplia gama de automóviles de las marcas más prestigiosas y confiables.
        </p>
        <Link to={"sucursales"} className="cta">VISITANOS</Link>
      </div>

    </div>
  )
}

export default Presentacion
