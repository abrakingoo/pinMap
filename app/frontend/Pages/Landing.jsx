import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Inertia } from '@inertiajs/inertia'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Inertia.visit('/pins')
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function Landing({ pins }) {
  return (
    <div>
      <div style={{ height: '85vh' }}>
        <MapContainer center={[38.7223, -9.1393]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pins.map((pin, index) => (
            <Marker key={index} position={[pin.latitude, pin.longitude]} icon={defaultIcon}>
              <Popup>{pin.username ? pin.username : 'Anonymous'}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
