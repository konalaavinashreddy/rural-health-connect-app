
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Users, FileText, MessageCircle, LogOut, ExternalLink } from 'lucide-react';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handlePortalRedirect = () => {
    window.location.href = 'https://rural-health-connect-portal.lovable.app/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-blue-600">Welcome, {user?.name}</p>
            {user?.specialty && (
              <p className="text-sm text-gray-600">{user.specialty} • {user.hospital}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button onClick={handlePortalRedirect} className="bg-green-600 hover:bg-green-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Doctor Portal
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handlePortalRedirect}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <span>Manage Appointments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View and manage your patient appointments.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handlePortalRedirect}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-green-600" />
                <span>Patient Records</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Access and update patient medical records.</p>
            </CardContent>
          </Card>

          <Link to="/doctor-forms">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <span>Medical Forms</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fill out patient vitals and prescription forms.</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handlePortalRedirect}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <MessageCircle className="w-6 h-6 text-orange-600" />
                <span>Patient Communication</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Communicate with patients and send updates.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handlePortalRedirect}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-indigo-600" />
                <span>Reports & Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View patient statistics and medical reports.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
