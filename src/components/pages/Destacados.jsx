import { Link } from "react-router-dom"

const Destacados = () => {
  return (
    <div className="destacados p-5 mt-3">
      <div className="container text-center">
        <h1 className="text-bold" >CARROS Y CAMIONETAS NUEVOS</h1>
        <h2>Vehículos destacados</h2>
        <br />
        <div className="row">
          <div className="col-12 col-lg-4">
            <div className="box-car">
              <img src="../assets/carro1.webp" />
              <h2>Mazda MX-30 EV</h2>
              <div className="box-text">
                <p>
                  Conduce el cambio
                </p>
                <Link className="cta">CONÓCELO</Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="box-car">
              <img src="../assets/carro2.webp" />
              <h2>Mazda CX-50</h2>
              <div className="box-text">
                <p>
                  Tan emo­cion­ante como su­perar un nuevo cam­ino
                </p>
                <Link className="cta">CONÓCELO</Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="box-car">
              <img src="../assets/carro3.webp" />
              <h2>Mazda 2 Sedán</h2>
              <div className="box-text">
                <p>
                  El nuevo carro Mazda 2 Sedán llegó para sorprenderte ¡Conoce todas sus características y accesorios aquí!
                </p>
                <Link className="cta">CONÓCELO</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Destacados