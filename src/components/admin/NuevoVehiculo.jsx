import React, { useEffect, useRef, useState } from 'react'
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

  // choser imagen principal
  const [imagenPrincipal, setImagenPrincipal] = useState(null);

  const handleImagenPrincipalChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagenPrincipal(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //choser video banner
  const [videoBanner, setVideoBanner] = useState(null);
  const videoBannerRef = useRef(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoBanner(URL.createObjectURL(file));
      videoBannerRef.current.load();
    }
  };

  // choser imagen1
  const [imagen1, setImagen1] = useState(null);

  const handleImagen1Change = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagen1(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // choser imagen2
  const [imagen2, setImagen2] = useState(null);

  const handleImagen2Change = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagen2(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // choser imagen2
  const [imagenEspe, setImagenEspe] = useState(null);

  const handleImagenEspeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagenEspe(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
                  <h4 className="page-title">Nuevo vehiculo</h4>
                  <a className="btn btn-sm btn-primary"
                    href="../assets/instructivo-registro-vehiculos.pdf"
                    target="_blank"
                    rel="noreferrer"
                    download={true}
                  >
                    <i className="fa fa-download" />
                    {" "}Instructivo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded">
                <div className="card-body">
                  {status === "failed" &&
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  }


                  <form className='row'>
                    <div className='col-md-4'>
                      <h5>Selecciona modelo</h5>
                      <label htmlFor="modelo" className="form-label">Modelo</label>
                      <Select
                        aria-label='modelo'
                        placeholder='Seleccionar'
                        options={modelos.map((modelo) => ({
                          value: modelo._id,
                          label: `${modelo.marca.nombre} - ${modelo.nombre}`
                        }))
                        }
                        isLoading={status === 'loading'}
                        components={{ Menu: CustomMenu }}
                        onChange={(e) => console.log(e)}
                        menuPosition='fixed'
                        required
                      />
                    </div>
                    <div className='col-md-8'>
                      <h5>Informacion principal</h5>
                      <div className="mb-3">
                        <label htmlFor="imagen_principal">Imagen Principal</label>
                        <input
                          type="file"
                          className="form-control"
                          id="imagen_principal"
                          name="imagen_principal"
                          onChange={handleImagenPrincipalChange}
                        />
                      </div>

                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "100px" }}>
                        {imagenPrincipal ? (
                          <img src={imagenPrincipal} alt="Vista Previa" className='img-fluid' />
                        ) :
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <i className="text-secondary fa fa-image fa-2x mb-0" />
                            <p className="text-secondary mb-0">Vista previa</p>
                            <p className='text-secondary mb-0' >Tamaño maximo 10MB</p>
                          </div>
                        }
                      </div>

                      <div className="mb-3">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea className="form-control" id="descripcion" name="descripcion" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="precio">Precio</label>
                        <input type="number" className="form-control" id="precio" name="precio" value="0" />
                      </div>

                      <h5>Banner</h5>

                      <div className="mb-3">
                        <label htmlFor="videoBanner">Video Banner</label>
                        <input
                          type="file"
                          className="form-control"
                          id="videoBanner"
                          name="videoBanner"
                          onChange={handleVideoChange}
                        />
                      </div>
                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "100px" }}>
                        {videoBanner ? (
                          <video
                            src={videoBanner}
                            controls
                            ref={videoBannerRef}
                            className='img-fluid'
                          />
                        ) :
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <i className="text-secondary fa fa-video fa-2x mb-0" />
                            <p className="text-secondary mb-0">Vista previa</p>
                            <p className='text-secondary mb-0' >Tamaño maximo 100MB</p>
                          </div>
                        }
                      </div>

                      <div className="mb-3">
                        <label htmlFor="aspecto1">Aspecto 1</label>
                        <input type="text" className="form-control" id="aspecto1" name="aspecto1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="aspecto2">Aspecto 2</label>
                        <input type="text" className="form-control" id="aspecto2" name="aspecto2" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="aspecto3">Aspecto 3</label>
                        <input type="text" className="form-control" id="aspecto3" name="aspecto3" />
                      </div>

                      <h5>Detalles</h5>

                      <div className="mb-3">
                        <label htmlFor="urlFichaTecnica">URL Ficha Técnica</label>
                        <input type="text" className="form-control" id="urlFichaTecnica" name="urlFichaTecnica" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="titulo1">Título 1</label>
                        <input type="text" className="form-control" id="titulo1" name="titulo1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="texto1">Texto 1</label>
                        <textarea className="form-control" id="texto1" name="texto1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="imagen1">Imagen 1</label>
                        <input
                          type="file"
                          className="form-control"
                          id="imagen1"
                          name="imagen1"
                          onChange={handleImagen1Change}
                        />
                      </div>

                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "100px" }}>
                        {imagen1 ? (
                          <img src={imagen1} alt="Vista Previa" className='img-fluid' />
                        ) :
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <i className="text-secondary fa fa-image fa-2x mb-0" />
                            <p className="text-secondary mb-0">Vista previa</p>
                            <p className='text-secondary mb-0' >Tamaño maximo 10MB</p>
                          </div>
                        }
                      </div>

                      <div className="mb-3">
                        <label htmlFor="titulo2">Título 2</label>
                        <input type="text" className="form-control" id="titulo2" name="titulo2" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="texto2">Texto 2</label>
                        <textarea className="form-control" id="texto2" name="texto2" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="imagen1">Imagen 2</label>
                        <input
                          type="file"
                          className="form-control"
                          id="imagen2"
                          name="imagen2"
                          onChange={handleImagen2Change}
                        />
                      </div>

                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "100px" }}>
                        {imagen2 ? (
                          <img src={imagen2} alt="Vista Previa" className='img-fluid' />
                        ) :
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <i className="text-secondary fa fa-image fa-2x mb-0" />
                            <p className="text-secondary mb-0">Vista previa</p>
                            <p className='text-secondary mb-0' >Tamaño maximo 10MB</p>
                          </div>
                        }
                      </div>

                      <h5>Especificaciones</h5>
                      <div className="mb-3">
                        <label htmlFor="imagen_principal">Imagen Especificaciones</label>
                        <input
                          type="file"
                          className="form-control"
                          id="imagen_principal"
                          name="imagen_principal"
                          onChange={handleImagenEspeChange}
                        />
                      </div>

                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "100px" }}>
                        {imagenEspe ? (
                          <img src={imagenEspe} alt="Vista Previa" className='img-fluid' />
                        ) :
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <i className="text-secondary fa fa-image fa-2x mb-0" />
                            <p className="text-secondary mb-0">Vista previa</p>
                            <p className='text-secondary mb-0' >Tamaño maximo 10MB</p>
                          </div>
                        }
                      </div>

                      <div className="mb-3">
                        <h5> - Potencia</h5>
                        <div className="mb-3">
                          <label htmlFor="potencia_motor">Potencia del Motor</label>
                          <input type="text" className="form-control" id="potencia_motor" name="potencia.potencia_motor" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="torque">Torque</label>
                          <input type="text" className="form-control" id="torque" name="potencia.torque" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="velocidad_maxima">Velocidad Máxima</label>
                          <input type="text" className="form-control" id="velocidad_maxima" name="potencia.velocidad_maxima" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="aceleracion_0_100">Aceleración 0-100 km/h</label>
                          <input type="text" className="form-control" id="aceleracion_0_100" name="potencia.aceleracion_0_100" />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Seguridad</h5>
                        <div className="mb-3">
                          <label htmlFor="airbags">Airbags</label>
                          <input type="number" className="form-control" id="airbags" name="seguridad.Airbags" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="frenos_antibloqueo">Frenos Antibloqueo (ABC)</label>
                          <input type="text" className="form-control" id="frenos_antibloqueo" name="seguridad.Frenos_Antibloqueo_ABC" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="control_traccion">Control de Tracción</label>
                          <input type="text" className="form-control" id="control_traccion" name="seguridad.Control_traccion" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="control_estabilidad">Control de Estabilidad</label>
                          <input type="text" className="form-control" id="control_estabilidad" name="seguridad.Control_estabilidad" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="sistema_retencion_infantil">Sistema de Retención Infantil</label>
                          <input type="text" className="form-control" id="sistema_retencion_infantil" name="seguridad.Sistema_retencion_infantil" />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Equipamiento</h5>
                        <div className="mb-3">
                          <label htmlFor="sistema_navegacion">Sistema de Navegación</label>
                          <input type="text" className="form-control" id="sistema_navegacion" name="equipamiento.Sistema_navegacion" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="sistema_sonido_premium">Sistema de Sonido Premium</label>
                          <input type="text" className="form-control" id="sistema_sonido_premium" name="equipamiento.Sistema_sonido_premium" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="asiento_cuero">Asiento de Cuero</label>
                          <input type="text" className="form-control" id="asiento_cuero" name="equipamiento.Asiento_cuero" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="techo_solar">Techo Solar</label>
                          <input type="text" className="form-control" id="techo_solar" name="equipamiento.Techo_solar" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="conectividad_bluetooth">Conectividad Bluetooth</label>
                          <input type="text" className="form-control" id="conectividad_bluetooth" name="equipamiento.Conectividad_bluetooth" />
                        </div>
                      </div>

                      <h5>Caracteristicas banner principal</h5>

                      <div className="mb-3">
                        <h5> - Característica 1</h5>
                        <div className="mb-3">
                          <label htmlFor="tituloOne">Título</label>
                          <input type="text" className="form-control" id="tituloOne" name="caracteristicas.one.titulo" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="subtituloOne">Subtítulo</label>
                          <input type="text" className="form-control" id="subtituloOne" name="caracteristicas.one.subtitulo" />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Característica 2</h5>
                        <div className="mb-3">
                          <label htmlFor="tituloTwo">Título</label>
                          <input type="text" className="form-control" id="tituloTwo" name="caracteristicas.two.titulo" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="subtituloTwo">Subtítulo</label>
                          <input type="text" className="form-control" id="subtituloTwo" name="caracteristicas.two.subtitulo" />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Característica 3</h5>
                        <div className="mb-3">
                          <label htmlFor="tituloThree">Título</label>
                          <input type="text" className="form-control" id="tituloThree" name="caracteristicas.tree.titulo" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="subtituloThree">Subtítulo</label>
                          <input type="text" className="form-control" id="subtituloThree" name="caracteristicas.tree.subtitulo" />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Característica 4</h5>
                        <div className="mb-3">
                          <label htmlFor="tituloFour">Título</label>
                          <input type="text" className="form-control" id="tituloFour" name="caracteristicas.four.titulo" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="subtituloFour">Subtítulo</label>
                          <input type="text" className="form-control" id="subtituloFour" name="caracteristicas.four.subtitulo" />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div >
        </div >
      }
    />
  )
}

export default NuevoVehiculo