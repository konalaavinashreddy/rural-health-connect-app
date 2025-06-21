
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Pill, MessageCircle, MapPin, FileText, LogOut } from 'lucide-react';

const PatientDashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-blue-600">Welcome, {user?.name}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/doctors">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <span>Find Doctors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Search and book appointments with doctors in your area.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/medicines">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Pill className="w-6 h-6 text-green-600" />
                  <span>Medicines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Find nearby pharmacies and medicine information.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/prescriptions">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <span>Prescriptions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">View and manage your prescriptions.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/chatbot">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                  <span>Health Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get instant health advice from our AI assistant.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/map">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-red-600" />
                  <span>Find Hospitals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Locate nearby hospitals and healthcare facilities.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/medicine-reminders">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Pill className="w-6 h-6 text-indigo-600" />
                  <span>Medicine Reminders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Set reminders for your medications.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
