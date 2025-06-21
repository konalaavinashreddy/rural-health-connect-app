import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Phone, Navigation, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { telanganaHospitals, telanganaDistricts } from '@/data/telanganaData';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredHospitals = telanganaHospitals.filter(hospital => 
    (selectedDistrict === '' || selectedDistrict === 'all-districts' || hospital.district === selectedDistrict) &&
    (selectedType === '' || selectedType === 'all-types' || hospital.type === selectedType)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Telangana Hospitals Map</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="healthcare-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="h-12 border-2 border-blue-100">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-districts">All Districts</SelectItem>
                  {telanganaDistricts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="h-12 border-2 border-blue-100">
                  <SelectValue placeholder="Hospital Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="healthcare-card h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-lg">Hospital Locations (Leaflet)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <MapContainer center={[17.385044, 78.486671]} zoom={7} style={{ height: '450px', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredHospitals.map(hospital => (
                  <Marker
                    key={hospital.id}
                    position={[hospital.latitude, hospital.longitude]}
                    eventHandlers={{ click: () => setSelectedHospital(hospital) }}
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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Hospitals in Telangana</h2>
              <span className="text-sm text-gray-600">{filteredHospitals.length} hospitals found</span>
            </div>
            {filteredHospitals.map((hospital) => (
              <Card 
                key={hospital.id} 
                className={`healthcare-card cursor-pointer transition-all duration-200 ${
                  selectedHospital?.id === hospital.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedHospital(hospital)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          hospital.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {hospital.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{hospital.address}</p>
                      <p className="text-blue-600 text-sm font-medium">{hospital.district}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{hospital.rating}</span>
                      </div>
                      <span className="text-blue-600 font-medium text-sm">{hospital.distance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedHospital && (
          <Card className="healthcare-card mt-8">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                {selectedHospital.name} - Detailed Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                  <p className="text-gray-600 mb-2"><strong>Address:</strong> {selectedHospital.address}</p>
                  <p className="text-gray-600 mb-2"><strong>District:</strong> {selectedHospital.district}</p>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> {selectedHospital.phone}</p>
                  <p className="text-gray-600 mb-2"><strong>Hours:</strong> {selectedHospital.hours}</p>
                  <p className="text-gray-600"><strong>Type:</strong> {selectedHospital.type} Hospital</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Available Specialties</h4>
                  <div className="space-y-2">
                    {selectedHospital.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <Link to="/appointment" state={{ hospital: selectedHospital }}>
                  <Button className="button-primary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Link to="/doctors" state={{ hospital: selectedHospital }}>
                  <Button className="button-secondary">
                    Find Doctors
                  </Button>
                </Link>
                <Button className="button-secondary">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Map;
