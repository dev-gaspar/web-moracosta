import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast"
import Select from "react-select"
import { getContactosError, getContactosStatus, newContacto, resetContactos } from '../../features/contactos/contactosSlice';
import { getVehiculos, getVehiculosStatus, selectAllVehiculos } from '../../features/vehiculos/vehiculosSlice';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const agencias = {
  manta: [
    "Agencia 1 - Av. 1era entre calles 14 y 15.",
    "Agencia 2 - Av. 4 de noviembre, diagonal a Solca.",
    "Agencia 3 - Ciudadela Universitaria"
  ],
  portoviejo: [
    "Agencia 1 - Av. Universitaria y calle Edulfo Cedeño, esquina.",
    "Agencia 2 - Paso lateral frente al Hemiciclo de las Banderas."
  ],
  esmeraldas: [
    "Agencia - Av Pedro Vicente Maldonado"
  ]
}

const CotizadorForm = () => {

  const [isRender, setIsRender] = useState(false)

  const dispatch = useDispatch()

  const vehiculos = useSelector(selectAllVehiculos)
  const statusVehiculos = useSelector(getVehiculosStatus)

  const statusContacto = useSelector(getContactosStatus)
  const errorContacto = useSelector(getContactosError)

  useEffect(() => {
    statusContacto === 'succeeded' && dispatch(resetContactos())
    setIsRender(true)
  }, [])


  useEffect(() => {
    if (!isRender) return
    if (statusContacto === 'succeeded') {
      toast.success("Enviado, pronto nos pondremos en contacto contigo!", {
        icon: "📞",
      })
    }

    if (statusContacto === 'failed') {
      toast.error("Ocurrió un error, por favor intenta de nuevo", {
        icon: "🚨",
      })
    }

  }, [statusContacto, isRender])

  useEffect(() => {
    if (statusVehiculos === 'idle') {
      dispatch(getVehiculos())
    }
  }, [statusVehiculos, dispatch])

  const [formData, setFormData] = useState({
    modelo: '',
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    agencia: '',
    check: {
      whatsapp: false,
      llamada: false,
    },
  });

  const [vehiculo, setVehiculo] = useState({
    modelo: {
      marca: {
        nombre: ''
      },
      nombre: ''
    },
    imagen_principal: {
      url: '/assets/auto.png'
    },
    nombre: 'Selecciona un vehículo',
    precio: 0
  })

  useEffect(() => {
    if (formData.modelo !== "") {
      const vehiculo = vehiculos.find((vehiculo) => vehiculo._id === formData.modelo)
      setVehiculo(vehiculo)
    }
  }, [formData])

  const handleChange = (e) => {

    if (e.target.name === "numeroDocumento") {
      if (formData.tipoDocumento === "cedula") {
        if (e.target.value.length > 10) {
          return
        }
      }
      if (formData.tipoDocumento === "ruc") {
        if (e.target.value.length > 13) {
          return
        }
      }
    }

    if (e.target.name === "telefono") {
      if (e.target.value.length > 10) {
        return
      }
    }

    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        check: {
          ...formData.check,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.modelo === '') {
      toast.error("Por favor selecciona el modelo en el que estas interesado", {
        icon: "🚨",
      })
      return
    }

    if (formData.numeroDocumento.length < 10 && formData.tipoDocumento === "cedula") {
      toast.error("El número de cédula debe tener 10 dígitos", {
        icon: "🚨",
      })
      return
    }

    if (formData.numeroDocumento.length < 13 && formData.tipoDocumento === "ruc") {
      toast.error("El número de RUC debe tener 13 dígitos", {
        icon: "🚨",
      })
      return
    }

    if (formData.telefono.length < 10) {
      toast.error("El número de teléfono debe tener 10 dígitos", {
        icon: "🚨",
      })
      return
    }

    if (statusContacto !== "succeeded" && statusContacto === "idle") {
      dispatch(newContacto(formData))
    }
  };

  return (
    <>
      <div className="top-fixed" />
      <div className='page-general'>
        <div className="contacto container">
          <div className="row">
            <div className="col-12 col-md-5 col-lg-7">
              <h3>Cotizador</h3>
              <h1 className="text-uppercase text-white" >Modelo</h1>
              <div className="box-form" style={{
                marginBottom: "0",
              }}>
                <form>
                  <div className="form-group">
                    <label htmlFor="modelo">Modelo de vehículo *</label>
                    <Select
                      aria-label='modelo'
                      placeholder='Seleccionar'
                      options={vehiculos.map((vehiculo) => ({
                        value: vehiculo._id,
                        label: vehiculo.nombre
                      }))
                      }
                      isLoading={statusVehiculos === 'loading'}
                      onChange={(e) => setFormData({ ...formData, modelo: e.value })}
                      menuPosition='fixed'
                      styles={{
                        control: (styles) => ({
                          ...styles,
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          border: 'none',
                          borderRadius: '0',
                          boxShadow: 'none',
                        }),
                      }}
                      required
                    />
                  </div>
                </form>
                <img
                  src={vehiculo.imagen_principal.url}
                  key={vehiculo.nombre}
                  alt={vehiculo.nombre}
                  className='w-100 img-fluid'
                  style={{ height: '200px', objectFit: 'contain' }}
                />
              </div>
            </div >
            <div className="col-12 col-md-7 col-lg-5">
              <h3 style={{ visibility: "hidden" }} >Datos</h3>
              <h1 className="text-uppercase text-white" >Datos personales</h1>
              <div className="box-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellido">Apellido *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="tipoDocumento">Tipo de documento *</label>
                    <select
                      className="form-control"
                      id="tipoDocumento"
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un tipo de documento *</option>
                      <option value="cedula">Cédula</option>
                      <option value="ruc">RUC</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="numeroDocumento">Número de documento *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={handleChange}
                      required
                      disabled={formData.tipoDocumento === ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="correo">Correo electrónico *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono de contacto *</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ciudad">Ciudad *</label>
                    <select
                      className="form-control"
                      id="ciudad"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona una ciudad</option>
                      <option value="manta">Manta</option>
                      <option value="portoviejo">Portoviejo</option>
                      <option value="esmeraldas">Esmeraldas</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="direccion">Direccion *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="agencia">Agencia de su preferencia  *</label>
                    <select
                      className="form-control"
                      id="agencia"
                      name="agencia"
                      value={formData.agencia}
                      onChange={handleChange}
                      required
                    >
                      {formData.ciudad === "" && <option value="">Selecciona una ciudad</option>}
                      {formData.ciudad !== "" && agencias[formData.ciudad].map((agencia, index) => (
                        <option key={index} value={agencia}>{agencia}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>¿Cuál es tu medio de contacto de preferencia? </label>
                    <div className='form-row'>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="whatsapp"
                          name="whatsapp"
                          checked={formData.check.whatsapp}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="whatsapp">
                          Whatsapp
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="llamada"
                          name="llamada"
                          checked={formData.check.llamada}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="llamada">
                          Llamada
                        </label>
                      </div>
                    </div>
                  </div>
                  {statusContacto === "failed" && (
                    <div className="alert alert-danger" role="alert">
                      {errorContacto}
                    </div>
                  )}
                  <div className='d-flex justify-content-center' >
                    <button type="submit" className="btn btn-solodev-red-reversed" style={{ margin: "0 0 1rem 0" }} disabled={statusContacto === "loading"} >
                      {statusContacto === "loading" ? "Solicitando..." : " Solicitar Cotización "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div >
        </div >
      </div >
    </>
  )
}

export default CotizadorForm