import { useDispatch, useSelector } from 'react-redux'
import Sidenav from '../layout/Sidenav'
import { getVehiculos, getVehiculosError, getVehiculosStatus, selectAllVehiculos } from '../../features/vehiculos/vehiculosSlice'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import DragVehiculo from './DragVehiculo'

const OrdenarVehiculos = () => {

  const dispatch = useDispatch()
  const vehiculos = useSelector(selectAllVehiculos)
  const status = useSelector(getVehiculosStatus)
  const error = useSelector(getVehiculosError)

  const [dragVehiculos, setDragVehiculos] = useState([])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getVehiculos())
    }

    if (status === 'succeeded') {
      setDragVehiculos(vehiculos)
    }

  }, [status, dispatch])

  const handleDragEnd = (event) => {
    const { active, over } = event

    setDragVehiculos((vehiculo) => {
      const oldIndex = dragVehiculos.findIndex(vehiculo => vehiculo._id === active.id)
      const newIndex = dragVehiculos.findIndex(vehiculo => vehiculo._id === over.id)

      return arrayMove(vehiculo, oldIndex, newIndex)
    })
  }

  let contenido;

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  } else if (status === 'succeeded') {
    contenido =
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={dragVehiculos} strategy={verticalListSortingStrategy} >
          {dragVehiculos.map((vehiculo) => (
            <DragVehiculo key={vehiculo._id} vehiculo={vehiculo} />
          ))}
        </SortableContext>
      </DndContext>
  } else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
  }

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
                  <h4 className="page-title">Ordenar vehiculos</h4>
                  <Link className='btn btn-sm btn-primary'
                    to={"/vehiculos/nuevo"}
                  >
                    <i className="fas fa-save"></i> Guardar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded" style={{ marginBottom: "1.5rem" }}>
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

export default OrdenarVehiculos