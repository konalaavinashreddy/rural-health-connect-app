
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Navigation, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Map = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const hospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      address: '123 Main Street, Healthcare District',
      distance: '0.8 km',
      rating: 4.6,
      specialties: ['Cardiology', 'Neurology', 'Emergency'],
      hours: '24/7',
      phone: '+1 234-567-8900',
      position: { top: '30%', left: '40%' }
    },
    {
      id: 2,
      name: 'Grace Medical Center',
      address: '456 Oak Avenue, Medical Plaza',
      distance: '1.2 km',
      rating: 4.8,
      specialties: ['Pediatrics', 'Gynecology', 'Orthopedics'],
      hours: '6:00 AM - 10:00 PM',
      phone: '+1 234-567-8901',
      position: { top: '50%', left: '60%' }
    },
    {
      id: 3,
      name: 'Community Health Clinic',
      address: '789 Pine Road, Community Center',
      distance: '2.1 km',
      rating: 4.4,
      specialties: ['General Medicine', 'Dermatology'],
      hours: '8:00 AM - 6:00 PM',
      phone: '+1 234-567-8902',
      position: { top: '70%', left: '30%' }
    }
  ];

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
            <h1 className="text-2xl font-bold text-gray-900">Nearby Hospitals</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card className="healthcare-card h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Hospital Locations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-green-300"></div>
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

                {/* Your Location */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs font-medium text-blue-600 bg-white px-2 py-1 rounded shadow">You</span>
                  </div>
                </div>

                {/* Hospital Markers */}
                {hospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: hospital.position.top, left: hospital.position.left }}
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform">
                      <MapPin className="w-3 h-3 text-white m-auto mt-0.5" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-medium text-red-600 bg-white px-2 py-1 rounded shadow">
                        {hospital.name.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hospital List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hospitals Near You</h2>
            {hospitals.map((hospital) => (
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
                      <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                      <p className="text-gray-600 text-sm">{hospital.address}</p>
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
                      {hospital.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
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
                {selectedHospital.name} - Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                  <p className="text-gray-600 mb-2">{selectedHospital.address}</p>
                  <p className="text-gray-600 mb-2">Phone: {selectedHospital.phone}</p>
                  <p className="text-gray-600">Hours: {selectedHospital.hours}</p>
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
                <Link to="/appointment">
                  <Button className="button-primary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
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
