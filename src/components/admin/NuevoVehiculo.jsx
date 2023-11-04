import React, { useEffect, useState } from 'react'
import Sidenav from '../layout/Sidenav'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { getModelos, getModelosError, getModelosStatus, selectAllModelos } from '../../features/vehiculos/modelosSlice'
import { Link, useNavigate } from 'react-router-dom'
import { createVehiculo, getVehiculos, getVehiculosError, getVehiculosStatus } from '../../features/vehiculos/vehiculosSlice'

const NuevoVehiculo = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modelos = useSelector(selectAllModelos)
  const status = useSelector(getModelosStatus)
  const error = useSelector(getModelosError)

  const statusVehiculos = useSelector(getVehiculosStatus)
  const errorVehiculos = useSelector(getVehiculosError)

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (statusVehiculos === "succeeded") {
      navigate("/vehiculos")
    };
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getModelos())
    }

    if (statusVehiculos === "succeeded") {
      dispatch(getVehiculos())
    }

  }, [status, dispatch])

  const [imagen_principal, setImagen_principal] = useState(null);
  const [modeloId, setModeloId] = useState(null)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState(0)

  const [video_banner, setVideo_banner] = useState(null);
  const [detalle_banner_one, setDetalle_banner_one] = useState('')
  const [detalle_banner_two, setDetalle_banner_two] = useState('')
  const [detalle_banner_tree, setDetalle_banner_tree] = useState('')

  const [ficha_tecnica, setFicha_tecnica] = useState('')
  const [titulo1, setTitulo1] = useState('')
  const [texto1, setTexto1] = useState('')
  const [imagen1, setImagen1] = useState(null);
  const [titulo2, setTitulo2] = useState('')
  const [texto2, setTexto2] = useState('')
  const [imagen2, setImagen2] = useState(null);

  const [imagenEspe, setImagenEspe] = useState(null);
  const [potencia_motor, setPotencia_motor] = useState('')
  const [torque, setTorque] = useState('')
  const [velocidad_maxima, setVelocidad_maxima] = useState('')
  const [aceleracion_0_100, setAceleracion_0_100] = useState('')

  const [airbags, setAirbags] = useState(0)
  const [frenos_antibloqueo, setFrenos_antibloqueo] = useState('')
  const [control_traccion, setControl_traccion] = useState('')
  const [control_estabilidad, setControl_estabilidad] = useState('')
  const [sistema_retencion_infantil, setSistema_retencion_infantil] = useState('')

  const [sistema_navegacion, setSistema_navegacion] = useState('')
  const [sistema_sonido_premium, setSistema_sonido_premium] = useState('')
  const [asiento_cuero, setAsiento_cuero] = useState('')
  const [techo_solar, setTecho_solar] = useState('')
  const [conectividad_bluetooth, setConectividad_bluetooth] = useState('')

  const [one_titulo, setOne_titulo] = useState('')
  const [one_subtitulo, setOne_subtitulo] = useState('')

  const [two_titulo, setTwo_titulo] = useState('')
  const [two_subtitulo, setTwo_subtitulo] = useState('')

  const [tree_titulo, setTree_titulo] = useState('')
  const [tree_subtitulo, setTree_subtitulo] = useState('')

  const [four_titulo, setFour_titulo] = useState('')
  const [four_subtitulo, setFour_subtitulo] = useState('')


  const submitHandler = (e) => {
    e.preventDefault()
    setShowModal(true)
    const formData = new FormData()
    formData.append('modelo', modeloId)
    formData.append('nombre', nombre)
    formData.append('descripcion', descripcion)
    formData.append('precio', precio)
    formData.append('imagen_principal', imagen_principal)

    formData.append('video_banner', video_banner)
    formData.append('detalles_banner.one', detalle_banner_one)
    formData.append('detalles_banner.two', detalle_banner_two)
    formData.append('detalles_banner.tree', detalle_banner_tree)

    formData.append('ficha_tecnica', ficha_tecnica)
    formData.append('detalles.titulo1', titulo1)
    formData.append('detalles.texto1', texto1)
    formData.append('detalles.imagen1', imagen1)
    formData.append('detalles.titulo2', titulo2)
    formData.append('detalles.texto2', texto2)
    formData.append('detalles.imagen2', imagen2)

    formData.append('imagen_especificaciones', imagenEspe)
    formData.append('especificaciones.potencia.potencia_motor', potencia_motor)
    formData.append('especificaciones.potencia.torque', torque)
    formData.append('especificaciones.potencia.velocidad_maxima', velocidad_maxima)
    formData.append('especificaciones.potencia.aceleracion_0_100', aceleracion_0_100)

    formData.append('especificaciones.seguridad.Airbags', airbags)
    formData.append('especificaciones.seguridad.Frenos_Antibloqueo_ABC', frenos_antibloqueo)
    formData.append('especificaciones.seguridad.Control_traccion', control_traccion)
    formData.append('especificaciones.seguridad.Control_estabilidad', control_estabilidad)
    formData.append('especificaciones.seguridad.Sistema_retencion_infantil', sistema_retencion_infantil)

    formData.append('especificaciones.equipamiento.Sistema_navegacion', sistema_navegacion)
    formData.append('especificaciones.equipamiento.Sistema_sonido_premium', sistema_sonido_premium)
    formData.append('especificaciones.equipamiento.Asiento_cuero', asiento_cuero)
    formData.append('especificaciones.equipamiento.Techo_solar', techo_solar)
    formData.append('especificaciones.equipamiento.Conectividad_bluetooth', conectividad_bluetooth)

    formData.append('caracteristicas.one.titulo', one_titulo)
    formData.append('caracteristicas.one.subtitulo', one_subtitulo)

    formData.append('caracteristicas.two.titulo', two_titulo)
    formData.append('caracteristicas.two.subtitulo', two_subtitulo)

    formData.append('caracteristicas.tree.titulo', tree_titulo)
    formData.append('caracteristicas.tree.subtitulo', tree_subtitulo)

    formData.append('caracteristicas.four.titulo', four_titulo)
    formData.append('caracteristicas.four.subtitulo', four_subtitulo)

    dispatch(createVehiculo(formData))
  }


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

  const handleImagenPrincipalChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagen_principal(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideo_banner(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
                    href="/assets/instructivo-registro-vehiculos.pdf"
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
              <div className="card shadow bg-body rounded" style={{ marginBottom: "1.5rem" }}>
                <div className="card-body">
                  {status === "failed" &&
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  }

                  <form className='row'
                    onSubmit={submitHandler}
                    encType="multipart/form-data"
                  >
                    <div className='col-md-4'>
                      <h5>Selecciona marca y modelo</h5>
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
                        onChange={(e) => setModeloId(e.value)}
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
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "200px" }}>
                        {imagen_principal ? (
                          <img src={imagen_principal} alt="Vista Previa" className='img-fluid' />
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
                        <input type="text" className="form-control" id="nombre" name="nombre" required
                          placeholder={
                            modeloId ? (
                              `Ej: ${modelos.find(modelo => modelo._id === modeloId).marca.nombre} ${modelos.find(modelo => modelo._id === modeloId).nombre}`
                            ) : "Ej: Chery Tiggo 7 Pro"
                          }
                          onChange={(e) => setNombre(e.target.value)} value={nombre}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea className="form-control" id="descripcion" name="descripcion"
                          onChange={(e) => setDescripcion(e.target.value)} value={descripcion}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="precio">Precio</label>
                        <input type="number" className="form-control" id="precio" name="precio" required
                          onChange={(e) => setPrecio(e.target.value)} value={precio}
                        />
                      </div>

                      <h5>Banner</h5>

                      <div className="mb-3">
                        <label htmlFor="video_banner">Video Banner</label>
                        <input
                          type="file"
                          className="form-control"
                          id="video_banner"
                          name="video_banner"
                          onChange={handleVideoChange}
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "200px" }}>
                        {video_banner ? (
                          <video
                            src={video_banner}
                            controls
                            className='img-fluid'
                          />
                        ) :
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <i className="text-secondary fa fa-video fa-2x mb-0" />
                            <p className="text-secondary mb-0">Vista previa</p>
                            <p className='text-secondary mb-0' >Tamaño maximo 30mb</p>
                          </div>
                        }
                      </div>

                      <div className="mb-3">
                        <label htmlFor="aspecto1">Aspecto 1</label>
                        <input type="text" className="form-control" id="aspecto1" name="aspecto1"
                          onChange={(e) => setDetalle_banner_one(e.target.value)} value={detalle_banner_one}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="aspecto2">Aspecto 2</label>
                        <input type="text" className="form-control" id="aspecto2" name="aspecto2"
                          onChange={(e) => setDetalle_banner_two(e.target.value)} value={detalle_banner_two}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="aspecto3">Aspecto 3</label>
                        <input type="text" className="form-control" id="aspecto3" name="aspecto3"
                          onChange={(e) => setDetalle_banner_tree(e.target.value)} value={detalle_banner_tree}
                          required
                        />
                      </div>

                      <h5>Detalles</h5>

                      <div className="mb-3">
                        <label htmlFor="urlFichaTecnica">URL Ficha Técnica</label>
                        <input type="text" className="form-control" id="urlFichaTecnica" name="urlFichaTecnica"
                          onChange={(e) => setFicha_tecnica(e.target.value)} value={ficha_tecnica}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="titulo1">Título 1</label>
                        <input type="text" className="form-control" id="titulo1" name="titulo1"
                          onChange={(e) => setTitulo1(e.target.value)} value={titulo1} required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="texto1">Texto 1</label>
                        <textarea className="form-control" id="texto1" name="texto1"
                          onChange={(e) => setTexto1(e.target.value)} value={texto1} required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="imagen1">Imagen 1</label>
                        <input
                          type="file"
                          className="form-control"
                          id="imagen1"
                          name="imagen1"
                          onChange={handleImagen1Change}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "200px" }}>
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
                        <input type="text" className="form-control" id="titulo2" name="titulo2"
                          onChange={(e) => setTitulo2(e.target.value)} value={titulo2} required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="texto2">Texto 2</label>
                        <textarea className="form-control" id="texto2" name="texto2"
                          onChange={(e) => setTexto2(e.target.value)} value={texto2} required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="imagen1">Imagen 2</label>
                        <input
                          type="file"
                          className="form-control"
                          id="imagen2"
                          name="imagen2"
                          onChange={handleImagen2Change}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "200px" }}>
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
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-center mb-3 img-thumbnail w-100" style={{ height: "200px" }}>
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
                          <input type="text" className="form-control" id="potencia_motor" name="potencia.potencia_motor"
                            onChange={(e) => setPotencia_motor(e.target.value)} value={potencia_motor} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="torque">Torque</label>
                          <input type="text" className="form-control" id="torque" name="potencia.torque"
                            onChange={(e) => setTorque(e.target.value)} value={torque} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="velocidad_maxima">Velocidad Máxima</label>
                          <input type="text" className="form-control" id="velocidad_maxima" name="potencia.velocidad_maxima"
                            onChange={(e) => setVelocidad_maxima(e.target.value)} value={velocidad_maxima} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="aceleracion_0_100">Aceleración 0-100 km/h</label>
                          <input type="text" className="form-control" id="aceleracion_0_100" name="potencia.aceleracion_0_100"
                            onChange={(e) => setAceleracion_0_100(e.target.value)} value={aceleracion_0_100} required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Seguridad</h5>
                        <div className="mb-3">
                          <label htmlFor="airbags">Airbags</label>
                          <input type="number" className="form-control" id="airbags" name="seguridad.Airbags"
                            onChange={(e) => setAirbags(e.target.value)} value={airbags} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="frenos_antibloqueo">Frenos Antibloqueo (ABC)</label>
                          <input type="text" className="form-control" id="frenos_antibloqueo" name="seguridad.Frenos_Antibloqueo_ABC"
                            onChange={(e) => setFrenos_antibloqueo(e.target.value)} value={frenos_antibloqueo} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="control_traccion">Control de Tracción</label>
                          <input type="text" className="form-control" id="control_traccion" name="seguridad.Control_traccion"
                            onChange={(e) => setControl_traccion(e.target.value)} value={control_traccion} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="control_estabilidad">Control de Estabilidad</label>
                          <input type="text" className="form-control" id="control_estabilidad" name="seguridad.Control_estabilidad"
                            onChange={(e) => setControl_estabilidad(e.target.value)} value={control_estabilidad} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="sistema_retencion_infantil">Sistema de Retención Infantil</label>
                          <input type="text" className="form-control" id="sistema_retencion_infantil" name="seguridad.Sistema_retencion_infantil"
                            onChange={(e) => setSistema_retencion_infantil(e.target.value)} value={sistema_retencion_infantil} required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Equipamiento</h5>
                        <div className="mb-3">
                          <label htmlFor="sistema_navegacion">Sistema de Navegación</label>
                          <input type="text" className="form-control" id="sistema_navegacion" name="equipamiento.Sistema_navegacion"
                            onChange={(e) => setSistema_navegacion(e.target.value)} value={sistema_navegacion} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="sistema_sonido_premium">Sistema de Sonido Premium</label>
                          <input type="text" className="form-control" id="sistema_sonido_premium" name="equipamiento.Sistema_sonido_premium"
                            onChange={(e) => setSistema_sonido_premium(e.target.value)} value={sistema_sonido_premium} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="asiento_cuero">Asiento de Cuero</label>
                          <input type="text" className="form-control" id="asiento_cuero" name="equipamiento.Asiento_cuero"
                            onChange={(e) => setAsiento_cuero(e.target.value)} value={asiento_cuero} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="techo_solar">Techo Solar</label>
                          <input type="text" className="form-control" id="techo_solar" name="equipamiento.Techo_solar"
                            onChange={(e) => setTecho_solar(e.target.value)} value={techo_solar} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="conectividad_bluetooth">Conectividad Bluetooth</label>
                          <input type="text" className="form-control" id="conectividad_bluetooth" name="equipamiento.Conectividad_bluetooth"
                            onChange={(e) => setConectividad_bluetooth(e.target.value)} value={conectividad_bluetooth} required
                          />
                        </div>
                      </div>

                      <h5>Caracteristicas banner principal</h5>

                      <div className="mb-3">
                        <h5> - Característica 1</h5>
                        <div className="mb-3">
                          <label htmlFor="tituloOne">Título</label>
                          <input type="text" className="form-control" id="tituloOne" name="caracteristicas.one.titulo"
                            onChange={(e) => setOne_titulo(e.target.value)} value={one_titulo} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="subtituloOne">Subtítulo</label>
                          <input type="text" className="form-control" id="subtituloOne" name="caracteristicas.one.subtitulo"
                            onChange={(e) => setOne_subtitulo(e.target.value)} value={one_subtitulo} required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Característica 2</h5>
                        <div className="mb-3">
                          <label htmlFor="tituloTwo">Título</label>
                          <input type="text" className="form-control" id="tituloTwo" name="caracteristicas.two.titulo"
                            onChange={(e) => setTwo_titulo(e.target.value)} value={two_titulo} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="subtituloTwo">Subtítulo</label>
                          <input type="text" className="form-control" id="subtituloTwo" name="caracteristicas.two.subtitulo"
                            onChange={(e) => setTwo_subtitulo(e.target.value)} value={two_subtitulo} required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Característica 3</h5>
                        <div className="mb-3">
                          <label htmlFor="tituloThree">Título</label>
                          <input type="text" className="form-control" id="tituloThree" name="caracteristicas.tree.titulo"
                            onChange={(e) => setTree_titulo(e.target.value)} value={tree_titulo} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="subtituloThree">Subtítulo</label>
                          <input type="text" className="form-control" id="subtituloThree" name="caracteristicas.tree.subtitulo"
                            onChange={(e) => setTree_subtitulo(e.target.value)} value={tree_subtitulo} required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5> - Característica 4</h5>
                        <div className="mb-3">
                          <label htmlFor="tituloFour">Título</label>
                          <input type="text" className="form-control" id="tituloFour" name="caracteristicas.four.titulo"
                            onChange={(e) => setFour_titulo(e.target.value)} value={four_titulo} required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="subtituloFour">Subtítulo</label>
                          <input type="text" className="form-control" id="subtituloFour" name="caracteristicas.four.subtitulo"
                            onChange={(e) => setFour_subtitulo(e.target.value)} value={four_subtitulo} required
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div >
          {showModal && (
            <div className="modal" data-bs-backdrop="static" tabIndex="-1" role="dialog" style={{ display: "block" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {statusVehiculos === "loading" && "Registrando..."}
                      {statusVehiculos === "succeeded" && "Registrado"}
                      {statusVehiculos === "failed" && "Error"}
                    </h5>
                    {statusVehiculos !== "loading" && (
                      <button type="button" className="btn-close" onClick={closeModal}></button>
                    )}
                  </div>


                  <div className="modal-body">
                    {statusVehiculos === "loading" &&
                      <div className="d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-center mb-3">
                          <div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        <p className="text-center">Subiendo archivos ⌛...</p>
                        <p className="text-center">Por favor permanece en la pagina 🧐</p>
                      </div>
                    }

                    {statusVehiculos === "succeeded" &&
                      <div className="alert alert-success" role="alert">
                        Vehiculo registrado correctamente 🚗
                      </div>
                    }

                    {statusVehiculos === "failed" &&
                      <>
                        <div className="alert alert-danger" role="alert">
                          {errorVehiculos} ❌
                        </div>
                        <p>Por favor verifica e intenta de nuevo</p>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

        </div >
      }
    />
  )
}

export default NuevoVehiculo