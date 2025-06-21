import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Navigation, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { telanganaHospitals, telanganaDistricts } from '@/data/telanganaData';

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
        {/* Filters */}
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
          {/* Map Section */}
          <Card className="healthcare-card h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Telangana Hospital Locations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                {/* Telangana State Outline Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-orange-200 via-white to-green-300"></div>
                  {/* Grid lines to simulate map */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(10)].map((_, i) => (
                      <div key={i}>
                        <div 
                          className="absolute border-gray-400 border-t-[1px]" 
                          style={{ top: `${i * 10}%`, width: '100%' }}
                        />
                        <div 
                          className="absolute border-gray-400 border-l-[1px]" 
                          style={{ left: `${i * 10}%`, height: '100%' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Your Location (Hyderabad Center) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs font-medium text-blue-600 bg-white px-2 py-1 rounded shadow">Your Location</span>
                  </div>
                </div>

                {/* Hospital Markers */}
                {filteredHospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: hospital.position.top, left: hospital.position.left }}
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform ${
                      hospital.type === 'Government' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      <MapPin className="w-3 h-3 text-white m-auto mt-0.5" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className={`text-xs font-medium bg-white px-2 py-1 rounded shadow ${
                        hospital.type === 'Government' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {hospital.name.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow">
                  <h4 className="text-xs font-semibold mb-2">Legend</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Government</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs">Private</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hospital List */}
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
                  
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.slice(0, 3).map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {hospital.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{hospital.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{hospital.hours}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{hospital.phone}</span>
                      </div>
                    </div>
                    <Button size="sm" className="button-secondary">
                      <Navigation className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Hospital Details */}
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


