import { useDispatch, useSelector } from 'react-redux'
import Sidenav from '../layout/Sidenav'
import { deleteVehiculo, getVehiculos, getVehiculosError, getVehiculosStatus, selectAllVehiculos } from '../../features/vehiculos/vehiculosSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import toast from 'react-hot-toast'

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const OrdenarVehiculos = () => {

  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const dispatch = useDispatch()
  const vehiculos = useSelector(selectAllVehiculos)
  const status = useSelector(getVehiculosStatus)
  const error = useSelector(getVehiculosError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getVehiculos())
    }
  }, [status, dispatch])

  const handleDragEnd = () => { }

  let contenido;

  if (status === 'loading') {
    contenido = <div className="w-100 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  } else if (status === 'succeeded') {

    const setVehiculos = () => {
      const data = {
        columns: [
          {
            label: "Marca",
            field: "marca",
          },
          {
            label: "Modelo",
            field: "modelo",
          },
          {
            label: "Nombre",
            field: "nombre",
          },
          {
            label: "Precio",
            field: "precio",
          },
          {
            label: "Creado",
            field: "creado",
          },
          {
            label: "Acciones",
            field: "acciones",
          },
        ],
        rows: [],
      };

      vehiculos.forEach((vehiculo) => {
        let fecha = new Date(vehiculo.createdAt).toLocaleDateString();

        let precio = f.format(vehiculo.precio);

        data.rows.push({
          marca: vehiculo.modelo.marca.nombre,
          modelo: vehiculo.modelo.nombre,
          nombre: vehiculo.nombre,
          precio: precio,
          creado: fecha,
          acciones: (
            <div className="d-flex justify-content-center">

              <Link
                className="btn btn-sm btn-primary py-1 px-2 me-1"
                to={`/modelos/${vehiculo._id}`}
              >
                <i className="fas fa-eye"></i>
              </Link>
              <Link
                to={`/vehiculos/edit/${vehiculo._id}`}
                className="btn btn-sm btn-warning py-1 px-2 me-1"
              >
                <i className="fas fa-edit"></i>
              </Link>
              <button
                onClick={() => handleDelete(vehiculo._id)}
                className="btn btn-sm btn-danger py-1 px-2 me-1"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ),
        });
      });
      return data;
    };

    contenido = <>
      <MDBDataTable
        responsive
        data={setVehiculos()}
        bordered
        striped
        hover
        displayEntries={false}
        paging={false}
        info={false}
        noBottomColumns={true}
        searchLabel="Buscar"
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={vehiculos} strategy={verticalListSortingStrategy} >

        </SortableContext>
      </DndContext>
    </>
  } else if (status === 'failed') {
    contenido =
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
  }

  const handleDelete = async (id) => {
    const res = await dispatch(deleteVehiculo(id))
    if (res.payload !== undefined) {
      toast.success('Vehiculo eliminado', { icon: '🗑️' })
    }
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
                  <h4 className="page-title">Vehiculos</h4>
                  <Link className='btn btn-sm btn-primary'
                    to={"/vehiculos/nuevo"}
                  >
                    <i className="fas fa-plus"></i> Nuevo
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