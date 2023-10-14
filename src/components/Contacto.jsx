import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    modelo: '',
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    correo: '',
    telefono: '',
    ciudad: '',
    mediosContacto: {
      whatsapp: false,
      llamada: false,
    },
    aceptoTerminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        mediosContacto: {
          ...formData.mediosContacto,
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
    // Handle form submission here, e.g., send the data to a server
    console.log(formData);
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
                    <label htmlFor="modelo">Modelo de interés</label>
                    <select
                      className="form-control"
                      id="modelo"
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un modelo</option>
                      {/* Add model options here */}
                    </select>
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
                    <label htmlFor="tipoDocumento">Tipo de Documento</label>
                    <select
                      className="form-control"
                      id="tipoDocumento"
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un tipo de documento</option>
                      {/* Add document type options here */}
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
                    <label htmlFor="ciudad">Ciudad</label>
                    <select
                      className="form-control"
                      id="ciudad"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona una ciudad</option>
                      {/* Add city options here */}
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
                          checked={formData.mediosContacto.whatsapp}
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
                          checked={formData.mediosContacto.llamada}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="llamada">
                          LLAMADA
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="aceptoTerminos"
                      name="aceptoTerminos"
                      checked={formData.aceptoTerminos}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="aceptoTerminos">
                      ACEPTO LOS TÉRMINOS Y CONDICIONES
                    </label>
                  </div>
                  <button type="submit" className="button-submit">
                    CONTACTARME
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