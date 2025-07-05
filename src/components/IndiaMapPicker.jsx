import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const IndiaMapPicker = ({ setCoords }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    if (!apiKey) {
      console.error("❌ MapTiler API key missing in .env");
      return;
    }

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [78.9629, 22.5937], // India center [lng, lat]
      zoom: 4.5
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;

      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new maplibregl.Marker({ color: '#d00' })
          .setLngLat([lng, lat])
          .addTo(map);
      }

      setCoords({ latitude: lat, longitude: lng });
    });

    return () => map.remove();
  }, [setCoords]);

  return (
    <div
      ref={mapRef}
      style={{ height: '300px', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
    />
  );
};

export default IndiaMapPicker;