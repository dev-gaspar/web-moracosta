import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast"
import Select from "react-select"
import { getContactosError, getContactosStatus, newContacto } from '../../features/contactos/contactosSlice';
import { getVehiculos, getVehiculosError, getVehiculosStatus, selectAllVehiculos } from '../../features/vehiculos/vehiculosSlice';
import { useEffect } from 'react';

const Contacto = () => {

  const dispatch = useDispatch()

  const vehiculos = useSelector(selectAllVehiculos)
  const statusVehiculos = useSelector(getVehiculosStatus)
  const errorVehiculos = useSelector(getVehiculosError)

  const statusContacto = useSelector(getContactosStatus)
  const errorContacto = useSelector(getContactosError)

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
    check: {
      whatsapp: false,
      llamada: false,
    },
  });

  const handleChange = (e) => {
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
    if (statusContacto !== "succeeded") {
      dispatch(newContacto(formData))
      toast.success("Enviado, pronto nos pondremos en contacto contigo!", {
        icon: "📞",
      })
    } else {
      toast.success("Ya se ha enviado la información de contacto", {
        icon: "📨",
      })
    }

    if (statusContacto === 'succeeded') {
      setFormData({
        modelo: '',
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        numeroDocumento: '',
        correo: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        check: {
          whatsapp: false,
          llamada: false,
        },
      });
    }

  };
  return (
    <>
      <div className="top-fixed" />
      <div className='page-general'>
        <div className="contacto container">
          <div className="row">
            <div className="col-12 col-md-7 col-lg-5">
              <h3>CONTACTO</h3>
              <h1 className="text-uppercase text-white" >Solicitar contacto en moracosta</h1>
              <div className="box-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="modelo">Modelo de interés *</label>
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
                  <div className="form-row">
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="tipoDocumento">Tipo de Documento *</label>
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
                    <label htmlFor="numeroDocumento">Número de Documento *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={handleChange}
                      required
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
                    <label htmlFor="direccion">Direccion *</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
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
                      <option value="portoviejo">Portoviejo</option>
                      <option value="manta">Manta</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>¿CUÁL ES TU MEDIO DE CONTACTO DE PREFERENCIA?</label>
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
                          WHATSAPP
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
                          LLAMADA
                        </label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="button-submit" disabled={statusContacto === "loading"} >
                    {statusContacto === "loading" ? "Enviando..." : "Enviar"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contacto