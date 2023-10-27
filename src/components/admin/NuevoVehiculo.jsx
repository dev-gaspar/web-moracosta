import React, { useEffect } from 'react'
import Sidenav from '../layout/Sidenav'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { getModelos, getModelosError, getModelosStatus, selectAllModelos } from '../../features/vehiculos/modelosSlice'
import { Link } from 'react-router-dom'

const NuevoVehiculo = () => {

  const dispatch = useDispatch()
  const modelos = useSelector(selectAllModelos)
  const status = useSelector(getModelosStatus)
  const error = useSelector(getModelosError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getModelos())
    }
  }, [status, dispatch])

  const CustomMenu = ({ innerRef, innerProps, isDisabled, children }) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps}>
        {children}
        <Link
          className="btn btn-primary btn-sm w-100"
          style={{ zIndex: 1000 }}
          to={"/vehiculos/modelos"}
        >
          <i className="fa fa-plus" />
          {" "}
          Nuevo modelo
        </Link>
      </div>
    ) : null;

  return (
    <Sidenav
      mainContent={
        <div className="content">
          <div className="row ">
            <div className="col-xl-12">
              <div
                className="card"
                style={{ marginTop: "5rem", marginBottom: "1.5rem" }}
              >
                <div className="d-flex justify-content-between card-body">
                  <h4 className="page-title">Nuevo vehiculo</h4>
                  <button className="btn btn-sm btn-primary">
                    <i className="fa fa-download" />
                    {" "}Instructivo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  {status === "failed" &&
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  }

                  <div className='row'>
                    <div className='col-md-4'>
                      <label htmlFor="modelo" className="form-label">Modelo</label>
                      <Select
                        aria-label='modelo'
                        placeholder='Seleccionar'
                        options={modelos.map((modelo) => ({
                          value: modelo._id,
                          label: modelo.nombre
                        }))
                        }
                        isLoading={status === 'loading'}
                        components={{ Menu: CustomMenu }}
                        onChange={(e) => console.log(e)}
                        menuPosition='fixed'
                      />
                    </div>
                    <div className='col-md-8'>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default NuevoVehiculo