import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Componente de colapso de barra lateral.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} props.icon - Icono FontAwesome del enlace colapsable.
 * @param {string} props.name - El nombre del enlace colapsable.
 * @param {Array} props.links - Un array de objetos de enlace que se mostrarán dentro del colapso.
 * @param {string} props.links[].name - El nombre del enlace.
 * @param {string} props.links[].to - La URL a la que se redirigirá el enlace.
 * @returns {JSX.Element} Elemento React que representa el componente CollapseSidenav.
 */
const CollapseSidenav = ({ icon, name, links }) => {

  return (
    <>
      <a
        className="nav-link collapsed"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse${name}`}
        aria-expanded="false"
        aria-controls={`collapse${name}`}
        style={{ cursor: "pointer" }}
      >
        <div className="sb-nav-link-icon">
          <i className={icon}></i>
        </div>
        {name}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </a>
      <div
        className="collapse"
        id={`collapse${name}`}
        aria-labelledby="headingOne"
        data-bs-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          {links.map((link, index) => (
            <Link key={`${index}_${link.name}`} className="nav-link" to={link.to}>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default CollapseSidenav