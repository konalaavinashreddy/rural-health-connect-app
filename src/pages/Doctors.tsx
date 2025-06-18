
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Award, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      rating: 4.8,
      experience: 12,
      successRate: 95,
      nextAvailable: 'Today, 2:00 PM',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Dr. Michael Lee',
      specialty: 'Cardiologist',
      rating: 4.9,
      experience: 15,
      successRate: 97,
      nextAvailable: 'Tomorrow, 10:30 AM',
      avatar: 'ML'
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      specialty: 'Pediatrician',
      rating: 4.7,
      experience: 8,
      successRate: 96,
      nextAvailable: 'Today, 4:00 PM',
      avatar: 'EC'
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      specialty: 'Dermatologist',
      rating: 4.6,
      experience: 10,
      successRate: 94,
      nextAvailable: 'Tomorrow, 9:00 AM',
      avatar: 'DK'
    }
  ];

  const specialties = ['General Physician', 'Cardiologist', 'Pediatrician', 'Dermatologist', 'Orthopedic'];

  const filteredDoctors = doctors.filter(doctor => 
    (searchQuery === '' || doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedSpecialty === '' || doctor.specialty === selectedSpecialty)
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
            <h1 className="text-2xl font-bold text-gray-900">Find Your Doctor</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="healthcare-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Search doctors or specialties..."
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
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="doctor-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {doctor.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{doctor.specialty}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{doctor.experience} Years Exp</span>
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
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Next Available</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">{doctor.nextAvailable}</span>
                    </div>
                    
                    <Link to="/appointment" state={{ doctor }}>
                      <Button className="button-primary w-full mt-4">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
