import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getVehiculosError, getVehiculosStatus, selectAllVehiculos } from "../../features/vehiculos/vehiculosSlice";

const Header = () => {

  const navigate = useNavigate();

  const vehiculos = useSelector(selectAllVehiculos)
  const status = useSelector(getVehiculosStatus)
  const error = useSelector(getVehiculosError)

  let contenido;

  if (status === 'loading' || status === 'idle') {
    contenido =
      <div className="vh-100 w-100 d-flex justify-content-center align-items-center" style={{
        background: "#231f20"
      }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
  } else if (status === 'succeeded') {

    // Obtener el vehículo con la propiedad isBanner
    const vehiculo = vehiculos.find(vehiculo => vehiculo.isBanner === true);

    if (vehiculo) {
      contenido = <>
        <section className="banner" style={{ height: "100vh" }}>
          <div className="banner-background">
            <video className="video-background" loop autoPlay="autoplay" muted playsInline defaultmuted="true">
              <source src={vehiculo.video_banner.url} type="video/webm" />
              Your browser does not support HTML5 video
            </video>
          </div>
        </section>

        <div className="container banner-titulo">
          <h1 className="text-center mb-3 mb-md-4">{vehiculo.nombre}</h1>
          <h4 className="text-center text-uppercase mb-3 mb-md-3">{vehiculo.descripcion}</h4>
        </div>

        <div className="container banner-pie">
          {Object.keys(vehiculo.caracteristicas).map(key => (
            <div key={key}>
              <p className="caract_titulo text-uppercase">{vehiculo.caracteristicas[key].titulo}</p>
              <p className="caract_subtitulo text-uppercase">{vehiculo.caracteristicas[key].subtitulo}</p>
            </div>
          ))}

          <div>
            <button
              onClick={() => navigate(`/modelos/${vehiculo._id}`)}
            >
              Ver
            </button>
          </div>
        </div>


        <section className="call-action">
          <div className="container p-4 pt-9 text-center">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 "><Link className="cta-item" to={"/cotizador"}>COTÍZALO</Link></div>
              <div className="col-12 col-md-6 col-lg-6"><Link className="cta-item" to={"/contactanos"}>CONTÁCTANOS</Link></div>
            </div>
          </div>
        </section>
      </>
    } else {
      contenido =
        <>
          <div className="top-fixed" />
          <div className="alert alert-warning" role="alert" >
            No hay vehículo en el banner
          </div>
        </>
    }


  }
  else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
  }

  return (
    contenido
  )
}

export default Header;