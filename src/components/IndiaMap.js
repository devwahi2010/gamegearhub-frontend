// src/components/IndiaMap.js
import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

function IndiaMap({ lat = 22.5937, lng = 78.9629, zoom = 4 }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=uPStNkPf4iEY5VDx6Tb1`,
      center: [lng, lat],
      zoom: zoom,
    });

    // Optional: Add zoom and rotation controls
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => map.remove();
  }, [lat, lng, zoom]);

  return (
    <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />
  );
}

export default IndiaMap;