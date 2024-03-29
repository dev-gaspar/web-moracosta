import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getMarcas, getMarcasStatus, selectAllMarcas } from "../../features/vehiculos/marcasSlice"
const Footer = () => {

  const dispatch = useDispatch()
  const marcas = useSelector(selectAllMarcas)
  const status = useSelector(getMarcasStatus)

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
              <img src="/assets/moracosta-manabi.webp" alt="logo" height="150" />
            </div>
            <div className="col-md-4">
              <h3><strong>Servicio al cliente</strong></h3>
              <p><i className="fas fa-phone-alt" /><strong> Chery – Dongfeng - DFSK:</strong><a href="tel:+593958622755" > 0958622755</a>  </p>
              <p><i className="fas fa-phone-alt" /><strong> Volkswagen:</strong><a href="tel:+5930987579636"> 0987579636</a></p>
              <ul className="list-unstyled text-xs">
                <li><Link to={"/sucursales"}> <i className="fa fa-map-pin" /> Encuentranos en maps</Link></li>
                <li><Link to={"/contactanos"}> <i className="fa fa-envelope" /> Contáctanos</Link></li>
              </ul>
              <div className="social">
                <a href="https://www.facebook.com/grupomoracosta" target="_blank"> <i className="fab fa-facebook" /> </a>
                <a href="https://www.instagram.com/moracosta.ec" target="_blank"><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="col-md-2">
              <h3>Marcas</h3>
              <ul className="list-unstyled">
                {contenido}
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Herramientas</h3>
              <ul className="list-unstyled">
                <li><Link to={"/cotizador"}>Cotizador</Link></li>
                <li><Link to={"/login"}>Panel de control</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer