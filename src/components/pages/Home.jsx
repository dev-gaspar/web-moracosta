import Header from './Header'
import Presentacion from './Presentacion'
import Destacados from './Destacados'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getVehiculos, getVehiculosStatus } from '../../features/vehiculos/vehiculosSlice'

const Home = () => {

  const dispatch = useDispatch()
  const status = useSelector(getVehiculosStatus)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getVehiculos())
    }
  }, [status, dispatch])

  return (
    <>
      <Header />
      <Presentacion />
      <Destacados />
    </>
  )
}

export default Home