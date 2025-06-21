
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Appointment = () => {
  const location = useLocation();
  const selectedDoctor = location.state?.doctor;
  const returnTo = location.state?.returnTo || '/'; // Default to home page
  
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [opid, setOpid] = useState('');

  const hospitals = [
    'City General Hospital',
    'Grace Medical Center',
    'Community Health Clinic',
    'Regional Medical Center'
  ];

  const timeSlots = {
    morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
    afternoon: ['02:00 PM', '03:00 PM', '04:00 PM'],
    evening: ['06:00 PM', '07:00 PM', '08:00 PM']
  };

  const generateOPID = () => {
    return `P${Math.random().toString().slice(2, 8)}`;
  };

  const handleConfirmBooking = () => {
    if (selectedHospital && selectedDate && selectedTime) {
      const newOpid = generateOPID();
      setOpid(newOpid);
      setIsConfirmed(true);
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <header className="bg-white shadow-sm border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link to={returnTo}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Appointment Confirmed</h1>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="healthcare-card text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h2>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">OPID:</span>
                    <span className="font-bold text-blue-600">{opid}</span>
                  </div>
                  {selectedDoctor && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">{selectedDoctor.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hospital:</span>
                    <span className="font-medium">{selectedHospital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link to="/map">
                  <Button className="button-secondary w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions to Hospital
                  </Button>
                </Link>
                <Link to={returnTo}>
                  <Button className="button-primary w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to={returnTo}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {selectedDoctor && (
          <Card className="healthcare-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedDoctor.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedDoctor.name}</h3>
                  <p className="text-blue-600">{selectedDoctor.specialty}</p>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        )}

        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle>Select Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hospital Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Hospital
              </label>
              <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                <SelectTrigger className="h-12 border-2 border-blue-100">
                  <SelectValue placeholder="Choose a hospital" />
                </SelectTrigger>
                <SelectContent>
                  {hospitals.map(hospital => (
                    <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="h-12 border-2 border-blue-100">
                  <SelectValue placeholder="Choose date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="Day After Tomorrow">Day After Tomorrow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time Slot
              </label>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Morning</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.morning.map(time => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="h-12"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Afternoon</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.afternoon.map(time => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="h-12"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Evening</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.evening.map(time => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="h-12"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Button 
              className="button-primary w-full h-12 text-lg"
              onClick={handleConfirmBooking}
              disabled={!selectedHospital || !selectedDate || !selectedTime}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointment;
