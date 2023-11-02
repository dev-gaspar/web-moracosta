import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getMarcas, getMarcasError, getMarcasStatus, selectAllMarcas } from "../../features/vehiculos/marcasSlice"

const Footer = () => {

  const dispatch = useDispatch()
  const marcas = useSelector(selectAllMarcas)
  const status = useSelector(getMarcasStatus)
  const error = useSelector(getMarcasError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getMarcas())
    }
  }, [status, dispatch])

  let contenido;

  if (status === 'loading') {
    contenido = "Cargando..."
  } else if (status === 'succeeded') {
    contenido = marcas.map((marca) => (
      <li key={marca._id}><a>{marca.nombre}</a></li>
    ))
  } else if (status === 'failed') {
    contenido = "Error"
  }

  return (
    <>
      <footer className="pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img src="/assets/moracosta-manabi.png" alt="logo" height="150" />
            </div>
            <div className="col-md-3">
              <h3><strong>Servicio al cliente</strong></h3>
              <p><strong>Teléfono: 052620767</strong></p>
              <p><strong>Email: publicidad@moracosta.com</strong></p>
              <ul className="list-unstyled text-xs">
                <li><Link to={"/sucursales"}> <i className="fa fa-map-pin" /> Encuentranos en maps</Link></li>
                <li><Link to={"/contacto"}> <i className="fa fa-envelope" /> Contactenos</Link></li>
              </ul>
              <div className="social">
                <a href="https://www.facebook.com/grupomoracosta" target="_blank"> <i className="fab fa-facebook" /> </a>
                <a href="https://www.instagram.com/moracosta.ec" target="_blank"><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="col-md-3">
              <h3>Marcas</h3>
              <ul className="list-unstyled">
                {contenido}
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Herramientas</h3>
              <ul className="list-unstyled">
                <li><Link to={"/cotizador"}>Cotizador Online</Link></li>
                <li><Link to={"/login"}>Panel de control</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <small>2023 © Todos los derechos reservados.</small>
        </div>
      </footer>

    </>
  )
}

export default Footer