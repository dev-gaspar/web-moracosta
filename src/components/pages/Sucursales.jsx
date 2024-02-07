import { useState } from "react";
import Mapbox from "./Mapbox";

const Sucursales = () => {

  const [selectCity, setSelectCity] = useState({
    latitude: -0.115575,
    longitude: -80.699268,
  });

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
              Grupo Moracosta Portoviejo
            </a>
          </li>
          <li>
            <i className="fa fa-mobile" /> 0958622755
          </li>
          <li> <p style={{ cursor: "pointer" }} className="direccion-sm" onClick={(e) => {
            e.preventDefault()
            setSelectCity({
              latitude: -1.0419389265638237,
              longitude: -80.45867089559725,
            })
          }}> Agencia 1 <i className="fa fa-search maps-search" /> </p></li>
          <li><i className="fa fa-car-alt"></i> Av. Universitaria y calle Edulfo Cedeño, esquina.</li>
          <li> <p style={{ cursor: "pointer" }} className="direccion-sm" onClick={(e) => {
            e.preventDefault()
            setSelectCity({
              latitude: -1.0716981041874716,
              longitude: -80.49127551395723,
            })
          }}> Agencia 2 <i className="fa fa-search maps-search" /></p></li>
          <li><i className="fa fa-car-alt"></i> Paso lateral frente al Hemiciclo de las Banderas.</li>
        </ul>

        <ul className="marker">
          <li className="direccion">
            <i className="fa fa-map-pin" />
            <a>
              Grupo Moracosta Manta
            </a>
          </li>
          <li>
            <i className="fa fa-mobile" /> 0958622755 <br />
            <i className="fa fa-phone" /> 2620767 / 2613922 <br />
          </li>
          <li> <p style={{ cursor: "pointer" }} className="direccion-sm" onClick={(e) => {
            e.preventDefault()
            setSelectCity({
              latitude: -0.9437349350668671,
              longitude: -80.72436524269801,
            })
          }}> Agencia 1 <i className="fa fa-search maps-search" /></p></li>
          <li><i className="fa fa-car-alt"></i> Av. 1era entre calles 14 y 15. </li>
          <li> <p style={{ cursor: "pointer" }} className="direccion-sm" onClick={(e) => {
            e.preventDefault()
            setSelectCity({
              latitude: -0.9713032712607078,
              longitude: -80.7027329198074,
            })
          }}> Agencia 2 <i className="fa fa-search maps-search" /></p></li>
          <li><i className="fa fa-car-alt"></i> Av. 4 de noviembre, diagonal a Solca.</li>
          <li> <p style={{ cursor: "pointer" }} className="direccion-sm" onClick={(e) => {
            e.preventDefault()
            setSelectCity({
              latitude: -0.9462086346661479,
              longitude: -80.74206528835222,
            })
          }}> Agencia 3 <i className="fa fa-search maps-search" /></p></li>
          <li><i className="fa fa-car-alt"></i> Calle Universitaria 2</li>
        </ul>
      </div>

      <div id="map" className="maps">
        <Mapbox
          initialCoordenadas={{
            latitude: -1.0419389265638237,
            longitude: -80.45867089559725,
          }}
          markers={[{
            latitude: -1.0419389265638237,
            longitude: -80.45867089559725,
            label: 'Moracosta Portoviejo Agencia 1',
          }, {

            latitude: -1.0716981041874716,
            longitude: -80.49127551395723,
            label: 'Moracosta Portoviejo Agencia 2',
          }, {
            latitude: -0.9437349350668671,
            longitude: -80.72436524269801,
            label: 'Moracosta Manta Agencia 1',
          }, {
            latitude: -0.9713032712607078,
            longitude: -80.7027329198074,
            label: 'Moracosta Manta Agencia 2',
          },
          {
            latitude: -0.9462086346661479,
            longitude: -80.74206528835222,
            label: 'Moracosta Manta Agencia 3',
          }
          ]}
          selectCity={selectCity}
        />
      </div>

    </>
  );
};

export default Sucursales;
