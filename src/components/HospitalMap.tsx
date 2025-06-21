
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import L from 'leaflet';

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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Load Leaflet CSS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on Hyderabad
    const map = L.map(mapRef.current).setView([17.385044, 78.486671], 10);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each hospital
    hospitals.forEach(hospital => {
      const marker = L.marker([hospital.latitude, hospital.longitude])
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center;">
            <strong>${hospital.name}</strong><br/>
            ${hospital.address}<br/>
            <span style="color: ${hospital.type === 'Government' ? '#10B981' : '#3B82F6'};">
              ${hospital.type} Hospital
            </span><br/>
            Rating: ${hospital.rating} ⭐
          </div>
        `)
        .on('click', () => {
          console.log('Marker clicked:', hospital.name);
          onHospitalSelect(hospital);
        });
    });

    // Add current location marker (Hyderabad center)
    L.marker([17.385044, 78.486671])
      .addTo(map)
      .bindPopup('<strong>Your Location</strong><br/>Hyderabad')
      .openPopup();

    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [hospitals, onHospitalSelect]);

  return (
    <Card className="healthcare-card h-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-lg">Hospital Locations - Interactive Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={mapRef}
          style={{ height: '450px', width: '100%' }}
          className="rounded-lg"
        />
      </CardContent>
    </Card>
  );
};

export default HospitalMap;
