import React from 'react'

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
            <source src="../assets/video.webm" type="video/webm" />
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
                <a href="https://www.mazdavardi.com.co/wp-content/uploads/2023/08/ficha-tecnica-mazda-cx-90.pdf" download="" className="btn"><span>FICHA TÉCNICA <i className="lni lni-book"></i></span></a>
              </div>
            </div>
          </div>
          <div className="col-md-6 img-box">
            <img src="https://www.mazdavardi.com.co/wp-content/uploads/2023/08/mazda-cx-90-ficha-tecnica.webp" alt="Mazda CX-90" className="img-parallax" />
          </div>
        </div>

        <div id='descripcion' className="row">
          <div className="col-md-6 img-box">
            <img src="https://www.mazdavardi.com.co/wp-content/uploads/2023/08/mazda-cx-90-ficha-tecnica.webp" alt="Mazda CX-90" className="img-parallax" />
          </div>
          <div className="col-md-6 description-box">
            <div className="detalle-box-text">
              <h1>MAZDA CX-90</h1>
              <br />
              <p>LA MAESTRÍA SE CONDUCE</p>
              <p>La nueva Mazda CX-90 es el resultado de la pasión y más alta precisión de la maestría japonesa unidas para esculpir una obra de arte e ingeniería. Su diseño audaz y dinámico ponen en perfecto balance el desempeño y confort, gracias a su motor eSkyactiv-G turbo de 6 cilindros en línea, con tecnología Mild Hybrid, convirtiendo a esta SUV de 7 puestos en la más poderosa y elegante de la marca.</p>
              <div className="links">
                <a href="https://www.mazdavardi.com.co/wp-content/uploads/2023/08/ficha-tecnica-mazda-cx-90.pdf" download="" className="btn"><span>FICHA TÉCNICA <i className="lni lni-book"></i></span></a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
