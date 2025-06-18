
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Award, Filter, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { telanganaDoctors, telanganaSpecialties, telanganaDistricts } from '@/data/telanganaData';

const Doctors = () => {
  const location = useLocation();
  const preSelectedHospital = location.state?.hospital;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(preSelectedHospital?.district || '');

  const filteredDoctors = telanganaDoctors.filter(doctor => 
    (searchQuery === '' || 
     doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
     doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedSpecialty === '' || doctor.specialty === selectedSpecialty) &&
    (selectedDistrict === '' || doctor.district === selectedDistrict)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Telangana Doctors</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="healthcare-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Search doctors, specialties, or hospitals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 border-2 border-blue-100 focus:border-blue-300"
                />
              </div>
              <div>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="h-12 border-2 border-blue-100 focus:border-blue-300">
                    <SelectValue placeholder="Filter by specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Specialties</SelectItem>
                    {telanganaSpecialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="h-12 border-2 border-blue-100 focus:border-blue-300">
                    <SelectValue placeholder="Filter by district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Districts</SelectItem>
                    {telanganaDistricts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {preSelectedHospital && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Showing doctors from:</strong> {preSelectedHospital.name}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">{filteredDoctors.length} doctors found in Telangana</p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="doctor-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {doctor.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium mb-1">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm mb-2">{doctor.qualification}</p>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{doctor.hospital}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-600">District:</span>
                      <span className="text-sm font-medium text-blue-600">{doctor.district}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{doctor.experience} Years</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Success Rate</span>
                        <span className="text-sm font-medium">{doctor.successRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${doctor.successRate}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.languages.map((lang, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Next Available</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">{doctor.nextAvailable}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Consultation Fee:</span>
                      <span className="text-lg font-bold text-green-600">₹{doctor.consultationFee}</span>
                    </div>
                    
                    <Link to="/appointment" state={{ doctor }}>
                      <Button className="button-primary w-full">
                        Book Appointment - ₹{doctor.consultationFee}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card className="healthcare-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Doctors Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse all available doctors.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('');
                  setSelectedDistrict('');
                }}
                className="button-secondary mt-4"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Doctors;
