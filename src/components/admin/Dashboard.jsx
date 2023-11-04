import React, { useEffect, useState } from 'react'
import Sidenav from '../layout/Sidenav'
import { useDispatch, useSelector } from 'react-redux'
import { getVehiculos, getVehiculosError, getVehiculosStatus, selectAllVehiculos } from '../../features/vehiculos/vehiculosSlice'
import { Link } from 'react-router-dom'
import { selectUser } from '../../features/user/userSlice'

const Dashboard = () => {

  const dispatch = useDispatch()
  const vehiculos = useSelector(selectAllVehiculos)
  const status = useSelector(getVehiculosStatus)
  const error = useSelector(getVehiculosError)

  const [nro_vehiculos, setNro_vehiculos] = useState(0)
  const [nro_vehiculos_por_marca, setNro_vehiculos_por_marca] = useState([])

  const user = useSelector(selectUser)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getVehiculos())
    }

    if (status === 'succeeded') {
      setNro_vehiculos(vehiculos.length)
      let marcas = []
      vehiculos.map((vehiculo) => {
        marcas.push(vehiculo.modelo.marca.nombre)
      })
      let marcas_unicas = [...new Set(marcas)]
      let nro_vehiculos_por_marca = []
      marcas_unicas.map((marca) => {
        let nro = 0
        vehiculos.map((vehiculo) => {
          if (vehiculo.modelo.marca.nombre === marca) {
            nro = nro + 1
          }
        })
        nro_vehiculos_por_marca.push({ nombre: marca, nro: nro })
      })

      setNro_vehiculos_por_marca(nro_vehiculos_por_marca)
    }
  }, [status, dispatch])

  let contenido;

  if (status === 'loading') { }
  else if (status === 'succeeded') {
    contenido =
      <div className='row'>
        {nro_vehiculos_por_marca.map((marca) => (
          <div className="col-xl-3 col-sm-6 p-2" key={marca.nombre}>
            <div className="card text-white bg-secondary o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  {marca.nombre}
                  <br /> <b>{marca.nro}</b>
                </div>
              </div>
              {user.roles.some((role) => role.name === 'admin' || role.name === 'moderator') && (
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/vehiculos/marcas"
                >
                  <span className="float-left">Ver Detalles</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              )}
            </div>
          </div>
        ))}

        <div className="col-xl-3 col-sm-6 p-2">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Vehiculos
                <br /> <b>{nro_vehiculos}</b>
              </div>
            </div>
            {user.roles.some((role) => role.name === 'admin' || role.name === 'moderator') && (
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/vehiculos"
              >
                <span className="float-left">Ver Detalles</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
  }
  else if (status === 'failed') { }

  return (
    <Sidenav
      mainContent={
        <div className="content">
          <div className="row ">
            <div className="col-xl-12">
              <div
                className="card shadow bg-body rounded"
                style={{ marginTop: "5rem", marginBottom: "1.5rem" }}
              >
                <div className="d-flex justify-content-between card-body">
                  <h4 className="page-title">Vision general</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded" style={{marginBottom: "1.5rem"}}>
                <div className="card-body">
                  {contenido}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default Dashboard