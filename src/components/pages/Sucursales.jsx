import React, { useState, useEffect, useRef } from "react";
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Sucursales = () => {

  mapboxgl.accessToken = import.meta.env.VITE_MAPSBOX_TOKEN;
  const mapContainer = useRef(null);
  const [mapa, setMapa] = useState(null);

  useEffect(() => {

    if (mapContainer.current) {
      setMapa(
        new Map({
          container: mapContainer.current, // container ID
          style: 'mapbox://styles/mapbox/dark-v11', // style URL
          center: [-80.60, -1.01], // starting position [lng, lat]
          zoom: 10, // starting zoom
        }));

      //setear marker
      new Marker()
        .setLngLat([-80.60, -1.01])
        .addTo(mapa);

    }

  }, [mapContainer]);

  return (
    <>
      <div className="top-fixed" />
      <div className="maps-titulo">
        <h1 className="text-center">RED DE SUCURSALES GRUPO MORACOSTA EN ECUADOR</h1>
      </div>
      <div className="maps-sucursales">
        <h4>Todas</h4>
        <ul className="marker">
          <li className="direccion">
            <i className="fa fa-map-pin" />
            <a>
              Moracosta Portoviejo (Vitrina, Servicio)
            </a>
          </li>
          <li>
            <i className="fa fa-mobile" /> +593 526 20767 <br />
            <i className="fa fa-phone" /> Linea 01-8000-000000 <br />
            <i className="fab fa-whatsapp" /> +593 526 20767
          </li>
          <li><i className="fa fa-map"></i> Portoviejo</li>
          <li><i className="fa fa-car-alt"></i> Av. Universitaria</li>
        </ul>
        <ul className="marker">
          <li className="direccion">
            <i className="fa fa-map-pin" />
            <a>
              Moracosta Portoviejo (Vitrina, Servicio)
            </a>
          </li>
          <li>
            <i className="fa fa-mobile" /> +593 526 20767 <br />
            <i className="fa fa-phone" /> Linea 01-8000-000000 <br />
            <i className="fab fa-whatsapp" /> +593 526 20767
          </li>
          <li><i className="fa fa-map"></i> Portoviejo</li>
          <li><i className="fa fa-car-alt"></i> Av. Universitaria</li>
        </ul>
        <ul className="marker">
          <li className="direccion">
            <i className="fa fa-map-pin" />
            <a>
              Moracosta Portoviejo (Vitrina, Servicio)
            </a>
          </li>
          <li>
            <i className="fa fa-mobile" /> +593 526 20767 <br />
            <i className="fa fa-phone" /> Linea 01-8000-000000 <br />
            <i className="fab fa-whatsapp" /> +593 526 20767
          </li>
          <li><i className="fa fa-map"></i> Portoviejo</li>
          <li><i className="fa fa-car-alt"></i> Av. Universitaria</li>
        </ul>
      </div>

      <div id="map" className="maps" ref={mapContainer}>
      </div>

    </>
  );
};

export default Sucursales;
