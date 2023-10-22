import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


const Sucursales = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    // Simular carga
    setTimeout(() => {
      setSucursales([,
        { lat: -1.041934, lng: -80.458660, label: "MORACOSTA PORTOVIEJO" },
        { lat: -0.943819, lng: -80.724366, label: "MORACOSTA MANTA" },
        { lat: -0.971597, lng: -80.702740, label: "MORACOSTA MATRIZ" }
      ]);
    }, 1000);

  }, []);

  if (!isLoaded) return <div>Error al cargar el mapa. Por favor, inténtalo de nuevo más tarde.</div>;


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
      <div className="maps">
        <Map sucursales={sucursales} />
      </div>
    </>
  );
};

function Map({ sucursales }) {
  return (
    <GoogleMap
      zoom={10}
      center={{
        lat: -1.01,
        lng: -80.60
      }}
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}

    >
      {sucursales && sucursales.map((sucursal, index) => (
        <Marker
          key={index}
          position={{
            lat: sucursal.lat,
            lng: sucursal.lng
          }}
        />
      ))}

    </GoogleMap>
  );
}

export default Sucursales;
