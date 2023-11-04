import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Componente que muestra información detallada de un vehículo.
 * @param {vehiculo} vehiculo - Objeto que representa un vehículo.
 * @param {number} vehiculo._id - Identificador único del vehículo.
 * @param {string} vehiculo.nombre - Nombre del vehículo (ej. "MAZDA CX-90").
 * @param {string} vehiculo.modelo - Modelo del vehículo (ej. "MAZDA").
 * @param {string} vehiculo.descripcion - Descripción del vehículo.
 * @param {string} vehiculo.imagen_principal.url - URL de la imagen principal del vehículo.
 * @param {number} vehiculo.precio - Precio del vehículo.
 * @param {string} vehiculo.ficha_tecnica - URL de la ficha técnica del vehículo.
 * @param {string} vehiculo.video_banner - URL del video de presentación del vehículo.
 * @param {Object} vehiculo.detalles_banner - Detalles destacados del vehículo en el banner.
 * @param {string} vehiculo.detalles_banner.one - Detalle 1 del vehículo.
 * @param {string} vehiculo.detalles_banner.two - Detalle 2 del vehículo.
 * @param {string} vehiculo.detalles_banner.tree - Detalle 3 del vehículo.
 * @param {Object} vehiculo.detalles - Detalles adicionales del vehículo.
 * @param {string} vehiculo.detalles.titulo1 - Título del detalle 1.
 * @param {string} vehiculo.detalles.texto1 - Texto del detalle 1.
 * @param {string} vehiculo.detalles.imagen1.url - URL de la imagen del detalle 1.
 * @param {string} vehiculo.detalles.titulo2.url - Título del detalle 2.
 * @param {string} vehiculo.detalles.texto2 - Texto del detalle 2.
 * @param {string} vehiculo.detalles.imagen2.url - URL de la imagen del detalle 2.
 * @param {string} vehiculo.imagen_especificaciones.url - URL de la imagen de especificaciones del vehículo.
 * @param {Object} vehiculo.especificaciones - Especificaciones técnicas del vehículo.
 * @param {Object} vehiculo.especificaciones.potencia - Especificaciones de potencia del motor.
 * @param {string} vehiculo.especificaciones.potencia.potencia_motor - Potencia del motor en HP.
 * @param {string} vehiculo.especificaciones.potencia.torque - Torque del motor en lb-pie.
 * @param {string} vehiculo.especificaciones.potencia.velocidad_maxima - Velocidad máxima del vehículo.
 * @param {string} vehiculo.especificaciones.potencia.aceleracion_0_100 - Aceleración de 0 a 100 km/h.
 * @param {Object} vehiculo.especificaciones.seguridad - Especificaciones de seguridad.
 * @param {number} vehiculo.especificaciones.seguridad.Airbags - Cantidad de airbags.
 * @param {string} vehiculo.especificaciones.seguridad.Frenos_Antibloqueo - Disponibilidad de frenos antibloqueo (ABC).
 * @param {string} vehiculo.especificaciones.seguridad.Control_traccion - Disponibilidad de control de tracción.
 * @param {string} vehiculo.especificaciones.seguridad.Control_estabilidad - Disponibilidad de control de estabilidad.
 * @param {string} vehiculo.especificaciones.seguridad.Sistema_retencion_infantil - Disponibilidad de sistema de retención infantil (ISOFIX).
 * @param {Object} vehiculo.especificaciones.equipamiento - Equipamiento del vehículo.
 * @param {string} vehiculo.especificaciones.equipamiento.Sistema_navegacion - Disponibilidad de sistema de navegación.
 * @param {string} vehiculo.especificaciones.equipamiento.Techo_solar - Disponibilidad de techo solar.
 * @param {string} vehiculo.especificaciones.equipamiento.Conectividad_bluetooth - Disponibilidad de conectividad bluetooth.
 * @param {string} vehiculo.especificaciones.equipamiento.Sistema_sonido_premium - Disponibilidad de sistema de sonido premium.
 * @param {string} vehiculo.especificaciones.equipamiento.Asiento_cuero - Disponibilidad de asientos de cuero.
 * @returns {DetalleComponents} Componente que muestra información detallada de un vehículo. 
 */

