import { Link } from "react-router-dom"

const Modelos = () => {
  return (
    <div>
      <div className="top-fixed" />
      <div className="section_banner">
        <div className="container">
          <h1 className="text-center text-uppercase text-white">
            MODELOS EN MORACOSTA
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 vehicles">
            <Link className="box-items" to={"/modelos/6546"}>
              <img src="../assets/carro4.webp" alt="Carro" />
              <div className="text">
                <h3>MAZDA CX-90</h3>
                <p>La maestría se conduce</p>
              </div>
              <div>
                <span className="btn-custom">VER MÁS <i className="fa fa-chevron-right"></i></span>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-4 col-lg-4 vehicles">
            <Link className="box-items">
              <img src="../assets/carro4.webp" alt="Carro" />
              <div className="text">
                <h3>MAZDA CX-90</h3>
                <p>La maestría se conduce</p>
              </div>
              <div>
                <span className="btn-custom">VER MÁS <i className="fa fa-chevron-right"></i></span>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-4 col-lg-4 vehicles">
            <Link className="box-items">
              <img src="../assets/carro4.webp" alt="Carro" />
              <div className="text">
                <h3>MAZDA CX-90</h3>
                <p>La maestría se conduce</p>
              </div>
              <div>
                <span className="btn-custom">VER MÁS <i className="fa fa-chevron-right"></i></span>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-4 col-lg-4 vehicles">
            <Link className="box-items">
              <img src="../assets/carro4.webp" alt="Carro" />
              <div className="text">
                <h3>MAZDA CX-90</h3>
                <p>La maestría se conduce</p>
              </div>
              <div>
                <span className="btn-custom">VER MÁS <i className="fa fa-chevron-right"></i></span>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-4 col-lg-4 vehicles">
            <Link className="box-items">
              <img src="../assets/carro4.webp" alt="Carro" />
              <div className="text">
                <h3>MAZDA CX-90</h3>
                <p>La maestría se conduce</p>
              </div>
              <div>
                <span className="btn-custom">VER MÁS <i className="fa fa-chevron-right"></i></span>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-4 col-lg-4 vehicles">
            <Link className="box-items">
              <img src="../assets/carro4.webp" alt="Carro" />
              <div className="text">
                <h3>MAZDA CX-90</h3>
                <p>La maestría se conduce</p>
              </div>
              <div>
                <span className="btn-custom">VER MÁS <i className="fa fa-chevron-right"></i></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modelos