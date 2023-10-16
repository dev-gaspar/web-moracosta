import { Link } from "react-router-dom"

const Cotizador = () => {
  return (
    <>
      <div className="top-fixed" />
      <div className="section_banner">
        <div className="container">
          <h1 className="text-center text-uppercase text-white">
            COTIZADOR ONLINE
          </h1>
        </div>
      </div>
      <div className="container my-5">
        <div className="row simulacion">
          <div className="col-md-6">
            <h2>Simular Cotización</h2>
            <form>
              <div className="form-group">
                <label htmlFor="modelo">Modelo de interes</label>
                <select className="form-control" id="modelo" name="modelo">
                  <option value="sedan">MAZDA CX-90</option>
                  <option value="deportivo">Deportivo</option>
                  <option value="SUV">SUV</option>
                  <option value="camioneta">Camioneta</option>
                  <option value="hatchback">Hatchback</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cuotas">Cantidad de Cuotas</label>
                <select className="form-control" id="cuotas" name="cuotas">
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                  <option value="60">60</option>
                  <option value="72">72</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="entrada">Entrada Mínima (igual o superior al 20% del vehículo)</label>
                <select className="form-control" id="entrada" name="entrada">
                  <option value="20">20%</option>
                  <option value="30">30%</option>
                  <option value="40">40%</option>
                  <option value="50">50%</option>
                  <option value="75">75%</option>
                </select>
              </div>

              <div className="form-group">
                <label>Dispositivo de Rastreo</label>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rastreo" />
                  <label className="form-check-label" htmlFor="rastreo">Incluir dispositivo de rastreo</label>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <h2>Detalles de Cotización</h2>
            <div className="cotizacion-detalle">
              <div className="row fact-top">
                <h3>MODELO MAZDA CX-90 $18,590,00</h3>
                <div className="col-6">
                  <img src="../assets/carro4.webp" alt="Imagen del vehículo" className="img-fluid mb-3" />
                </div>
                <div className="col-6">
                  <p><strong>Total:</strong> $25,000</p>
                  <p><strong>Cuotas de:</strong> $5,000</p>
                  <p><strong>Seguro:</strong> $1,000</p>
                </div>
              </div>
              <div className="row fact-bottom">
                <div className="col-6">
                  <p><strong>Nro de cuotas:</strong> 36</p>
                </div>
                <div className="col-6">
                  <p><strong>Entrada:</strong> $5,000</p>
                </div>
                <p>
                  Los valores indicados pueden cambiar al momento de la cotización formal emitida por las entidades financieras.
                </p>
              </div>
            </div>
            <Link type="submit" to={"/contacto"} className="btn btn-solodev-red-reversed" >Contactenos</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cotizador