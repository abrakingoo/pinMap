import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Landing({ pins, auth }) {
  return (
    <div>
      <div style={{ height: '85vh' }}>
        <MapContainer center={[38.7223, -9.1393]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pins.map((pin, index) => (
            <Marker key={index} position={[pin.latitude, pin.longitude]}>
              <Popup>{pin.user.email}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
