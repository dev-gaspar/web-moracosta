import { Link } from "react-router-dom"
import Banner from "../layout/Banner"
import { useDispatch, useSelector } from "react-redux"
import { getVehiculos, getVehiculosStatus, selectAllVehiculos } from "../../features/vehiculos/vehiculosSlice"
import Select from "react-select"
import { useEffect, useState } from "react"

const Cotizador = () => {

  const dispatch = useDispatch()

  const vehiculos = useSelector(selectAllVehiculos)
  const statusVehiculos = useSelector(getVehiculosStatus)

  useEffect(() => {
    if (statusVehiculos === 'idle') {
      dispatch(getVehiculos())
    }
  }, [statusVehiculos, dispatch])

  const [vehiculo, setVehiculo] = useState({
    modelo: {
      marca: {
        nombre: ''
      },
      nombre: ''
    },
    imagen_principal: {
      url: '../assets/auto.jpg'
    },
    nombre: 'Selecciona un vehículo',
    precio: 0
  })
  const [cuotas, setCuotas] = useState(12)
  const [entrada_minima, setEntrada_minima] = useState(20)

  const [valor_entrada, setValor_entrada] = useState(0)
  const [total, setTotal] = useState(0)
  const [monto_financiado, setMonto_financiado] = useState(0)
  const [valor_cuota, setValor_cuota] = useState(0)

  useEffect(() => {
    let entrada_double = parseFloat(entrada_minima)
    let cuotas_int = parseInt(cuotas)
    let valor_entrada = vehiculo?.precio * (entrada_double / 100)
    let total = vehiculo?.precio + valor_entrada
    let monto_financiado = vehiculo?.precio - valor_entrada
    let valor_cuota = monto_financiado / cuotas_int

    setValor_entrada(valor_entrada)
    setTotal(total)
    setMonto_financiado(monto_financiado)
    setValor_cuota(valor_cuota)
  }, [vehiculo, cuotas, entrada_minima])

  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <>
      <div className="top-fixed" />
      <Banner text={"COTIZADOR ONLINE"} />
      <div className="container my-5">
        <div className="row simulacion">
          <div className="col-md-6">
            <h2>Simular Cotización</h2>
            <form>
              <div className="form-group">
                <label htmlFor="modelo">Modelo de interes</label>
                <Select
                  aria-label='modelo'
                  placeholder='Seleccionar'
                  options={vehiculos.map((vehiculo) => ({
                    value: vehiculo,
                    label: `${vehiculo.modelo.marca.nombre} ${vehiculo.modelo.nombre} ${vehiculo.nombre}`
                  }))
                  }
                  isLoading={statusVehiculos === 'loading'}
                  onChange={(e) => setVehiculo(e.value)}
                  menuPosition='fixed'
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cuotas">Cantidad de Cuotas</label>
                <select className="form-control" id="cuotas" name="cuotas"
                  onChange={(e) => setCuotas(e.target.value)}
                >
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
                <select className="form-control" id="entrada" name="entrada"
                  onChange={(e) => setEntrada_minima(e.target.value)}
                >
                  <option value="20">20%</option>
                  <option value="30">30%</option>
                  <option value="40">40%</option>
                  <option value="50">50%</option>
                  <option value="75">75%</option>
                </select>
              </div>

              {/*
              <div className="form-group">
                <label>Dispositivo de Rastreo</label>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rastreo" />
                  <label className="form-check-label" htmlFor="rastreo">Incluir dispositivo de rastreo</label>
                </div>
              </div>
              */}
            </form>
          </div>

          <div className="col-md-6">
            <h2>Detalles de Cotización</h2>
            <div className="cotizacion-detalle">
              {vehiculo.precio === 0 && <div className="capa-negra" />}
              <div className="row fact-top">
                <h3 className="text-uppercase" >
                  {vehiculo.modelo.marca.nombre} {vehiculo.modelo.nombre} {vehiculo.nombre} {f.format(vehiculo.precio)}
                </h3>
                <div className="col-6">
                  <img src={vehiculo?.imagen_principal.url} alt="Imagen del vehículo" className="img-fluid mb-3" />
                </div>
                <div className="col-6">
                  <p><strong>Total:</strong> {f.format(total)}</p>
                  <p><strong>Financiados:</strong> {f.format(monto_financiado)}</p>
                  <p><strong>Cuotas de:</strong> {f.format(valor_cuota)}</p>
                  {/*
                  <p><strong>Seguro:</strong> $1,000</p>
                  */}
                </div>
              </div>
              <div className="row fact-bottom">
                <div className="col-6">
                  <p><strong>Nro de cuotas:</strong> {cuotas}</p>
                </div>
                <div className="col-6">
                  <p><strong>Entrada:</strong> {f.format(valor_entrada)} {" ("}{entrada_minima}{"%)"}</p>
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