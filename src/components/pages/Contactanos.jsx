import React from 'react'


const Contactanos = () => {

  const contactenos = [
    {
      id: 1,
      title: "Atención personalizada con un asesor",
      img: "/assets/contactanos.png",
    },
    {
      id: 2,
      title: "Asistencia 24/7",
      img: "/assets/contactanos.png",
    },
    {
      id: 3,
      title: "Más cerca de ti",
      img: "/assets/contactanos.png",
    },
    {
      id: 4,
      title: "Ayúdanos a mejorar",
      img: "/assets/contactanos.png",
    }
  ]

  return (
    <>
      <div className="top-fixed" />
      <div className='bg-dark' >
        <div className='container py-4'>
          <h1 className='title-contactenos display-6'>Contáctanos</h1>
          <div className='row' >
            {contactenos.map((contacto) => (
              <div key={contacto.id} className='col-lg-6 col-md-6 col-sm-12 mb-4'>
                <div>
                  <p className='title'>{contacto.title}</p>
                </div>
                <div className='mb-4'>
                  {contacto.link ? (
                    <a href={contacto.link} target='_blank' rel='noreferrer'>
                      <img src={contacto.img} alt={contacto.title} className='img-fluid w-100' style={{ objectFit: 'cover', height: '100%' }} />
                    </a>
                  ) : (
                    <img src={contacto.img} alt={contacto.title} className='img-fluid w-100' style={{ objectFit: 'cover', height: '100%' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="small p-2" style={{
            fontSize: '0.7rem',
            margin: 0,
            color: 'var(--secondary)'
          }}>
            Se reserva el derecho de hacer cambios en cualquier momento sin previo aviso u obligación a la información contenida en este sitio web, precios, programas de incentivos, especificaciones técnicas, equipamiento, ilustraciones y de modificar o suspender modelos y otros. Las imágenes y videos pueden no corresponder con el producto final.
          </p>
        </div>
      </div>
    </>
  )
}

export default Contactanos