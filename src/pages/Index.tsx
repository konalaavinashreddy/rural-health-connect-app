
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, MessageCircle, Pill, MapPin, Stethoscope, Clock, Star, Users, Heart, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { commonDiseases, telanganaSpecialties } from '@/data/telanganaData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const quickSearchSuggestions = [
    'Fever', 'Diabetes', 'Heart Disease', 'Blood Pressure', 'Kidney Stones'
  ];

  const weekendSpecialists = [
    { name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', time: 'Sat 10:00 AM', hospital: 'NIMS' },
    { name: 'Dr. Priya Sharma', specialty: 'Pediatrician', time: 'Sun 11:00 AM', hospital: 'Apollo' },
    { name: 'Dr. Venkatesh Naidu', specialty: 'General Physician', time: 'Sat 2:00 PM', hospital: 'Gandhi Hospital' }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/doctors');
    }
  };

  const handleQuickSearch = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/doctors?search=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Telangana Health Care (తెలంగాణ ఆరోగ్య సంరక్షణ)
            </h1>
            <p className="text-gray-600">Complete healthcare solution for rural Telangana</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Search */}
        <Card className="healthcare-card mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Find Healthcare Near You</h2>
              <p className="text-gray-600">Search by disease, specialist, or symptoms (వ్యాధి, వైద్యుడు లేదా లక్షణాలతో వెతకండి)</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by disease or specialist (వ్యాధి లేదా స్పెషలిస్ట్ వెతకండి)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 text-lg border-2 border-blue-100 focus:border-blue-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="button-primary h-14 px-8 text-lg">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
            
            {/* Quick Search Suggestions */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-600 mr-2">Quick search:</span>
              {quickSearchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSearch(suggestion)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full hover:bg-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Healthcare Services - New Design */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Our Healthcare Services
            <br />
            <span className="text-lg text-gray-600">మా ఆరోగ్య సేవలు</span>
          </h2>
          
          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Doctor Visit Schedule */}
            <Link to="/doctors" className="group">
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 h-64 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-105 border border-blue-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <Home className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Find PHC Visiting Doctors
                  </h3>
                  <p className="text-sm text-gray-700 font-medium">
                    PHC వైద్యుల వేళలు
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-20">
                  <Stethoscope className="w-12 h-12 text-blue-600" />
                </div>
              </div>
            </Link>

            {/* Medicine Tracker */}
            <Link to="/medicines" className="group">
              <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 h-64 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-105 border border-purple-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <Pill className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Track My Medicines
                  </h3>
                  <p className="text-sm text-gray-700 font-medium">
                    మందుల ట్రాకింగ్
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-20">
                  <Pill className="w-12 h-12 text-purple-600" />
                </div>
              </div>
            </Link>

            {/* Find a Specialist */}
            <Link to="/doctors" state={{ searchByDisease: true }} className="group">
              <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 h-64 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-105 border border-green-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <Search className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Search by Disease
                  </h3>
                  <p className="text-sm text-gray-700 font-medium">
                    వ్యాధి ద్వారా వెతకండి
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-20">
                  <Stethoscope className="w-12 h-12 text-green-600" />
                </div>
              </div>
            </Link>

            {/* Government Schemes */}
            <Link to="/chatbot" state={{ topic: 'schemes' }} className="group">
              <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-6 h-64 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-105 border border-orange-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <Heart className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Government Schemes
                  </h3>
                  <p className="text-sm text-gray-700 font-medium">
                    ప్రభుత్వ పథకాలు
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-20">
                  <Star className="w-12 h-12 text-orange-600" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Weekend Specialists & Hospital Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekend Specialists */}
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>Weekend Specialist Visits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekendSpecialists.map((specialist, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{specialist.name}</h4>
                      <p className="text-sm text-blue-600">{specialist.specialty}</p>
                      <p className="text-xs text-gray-600">{specialist.hospital}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-600">{specialist.time}</p>
                      <Link to="/appointment" state={{ doctor: specialist }}>
                        <Button size="sm" className="button-secondary mt-2">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hospital Map */}
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Find Hospital Near Me</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Telangana Hospitals</h3>
                <p className="text-gray-600 mb-4">Find government and private hospitals across Telangana districts</p>
                <Link to="/map">
                  <Button className="button-primary">
                    <MapPin className="w-4 h-4 mr-2" />
                    View Hospital Map
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Statistics */}
        <Card className="healthcare-card mb-8">
          <CardHeader>
            <CardTitle>Telangana Healthcare Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                <p className="text-gray-600">Qualified Doctors</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                <p className="text-gray-600">Hospitals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
                <p className="text-gray-600">Patients Served</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Specialties */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle>Available Medical Specialties in Telangana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {telanganaSpecialties.map((specialty, index) => (
                <button
                  key={index}
                  onClick={() => navigate('/doctors', { state: { specialty } })}
                  className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer text-center"
                >
                  <p className="text-sm font-medium text-gray-900">{specialty}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
