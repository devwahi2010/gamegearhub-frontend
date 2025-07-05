// src/components/MapPicker.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 📌 Fix for missing marker icons in Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});

function LocationMarker({ setCoords }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setCoords(e.latlng); // Update parent state
    }
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ setCoords }) {
  const [indiaGeoJson, setIndiaGeoJson] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_states.geojson')
      .then(res => res.json())
      .then(data => setIndiaGeoJson(data))
      .catch(console.error);
  }, []);

  return (
    <MapContainer center={[22.5937, 78.9629]} zoom={5} style={{ height: "300px", width: "100%" }}>
      {/* 🌐 Carto Voyager basemap */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>, &copy; <a href="https://carto.com/">CARTO</a>'
      />

      {/* 🇮🇳 Optional India boundary overlay */}
      {indiaGeoJson && (
        <GeoJSON
          data={indiaGeoJson}
          style={{ color: 'black', weight: 1, fillOpacity: 0.03 }}
        />
      )}

      <LocationMarker setCoords={setCoords} />
    </MapContainer>
  );
}