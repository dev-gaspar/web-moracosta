import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DetalleComponents from './DetalleComponents'
import { getVehiculoById, getVehiculoError, getVehiculoStatus, selectVehiculo } from '../../features/vehiculos/vehiculoSlice'

export const DetalleModelo = () => {

  const vehiculoId = useParams().id;

  const dispatch = useDispatch()
  const vehiculo = useSelector(selectVehiculo)
  const status = useSelector(getVehiculoStatus)
  const error = useSelector(getVehiculoError)

  useEffect(() => {
    dispatch(getVehiculoById(vehiculoId))
  }, [dispatch, vehiculoId])

  let contenido;

  if (status === 'loading' || status === 'idle') {
    contenido = <div className="vh-100 w-100 d-flex justify-content-center align-items-center" style={{
      background: "#231f20"
    }}>
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  } else if (status === 'succeeded') {
    contenido = <DetalleComponents vehiculo={vehiculo} />
  } else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
  }

  return (
    <div>
      <div className="top-fixed" />
      {contenido}
    </div>
  )
}
