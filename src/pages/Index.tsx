
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MessageCircle, Pill, MapPin, Bell, Heart, Star, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const specialistVisits = [
    {
      name: 'Dr. Ramesh Kumar',
      specialty: 'Cardiologist',
      date: 'Saturday, 22 Jul',
      time: '10:00 AM',
      avatar: 'RK'
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrician',
      date: 'Sunday, 23 Jul',
      time: '02:00 PM',
      avatar: 'PS'
    }
  ];

  const medicines = [
    { name: 'Amoxicillin', dosage: '250mg • 08:00 AM', due: true },
    { name: 'Paracetamol', dosage: '500mg • 01:00 PM', due: false },
    { name: 'Vitamin D', dosage: '1000 IU • 08:00 PM', due: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">HealthConnect</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Health Hub</h2>
          <p className="text-lg text-gray-600">Find doctors, book appointments, and manage your health</p>
        </div>

        {/* Search Section */}
        <Card className="healthcare-card mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by disease or specialist (e.g., fever, cardiologist)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-blue-100 focus:border-blue-300 rounded-xl"
              />
            </div>
            <Link to="/doctors">
              <Button className="button-primary w-full mt-4 h-12 text-lg">
                <Search className="w-5 h-5 mr-2" />
                Find Doctors
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/appointment">
                <Card className="healthcare-card cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Appointment</h3>
                    <p className="text-gray-600">Schedule your visit with our specialists</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/chatbot">
                <Card className="healthcare-card cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">HealthBot AI</h3>
                    <p className="text-gray-600">Get instant health advice in Telugu/English</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Weekend Specialist Visits */}
            <Card className="healthcare-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">Weekend Specialist Visits</CardTitle>
                  <Link to="/doctors" className="text-blue-500 hover:text-blue-600 font-medium">View All</Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {specialistVisits.map((visit, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {visit.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{visit.name}</h4>
                        <p className="text-gray-600">{visit.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{visit.date}</p>
                        <p className="text-blue-600">{visit.time}</p>
                      </div>
                      <Link to="/appointment">
                        <Button size="sm" className="button-secondary">Book Now</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Medicine Reminders */}
            <Card className="healthcare-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-green-500" />
                    Medicine Reminders
                  </CardTitle>
                  <Link to="/medicines" className="text-blue-500 hover:text-blue-600 text-sm font-medium">Manage</Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {medicines.map((medicine, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${medicine.due ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                      <div>
                        <p className="font-medium text-gray-900">{medicine.name}</p>
                        <p className="text-sm text-gray-600">{medicine.dosage}</p>
                      </div>
                      {medicine.due && (
                        <div className="text-red-500 text-xs font-medium flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Due
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hospital Finder */}
            <Link to="/map">
              <Card className="healthcare-card cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Hospital Near Me</h3>
                  <p className="text-gray-600 mb-4">Locate nearby hospitals and clinics with ease</p>
                  <Button className="button-primary w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    Open Map
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