const DetalleComponents = ({ vehiculo }) => {
  return (
    <>
      <div className="sub-menu-fixed">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 col-lg-5 col-title text-center">
              <p className='text-uppercase' >{vehiculo.nombre}</p>
            </div>
            <div className="col-12 col-md-7 col-lg-7 col-li text-center">
              <ul>
                <li className="current">
                  <a href='#descripcion'>
                    <i className="fa fa-paperclip small" /> DESCRIPCIÓN
                  </a>
                </li>
                <li className="current">
                  <a href='#especficaciones' >
                    <i className="fa fa-table small" /> ESPECIFICACIONES
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="banner" style={{ height: "86vh" }}>
        <div className="banner-background">
          <video className="video-background" loop autoPlay="autoplay" muted playsInline defaultmuted="true">
            <source src={vehiculo.video_banner.url} type="video/webm" />
            Your browser does not support HTML5 video
          </video>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-4 col-mini">
                <div className="box-info">
                  <span className="number">1</span>
                  <span className="name">{vehiculo.detalles_banner.one}</span>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-4 col-mini">
                <div className="box-info">
                  <span className="number">2</span>
                  <span className="name">{vehiculo.detalles_banner.two}</span>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-4 col-mini">
                <div className="box-info">
                  <span className="number">3</span>
                  <span className="name">{vehiculo.detalles_banner.tree}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div id='descripcion' className="row boxes">
          <div className="col-md-6 description-box">
            <div className="detalle-box-text">
              <h1>{vehiculo.detalles.titulo1}</h1>
              <br />
              <p>{vehiculo.detalles.texto1}</p>
              <div className="links">
                <Link to={vehiculo.ficha_tecnica} target="_blank"
                  className="btn descargar"><span>FICHA TÉCNICA <i className="fa fa-book"></i></span></Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 img-box">
            <img src={vehiculo.detalles.imagen1.url} alt="imagen" className="img-parallax" />
          </div>
        </div>

        <div id='descripcion' className="row my-boxes-rev">
          <div className="col-md-6 img-box">
            <img src={vehiculo.detalles.imagen2.url} alt="imagen" className="img-parallax" />
          </div>
          <div className="col-md-6 description-box">
            <div className="detalle-box-text">
              <h1>{vehiculo.detalles.titulo2}</h1>
              <br />
              <p>{vehiculo.detalles.texto2}</p></div>
          </div>
        </div>
      </div>

      <div id='especficaciones' className="row">
        <div className='col-md-6 d-flex align-items-center'>
          <img src={vehiculo.imagen_especificaciones.url} className='img-fluid py-3' />
        </div>
        <div className='col-md-6'>
          <div className='especificaciones'>
            <h2 className='text-center'>{`${vehiculo.nombre} Especificaciones`}</h2>

            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-potencia-tab" data-bs-toggle="tab" data-bs-target="#nav-potencia" type="button" role="tab" aria-controls="nav-potencia" aria-selected="true">Potencia</button>
                <button className="nav-link" id="nav-seguridad-tab" data-bs-toggle="tab" data-bs-target="#nav-seguridad" type="button" role="tab" aria-controls="nav-seguridad" aria-selected="false">Seguridad</button>
                <button className="nav-link" id="nav-equipamiento-tab" data-bs-toggle="tab" data-bs-target="#nav-equipamiento" type="button" role="tab" aria-controls="nav-equipamiento" aria-selected="false">Equipamiento</button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-potencia" role="tabpanel" aria-labelledby="nav-potencia-tab">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Potencia del Motor:</td>
                      <td>{vehiculo.especificaciones.potencia.potencia_motor}</td>
                    </tr>
                    <tr>
                      <td>Torque:</td>
                      <td>{vehiculo.especificaciones.potencia.torque}</td>
                    </tr>
                    <tr>
                      <td>Velocidad Máxima:</td>
                      <td>{vehiculo.especificaciones.potencia.velocidad_maxima}</td>
                    </tr>
                    <tr>
                      <td>Aceleración 0-100 km/h:</td>
                      <td>{vehiculo.especificaciones.potencia.aceleracion_0_100}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="nav-seguridad" role="tabpanel" aria-labelledby="nav-seguridad-tab">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Airbags:</td>
                      <td>{vehiculo.especificaciones.seguridad.Airbags}</td>
                    </tr>
                    <tr>
                      <td>Frenos Antibloqueo (ABS):</td>
                      <td>{vehiculo.especificaciones.seguridad.Frenos_Antibloqueo_ABC}</td>
                    </tr>
                    <tr>
                      <td>Control de Tracción:</td>
                      <td>{vehiculo.especificaciones.seguridad.Control_traccion}</td>
                    </tr>
                    <tr>
                      <td>Control de Estabilidad:</td>
                      <td>{vehiculo.especificaciones.seguridad.Control_estabilidad}</td>
                    </tr>
                    <tr>
                      <td>Sistemas de Retención Infantil (ISOFIX):</td>
                      <td>{vehiculo.especificaciones.seguridad.Sistema_retencion_infantil}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="nav-equipamiento" role="tabpanel" aria-labelledby="nav-equipamiento-tab">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Sistema de Navegación:</td>
                      <td>{vehiculo.especificaciones.equipamiento.Sistema_navegacion}</td>
                    </tr>
                    <tr>
                      <td>Sistema de Sonido Premium:</td>
                      <td>{vehiculo.especificaciones.equipamiento.Sistema_sonido_premium}</td>
                    </tr>
                    <tr>
                      <td>Asientos de Cuero:</td>
                      <td>{vehiculo.especificaciones.equipamiento.Asiento_cuero}</td>
                    </tr>
                    <tr>
                      <td>Techo Solar:</td>
                      <td>{vehiculo.especificaciones.equipamiento.Techo_solar}</td>
                    </tr>
                    <tr>
                      <td>Conectividad Bluetooth:</td>
                      <td>{vehiculo.especificaciones.equipamiento.Conectividad_bluetooth}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='d-flex justify-content-center w-100'>
              <Link to={"/cotizador"} className="btn btn-solodev-red-reversed">Cotizar</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetalleComponents