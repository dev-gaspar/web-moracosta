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

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
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
