
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Navigation, AlertCircle } from 'lucide-react';

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
  const mapInstanceRef = useRef<any>(null);
  const clickMarkerRef = useRef<any>(null);
  const hospitalMarkersRef = useRef<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Load CSS first
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }

        // Load Leaflet JS
        if (!window.L) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          script.crossOrigin = '';
          
          return new Promise((resolve, reject) => {
            script.onload = () => {
              setLeafletLoaded(true);
              resolve(true);
            };
            script.onerror = () => reject(new Error('Failed to load Leaflet'));
            document.head.appendChild(script);
          });
        } else {
          setLeafletLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Leaflet:', error);
        setMapError('Failed to load map library');
      }
    };

    loadLeaflet();
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
        
        if (mapInstanceRef.current && window.L) {
          mapInstanceRef.current.setView([lat, lng], 15);
          
          if (clickMarkerRef.current) {
            mapInstanceRef.current.removeLayer(clickMarkerRef.current);
          }
          
          clickMarkerRef.current = window.L.marker([lat, lng])
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
          
          if (onLocationClick) {
            onLocationClick(lat, lng, location.display_name);
          }
        }
      } else {
        setMapError('Location not found. Please try a different search term.');
        setTimeout(() => setMapError(null), 3000);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setMapError('Error searching for location. Please try again.');
      setTimeout(() => setMapError(null), 3000);
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
          
          if (mapInstanceRef.current && window.L) {
            mapInstanceRef.current.setView([lat, lng], 15);
            
            if (clickMarkerRef.current) {
              mapInstanceRef.current.removeLayer(clickMarkerRef.current);
            }
            
            clickMarkerRef.current = window.L.marker([lat, lng])
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
          setMapError('Unable to get your location. Please check your browser permissions.');
          setTimeout(() => setMapError(null), 3000);
          setIsLoading(false);
        }
      );
    } else {
      setMapError('Geolocation is not supported by this browser.');
      setTimeout(() => setMapError(null), 3000);
    }
  };

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !window.L) return;

    try {
      // Clean up existing map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Initialize map centered on Hyderabad
      const map = window.L.map(mapRef.current).setView([17.385044, 78.486671], 10);

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Map click handler
      map.on('click', async (e: any) => {
        const { lat, lng } = e.latlng;
        console.log('Map clicked at:', lat, lng);
        
        if (clickMarkerRef.current) {
          map.removeLayer(clickMarkerRef.current);
        }
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await response.json();
          const address = data.display_name || 'Unknown location';
          
          clickMarkerRef.current = window.L.marker([lat, lng])
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
          
          if (onLocationClick) {
            onLocationClick(lat, lng, address);
          }
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          
          clickMarkerRef.current = window.L.marker([lat, lng])
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

      mapInstanceRef.current = map;
      setMapError(null);
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map. Please refresh the page.');
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded, onLocationClick]);

  // Update hospital markers when hospitals change
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L || !leafletLoaded) return;

    // Clear existing hospital markers
    hospitalMarkersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    hospitalMarkersRef.current = [];

    // Add new hospital markers
    hospitals.forEach(hospital => {
      const marker = window.L.marker([hospital.latitude, hospital.longitude])
        .addTo(mapInstanceRef.current)
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
      
      hospitalMarkersRef.current.push(marker);
    });
  }, [hospitals, onHospitalSelect, leafletLoaded]);

  if (!leafletLoaded) {
    return (
      <Card className="healthcare-card h-[600px]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="healthcare-card h-[600px]">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">Interactive Hospital Map</span>
        </CardTitle>
        
        {mapError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-700 text-sm">{mapError}</span>
          </div>
        )}
        
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
          className="rounded-lg bg-gray-100"
        />
      </CardContent>
    </Card>
  );
};

export default HospitalMap;
