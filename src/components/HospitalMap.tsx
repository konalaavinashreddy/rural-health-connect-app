
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Hospital {
  id: number;
  name: string;
  address: string;
  district: string;
  distance: string;
  rating: number;
  specialties: string[];
  hours: string;
  phone: string;
  type: string;
  latitude: number;
  longitude: number;
}

interface HospitalMapProps {
  hospitals: Hospital[];
  onHospitalSelect: (hospital: Hospital) => void;
}

const HospitalMap: React.FC<HospitalMapProps> = ({ hospitals, onHospitalSelect }) => {
  // Load Leaflet CSS dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
    link.crossOrigin = '';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Card className="healthcare-card h-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-lg">Hospital Locations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <MapContainer center={[17.385044, 78.486671]} zoom={7} style={{ height: '450px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hospitals.map(hospital => (
            <Marker
              key={hospital.id}
              position={[hospital.latitude, hospital.longitude]}
              eventHandlers={{ click: () => onHospitalSelect(hospital) }}
            >
              <Popup>
                <strong>{hospital.name}</strong><br />
                {hospital.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
};

export default HospitalMap;
