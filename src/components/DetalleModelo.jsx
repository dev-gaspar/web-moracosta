import React from 'react'
import { Link } from 'react-router-dom'

export const DetalleModelo = () => {
  return (
    <div>
      <div className="top-fixed" />
      <div className="sub-menu-fixed">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 col-lg-5 col-title text-center">
              <p>MAZDA CX-90</p>
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

      <section className="banner" style={{ height: "85vh" }}>
        <div className="banner-background">
          <video className="video-background" loop autoPlay="autoplay" muted playsInline defaultmuted="true">
            <source src="https://res.cloudinary.com/dxuauzyp9/video/upload/v1697326776/pacesivmm4jjwv2aavra.webm" type="video/webm" />
            Your browser does not support HTML5 video
          </video>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-4 col-mini">
                <div className="box-info">
                  <span className="number">1</span>
                  <span className="name">3,3L MOTOR SKYACTIV-G HÍBRIDO LIGERO</span>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-4 col-mini">
                <div className="box-info">
                  <span className="number">2</span>
                  <span className="name">6 CILINDROS EN LÍNEA</span>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-4 col-mini">
                <div className="box-info">
                  <span className="number">3</span>
                  <span className="name">340hp 5,000 A 6,000 R.P.M</span>
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
              <h1>MAZDA CX-90</h1>
              <br />
              <p>LA MAESTRÍA SE CONDUCE</p>
              <p>La nueva Mazda CX-90 es el resultado de la pasión y más alta precisión de la maestría japonesa unidas para esculpir una obra de arte e ingeniería. Su diseño audaz y dinámico ponen en perfecto balance el desempeño y confort, gracias a su motor eSkyactiv-G turbo de 6 cilindros en línea, con tecnología Mild Hybrid, convirtiendo a esta SUV de 7 puestos en la más poderosa y elegante de la marca.</p>
              <div className="links">
                <a href="https://www.mazdavardi.com.co/wp-content/uploads/2023/08/ficha-tecnica-mazda-cx-90.pdf" download="" className="btn descargar"><span>FICHA TÉCNICA <i className="fa fa-book"></i></span></a>
              </div>
            </div>
          </div>
          <div className="col-md-6 img-box">
            <img src="https://www.mazdavardi.com.co/wp-content/uploads/2023/08/mazda-cx-90-ficha-tecnica.webp" alt="Mazda CX-90" className="img-parallax" />
          </div>
        </div>

        <div id='descripcion' className="row my-boxes-rev">
          <div className="col-md-6 img-box">
            <img src="https://www.mazdavardi.com.co/wp-content/uploads/2023/08/mazda-cx-90-ficha-tecnica.webp" alt="Mazda CX-90" className="img-parallax" />
          </div>
          <div className="col-md-6 description-box">
            <div className="detalle-box-text">
              <h1>MAZDA CX-90</h1>
              <br />
              <p>LA MAESTRÍA SE CONDUCE</p>
              <p>La nueva Mazda CX-90 es el resultado de la pasión y más alta precisión de la maestría japonesa unidas para esculpir una obra de arte e ingeniería. Su diseño audaz y dinámico ponen en perfecto balance el desempeño y confort, gracias a su motor eSkyactiv-G turbo de 6 cilindros en línea, con tecnología Mild Hybrid, convirtiendo a esta SUV de 7 puestos en la más poderosa y elegante de la marca.</p>
            </div>
          </div>
        </div>
      </div>

      <div id='especficaciones' className="row">
        <div className='col-md-6'>
          <div className='img-box'>
            <img src="../assets/especificaciones.webp" />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='especificaciones'>
            <h2 className='text-center'>MAZDA CX-90 Especificaciones</h2>

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
                      <td>200 HP</td>
                    </tr>
                    <tr>
                      <td>Torque:</td>
                      <td>250 lb-pie</td>
                    </tr>
                    <tr>
                      <td>Velocidad Máxima:</td>
                      <td>250 km/h</td>
                    </tr>
                    <tr>
                      <td>Aceleración 0-100 km/h:</td>
                      <td>6 segundos</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="nav-seguridad" role="tabpanel" aria-labelledby="nav-seguridad-tab">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Airbags:</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td>Frenos Antibloqueo (ABS):</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td>Control de Tracción:</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td>Control de Estabilidad:</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td>Sistemas de Retención Infantil (ISOFIX):</td>
                      <td>Sí</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="nav-equipamiento" role="tabpanel" aria-labelledby="nav-equipamiento-tab">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Sistema de Navegación:</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td>Sistema de Sonido Premium:</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td>Asientos de Cuero:</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td>Techo Solar:</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td>Conectividad Bluetooth:</td>
                      <td>Sí</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Link to={"/cotizador"} className="btn btn-solodev-red-reversed">Simular cotizacion</Link>

          </div>
        </div>
      </div>
    </div>
  )
}
