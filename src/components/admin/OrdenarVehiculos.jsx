import { useDispatch, useSelector } from 'react-redux'
import Sidenav from '../layout/Sidenav'
import { getVehiculos, getVehiculosError, getVehiculosStatus, selectAllVehiculos } from '../../features/vehiculos/vehiculosSlice'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import useMobileDetection from '../../hooks/useMobileDetection'
import CodeErrorPage from '../layout/CodeErrorPage'
import DragVehiculo from './DragVehiculo'

const OrdenarVehiculos = () => {
  const { isMobile } = useMobileDetection();

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
      const dragV = vehiculos.map((vehiculo, index) => {
        return {
          ...vehiculo,
          id: vehiculo._id,
        }
      })
      setDragVehiculos(dragV)
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

  const resetVehiculos = () => {
    const dragV = vehiculos.map((vehiculo, index) => {
      return {
        ...vehiculo,
        id: vehiculo._id,
      }
    })
    setDragVehiculos(dragV)
    toast.success('Orden de vehículos reseteado exitosamente');
  }

  const handleSaveDragVehiculos = () => {

    const vehiculosModificados = dragVehiculos.filter(
      (vehiculo, index) => vehiculo.orden !== index + 1 || !vehiculo.orden
    );

    if (vehiculosModificados.length > 0) {

      const dragV = dragVehiculos.map((vehiculo, index) => {
        return {
          _id: vehiculo._id,
          nombre: vehiculo.nombre,
          orden: index + 1
        }
      })

      const updateData = dragV.filter((vehiculo) => {
        return vehiculosModificados.some((vehiculoModificado) => {
          return vehiculoModificado._id === vehiculo._id
        })
      })

      console.log(updateData)

      toast.success('Orden de vehículos guardado exitosamente');
    } else {
      toast.success('Se ha mantenido el mismo orden de los vehículos');
    }
  };

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
                  {!isMobile && (
                    <div>
                      <button className='btn btn-sm btn-warning mx-2' onClick={resetVehiculos}>
                        <i className="fas fa-sync"></i> Resetear
                      </button>
                      <button className='btn btn-sm btn-primary' onClick={handleSaveDragVehiculos} >
                        <i className="fas fa-save"></i> Guardar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded" style={{ marginBottom: "1.5rem" }}>
                <div className="card-body">
                  {!isMobile ? contenido
                    : (
                      <CodeErrorPage code="401" title="No puedes acceder a esta funcionalidad desde telefono" />
                    )}
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