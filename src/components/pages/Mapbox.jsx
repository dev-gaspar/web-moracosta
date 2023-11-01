import mapboxgl from 'mapbox-gl';
import Map, { Marker, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useRef } from 'react';

const Mapbox = ({ initialCoordenadas, markers, selectCity }) => {

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const mapRef = useRef();

  useEffect(() => {
    mapRef.current?.flyTo({ center: [selectCity.longitude, selectCity.latitude], duration: 2000 });
  }, [selectCity]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        width: "100%",
        height: "100%",
        latitude: initialCoordenadas.latitude,
        longitude: initialCoordenadas.longitude,
        zoom: 15,
        bearing: 0,
        pitch: 0
      }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={mapboxgl.accessToken}
    >
      <ScaleControl />

      {markers.map((marker, index) => (
        <Marker
          key={index}
          latitude={marker.latitude}
          longitude={marker.longitude}
          offsetLeft={-20}
          offsetTop={-30}
        >
          <div style={{ position: 'relative', width: 35, height: 35 }}>
            <img
              style={{ width: '100%', height: '100%' }}
              src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png"
              alt='marker'
            />
            <p
              className='maps-label text-white fw-bold'
              style={{
                position: 'absolute',
                top: "-40px",
                left: "-30px",
                margin: 0,
                padding: 0,
                width: '100px',
                textAlign: 'center',
              }}
            >
              {marker.label}
            </p>

          </div>
        </Marker>

      ))}

    </Map>
  );
}

export default Mapbox