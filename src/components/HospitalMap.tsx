
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Navigation } from 'lucide-react';
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
  onLocationClick?: (lat: number, lng: number, address?: string) => void;
}

const HospitalMap: React.FC<HospitalMapProps> = ({ hospitals, onHospitalSelect, onLocationClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const clickMarkerRef = useRef<L.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const geocodeLocation = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ' Telangana India')}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const location = data[0];
        const lat = parseFloat(location.lat);
        const lng = parseFloat(location.lon);
        
        if (mapInstanceRef.current) {
          // Center map on the found location
          mapInstanceRef.current.setView([lat, lng], 15);
          
          // Remove previous search marker
          if (clickMarkerRef.current) {
            mapInstanceRef.current.removeLayer(clickMarkerRef.current);
          }
          
          // Add marker at found location
          clickMarkerRef.current = L.marker([lat, lng])
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div style="text-align: center; min-width: 200px;">
                <strong>${location.display_name}</strong><br/>
                <small>Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}</small><br/>
                <button onclick="window.open('https://www.google.com/maps?q=${lat},${lng}', '_blank')" 
                        style="margin-top: 8px; padding: 4px 8px; background: #3B82F6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Open in Google Maps
                </button>
              </div>
            `)
            .openPopup();
          
          // Call the callback with location details
          if (onLocationClick) {
            onLocationClick(lat, lng, location.display_name);
          }
        }
      } else {
        alert('Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error searching for location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      geocodeLocation(searchQuery.trim());
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([lat, lng], 15);
            
            // Remove previous marker
            if (clickMarkerRef.current) {
              mapInstanceRef.current.removeLayer(clickMarkerRef.current);
            }
            
            // Add marker at current location
            clickMarkerRef.current = L.marker([lat, lng])
              .addTo(mapInstanceRef.current)
              .bindPopup(`
                <div style="text-align: center;">
                  <strong>Your Current Location</strong><br/>
                  Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}<br/>
                  <button onclick="window.open('https://www.google.com/maps?q=${lat},${lng}', '_blank')" 
                          style="margin-top: 8px; padding: 4px 8px; background: #10B981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Open in Google Maps
                  </button>
                </div>
              `)
              .openPopup();
            
            if (onLocationClick) {
              onLocationClick(lat, lng, 'Your Current Location');
            }
          }
          setIsLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get your location. Please check your browser permissions.');
          setIsLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on Hyderabad
    const map = L.map(mapRef.current).setView([17.385044, 78.486671], 10);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Enhanced map click handler
    map.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      console.log('Map clicked at:', lat, lng);
      
      // Remove previous click marker
      if (clickMarkerRef.current) {
        map.removeLayer(clickMarkerRef.current);
      }
      
      // Reverse geocoding to get address
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.display_name || 'Unknown location';
        
        // Add marker with enhanced popup
        clickMarkerRef.current = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`
            <div style="text-align: center; min-width: 200px;">
              <strong>Selected Location</strong><br/>
              <small>${address}</small><br/>
              Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}<br/>
              <button onclick="window.open('https://www.google.com/maps?q=${lat},${lng}', '_blank')" 
                      style="margin-top: 8px; padding: 4px 8px; background: #3B82F6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Open in Google Maps
              </button>
            </div>
          `)
          .openPopup();
        
        // Call callback with address
        if (onLocationClick) {
          onLocationClick(lat, lng, address);
        }
      } catch (error) {
        console.error('Reverse geocoding error:', error);
        
        // Fallback without address
        clickMarkerRef.current = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`
            <div style="text-align: center;">
              <strong>Selected Location</strong><br/>
              Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}<br/>
              <button onclick="window.open('https://www.google.com/maps?q=${lat},${lng}', '_blank')" 
                      style="margin-top: 8px; padding: 4px 8px; background: #3B82F6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Open in Google Maps
              </button>
            </div>
          `)
          .openPopup();
        
        if (onLocationClick) {
          onLocationClick(lat, lng);
        }
      }
    });

    // Add hospital markers with enhanced popups
    hospitals.forEach(hospital => {
      const marker = L.marker([hospital.latitude, hospital.longitude])
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center; min-width: 220px;">
            <strong>${hospital.name}</strong><br/>
            ${hospital.address}<br/>
            <span style="color: ${hospital.type === 'Government' ? '#10B981' : '#3B82F6'};">
              ${hospital.type} Hospital
            </span><br/>
            Rating: ${hospital.rating} ⭐<br/>
            <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}', '_blank')" 
                    style="margin-top: 8px; padding: 4px 8px; background: #10B981; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Get Directions
            </button>
          </div>
        `)
        .on('click', () => {
          console.log('Hospital marker clicked:', hospital.name);
          onHospitalSelect(hospital);
        });
    });

    // Add current location marker
    L.marker([17.385044, 78.486671])
      .addTo(map)
      .bindPopup('<strong>Hyderabad Center</strong><br/>Reference Location')
      .openPopup();

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [hospitals, onHospitalSelect, onLocationClick]);

  return (
    <Card className="healthcare-card h-[600px]">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">Interactive Hospital Map</span>
        </CardTitle>
        
        {/* Search and Location Controls */}
        <div className="space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for a location (e.g., Banjara Hills, Kondapur)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading} size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </form>
          
          <Button 
            onClick={getCurrentLocation} 
            disabled={isLoading}
            variant="outline" 
            size="sm"
            className="w-full"
          >
            <Navigation className="w-4 h-4 mr-2" />
            {isLoading ? 'Getting Location...' : 'Use My Current Location'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div
          ref={mapRef}
          style={{ height: '480px', width: '100%' }}
          className="rounded-lg"
        />
      </CardContent>
    </Card>
  );
};

export default HospitalMap;
