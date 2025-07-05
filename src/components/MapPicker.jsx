// src/components/MapPicker.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 📌 Fix Leaflet marker icons for Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});

// 📍 Component to capture map clicks and place marker
function LocationMarker({ setCoords }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setCoords(e.latlng); // Pass coords to parent component
    }
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ setCoords }) {
  const [indiaGeoJson, setIndiaGeoJson] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_states.geojson')
      .then((res) => res.json())
      .then((data) => setIndiaGeoJson(data))
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={[22.5937, 78.9629]} // India center
      zoom={5}
      style={{ height: "300px", width: "100%" }}
    >
      {/* ✅ OSM-IN legal tiles */}
      <TileLayer
        url="https://tile.osmindia.org/osm/{z}/{x}/{y}.png"
        attribution='&copy; OSM contributors | Tiles: <a href="https://www.openstreetmap.in">OSM India</a>'
      />

      {/* 🇮🇳 India boundary overlay */}
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