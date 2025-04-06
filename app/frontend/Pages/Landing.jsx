import React, {useEffect} from 'react';
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

export default function Landing({ pins, flash_user }) {
      useEffect(() => {
        if (flash_user) {
          localStorage.setItem("flash_user", JSON.stringify(flash_user));
        }
      }, [flash_user]);
    //    console.log('Logged in user:', localStorage.getItem("flash_user"));
  return (
    <div>
      <div style={{ height: '80vh' }}>
        <MapContainer center={[38.7223, -9.1393]} zoom={1.5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pins.map((pin, index) => (
            <Marker key={index} position={[pin.latitude, pin.longitude]} icon={defaultIcon}>
            <Popup>
                <div style={{ textAlign: 'center', fontSize: '14px', lineHeight: '1.4' }}>
                    <strong>{pin.username || 'Anonymous'}</strong>
                    <br />
                    <span>{pin.latitude}, {pin.longitude}</span>
                </div>
            </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
