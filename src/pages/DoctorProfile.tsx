
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Award, MapPin, Phone, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { telanganaDoctors } from '@/data/telanganaData';

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  
  const doctor = telanganaDoctors.find(doc => doc.id === Number(doctorId));

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <Card className="healthcare-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h2>
            <p className="text-gray-600 mb-4">The doctor profile you're looking for doesn't exist.</p>
            <Link to="/doctors">
              <Button className="button-primary">Back to Doctors</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBookAppointment = () => {
    navigate('/appointment', { 
      state: { 
        preSelectedDoctor: doctor,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        hospital: doctor.hospital
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/doctors">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Doctor Profile</h1>
              <p className="text-blue-600 text-sm">{doctor.specialty} Specialist</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Doctor Profile Card */}
        <Card className="healthcare-card mb-6">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Doctor Avatar */}
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto md:mx-0">
                {doctor.avatar}
              </div>
              
              {/* Doctor Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
                <p className="text-xl text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 mb-4">{doctor.qualification}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">{doctor.rating} Rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-500" />
                    <span>{doctor.experience} Years Experience</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">District:</span>
                    <span className="font-medium text-blue-600">{doctor.district}</span>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-medium">{doctor.successRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full" 
                      style={{ width: `${doctor.successRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Languages Spoken:</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="healthcare-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">Next Available</span>
                  </div>
                  <span className="font-medium text-green-600">{doctor.nextAvailable}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="text-2xl font-bold text-green-600">₹{doctor.consultationFee}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="healthcare-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600">Available for consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">{doctor.hospital}</p>
                    <p className="text-sm text-gray-600">{doctor.district}, Telangana</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleBookAppointment}
            className="button-primary flex-1"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Appointment - ₹{doctor.consultationFee}
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/chatbot')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat with AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
